const cloud = require('@cloudbase/node-sdk');

exports.main = async (event, context) => {
  const { message, history = [] } = event;
  
  try {
    // 检查API密钥
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API密钥未配置');
    }

    // 构建消息历史
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的敦煌旅游助手，熟悉敦煌的历史文化、景点信息、旅游路线等。请用中文回答用户的问题，提供准确、有用的旅游信息。'
      },
      ...history.map(h => ({
        role: h.role,
        content: h.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    // 使用Promise.race实现超时控制
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('请求超时')), 2500)
    );

    const apiPromise = fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500, // 减少token数量
        temperature: 0.7
      })
    });

    // 竞速执行，超时则返回缓存回复
    const response = await Promise.race([apiPromise, timeoutPromise]);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API错误: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return {
      success: true,
      reply: reply,
      history: [...history, { role: 'user', content: message }, { role: 'assistant', content: reply }]
    };

  } catch (error) {
    console.error('OpenAI API调用错误:', error);
    
    // 返回友好的错误信息
    let errorMessage = '抱歉，我现在遇到了一些技术问题，无法为您提供智能回复。';
    
    if (error.message.includes('API密钥')) {
      errorMessage = 'AI助手配置异常，请联系技术支持。';
    } else if (error.message.includes('网络') || error.message.includes('超时')) {
      errorMessage = '网络连接异常，请稍后重试。';
    } else if (error.message.includes('rate limit')) {
      errorMessage = '服务繁忙，请稍后再试。';
    }
    
    return {
      success: false,
      error: errorMessage,
      details: error.message
    };
  }
};