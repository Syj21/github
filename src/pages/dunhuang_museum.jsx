// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, Camera } from 'lucide-react';

import { AttractionCard } from '@/components/AttractionCard';
import { QuizGame } from '@/components/QuizGame';
import { PhotoShare } from '@/components/PhotoShare';
import { RouteGuide } from '@/components/RouteGuide';
import { CommentSection } from '@/components/CommentSection';
import { AIAssistant } from '@/components/AIAssistant';
export default function DunhuangMuseum(props) {
  const attraction = {
    id: 'dunhuang_museum',
    name: '敦煌博物馆',
    images: ['https://q8.itc.cn/q_70/images01/20240529/27a29f5ad893415cb340e642bb3afefd.jpeg', 'https://sns-img-hw.xhscdn.com/1000g0082131d3defo02g5om6p5j0vp61i5jn0i0', 'https://sns-img-hw.xhscdn.com/1000g0082131d3defo0505om6p5j0vp6159qijs8', 'https://gips2.baidu.com/it/u=2963601786,75218548&fm=3074&app=3074&f=JPEG?w=1622&h=1050&type=normal&func='],
    description: '敦煌博物馆位于敦煌市中心，是一座展示敦煌历史文化和丝绸之路文明的重要博物馆。馆内收藏了大量珍贵文物，包括汉简、文书、壁画、雕塑等，全面展示了敦煌从古至今的历史变迁和文化发展。博物馆通过现代化的展示手段，让游客深入了解敦煌作为丝绸之路重镇的辉煌历史和多元文化交融的独特魅力。',
    rating: 4.8,
    location: '敦煌市中心阳关东路'
  };
  const handleBack = () => {
    props.$w.utils.navigateTo({
      pageId: 'home',
      params: {}
    });
  };
  return <>
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
                参观提示
              </h3>
              <p className="text-[#2C2C2C]/80 leading-relaxed" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                敦煌博物馆免费开放，建议提前在官网预约参观时间。馆内禁止使用闪光灯拍照，部分珍贵展品禁止拍照。
                建议预留2-3小时参观时间，可以租借语音导览设备，更好地了解展品背后的历史故事。
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* AI助手 */}
      <AIAssistant />
    </>;
}