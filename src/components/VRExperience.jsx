// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Slider, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Info } from 'lucide-react';

const VRExperience = ({
  attractionId,
  attractionName
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [currentModel, setCurrentModel] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const containerRef = useRef(null);
  const {
    toast
  } = useToast();

  // 虚拟3D模型数据
  const models = [{
    id: 'mogao-cave',
    name: '莫高窟第45窟',
    description: '唐代经典洞窟，以精美的彩塑和壁画闻名',
    image: 'https://images.unsplash.com/photo-1594736797933-d0b1d0bf63d1?w=800&h=600&fit=crop'
  }, {
    id: 'buddha-statue',
    name: '大佛造像',
    description: '敦煌石窟中的代表性佛像雕塑',
    image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop'
  }, {
    id: 'flying-apsara',
    name: '飞天壁画',
    description: '敦煌艺术中的经典飞天形象',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop'
  }];
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? '暂停播放' : '开始播放',
      description: `正在${isPlaying ? '暂停' : '播放'} ${models[currentModel].name}的虚拟体验`
    });
  };
  const handleReset = () => {
    setRotation(0);
    setZoom(1);
    setIsPlaying(false);
    toast({
      title: '重置完成',
      description: '已重置虚拟体验视角'
    });
  };
  const handleModelChange = index => {
    setCurrentModel(index);
    setIsPlaying(false);
    toast({
      title: '切换模型',
      description: `已切换到${models[index].name}`
    });
  };
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2));
  };
  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5));
  };
  return <Card className="w-full bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-2 border-d4af37 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-2d1b69 font-noto-serif">
          <Info className="w-5 h-5" />
          虚拟现实体验 - {attractionName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="view" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-f8f4e6">
            <TabsTrigger value="view" className="data-[state=active]:bg-d4af37 data-[state=active]:text-white">
              3D视图
            </TabsTrigger>
            <TabsTrigger value="info" className="data-[state=active]:bg-d4af37 data-[state=active]:text-white">
              文化信息
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="view" className="space-y-4">
            {/* 3D模型展示区 */}
            <div ref={containerRef} className="relative w-full h-64 bg-gradient-to-br from-2d1b69/20 to-8b0000/10 rounded-lg overflow-hidden border-2 border-cd7f32">
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{
              backgroundImage: `url(${models[currentModel].image})`,
              transform: `rotate(${rotation}deg) scale(${zoom})`,
              filter: isPlaying ? 'brightness(1.1) contrast(1.05)' : 'none'
            }} />
              
              {/* 交互控制层 */}
              <div className="absolute bottom-2 left-2 flex gap-2">
                <Button size="sm" onClick={handlePlayPause} className="bg-d4af37 hover:bg-cd7f32 text-white">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button size="sm" onClick={handleReset} className="bg-8b0000 hover:bg-6b0000 text-white">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 控制面板 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-2d1b69">旋转角度</label>
                <Slider value={[rotation]} onValueChange={([value]) => setRotation(value)} max={360} step={1} className="w-full" />
                <div className="text-xs text-8b0000">{rotation}°</div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-2d1b69">缩放级别</label>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={handleZoomOut} className="bg-cd7f32 hover:bg-b3672b">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 text-center text-sm text-8b0000">{zoom.toFixed(1)}x</div>
                  <Button size="sm" onClick={handleZoomIn} className="bg-cd7f32 hover:bg-b3672b">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="info">
            <div className="bg-white/80 p-4 rounded-lg border border-d4af37">
              <h3 className="font-noto-serif text-lg text-2d1b69 mb-2">{models[currentModel].name}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{models[currentModel].description}</p>
              <div className="mt-3 flex gap-2">
                {models.map((model, index) => <Button key={model.id} size="sm" variant={currentModel === index ? "default" : "outline"} onClick={() => handleModelChange(index)} className={`${currentModel === index ? 'bg-d4af37 text-white' : 'border-d4af37 text-2d1b69'}`}>
                    {model.name}
                  </Button>)}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* 交互提示 */}
        <div className="text-xs text-8b0000/70 text-center">
          提示：拖动滑块旋转模型，使用缩放按钮调整大小，点击播放按钮开始自动演示
        </div>
      </CardContent>
    </Card>;
};
export default VRExperience;