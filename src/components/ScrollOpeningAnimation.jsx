// @ts-ignore;
import React, { useEffect, useState } from 'react';

export function ScrollOpeningAnimation({
  onComplete
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  useEffect(() => {
    // 卷轴展开动画
    const duration = 6000; // 6秒
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setProgress(currentStep / steps * 100);
      if (currentStep >= steps) {
        clearInterval(timer);
        // 开始淡出动画
        setIsFadingOut(true);
        // 立即通知父组件显示主内容，消除空白间隙
        if (onComplete) {
          onComplete();
        }
        // 淡出完成后隐藏组件
        setTimeout(() => {
          setIsVisible(false);
        }, 1500);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onComplete]);
  if (!isVisible) return null;
  return <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#5D4037] via-[#8B5A2B] to-[#6B4423] transition-all duration-800 ${isFadingOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
      {/* 背景装饰图案 - 敦煌壁画风格 */}
      <div className="absolute inset-0 opacity-15">
        {/* 黄河波浪元素 - 与背景融为一体 */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="yellowRiverGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4A574" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#E8A849" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C9956C" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="yellowRiverGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9956C" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#D4A574" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#B8860B" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="yellowRiverGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8A849" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D4A574" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* 第一层波浪 - 底部 */}
          <path d="M 0 85 Q 25 80 50 85 T 100 85 L 100 100 L 0 100 Z" fill="url(#yellowRiverGradient1)" className="animate-pulse" style={{
          animationDuration: '4s'
        }} />
          
          {/* 第二层波浪 - 中部 */}
          <path d="M 0 75 Q 25 70 50 75 T 100 75 L 100 90 L 0 90 Z" fill="url(#yellowRiverGradient2)" className="animate-pulse" style={{
          animationDuration: '5s',
          animationDelay: '1s'
        }} />
          
          {/* 第三层波浪 - 上部 */}
          <path d="M 0 65 Q 25 60 50 65 T 100 65 L 100 80 L 0 80 Z" fill="url(#yellowRiverGradient3)" className="animate-pulse" style={{
          animationDuration: '6s',
          animationDelay: '2s'
        }} />
          
          {/* 流动线条 - 增强流动感 */}
          <path d="M 0 70 Q 25 65 50 70 T 100 70" stroke="#D4A574" strokeWidth="0.3" fill="none" opacity="0.4" className="animate-pulse" style={{
          animationDuration: '3s'
        }} />
          <path d="M 0 80 Q 25 75 50 80 T 100 80" stroke="#E8A849" strokeWidth="0.2" fill="none" opacity="0.3" className="animate-pulse" style={{
          animationDuration: '4s',
          animationDelay: '0.5s'
        }} />
        </svg>
        
        {/* 祥云纹样 */}
        <div className="absolute top-8 left-8 w-40 h-40 border-8 border-[#D4A574] rounded-full" />
        <div className="absolute top-16 right-16 w-32 h-32 border-6 border-[#E8A849] rounded-full" />
        <div className="absolute bottom-16 left-16 w-28 h-28 border-6 border-[#C9956C] rounded-full" />
        <div className="absolute bottom-8 right-8 w-36 h-36 border-8 border-[#D4A574] rounded-full" />
        {/* 回纹装饰 */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 border-4 border-[#8B5A2B]" style={{
        transform: 'rotate(45deg)'
      }} />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border-4 border-[#A0522D]" style={{
        transform: 'rotate(45deg)'
      }} />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-4 border-[#8B5A2B]" style={{
        transform: 'rotate(45deg)'
      }} />
        {/* 莲花装饰 */}
        <div className="absolute top-1/2 left-10 w-16 h-16 border-4 border-[#E8A849] rounded-full" />
        <div className="absolute top-1/2 right-10 w-16 h-16 border-4 border-[#E8A849] rounded-full" />
      </div>

      {/* 卷轴容器 - 增大尺寸 */}
      <div className="relative w-full max-w-6xl px-12">
        {/* 左侧卷轴轴杆 - 增加宽度和质感 */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#3E2723] via-[#5D4037] to-[#6B4423] rounded-l-2xl shadow-2xl flex items-center justify-center" style={{
        transform: `translateX(${100 - progress}%)`,
        transition: 'transform 0.1s ease-out'
      }}>
          {/* 轴杆装饰线 */}
          <div className="w-3 h-full bg-gradient-to-b from-[#D4A574] via-[#E8A849] to-[#D4A574] rounded-full" />
          <div className="absolute left-2 w-1 h-full bg-gradient-to-b from-[#8B5A2B] via-[#A0522D] to-[#8B5A2B] rounded-full" />
          <div className="absolute right-2 w-1 h-full bg-gradient-to-b from-[#8B5A2B] via-[#A0522D] to-[#8B5A2B] rounded-full" />
        </div>

        {/* 右侧卷轴轴杆 - 增加宽度和质感 */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#3E2723] via-[#5D4037] to-[#6B4423] rounded-r-2xl shadow-2xl flex items-center justify-center" style={{
        transform: `translateX(${-(100 - progress)}%)`,
        transition: 'transform 0.1s ease-out'
      }}>
          {/* 轴杆装饰线 */}
          <div className="w-3 h-full bg-gradient-to-b from-[#D4A574] via-[#E8A849] to-[#D4A574] rounded-full" />
          <div className="absolute left-2 w-1 h-full bg-gradient-to-b from-[#8B5A2B] via-[#A0522D] to-[#8B5A2B] rounded-full" />
          <div className="absolute right-2 w-1 h-full bg-gradient-to-b from-[#8B5A2B] via-[#A0522D] to-[#8B5A2B] rounded-full" />
        </div>

        {/* 卷轴内容区域 - 增大尺寸和质感 */}
        <div className="relative bg-gradient-to-b from-[#F5E6D3] via-[#FFF8F0] to-[#F5E6D3] rounded-2xl shadow-2xl p-16 min-h-[600px] flex flex-col items-center justify-center" style={{
        opacity: progress / 100,
        transform: `scale(${0.85 + progress / 100 * 0.15})`,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 90, 43, 0.03) 2px, rgba(139, 90, 43, 0.03) 4px)'
      }}>
          {/* 卷轴顶部装饰 - 增加层次 */}
          <div className="w-full h-3 bg-gradient-to-r from-[#8B5A2B] via-[#D4A574] to-[#8B5A2B] rounded-t-2xl mb-10" />
          <div className="w-full h-1 bg-gradient-to-r from-[#E8A849] via-[#FFD700] to-[#E8A849] mb-12" />

          {/* 敦煌标题 - 增大字体 */}
          <div className="text-center mb-10">
            <h1 className="text-7xl md:text-9xl font-bold text-[#5D4037] mb-6" style={{
            fontFamily: 'Noto Serif SC, serif',
            textShadow: '2px 2px 4px rgba(139, 90, 43, 0.3)'
          }}>
              敦煌
            </h1>
            <div className="w-48 h-2 bg-gradient-to-r from-transparent via-[#8B5A2B] to-transparent mx-auto" />
          </div>

          {/* 副标题 - 增大字体 */}
          <p className="text-2xl md:text-3xl text-[#6B4423] text-center mb-10" style={{
          fontFamily: 'Noto Sans SC, sans-serif',
          letterSpacing: '0.2em'
        }}>
            千年丝路 · 梦回敦煌
          </p>

          {/* 飞天元素 - 敦煌壁画风格 */}
          <div className="relative w-full max-w-4xl mx-auto mb-10">
            {/* 左侧飞天 */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <svg width="120" height="160" viewBox="0 0 120 160" className="opacity-80">
                {/* 飞天身体 */}
                <ellipse cx="60" cy="80" rx="25" ry="35" fill="url(#feitianGradient1)" />
                {/* 飞天头部 */}
                <circle cx="60" cy="35" r="18" fill="url(#feitianGradient2)" />
                {/* 飘带 */}
                <path d="M 30 60 Q 10 50 5 70 Q 0 90 20 100" stroke="url(#ribbonGradient1)" strokeWidth="4" fill="none" className="animate-pulse" />
                <path d="M 90 60 Q 110 50 115 70 Q 120 90 100 100" stroke="url(#ribbonGradient2)" strokeWidth="4" fill="none" className="animate-pulse" />
                <path d="M 40 110 Q 20 130 30 150" stroke="url(#ribbonGradient3)" strokeWidth="3" fill="none" className="animate-pulse" />
                <path d="M 80 110 Q 100 130 90 150" stroke="url(#ribbonGradient4)" strokeWidth="3" fill="none" className="animate-pulse" />
                {/* 装饰花朵 */}
                <circle cx="20" cy="70" r="6" fill="#E8A849" opacity="0.8" />
                <circle cx="100" cy="70" r="6" fill="#E8A849" opacity="0.8" />
                <circle cx="60" cy="140" r="8" fill="#FFD700" opacity="0.8" />
                {/* 渐变定义 */}
                <defs>
                  <linearGradient id="feitianGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E8A849" />
                    <stop offset="100%" stopColor="#D4A574" />
                  </linearGradient>
                  <linearGradient id="feitianGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5E6D3" />
                    <stop offset="100%" stopColor="#E8D5C4" />
                  </linearGradient>
                  <linearGradient id="ribbonGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4A574" />
                    <stop offset="100%" stopColor="#E8A849" />
                  </linearGradient>
                  <linearGradient id="ribbonGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4A574" />
                    <stop offset="100%" stopColor="#E8A849" />
                  </linearGradient>
                  <linearGradient id="ribbonGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9956C" />
                    <stop offset="100%" stopColor="#D4A574" />
                  </linearGradient>
                  <linearGradient id="ribbonGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9956C" />
                    <stop offset="100%" stopColor="#D4A574" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* 中央装饰 - 莲花 */}
            <div className="flex items-center justify-center">
              <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-90">
                {/* 莲花瓣 */}
                <ellipse cx="50" cy="50" rx="15" ry="35" fill="#D4A574" transform="rotate(0 50 50)" />
                <ellipse cx="50" cy="50" rx="15" ry="35" fill="#E8A849" transform="rotate(45 50 50)" />
                <ellipse cx="50" cy="50" rx="15" ry="35" fill="#D4A574" transform="rotate(90 50 50)" />
                <ellipse cx="50" cy="50" rx="15" ry="35" fill="#E8A849" transform="rotate(135 50 50)" />
                <ellipse cx="50" cy="50" rx="15" ry="35" fill="#D4A574" transform="rotate(180 50 50)" />
                <ellipse cx="50" cy="50" rx="15" ry="35" fill="#E8A849" transform="rotate(225 50 50)" />
                <ellipse cx="50" cy="50" rx="15" ry="35" fill="#D4A574" transform="rotate(270 50 50)" />
                <ellipse cx="50" cy="50" rx="15" ry="35" fill="#E8A849" transform="rotate(315 50 50)" />
                {/* 莲花芯 */}
                <circle cx="50" cy="50" r="12" fill="#FFD700" />
                <circle cx="50" cy="50" r="6" fill="#FFA500" />
              </svg>
            </div>

            {/* 右侧飞天 */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <svg width="120" height="160" viewBox="0 0 120 160" className="opacity-80" style={{
              transform: 'scaleX(-1)'
            }}>
                {/* 飞天身体 */}
                <ellipse cx="60" cy="80" rx="25" ry="35" fill="url(#feitianGradient1)" />
                {/* 飞天头部 */}
                <circle cx="60" cy="35" r="18" fill="url(#feitianGradient2)" />
                {/* 飘带 */}
                <path d="M 30 60 Q 10 50 5 70 Q 0 90 20 100" stroke="url(#ribbonGradient1)" strokeWidth="4" fill="none" className="animate-pulse" />
                <path d="M 90 60 Q 110 50 115 70 Q 120 90 100 100" stroke="url(#ribbonGradient2)" strokeWidth="4" fill="none" className="animate-pulse" />
                <path d="M 40 110 Q 20 130 30 150" stroke="url(#ribbonGradient3)" strokeWidth="3" fill="none" className="animate-pulse" />
                <path d="M 80 110 Q 100 130 90 150" stroke="url(#ribbonGradient4)" strokeWidth="3" fill="none" className="animate-pulse" />
                {/* 装饰花朵 */}
                <circle cx="20" cy="70" r="6" fill="#E8A849" opacity="0.8" />
                <circle cx="100" cy="70" r="6" fill="#E8A849" opacity="0.8" />
                <circle cx="60" cy="140" r="8" fill="#FFD700" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* 加载进度条 - 增大尺寸 */}
          <div className="w-full max-w-lg">
            <div className="h-3 bg-[#E8D5C4] rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-[#8B5A2B] via-[#D4A574] to-[#E8A849] rounded-full transition-all duration-100" style={{
              width: `${progress}%`
            }} />
            </div>
            <p className="text-center text-[#6B4423] mt-4 text-base font-medium">
              正在展开历史卷轴... {Math.round(progress)}%
            </p>
          </div>

          {/* 卷轴底部装饰 - 增加层次 */}
          <div className="w-full h-1 bg-gradient-to-r from-[#E8A849] via-[#FFD700] to-[#E8A849] mt-12" />
          <div className="w-full h-3 bg-gradient-to-r from-[#8B5A2B] via-[#D4A574] to-[#8B5A2B] rounded-b-2xl mt-10" />
        </div>

        {/* 卷轴阴影效果 - 增强深度 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 rounded-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 rounded-2xl pointer-events-none" />
      </div>

      {/* 粒子效果 - 多彩敦煌色彩 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => {
        const colors = ['#FFD700', '#E8A849', '#D4A574', '#C9956C', '#B8860B', '#FFA500'];
        const color = colors[i % colors.length];
        return <div key={i} className={`absolute w-3 h-3 rounded-full opacity-70`} style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          backgroundColor: color,
          animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
          boxShadow: `0 0 6px ${color}80`
        }} />;
      })}
      </div>
    </div>;
}