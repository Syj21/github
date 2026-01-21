const cloud = require('@cloudbase/node-sdk');
const OpenAI = require('openai');

exports.main = async (event, context) => {
  const { message, history = [] } = event;
  
  try {
    // 初始化云开发环境
    const app = cloud.init({
      env: cloud.SYMBOL_CURRENT_ENV,
      timeout: 25000 // 25秒超时
    });
    
    // 获取环境变量中的OpenAI配置
    const env = app.env;
    const openaiApiKey = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      throw new Error('OpenAI API密钥未配置，请在云开发环境变量中设置 OPENAI_API_KEY');
    }
    
    // 初始化OpenAI客户端
    const openai = new OpenAI({
      apiKey: openaiApiKey,
      timeout: 20000, // 20秒超时
      maxRetries: 2
    });
    
    // 构建消息历史
    const messages = [
      {
        role: 'system',
        content: '你是敦煌旅游的AI助手，专门帮助游客了解敦煌的历史文化、景点信息、旅游建议等。请用中文回复，回答要简洁友好。'
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
    
    // 调用OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false
    });
    
    const reply = completion.choices[0]?.message?.content || '抱歉，我没有理解您的问题。';
    
    return {
      success: true,
      reply: reply,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('OpenAI API错误:', error);
    
    // 处理不同类型的错误
    let errorMessage = 'AI助手暂时无法回复，请稍后重试。';
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorMessage = '网络连接失败，请检查网络后重试。';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = '请求超时，请稍后重试。';
    } else if (error.status === 401) {
      errorMessage = 'API认证失败，请联系管理员。';
    } else if (error.status === 429) {
      errorMessage = '请求过于频繁，请稍后再试。';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};