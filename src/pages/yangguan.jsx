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

        {/* 文化瑰宝区域 */}
        <CulturalHeritageSection content={{
        title: '阳关三叠 · 离别情深',
        paragraphs: ['「阳」字，从阜，昜声。阜者，土山也；昜者，日出也。阳关，因位于玉门关之南，故名「阳关」。这里曾是丝绸之路南路必经的关隘，见证了无数商旅的往来和离别的场景。', '阳关始建于汉武帝时期，与玉门关同为汉代对西域和匈奴交通的门户。唐代诗人王维的「劝君更尽一杯酒，西出阳关无故人」使阳关名扬天下。这首诗不仅表达了诗人对友人的深情厚谊，更成为了中华文化中离别情怀的经典表达。', '如今阳关遗址虽已残破，但依然能感受到当年丝绸之路的繁华与沧桑。站在阳关遗址上，仿佛能看到千年前的商队缓缓西行，听到驼铃声声在戈壁中回荡。这里不仅有历史的厚重，更承载着中华民族开拓进取、不畏艰险的精神品格。'],
        poetry: '「劝君更尽一杯酒，西出阳关无故人。」—— 王维《送元二使安西》',
        poetryAuthor: '唐代诗人'
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
                阳关遗址位于戈壁滩上, 风沙较大, 建议带好防风防沙装备。最佳游览时间是傍晚, 可以欣赏壮观的沙漠日落。
                建议穿着舒适的鞋子, 因为需要步行较长时间。请尊重历史遗迹, 不要攀爬或破坏遗址。
              </p>
            </div>
          </div>
        </div>
      </main>
    </>;
}