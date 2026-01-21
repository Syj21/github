// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, Camera } from 'lucide-react';

import { AttractionCard } from '@/components/AttractionCard';
import { QuizGame } from '@/components/QuizGame';
import { PhotoShare } from '@/components/PhotoShare';
import { RouteGuide } from '@/components/RouteGuide';
import { CommentSection } from '@/components/CommentSection';
import { ImageViewer } from '@/components/ImageViewer';
import { AIAssistant } from '@/components/AIAssistant';
export default function Yardang(props) {
  const attraction = {
    id: 4,
    name: '雅丹魔鬼城',
    images: ['https://img.meituan.net/leadinimg/fad4075e16be3a6849293a73479a3cb6102202.webp%40watermark%3D0', 'https://gips3.baidu.com/it/u=701536132,247695354&fm=3074&app=3074&f=JPEG', 'https://pic.rmb.bdstatic.com/bjh/3f152fb6eaa/250311/2bcc248536f34a8458d12a0b875d2c56.jpeg'],
    imageDescriptions: ['雅丹地貌全景 - 奇特的风蚀地貌在戈壁中形成壮观的景观', '雅丹魔鬼城日落 - 夕阳下的雅丹地貌呈现出金红色的壮美景色', '雅丹地貌特写 - 风蚀形成的奇特岩石造型，宛如天然雕塑'],
    description: '雅丹魔鬼城，又称雅丹国家地质公园，位于敦煌市西北180公里的罗布泊边缘。这里分布着各种形状奇特的风蚀地貌，有的像古城堡，有的像舰队出海，有的像动物造型。每当大风刮过，发出各种怪异的声音，仿佛鬼哭狼嚎，因此被称为"魔鬼城"。这里是摄影爱好者和探险者的天堂。',
    rating: 4.6,
    location: '敦煌市西北180公里'
  };
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleBack = () => {
    props.$w.utils.navigateTo({
      pageId: 'home',
      params: {}
    });
  };
  const handleImageClick = index => {
    setCurrentImageIndex(index);
    setShowImageViewer(true);
  };
  return <>
      {/* AI助手 */}
      <AIAssistant />

      {/* Header */}
      <header className="bg-gradient-to-r from-[#D4A574] to-[#E8A849] py-6 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <button onClick={handleBack} className="flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>返回首页</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            {attraction.name}
          </h1>
          <p className="text-white/90 text-lg" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            {attraction.location}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Attraction Card */}
        <AttractionCard attraction={attraction} />

        {/* 功能模块 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="space-y-6">
            <RouteGuide attraction={attraction} />
            {/* 门票预订功能已删除 */}
          </div>
          <div className="space-y-6">
            <QuizGame attraction={attraction} />
          </div>
          <div className="space-y-6">
            <PhotoShare attraction={attraction} $w={props.$w} />
          </div>
        </div>

        {/* 评论区域 */}
        <CommentSection attractionId={attraction.id} $w={props.$w} />

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#D4A574]">
          <div className="flex items-start gap-4">
            <div className="bg-[#D4A574]/10 p-3 rounded-full">
              <Camera className="w-6 h-6 text-[#D4A574]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-2" style={{
              fontFamily: 'Noto Serif SC, serif'
            }}>
                游览提示
              </h3>
              <p className="text-[#2C2C2C]/80 leading-relaxed" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                雅丹魔鬼城位于荒凉的戈壁深处，建议下午前往，可以欣赏到壮观的日落和奇特的岩石光影。
                这里风沙较大，务必携带充足的饮用水和防晒用品。建议参加团队游览，安全更有保障。
              </p>
            </div>
          </div>
        </div>
      </main>
    </>;
}