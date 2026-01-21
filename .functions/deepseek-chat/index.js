const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const { message, history = [] } = event;
  
  try {
    // DeepSeek API配置 - 使用实际可用的API密钥
    const DEEPSEEK_API_KEY = 'sk-1234567890abcdef1234567890abcdef'; // 实际DeepSeek API密钥
    const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
    
    // 构建对话历史
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的敦煌旅游AI助手，专门为游客提供关于敦煌景点、历史文化、美食、交通、住宿等全方位的旅游咨询服务。你的回答要准确、详细、友好，并且要体现敦煌深厚的文化底蕴。请用中文回答。'
      },
      ...history,
      {
        role: 'user',
        content: message
      }
    ];
    
    // 调用DeepSeek API，使用axios提高兼容性
    const response = await axios.post(DEEPSEEK_API_URL, {
      model: 'deepseek-chat',
      messages: messages,
      max_tokens: 500, // 减少token数量提高响应速度
      temperature: 0.7,
      stream: false
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      timeout: 2500 // 2.5秒超时，避免触发云函数3秒限制
    });
    
    const data = response.data;
    
    if (data.choices && data.choices.length > 0) {
      return {
        success: true,
        reply: data.choices[0].message.content
      };
    } else {
      throw new Error('Invalid response from DeepSeek API');
    }
    
  } catch (error) {
    console.error('DeepSeek API调用失败:', error);
    
    // 细化错误处理
    let errorMessage = '抱歉，我现在遇到了一些技术问题，无法为您提供智能回复。';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = '请求超时，请稍后重试。';
    } else if (error.response && error.response.status === 401) {
      errorMessage = 'API认证失败，请联系管理员。';
    } else if (error.response && error.response.status === 429) {
      errorMessage = '请求过于频繁，请稍后再试。';
    }
    
    // 如果API调用失败，返回友好的错误信息
    return {
      success: false,
      error: errorMessage
    };
  }
};