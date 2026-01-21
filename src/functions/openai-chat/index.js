// 敦煌旅游知识库
const dunhuangKnowledge = {
  莫高窟: {
    keywords: ['莫高窟', '千佛洞', '石窟', '壁画', '佛像'],
    response: '莫高窟是世界文化遗产，被誉为"东方卢浮宫"。现存735个洞窟，45000平方米壁画，2400多尊彩塑。建议游览时间3-4小时，旺季需要提前预约门票。'
  },
  最佳时间: {
    keywords: ['最佳时间', '什么时候', '季节', '月份'],
    response: '敦煌最佳旅游时间是5-6月和9-10月，气候适宜，避开严寒和酷暑。7-8月较热但可欣赏沙漠日出日落，冬季人少景美但较寒冷。'
  },
  博物馆: {
    keywords: ['博物馆', '敦煌博物馆', '文物', '历史'],
    response: '敦煌博物馆收藏了大量珍贵文物，包括汉代简牍、丝绸织品、佛教文物等。免费开放，建议游览1-2小时，可深入了解敦煌历史文化。'
  },
  美食: {
    keywords: ['美食', '吃什么', '特色', '小吃', '推荐'],
    response: '敦煌特色美食有驴肉黄面、酿皮子、泡儿油糕、杏皮水等。推荐到沙洲夜市品尝当地小吃，体验丝路美食文化。'
  },
  鸣沙山: {
    keywords: ['鸣沙山', '月牙泉', '沙漠', '骆驼', '滑沙'],
    response: '鸣沙山月牙泉是敦煌标志性景点，可骑骆驼、滑沙、看日落。建议傍晚前往，避开正午高温。门票120元，可多次进出。'
  }
};

exports.main = async (event, context) => {
  const { message, history = [] } = event;
  
  try {
    // 智能匹配关键词
    const lowerMessage = message.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;
    
    for (const [topic, data] of Object.entries(dunhuangKnowledge)) {
      for (const keyword of data.keywords) {
        if (lowerMessage.includes(keyword)) {
          const score = keyword.length;
          if (score > maxScore) {
            maxScore = score;
            bestMatch = data.response;
          }
        }
      }
    }
    
    // 如果没有匹配到，提供通用回复
    const response = bestMatch || '您好！我是敦煌AI助手，可以为您提供关于莫高窟、鸣沙山、月牙泉、敦煌博物馆、美食推荐、最佳旅游时间等方面的专业建议。请问有什么可以帮助您的吗？';
    
    return {
      success: true,
      data: {
        response: response,
        timestamp: new Date().toISOString()
      }
    };
    
  } catch (error) {
    console.error('AI助手处理失败:', error);
    return {
      success: false,
      error: {
        message: 'AI助手暂时无法回复，请稍后重试',
        details: error.message
      }
    };
  }
};