// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function ImageViewer({
  images,
  currentIndex,
  onClose,
  onIndexChange,
  descriptions = []
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex || 0);
  const handlePrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    setCurrentImageIndex(newIndex);
    onIndexChange?.(newIndex);
  };
  const handleNext = () => {
    const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    onIndexChange?.(newIndex);
  };
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentImageIndex]);
  const currentDescription = descriptions[currentImageIndex] || '';
  return <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* 关闭按钮 */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        {/* 上一张按钮 */}
        {images.length > 1 && <button onClick={handlePrevious} className="absolute left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>}
        
        {/* 下一张按钮 */}
        {images.length > 1 && <button onClick={handleNext} className="absolute right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>}
        
        {/* 图片容器 */}
        <div className="flex flex-col items-center max-w-4xl w-full">
          <div className="relative w-full flex items-center justify-center">
            <img src={images[currentImageIndex]} alt={`图片 ${currentImageIndex + 1}`} className="max-w-full max-h-[70vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
          </div>
          
          {/* 图片说明文字 */}
          {currentDescription && <div className="mt-4 px-4 py-3 bg-black/50 rounded-lg max-w-2xl">
              <p className="text-white text-center text-sm md:text-base leading-relaxed">
                {currentDescription}
              </p>
            </div>}
          
          {/* 图片指示器 */}
          {images.length > 1 && <div className="mt-4 flex justify-center gap-2">
              {images.map((_, index) => <button key={index} onClick={() => {
            setCurrentImageIndex(index);
            onIndexChange?.(index);
          }} className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/40'}`} />)}
            </div>}
          
          {/* 图片计数 */}
          <div className="mt-2 text-white/70 text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>;
}