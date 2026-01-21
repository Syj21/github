exports.main = async (event, context) => {
  const { message, history = [] } = event;
  
  try {
    // 使用模拟响应，避免API调用超时
    const mockResponses = [
      "欢迎来到敦煌！我是您的AI旅游助手。敦煌莫高窟是世界文化遗产，拥有精美的壁画和雕塑，建议您提前预约参观。",
      "敦煌的最佳旅游时间是4-10月，气候适宜。莫高窟、鸣沙山月牙泉、阳关遗址都是必游景点。",
      "如果您对敦煌的历史文化感兴趣，我推荐您参观敦煌博物馆，那里有丰富的文物展览。",
      "敦煌的美食也很有特色，比如驴肉黄面、酿皮子、泡儿油糕等，值得一试！",
      "鸣沙山月牙泉是敦煌的标志性景点，您可以体验骑骆驼、滑沙等项目，记得带好防晒用品。"
    ];
    
    // 根据消息内容选择不同的模拟回复
    let response;
    if (message.includes('莫高窟') || message.includes('石窟')) {
      response = mockResponses[0];
    } else if (message.includes('时间') || message.includes('季节')) {
      response = mockResponses[1];
    } else if (message.includes('博物馆') || message.includes('历史')) {
      response = mockResponses[2];
    } else if (message.includes('美食') || message.includes('吃')) {
      response = mockResponses[3];
    } else if (message.includes('鸣沙山') || message.includes('月牙泉')) {
      response = mockResponses[4];
    } else {
      response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }
    
    return {
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('AI助手错误:', error);
    
    return {
      success: false,
      error: 'AI助手暂时无法回复，请稍后重试。'
    };
  }
};