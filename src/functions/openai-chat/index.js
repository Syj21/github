const cloud = require('@cloudbase/node-sdk');
const OpenAI = require('openai');

// 初始化云开发环境
const app = cloud.init({
  env: cloud.SYMBOL_CURRENT_ENV
});

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  timeout: 25000, // 25秒超时
  maxRetries: 2
});

exports.main = async (event, context) => {
  const { message, history = [] } = event;
  
  // 参数验证
  if (!message || typeof message !== 'string') {
    return {
      success: false,
      error: '消息内容不能为空'
    };
  }
  
  // 限制消息长度
  if (message.length > 2000) {
    return {
      success: false,
      error: '消息内容过长，请控制在2000字符以内'
    };
  }
  
  try {
    // 构建对话历史
    const messages = [
      {
        role: 'system',
        content: '你是敦煌旅游AI助手，专门帮助游客了解敦煌的历史文化、景点信息、美食推荐等。请用中文回复，回答要准确、友好、简洁。'
      },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];
    
    // 调用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });
    
    const reply = completion.choices[0]?.message?.content || '抱歉，我没有理解您的问题';
    
    return {
      success: true,
      reply: reply.trim(),
      usage: completion.usage
    };
    
  } catch (error) {
    console.error('OpenAI API 调用失败:', error);
    
    // 详细的错误处理
    let errorMsg = 'AI助手暂时无法回复，请稍后重试';
    
    if (error.code === 'ENOTFOUND') {
      errorMsg = '网络连接失败，请检查网络设置';
    } else if (error.code === 'ETIMEDOUT') {
      errorMsg = '请求超时，请稍后重试';
    } else if (error.status === 401) {
      errorMsg = 'API密钥配置错误';
    } else if (error.status === 429) {
      errorMsg = '请求过于频繁，请稍后再试';
    } else if (error.status === 500) {
      errorMsg = 'AI服务暂时不可用，请稍后重试';
    } else if (error.message) {
      errorMsg = error.message;
    }
    
    return {
      success: false,
      error: errorMsg
    };
  }
};