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
export default function Yangguan(props) {
  const attraction = {
    id: 'yangguan',
    name: '阳关遗址',
    images: ['https://gips3.baidu.com/it/u=4194214930,3241200780&fm=3074&app=3074&f=JPEG', 'https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%27LV8xNzM2MTM4NDg0LjQzNzQ1NjZfMTczNjEzODQ4NS40ODQyNF8xNzM2MTM4NDg2Ljk1Mjc0NzZfMTczNjEzODQ4Ny45NTk4NDQ2XzE3MzYxMzg0ODguNzcxNDg5OQ%3D%3D%27/4.png', 'https://copyright.bdstatic.com/vcg/creative/17de18eff133e63ec445e3192d7a53bd.jpg'],
    description: '阳关, 位于敦煌市西南70公里处的古董滩上, 是中国古代陆路对外交通咽喉之地, 是丝绸之路南路必经的关隘。始建于汉武帝时期, 与玉门关同为汉代对西域和匈奴交通的门户。唐代诗人王维的"劝君更尽一杯酒, 西出阳关无故人"使其名扬天下。如今阳关遗址虽已残破, 但依然能感受到当年丝绸之路的繁华与沧桑。',
    rating: 4.7,
    location: '敦煌市西南70公里'
  };
  const handleBack = () => {
    props.$w.utils.navigateTo({
      pageId: 'home',
      params: {}
    });
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
                阳关遗址位于戈壁滩上, 风沙较大, 建议带好防风防沙装备。最佳游览时间是傍晚, 可以欣赏壮观的沙漠日落。
                建议穿着舒适的鞋子, 因为需要步行较长时间。请尊重历史遗迹, 不要攀爬或破坏遗址。
              </p>
            </div>
          </div>
        </div>
      </main>
    </>;
}