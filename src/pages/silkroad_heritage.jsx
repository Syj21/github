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
export default function SilkroadHeritage(props) {
  const attraction = {
    id: 'silkroad_heritage',
    name: '丝路遗产城',
    images: ['https://gips1.baidu.com/it/u=250832677,2424844148&fm=3074&app=3074&f=JPEG', 'https://gips0.baidu.com/it/u=1834093081,4220045222&fm=3074&app=3074&f=JPEG', 'https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%275pWm54WM5Lid6Lev6YGX5Lqn5Z%2BO566A5LuLXzE3MzQ0NzIwMjYuODg5NDYwOF8xNzM0NDcyMDI3Ljk3NjY5MTdfMTczNDQ3MjAyOC45NjIyMzA0XzE3MzQ0NzIwMjkuODgwNzkwNQ%3D%3D%27/3.png'],
    description: '丝路遗产城位于敦煌市郊, 是一座以丝绸之路文化为主题的大型文化旅游景区。景区内复原了古代丝绸之路上的重要城市和建筑, 包括长安城、敦煌古城、波斯集市等, 让游客仿佛穿越回千年前的丝绸之路。景区内还有丰富的文化表演和互动体验项目, 如丝绸之路主题演出、传统手工艺制作、古代服饰体验等, 是了解丝绸之路历史文化的绝佳场所。',
    rating: 4.5,
    location: '敦煌市郊'
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
                游览提示
              </h3>
              <p className="text-[#2C2C2C]/80 leading-relaxed" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                丝路遗产城景区较大, 建议预留半天时间游览。景区内有演出时间表, 建议提前规划好观看时间。
                可以体验古代服饰拍照, 建议穿舒适的鞋子, 因为需要步行较长时间。景区内有餐饮区, 价格合理。
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* AI助手 */}
      <AIAssistant />
    </>;
}