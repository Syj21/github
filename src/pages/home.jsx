// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Camera, Star, MapPin, ArrowRight, Sparkles, Compass, Calendar, Users, Home as HomeIcon } from 'lucide-react';

import { AttractionCard } from '@/components/AttractionCard';
import { AttractionNav } from '@/components/AttractionNav';
import { AIAssistant } from '@/components/AIAssistant';
export default function Home(props) {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleBackToWelcome = () => {
    props.$w.utils.navigateTo({
      pageId: 'welcome',
      params: {}
    });
  };
  const attractions = [{
    id: 1,
    name: '莫高窟',
    images: ['https://img.meituan.net/leadinimg/ca07377679d77f6f670af04873c5a742265208.webp%40watermark%3D0', 'https://pica.zhimg.com/v2-8c9820438459ef3f82ffe9d2d054c21a_r.jpg?source=2c26e567', 'https://img2.baidu.com/it/u=2652790478,1447384087&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067', 'https://img0.baidu.com/it/u=1035637835,985422368&fm=253&app=138&f=JPEG?w=800&h=1010', 'https://copyright.bdstatic.com/vcg/creative/e62f2cd1e0c4a90241646c6e519e2ac2.jpg@wm_1,k_cGljX2JqaHdhdGVyLmpwZw=='],
    description: '莫高窟，俗称千佛洞，位于甘肃省敦煌市东南25公里的鸣沙山东麓断崖上。始建于十六国时期，历经十六国、北朝、隋、唐、五代、西夏、元等历代的兴建，形成巨大的规模，是世界上现存规模最大、内容最丰富的佛教艺术圣地。1987年被列为世界文化遗产。',
    rating: 4.9,
    location: '敦煌市东南25公里'
  }, {
    id: 2,
    name: '鸣沙山月牙泉',
    images: ['https://qcloud.dpfile.com/pc/gyPxC0D7CDsi4iY5EgRoO9yfNJqfhCIDv55YRb77yKoT_p_NlQV3-I3R8sFMnjwG.jpg', 'https://qcloud.dpfile.com/pc/rWvqK4k3tTle7QhKq2uj-6rCZv77hb0Gc-jU5q4OWFVPDfG_Dp9RFL4aQ-qWBys3.jpg', 'https://img2.baidu.com/it/u=2126923666,3717577205&fm=253&app=138&f=JPEG?w=1140&h=760', 'https://img0.baidu.com/it/u=891464414,1331646526&fm=253&fmt=auto&app=138&f=JPEG?w=615&h=937'],
    description: '鸣沙山月牙泉位于敦煌市城南5公里处，沙泉共处，妙造天成，古往今来以"沙漠奇观"著称于世。鸣沙山因沙动成响而得名，月牙泉处于鸣沙山环抱之中，其形酷似一弯新月，水质甘冽，澄清如镜，绵历古今，沙不填泉，泉不涸竭，成为一大奇观。',
    rating: 4.8,
    location: '敦煌市城南5公里'
  }, {
    id: 3,
    name: '玉门关',
    images: ['https://gips1.baidu.com/it/u=2661613446,359621065&fm=3074&app=3074&f=JPEG?w=1080&h=1361&type=normal&func=', 'https://gips1.baidu.com/it/u=1594394288,966664643&fm=3074&app=3074&f=JPEG?w=1080&h=1352&type=normal&func=', 'https://gips2.baidu.com/it/u=4074673277,987671392&fm=3074&app=3074&f=JPEG?w=1620&h=966&type=normal&func=C', 'https://pic.rmb.bdstatic.com/bjh/news/ec870a38192fa09957473147f1968a7c.png'],
    description: '玉门关，俗称小方盘城，位于敦煌市西北90公里处的戈壁滩上。始建于汉武帝时期，是古代丝绸之路通往西域北道的咽喉要隘。相传古代西域和田等地的美玉经此关口输入中原，故名玉门关。唐代诗人王之涣的"羌笛何须怨杨柳，春风不度玉门关"使其名扬天下。',
    rating: 4.7,
    location: '敦煌市西北90公里'
  }, {
    id: 4,
    name: '雅丹魔鬼城',
    images: ['https://img.meituan.net/leadinimg/fad4075e16be3a6849293a73479a3cb6102202.webp%40watermark%3D0', 'https://gips3.baidu.com/it/u=701536132,247695354&fm=3074&app=3074&f=JPEG', 'https://pic.rmb.bdstatic.com/bjh/3f152fb6eaa/250311/2bcc248536f34a8458d12a0b875d2c56.jpeg'],
    description: '雅丹魔鬼城，又称雅丹国家地质公园，位于敦煌市西北180公里的罗布泊边缘。这里分布着各种形状奇特的风蚀地貌，有的像古城堡，有的像舰队出海，有的像动物造型。每当大风刮过，发出各种怪异的声音，仿佛鬼哭狼嚎，因此被称为"魔鬼城"。这里是摄影爱好者和探险者的天堂。',
    rating: 4.6,
    location: '敦煌市西北180公里'
  }, {
    id: 'dunhuang_museum',
    name: '敦煌博物馆',
    images: ['https://q8.itc.cn/q_70/images01/20240529/27a29f5ad893415cb340e642bb3afefd.jpeg', 'https://sns-img-hw.xhscdn.com/1000g0082131d3defo02g5om6p5j0vp61i5jn0i0', 'https://sns-img-hw.xhscdn.com/1000g0082131d3defo0505om6p5j0vp6159qijs8', 'https://gips2.baidu.com/it/u=2963601786,75218548&fm=3074&app=3074&f=JPEG?w=1622&h=1050&type=normal&func='],
    description: '敦煌博物馆位于敦煌市中心，是一座展示敦煌历史文化和丝绸之路文明的重要博物馆。馆内收藏了大量珍贵文物，包括汉简、文书、壁画、雕塑等，全面展示了敦煌从古至今的历史变迁和文化发展。博物馆通过现代化的展示手段，让游客深入了解敦煌作为丝绸之路重镇的辉煌历史和多元文化交融的独特魅力。',
    rating: 4.8,
    location: '敦煌市中心阳关东路'
  }, {
    id: 'yangguan',
    name: '阳关遗址',
    images: ['https://qcloud.dpfile.com/pc/Xac4fVcmH1ZNXvvnPXBqCQ2HWO4coMpyD_ll9p_at5x4wQog05avdTDtdGI0o4RV.jpg', 'https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%27LV8xNzM2MTM4NDg0LjQzNzQ1NjZfMTczNjEzODQ4NS40ODQyNF8xNzM2MTM4NDg2Ljk1Mjc0NzZfMTczNjEzODQ4Ny45NTk4NDQ2XzE3MzYxMzg0ODguNzcxNDg5OQ%3D%3D%27/4.png', 'https://copyright.bdstatic.com/vcg/creative/17de18eff133e63ec445e3192d7a53bd.jpg'],
    description: '阳关，位于敦煌市西南70公里处的古董滩上，是中国古代陆路对外交通咽喉之地，是丝绸之路南路必经的关隘。始建于汉武帝时期，与玉门关同为汉代对西域和匈奴交通的门户。唐代诗人王维的"劝君更尽一杯酒，西出阳关无故人"使其名扬天下。如今阳关遗址虽已残破，但依然能感受到当年丝绸之路的繁华与沧桑。',
    rating: 4.7,
    location: '敦煌市西南70公里'
  }, {
    id: 'shazhou_market',
    name: '沙洲夜市',
    images: ['https://img1.baidu.com/it/u=3610041775,2644449195&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067', 'https://img2.baidu.com/it/u=1850712521,2967635057&fm=253&app=138&f=JPEG?w=1789&h=800', 'https://img1.baidu.com/it/u=3310043089,2552137631&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666'],
    description: '沙洲夜市位于敦煌市中心，是敦煌最热闹的夜市之一。这里汇集了各种特色小吃、手工艺品、纪念品等，是体验敦煌当地文化和美食的绝佳去处。夜市灯火通明，热闹非凡，游客可以品尝到驴肉黄面、烤羊肉串、杏皮水等敦煌特色美食，购买到精美的敦煌壁画复制品、丝织品等纪念品。夜市还经常有民俗表演，让游客感受到浓郁的西北风情。',
    rating: 4.6,
    location: '敦煌市中心'
  }, {
    id: 'silkroad_heritage',
    name: '丝路遗产城',
    images: ['https://gips1.baidu.com/it/u=250832677,2424844148&fm=3074&app=3074&f=JPEG', 'https://gips0.baidu.com/it/u=1834093081,4220045222&fm=3074&app=3074&f=JPEG', 'https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%275pWm54WM5Lid6Lev6YGX5Lqn5Z%2BO566A5LuLXzE3MzQ0NzIwMjYuODg5NDYwOF8xNzM0NDcyMDI3Ljk3NjY5MTdfMTczNDQ3MjAyOC45NjIyMzA0XzE3MzQ0NzIwMjkuODgwNzkwNQ%3D%3D%27/3.png'],
    description: '丝路遗产城位于敦煌市郊，是一座以丝绸之路文化为主题的大型文化旅游景区。景区内复原了古代丝绸之路上的重要城市和建筑，包括长安城、敦煌古城、波斯集市等，让游客仿佛穿越回千年前的丝绸之路。景区内还有丰富的文化表演和互动体验项目，如丝绸之路主题演出、传统手工艺制作、古代服饰体验等，是了解丝绸之路历史文化的绝佳场所。',
    rating: 4.5,
    location: '敦煌市郊'
  }, {
    id: 'leiyin_temple',
    name: '雷音寺',
    images: ['https://gips0.baidu.com/it/u=1295023552,2135150511&fm=3074&app=3074&f=JPEG', 'https://gips0.baidu.com/it/u=1286784409,4043446440&fm=3074&app=3074&f=JPEG', 'https://gips2.baidu.com/it/u=1340534165,3619809841&fm=3074&app=3074&f=JPEG', 'https://aigc-image.bj.bcebos.com/miaobi/5mao/b%275pWm54WM6Zu36Z%2Bz5a%2B6XzE3MjMxMTU1OTkuNzc5NTA2Mg%3D%3D%27/0.png'],
    description: '雷音寺位于敦煌市东南，是一座历史悠久的佛教寺院。寺院始建于唐代，历经多次修缮，现已成为敦煌重要的佛教文化场所。寺内建筑宏伟壮观，有大雄宝殿、观音殿、藏经楼等主要建筑，供奉着各种佛像。寺院环境清幽，古树参天，是参拜祈福、静心修行的理想之地。雷音寺还定期举办法会活动，吸引众多信众前来朝拜。',
    rating: 4.6,
    location: '敦煌市东南'
  }];
  const handleNavigate = attractionId => {
    const pageMap = {
      1: 'mogao',
      2: 'mingsha',
      3: 'yumen',
      4: 'yardang',
      'dunhuang_museum': 'dunhuang_museum',
      'yangguan': 'yangguan',
      'shazhou_market': 'shazhou_market',
      'silkroad_heritage': 'silkroad_heritage',
      'leiyin_temple': 'leiyin_temple'
    };
    const pageId = pageMap[attractionId];
    if (pageId) {
      props.$w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }
  };
  const stats = [{
    icon: MapPin,
    label: '9大景点',
    value: '9+'
  }, {
    icon: Calendar,
    label: '千年历史',
    value: '2000+'
  }, {
    icon: Users,
    label: '年度游客',
    value: '100万+'
  }, {
    icon: Star,
    label: '世界遗产',
    value: '1'
  }];
  return <>
      {/* AI助手 */}
      <AIAssistant />

      {/* 主内容区域 */}
      <div className="min-h-screen bg-[#FDF8F3] pt-20">
      {/* 返回首页按钮 */}
      <div className="fixed top-6 left-6 z-50">
        <button onClick={handleBackToWelcome} className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full font-medium hover:bg-white/30 transition-all duration-300 flex items-center gap-2 shadow-lg" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
          <HomeIcon className="w-4 h-4" />
          返回首页
        </button>
      </div>
      
      {/* Hero Section - 全屏英雄区域 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景图片层 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574] via-[#E8A849] to-[#C41E3A] opacity-90" />
        <div className="absolute inset-0 bg-[url('https://img.meituan.net/leadinimg/ca07377679d77f6f670af04873c5a742265208.webp%40watermark%3D0')] bg-cover bg-center opacity-30" />
        
        {/* 装饰性几何元素 */}
        <div className="absolute top-20 right-20 w-64 h-64 border-4 border-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 border-4 border-white/20 rounded-full" style={{
          animation: 'pulse 3s ease-in-out infinite'
        }} />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-white/10 rotate-45" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-white/10 rotate-12" />
        
        {/* 粒子效果 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => <div key={i} className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }} />)}
        </div>

        {/* 主内容 */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          {/* 装饰性图标 */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* 主标题 */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight" style={{
            fontFamily: 'Noto Serif SC, serif',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            敦煌探索
          </h1>
          
          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto" style={{
            fontFamily: 'Noto Sans SC, sans-serif',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            探索千年丝路文化，感受大漠风情
          </p>

          {/* 统计数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <stat.icon className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white" style={{
                fontFamily: 'Noto Serif SC, serif'
              }}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/80" style={{
                fontFamily: 'Noto Sans SC, sans-serif'
              }}>
                  {stat.label}
                </div>
              </div>)}
          </div>

          {/* CTA按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => window.scrollTo({
              top: 800,
              behavior: 'smooth'
            })} className="bg-white text-[#D4A574] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FDF8F3] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
              开始探索
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>
            <button onClick={() => window.scrollTo({
              top: 800,
              behavior: 'smooth'
            })} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
              了解更多
            </button>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Attraction Navigation */}
        <div className="mb-16">
          <AttractionNav attractions={attractions} onNavigate={handleNavigate} />
        </div>

        {/* Section Title with decorative elements */}
        <div className="mb-12 relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-[#D4A574] to-[#E8A849]" />
            <Compass className="w-8 h-8 text-[#D4A574]" />
            <div className="flex-1 h-1 bg-gradient-to-r from-[#E8A849] to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4" style={{
            fontFamily: 'Noto Serif SC, serif'
          }}>
            热门景点
          </h2>
          <p className="text-[#2C2C2C]/70 text-lg max-w-2xl" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
            探索敦煌的九大必游景点，每一处都承载着千年的历史与文化
          </p>
        </div>

        {/* Attractions Grid - 非对称布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => <div key={attraction.id} className={`transform transition-all duration-500 hover:scale-105 ${index % 3 === 0 ? 'md:translate-y-8' : index % 3 === 1 ? 'md:translate-y-0' : 'md:translate-y-4'}`}>
              <AttractionCard attraction={attraction} onClick={() => handleNavigate(attraction.id)} />
            </div>)}
        </div>

        {/* Info Section - 增强视觉冲击 */}
        <div className="mt-24 relative">
          {/* 装饰性背景 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574]/10 to-[#E8A849]/10 rounded-3xl transform rotate-1" />
          
          <div className="relative bg-white rounded-3xl p-10 shadow-2xl border-l-8 border-[#D4A574] overflow-hidden">
            {/* 装饰性元素 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4A574]/20 to-[#E8A849]/20 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#E8A849]/20 to-[#C41E3A]/20 rounded-tr-full" />
            
            <div className="relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-[#D4A574] to-[#E8A849] p-4 rounded-2xl shadow-lg">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[#2C2C2C] mb-4" style={{
                    fontFamily: 'Noto Serif SC, serif'
                  }}>
                    关于敦煌
                  </h3>
                  <p className="text-[#2C2C2C]/80 leading-relaxed text-lg" style={{
                    fontFamily: 'Noto Sans SC, sans-serif'
                  }}>
                    敦煌，位于甘肃省西北部，是古丝绸之路上的重镇，也是东西方文化交流的枢纽。
                    这里拥有莫高窟、鸣沙山月牙泉、玉门关、阳关等众多历史文化遗迹，是感受中华文明
                    和丝路文化的绝佳之地。每一粒沙都承载着历史的记忆，每一处景都诉说着千年的故事。
                  </p>
                  
                  {/* 特色标签 */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    {['世界文化遗产', '国家5A级景区', '丝绸之路起点', '佛教艺术圣地'].map((tag, index) => <span key={index} className="px-4 py-2 bg-gradient-to-r from-[#D4A574]/10 to-[#E8A849]/10 text-[#D4A574] rounded-full text-sm font-medium border border-[#D4A574]/20" style={{
                      fontFamily: 'Noto Sans SC, sans-serif'
                    }}>
                        {tag}
                      </span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - 增强视觉冲击 */}
      <footer className="relative bg-gradient-to-r from-[#8B5A2B] via-[#A0522D] to-[#8B5A2B] text-white py-16 px-6 mt-24 overflow-hidden">
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://img.meituan.net/leadinimg/ca07377679d77f6f670af04873c5a742265208.webp%40watermark%3D0')] bg-cover bg-center" />
        </div>
        <div className="absolute top-10 right-10 w-40 h-40 border-4 border-white/20 rounded-full" />
        <div className="absolute bottom-10 left-10 w-32 h-32 border-4 border-white/20 rounded-full" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{
            fontFamily: 'Noto Serif SC, serif'
          }}>
            敦煌之旅
          </h3>
          <p className="text-white/80 mb-6" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
            探索千年文化，感受丝路魅力
          </p>
          <div className="w-24 h-1 bg-white/30 mx-auto mb-6" />
          <p className="text-white/60 text-sm" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
            © 2026 敦煌之旅 - 探索千年文化
          </p>
        </div>
      </footer>
    </div>
    </>;
}