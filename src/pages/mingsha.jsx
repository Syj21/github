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
export default function Mingsha(props) {
  const attraction = {
    id: 2,
    name: '鸣沙山月牙泉',
    images: ['https://qcloud.dpfile.com/pc/gyPxC0D7CDsi4iY5EgRoO9yfNJqfhCIDv55YRb77yKoT_p_NlQV3-I3R8sFMnjwG.jpg', 'https://qcloud.dpfile.com/pc/rWvqK4k3tTle7QhKq2uj-6rCZv77hb0Gc-jU5q4OWFVPDfG_Dp9RFL4aQ-qWBys3.jpg', 'https://img2.baidu.com/it/u=2126923666,3717577205&fm=253&app=138&f=JPEG?w=1140&h=760', 'https://img0.baidu.com/it/u=891464414,1331646526&fm=253&fmt=auto&app=138&f=JPEG?w=615&h=937'],
    imageDescriptions: ['鸣沙山全景 - 金黄色的沙丘环抱碧绿的月牙泉，形成沙漠奇观', '黄昏夜景 - 晚霞映照下的月牙泉，灯光勾勒出梦幻的绿洲轮廓', '入口标志 - "鸣沙山"石刻与驼队，展现经典旅游元素', '月牙泉石刻 - 红色刻字与清澈泉水，彰显古韵之美'],
    description: '鸣沙山月牙泉位于敦煌市城南5公里处，沙泉共处，妙造天成，古往今来以"沙漠奇观"著称于世。鸣沙山因沙动成响而得名，月牙泉处于鸣沙山环抱之中，其形酷似一弯新月，水质甘冽，澄清如镜，绵历古今，沙不填泉，泉不涸竭，成为一大奇观。',
    rating: 4.8,
    location: '敦煌市城南5公里'
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
                建议在傍晚时分游览，可以欣赏到壮观的沙漠日落。骑骆驼是必体验项目，建议提前预约。
                注意防晒和补水，沙漠地区紫外线较强。晚上可以观赏星空，体验沙漠露营的乐趣。
              </p>
            </div>
          </div>
        </div>
      </main>
    </>;
}