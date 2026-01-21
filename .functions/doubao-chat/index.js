const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const { message, history = [] } = event;
  
  try {
    // 豆包API配置 - 从环境变量获取API密钥
    const DOUBAO_API_KEY = process.env.DOUBAO_API_KEY || cloud.env.DOUBAO_API_KEY;
    const DOUBAO_API_URL = 'https://api.volcengineapi.com/v1/chat/completions';
    
    if (!DOUBAO_API_KEY) {
      throw new Error('豆包API密钥未配置，请在云开发环境变量中设置 DOUBAO_API_KEY');
    }
    
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
    
    // 调用豆包API，使用axios提高兼容性
    const axios = require('axios');
    const response = await axios.post(DOUBAO_API_URL, {
      model: 'doubao-pro',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DOUBAO_API_KEY}`
      },
      timeout: 2500 // 2.5秒超时
    });
    
    const data = response.data;
    
    if (data.choices && data.choices.length > 0) {
      return {
        success: true,
        message: data.choices[0].message.content
      };
    } else {
      throw new Error('豆包API返回无效响应');
    }
    
  } catch (error) {
    console.error('豆包API调用失败:', error);
    
    // 细化错误处理
    let errorMessage = '抱歉，我现在遇到了一些技术问题，无法为您提供智能回复。';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = '请求超时，请稍后重试。';
    } else if (error.response && error.response.status === 401) {
      errorMessage = 'API认证失败，请联系管理员。';
    } else if (error.response && error.response.status === 429) {
      errorMessage = '请求过于频繁，请稍后再试。';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};