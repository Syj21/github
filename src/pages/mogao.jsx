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
export default function Mogao(props) {
  const attraction = {
    id: 1,
    name: '莫高窟',
    images: ['https://img.meituan.net/leadinimg/ca07377679d77f6f670af04873c5a742265208.webp%40watermark%3D0', 'https://pica.zhimg.com/v2-8c9820438459ef3f82ffe9d2d054c21a_r.jpg?source=2c26e567', 'https://img2.baidu.com/it/u=2652790478,1447384087&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067', 'https://img0.baidu.com/it/u=1035637835,985422368&fm=253&app=138&f=JPEG?w=800&h=1010', 'https://copyright.bdstatic.com/vcg/creative/e62f2cd1e0c4a90241646c6e519e2ac2.jpg@wm_1,k_cGljX2JqaHdhdGVyLmpwZw=='],
    imageDescriptions: ['莫高窟全景 - 世界文化遗产，规模宏大的佛教艺术圣地', '飞天壁画 - 唐代佛教艺术的巅峰成就，色彩绚丽', '大佛造像 - 高达35米的弥勒佛坐像，展现古代工匠技艺', '彩塑艺术 - 色彩鲜艳、造型生动的佛像雕塑', '洞窟结构 - 依山而建的独特建筑智慧'],
    description: '莫高窟，俗称千佛洞，位于甘肃省敦煌市东南25公里的鸣沙山东麓断崖上。始建于十六国时期，历经十六国、北朝、隋、唐、五代、西夏、元等历代的兴建，形成巨大的规模，是世界上现存规模最大、内容最丰富的佛教艺术圣地。1987年被列为世界文化遗产。',
    rating: 4.9,
    location: '敦煌市东南25公里'
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



        {/* 游览提示 */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#D4A574]">
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
                莫高窟需要提前预约，建议选择早上或傍晚时段游览，光线更好。洞窟内禁止拍照，请遵守景区规定。
                建议穿着舒适的鞋子，因为需要步行较长时间。
              </p>
            </div>
          </div>
        </div>
      </main>
    </>;
}