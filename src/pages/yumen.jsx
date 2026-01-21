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
export default function Yumen(props) {
  const attraction = {
    id: 3,
    name: '玉门关',
    images: ['https://gips1.baidu.com/it/u=2661613446,359621065&fm=3074&app=3074&f=JPEG?w=1080&h=1361&type=normal&func=', 'https://gips1.baidu.com/it/u=1594394288,966664643&fm=3074&app=3074&f=JPEG?w=1080&h=1352&type=normal&func=', 'https://gips2.baidu.com/it/u=4074673277,987671392&fm=3074&app=3074&f=JPEG?w=1620&h=966&type=normal&func=C', 'https://pic.rmb.bdstatic.com/bjh/news/ec870a38192fa09957473147f1968a7c.png'],
    imageDescriptions: ['玉门关遗址全景 - 土黄色夯土城墙与戈壁滩形成壮丽景观', '标志性门洞 - 拱形门洞内设现代木质栈道，展现历史与现代结合', '戈壁日落 - 夕阳下的玉门关遗址，营造"大漠孤烟直"的意境', '遗址石碑 - "玉门关遗址"红色刻字，彰显世界文化遗产地位'],
    description: '玉门关，俗称小方盘城，位于敦煌市西北90公里处的戈壁滩上。始建于汉武帝时期，是古代丝绸之路通往西域北道的咽喉要隘。相传古代西域和田等地的美玉经此关口输入中原，故名玉门关。唐代诗人王之涣的"羌笛何须怨杨柳，春风不度玉门关"使其名扬天下。',
    rating: 4.7,
    location: '敦煌市西北90公里'
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

      {/* Image Viewer */}
      {showImageViewer && <ImageViewer images={attraction.images} descriptions={attraction.imageDescriptions} currentIndex={currentImageIndex} onClose={() => setShowImageViewer(false)} onIndexChange={setCurrentImageIndex} />}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Attraction Card */}
        <AttractionCard attraction={attraction} onImageClick={handleImageClick} />

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
                玉门关位于戈壁滩上，风沙较大，建议携带防风装备和防晒用品。最佳游览时间是傍晚，
                可以欣赏到壮观的戈壁日落。建议与雅丹魔鬼城一起游览，路线更加合理。
              </p>
            </div>
          </div>
        </div>
      </main>
    </>;
}