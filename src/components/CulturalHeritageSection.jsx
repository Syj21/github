// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { BookOpen, Quote, Sparkles } from 'lucide-react';

export function CulturalHeritageSection({
  content
}) {
  return <div className="mt-16 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574]/5 via-[#E8A849]/5 to-[#F5DEB3]/5 rounded-3xl"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A574]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E8A849]/10 rounded-full blur-2xl"></div>
      
      {/* 装饰性边框 */}
      <div className="absolute inset-4 border-2 border-[#D4A574]/20 rounded-2xl"></div>
      
      {/* 主要内容 */}
      <div className="relative p-8 md:p-12">
        {/* 标题区域 */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-[#D4A574] to-[#E8A849] p-2.5 rounded-xl shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C]" style={{
            fontFamily: 'Noto Serif SC, serif'
          }}>
              文化瑰宝
            </h2>
            <p className="text-[#2C2C2C]/60 text-sm" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
              汉字之美 · 景点之韵
            </p>
          </div>
          <div className="ml-auto">
            <Sparkles className="w-8 h-8 text-[#D4A574]/40" />
          </div>
        </div>

        {/* 主要文字内容 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#D4A574]/20">
          {/* 引用标记 */}
          <div className="flex items-start gap-4">
            <Quote className="w-8 h-8 text-[#D4A574]/30 flex-shrink-0 mt-1" />
            
            <div className="flex-1">
              {/* 标题 */}
              <h3 className="text-xl md:text-2xl font-bold text-[#D4A574] mb-4" style={{
              fontFamily: 'Noto Serif SC, serif'
            }}>
                {content.title}
              </h3>
              
              {/* 主要内容 */}
              <div className="space-y-4">
                {content.paragraphs.map((paragraph, index) => <p key={index} className="text-[#2C2C2C]/80 leading-relaxed text-lg" style={{
                fontFamily: 'Noto Sans SC, sans-serif'
              }}>
                    {paragraph}
                  </p>)}
              </div>
              
              {/* 诗词或名言 */}
              {content.poetry && <div className="mt-6 pt-6 border-t border-[#D4A574]/20">
                  <p className="text-[#D4A574] italic text-lg leading-relaxed" style={{
                fontFamily: 'Noto Serif SC, serif'
              }}>
                    {content.poetry}
                  </p>
                  {content.poetryAuthor && <p className="text-[#2C2C2C]/60 text-sm mt-2 text-right" style={{
                fontFamily: 'Noto Sans SC, sans-serif'
              }}>
                      —— {content.poetryAuthor}
                    </p>}
                </div>}
            </div>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D4A574]/40 to-transparent"></div>
          <div className="w-2 h-2 bg-[#D4A574] rounded-full"></div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#D4A574]/40 to-transparent"></div>
        </div>
      </div>
    </div>;
}