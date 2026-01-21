// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Slider, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Info, Maximize2, Volume2, VolumeX } from 'lucide-react';

const EnhancedVRExperience = ({
  attractionId,
  attractionName
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [currentModel, setCurrentModel] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const containerRef = useRef(null);
  const {
    toast
  } = useToast();

  // 增强的3D模型数据
  const models = {
    mogao: [{
      id: 'mogao-cave-45',
      name: '莫高窟第45窟',
      description: '唐代经典洞窟，以精美的彩塑和壁画闻名，是莫高窟的代表性洞窟之一',
      image: 'https://images.unsplash.com/photo-1594736797933-d0b1d0bf63d1?w=800&h=600&fit=crop',
      audio: '45窟解说音频'
    }, {
      id: 'mogao-cave-96',
      name: '莫高窟第96窟',
      description: '北大像窟，内有高达35.5米的弥勒佛像，是莫高窟最大的佛像',
      image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop',
      audio: '96窟解说音频'
    }],
    mingsha: [{
      id: 'mingsha-overview',
      name: '鸣沙山全景',
      description: '鸣沙山因沙动成响而得名，沙峰起伏，景色壮观',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
      audio: '鸣沙山介绍音频'
    }],
    yardang: [{
      id: 'yardang-landscape',
      name: '雅丹地貌',
      description: '风蚀地貌奇观，形状各异，仿佛进入外星世界',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      audio: '雅丹地貌解说音频'
    }]
  };
  const currentModels = models[attractionId] || models.mogao;
  useEffect(() => {
    let rotationInterval;
    if (autoRotate && isPlaying) {
      rotationInterval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 50);
    }
    return () => clearInterval(rotationInterval);
  }, [autoRotate, isPlaying]);
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? '暂停播放' : '开始播放',
      description: `正在${isPlaying ? '暂停' : '播放'} ${currentModels[currentModel].name}的虚拟体验`
    });
  };
  const handleReset = () => {
    setRotation(0);
    setZoom(1);
    setIsPlaying(false);
    setAutoRotate(false);
    toast({
      title: '重置完成',
      description: '已重置虚拟体验视角'
    });
  };
  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    toast({
      title: isFullscreen ? '退出全屏' : '进入全屏',
      description: `已${isFullscreen ? '退出' : '进入'}全屏模式`
    });
  };
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? '开启声音' : '静音',
      description: `已${isMuted ? '开启' : '关闭'}音频解说`
    });
  };
  const handleToggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
    toast({
      title: autoRotate ? '停止自动旋转' : '开始自动旋转',
      description: `已${autoRotate ? '停止' : '开始'}自动旋转`
    });
  };
  return <Card className={`w-full bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 shadow-lg ${isFullscreen ? 'fixed inset-0 z-50 m-0' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-purple-800 font-noto-serif">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            增强现实体验 - {attractionName}
          </div>
          {isFullscreen && <Button size="sm" onClick={handleFullscreen} className="bg-purple-600 hover:bg-purple-700">
              退出全屏
            </Button>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="view" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-purple-100">
            <TabsTrigger value="view" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              3D视图
            </TabsTrigger>
            <TabsTrigger value="info" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              文化信息
            </TabsTrigger>
            <TabsTrigger value="controls" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              控制面板
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="view" className="space-y-4">
            <div ref={containerRef} className="relative w-full h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-lg overflow-hidden border-2 border-purple-400">
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{
              backgroundImage: `url(${currentModels[currentModel].image})`,
              transform: `rotate(${rotation}deg) scale(${zoom})`,
              filter: isPlaying ? 'brightness(1.1) contrast(1.05) saturate(1.2)' : 'none'
            }} />
              
              {/* 交互控制层 */}
              <div className="absolute bottom-2 left-2 flex gap-2">
                <Button size="sm" onClick={handlePlayPause} className="bg-purple-600 hover:bg-purple-700 text-white">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button size="sm" onClick={handleReset} className="bg-purple-600 hover:bg-purple-700 text-white">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                {!isFullscreen && <Button size="sm" onClick={handleFullscreen} className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Maximize2 className="w-4 h-4" />
                  </Button>}
                <Button size="sm" onClick={handleToggleMute} className="bg-purple-600 hover:bg-purple-700 text-white">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>
              
              {/* 模型指示器 */}
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {currentModel + 1}/{currentModels.length}
              </div>
            </div>
            
            {/* 模型选择器 */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {currentModels.map((model, index) => <Button key={model.id} size="sm" variant={index === currentModel ? "default" : "outline"} onClick={() => setCurrentModel(index)} className="bg-purple-600 hover:bg-purple-700 text-white">
                  {model.name}
                </Button>)}
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="space-y-4">
            <div className="p-4 bg-purple-100 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">{currentModels[currentModel].name}</h4>
              <p className="text-purple-700 text-sm">{currentModels[currentModel].description}</p>
              <div className="mt-3 flex items-center space-x-2 text-purple-600 text-xs">
                <Volume2 className="w-3 h-3" />
                <span>音频解说: {currentModels[currentModel].audio}</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="controls" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-purple-700">旋转角度: {rotation}°</label>
                <Slider value={[rotation]} onValueChange={([value]) => setRotation(value)} max={360} step={1} className="mt-2" />
              </div>
              
              <div>
                <label className="text-sm font-medium text-purple-700">缩放级别: {zoom.toFixed(1)}x</label>
                <Slider value={[zoom * 10]} onValueChange={([value]) => setZoom(value / 10)} max={20} step={1} className="mt-2" />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleToggleAutoRotate} variant={autoRotate ? "default" : "outline"} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                  {autoRotate ? '停止旋转' : '自动旋转'}
                </Button>
                <Button onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))} className="bg-purple-600 hover:bg-purple-700 text-white">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} className="bg-purple-600 hover:bg-purple-700 text-white">
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>;
};
export { EnhancedVRExperience };