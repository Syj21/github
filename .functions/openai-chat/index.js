const axios = require('axios');

exports.main = async (event, context) => {
  const { message, history = [] } = event;
  
  try {
    // 系统提示词，确保AI了解敦煌旅游背景
    const systemPrompt = `你是一个专业的敦煌旅游AI助手，熟悉敦煌的所有景点、历史文化、美食和实用信息。
    请用中文回答用户的问题，回答要准确、详细、友好。
    如果用户询问的是景点信息，请提供详细的介绍、开放时间、门票价格、交通方式等。
    如果用户询问的是历史文化，请提供准确的历史背景和文化内涵。
    如果用户询问的是美食推荐，请推荐当地特色美食和餐厅。
    如果用户询问的是实用信息，如天气、交通、住宿等，请提供实用的建议。`;

    // 构建消息数组
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message }
    ];

    // 调用OpenAI API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
      stream: false
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY || 'sk-your-api-key-here'}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    const aiResponse = response.data.choices[0].message.content;
    
    return {
      success: true,
      message: aiResponse,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('OpenAI API调用失败:', error);
    
    // 详细的错误处理
    let errorMessage = '抱歉，我现在遇到了一些技术问题，无法为您提供智能回复。';
    
    if (error.response) {
      // API响应错误
      if (error.response.status === 401) {
        errorMessage = 'API认证失败，请检查API密钥配置。';
      } else if (error.response.status === 429) {
        errorMessage = '请求过于频繁，请稍后再试。';
      } else if (error.response.status === 500) {
        errorMessage = '服务器内部错误，请稍后再试。';
      } else {
        errorMessage = `API错误: ${error.response.status} - ${error.response.statusText}`;
      }
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = '请求超时，请检查网络连接。';
    } else if (error.message.includes('getaddrinfo')) {
      errorMessage = '网络连接失败，请检查网络配置。';
    }
    
    return {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    };
  }
};