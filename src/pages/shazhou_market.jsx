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
export default function ShazhouMarket(props) {
  const attraction = {
    id: 'shazhou_market',
    name: '沙洲夜市',
    images: ['https://img1.baidu.com/it/u=3610041775,2644449195&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067', 'https://img2.baidu.com/it/u=1850712521,2967635057&fm=253&app=138&f=JPEG?w=1789&h=800', 'https://img1.baidu.com/it/u=3310043089,2552137631&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666'],
    description: '沙洲夜市位于敦煌市中心, 是敦煌最热闹的夜市之一。这里汇集了各种特色小吃、手工艺品、纪念品等, 是体验敦煌当地文化和美食的绝佳去处。夜市灯火通明, 热闹非凡, 游客可以品尝到驴肉黄面、烤羊肉串、杏皮水等敦煌特色美食, 购买到精美的敦煌壁画复制品、丝织品等纪念品。夜市还经常有民俗表演, 让游客感受到浓郁的西北风情。',
    rating: 4.6,
    location: '敦煌市中心'
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
        title: '市井烟火 · 人间百味',
        paragraphs: ['「市」字，从巾，从咫。巾者，布帛也；咫者，近也。市集，是人们交换物品、交流信息、分享生活的场所，是城市活力的源泉。', '沙洲夜市，作为敦煌最热闹的夜市之一，汇集了各种特色小吃、手工艺品、纪念品等。这里不仅有驴肉黄面、烤羊肉串、杏皮水等敦煌特色美食，还有精美的敦煌壁画复制品、丝织品等纪念品。夜市灯火通明，热闹非凡，是体验敦煌当地文化和美食的绝佳去处。', '夜市，是城市生活的缩影，也是人间烟火的集中体现。在这里，我们可以品尝到地道的美食，购买到精美的手工艺品，感受到浓郁的西北风情。更重要的是，我们可以在这里与当地人交流，了解他们的生活方式和文化传统，真正体验到敦煌的魅力和中国的美。'],
        poetry: '「人间烟火气，最抚凡人心。」—— 民间谚语',
        poetryAuthor: '民间智慧'
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
                沙洲夜市一般在晚上6点以后开始营业, 最佳游览时间是晚上7-10点。夜市人流量大, 请注意保管好随身物品。
                建议多带点现金, 部分摊位可能不支持移动支付。品尝美食时要注意卫生, 选择人流量大的摊位。
              </p>
            </div>
          </div>
        </div>
      </main>
    </>;
}