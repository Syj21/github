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
import { CulturalHeritageSection } from '@/components/CulturalHeritageSection';
export default function LeiyinTemple(props) {
  const attraction = {
    id: 'leiyin_temple',
    name: '雷音寺',
    images: ['https://gips0.baidu.com/it/u=1295023552,2135150511&fm=3074&app=3074&f=JPEG', 'https://gips0.baidu.com/it/u=1286784409,4043446440&fm=3074&app=3074&f=JPEG', 'https://gips2.baidu.com/it/u=1340534165,3619809841&fm=3074&app=3074&f=JPEG', 'https://aigc-image.bj.bcebos.com/miaobi/5mao/b%275pWm54WM6Zu36Z%2Bz5a%2B6XzE3MjMxMTU1OTkuNzc5NTA2Mg%3D%3D%27/0.png'],
    description: '雷音寺位于敦煌市东南, 是一座历史悠久的佛教寺院。寺院始建于唐代, 历经多次修缮, 现已成为敦煌重要的佛教文化场所。寺内建筑宏伟壮观, 有大雄宝殿、观音殿、藏经楼等主要建筑, 供奉着各种佛像。寺院环境清幽, 古树参天, 是参拜祈福、静心修行的理想之地。雷音寺还定期举办法会活动, 吸引众多信众前来朝拜。',
    rating: 4.6,
    location: '敦煌市东南'
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

        {/* 文化瑰宝区域 */}
        <CulturalHeritageSection content={{
        title: '雷音梵韵 · 佛光普照',
        paragraphs: ['「雷」字，从雨，畾声。雨者，水也；畾者，田也。雷音，佛之音声也，如雷震耳，警醒众生。雷音寺，因佛音如雷而得名，是敦煌重要的佛教文化场所。', '雷音寺始建于唐代，历经多次修缮，现已成为敦煌重要的佛教文化场所。寺内建筑宏伟壮观，有大雄宝殿、观音殿、藏经楼等主要建筑，供奉着各种佛像。寺院环境清幽，古树参天，是参拜祈福、静心修行的理想之地。', '佛教文化是中华文明的重要组成部分，雷音寺作为佛教文化的载体，不仅承载着宗教信仰，更承载着中华文化的精神内核。在这里，我们可以感受到佛教的慈悲与智慧，体验到内心的宁静与平和。雷音寺还定期举办法会活动，吸引众多信众前来朝拜，传承着千年的佛教文化。'],
        poetry: '「菩提本无树，明镜亦非台。」—— 惠能《菩提偈》',
        poetryAuthor: '唐代高僧'
      }} />

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
                雷音寺是宗教场所, 请保持安静, 尊重佛教文化。进入寺院时请着装得体, 不要穿过于暴露的服装。
                参拜时请遵守寺院规定, 不要随意触摸佛像和法器。寺院内禁止吸烟, 请爱护环境, 不要乱扔垃圾。
              </p>
            </div>
          </div>
        </div>
      </main>
    </>;
}