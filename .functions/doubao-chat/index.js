const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const { message, history = [] } = event;
  
  try {
    // 豆包API配置 - 使用字节跳动的豆包大模型
    const DOUBAO_API_KEY = 'sk-your-doubao-api-key'; // 需要替换为实际的API Key
    const DOUBAO_API_URL = 'https://api.volcengineapi.com/v1/chat/completions';
    
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
    
    // 调用豆包API
    const response = await fetch(DOUBAO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DOUBAO_API_KEY}`
      },
      body: JSON.stringify({
        model: 'doubao-pro',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    });
    
    if (!response.ok) {
      throw new Error(`豆包API错误: ${response.status}`);
    }
    
    const data = await response.json();
    
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
    
    // 如果API调用失败，返回友好的错误信息
    return {
      success: false,
      message: '抱歉，我现在遇到了一些技术问题，无法为您提供智能回复。但我可以告诉您：敦煌是一个充满魅力的地方，有莫高窟的千年艺术、鸣沙山月牙泉的沙漠奇观、雅丹魔鬼城的地质奇观等。请您稍后再试，或者直接浏览我们的景点介绍页面获取信息。'
    };
  }
};