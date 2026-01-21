const axios = require('axios');

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

    // 使用axios进行API调用，设置2.5秒超时
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      timeout: 2500 // 2.5秒超时
    });

    const reply = response.data.choices[0].message.content;
    
    return {
      success: true,
      data: {
        reply: reply,
        history: [...history, { role: 'user', content: message }, { role: 'assistant', content: reply }]
      }
    };
    
  } catch (error) {
    console.error('OpenAI API调用错误:', error);
    
    let errorMessage = 'AI助手暂时无法回复，请稍后重试。';
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      errorMessage = '网络连接异常，请稍后重试。';
    } else if (error.response?.status === 401) {
      errorMessage = '服务配置异常，请联系管理员。';
    } else if (error.response?.status === 429) {
      errorMessage = '服务繁忙，请稍后重试。';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};