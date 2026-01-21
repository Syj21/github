// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ArrowRight, Sparkles, MapPin, Calendar, Users, Star } from 'lucide-react';

import { AIAssistant } from '@/components/AIAssistant';
export default function Landing(props) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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
  const handleExplore = () => {
    props.$w.utils.navigateTo({
      pageId: 'home',
      params: {}
    });
  };
  return <>
      {/* AI助手 */}
      <AIAssistant />

      {/* 全屏英雄区域 */}
      <div className="min-h-screen relative overflow-hidden">
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
        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto min-h-screen flex flex-col justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* 装饰性图标 */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full animate-bounce">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* 主标题 */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight" style={{
          fontFamily: 'Noto Serif SC, serif',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
            敦煌之旅
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
            {stats.map((stat, index) => <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
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
            <button onClick={handleExplore} className="bg-white text-[#D4A574] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FDF8F3] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
              开始探索
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>
          </div>

          {/* 滚动提示 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </>;
}