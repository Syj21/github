exports.main = async (event, context) => {
  const { message, history = [] } = event;
  
  try {
    // 使用 fetch API 调用 OpenAI 接口
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY || 'sk-your-api-key-here'}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的敦煌旅游助手，请用中文回答用户关于敦煌旅游的问题，回答要简洁友好。'
          },
          ...history.slice(-10),
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }),
      timeout: 2500 // 2.5秒超时，避免触发云函数3秒限制
    });

    if (!response.ok) {
      throw new Error(`OpenAI API 错误: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return {
      success: true,
      reply: reply,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('OpenAI API 调用失败:', error);
    
    // 如果API调用失败，返回本地智能回复
    const localReply = getLocalReply(message);
    
    return {
      success: true,
      reply: localReply,
      timestamp: new Date().toISOString(),
      fallback: true
    };
  }
};

// 本地智能回复函数
function getLocalReply(message) {
  const keywords = {
    '莫高窟': '莫高窟是敦煌最著名的景点，建议提前网上预约门票，参观时间约2-3小时。洞窟内禁止拍照，请遵守规定。',
    '鸣沙山': '鸣沙山月牙泉是敦煌必游景点，最佳游览时间是傍晚，可以骑骆驼、滑沙，欣赏沙漠日落美景。',
    '月牙泉': '月牙泉位于鸣沙山环抱之中，泉水清澈千年不涸，与鸣沙山形成沙不填泉的奇观。',
    '最佳时间': '敦煌最佳旅游时间是5-10月，气候适宜。避开7-8月高温季节，春秋两季最为舒适。',
    '博物馆': '敦煌博物馆免费开放，展示了丰富的敦煌历史文物，建议安排1-2小时参观。',
    '美食': '敦煌特色美食有驴肉黄面、杏皮水、酿皮子、泡儿油糕等，推荐到沙州夜市品尝。',
    '住宿': '敦煌市区住宿选择丰富，从经济型酒店到高端民宿都有，建议提前预订。',
    '交通': '敦煌有机场和火车站，市内可打车或乘坐公交，主要景点都有旅游专线。'
  };

  // 关键词匹配
  for (const [key, reply] of Object.entries(keywords)) {
    if (message.includes(key)) {
      return reply;
    }
  }

  // 默认回复
  return '您好！我是敦煌旅游智能助手，可以为您解答关于莫高窟、鸣沙山、月牙泉等景点的问题，也可以提供美食、住宿、交通等旅游建议。请问有什么可以帮助您的吗？';
}