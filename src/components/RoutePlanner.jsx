// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { MapPin, Navigation, Car, Bus, Walking, Clock } from 'lucide-react';

const RoutePlanner = ({
  currentLocation = '敦煌市中心'
}) => {
  const [startPoint, setStartPoint] = useState(currentLocation);
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState('driving');
  const [routeInfo, setRouteInfo] = useState(null);
  const attractions = [{
    id: 'mogao',
    name: '莫高窟',
    distance: '25km',
    time: '30分钟',
    mode: 'driving'
  }, {
    id: 'mingsha',
    name: '鸣沙山月牙泉',
    distance: '5km',
    time: '10分钟',
    mode: 'driving'
  }, {
    id: 'yumen',
    name: '玉门关',
    distance: '90km',
    time: '1.5小时',
    mode: 'driving'
  }, {
    id: 'yardang',
    name: '雅丹魔鬼城',
    distance: '180km',
    time: '3小时',
    mode: 'driving'
  }, {
    id: 'museum',
    name: '敦煌博物馆',
    distance: '1km',
    time: '5分钟',
    mode: 'walking'
  }, {
    id: 'yangguan',
    name: '阳关遗址',
    distance: '70km',
    time: '1小时',
    mode: 'driving'
  }, {
    id: 'market',
    name: '沙洲夜市',
    distance: '0.5km',
    time: '3分钟',
    mode: 'walking'
  }, {
    id: 'leiyin',
    name: '雷音寺',
    distance: '3km',
    time: '8分钟',
    mode: 'driving'
  }];
  const handlePlanRoute = () => {
    if (!destination) return;
    const selectedAttraction = attractions.find(attr => attr.name === destination);
    if (selectedAttraction) {
      setRouteInfo({
        from: startPoint,
        to: destination,
        distance: selectedAttraction.distance,
        time: selectedAttraction.time,
        mode: travelMode,
        tips: getTravelTips(travelMode, selectedAttraction.distance)
      });
    }
  };
  const getTravelTips = (mode, distance) => {
    const tips = {
      driving: '建议提前检查车况，戈壁地区注意防风沙',
      walking: '敦煌日照强烈，请做好防晒措施',
      bus: '请查询当地公交时刻表，部分景点公交班次较少'
    };
    return tips[mode] || '请根据实际情况选择出行方式';
  };
  const getModeIcon = mode => {
    switch (mode) {
      case 'driving':
        return <Car className="w-4 h-4" />;
      case 'walking':
        return <Walking className="w-4 h-4" />;
      case 'bus':
        return <Bus className="w-4 h-4" />;
      default:
        return <Navigation className="w-4 h-4" />;
    }
  };
  return <Card className="w-full bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-800 font-noto-serif">
          <Navigation className="w-5 h-5" />
          路线规划
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">起点: {startPoint}</span>
          </div>
          
          <Select onValueChange={setDestination}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择目的地" />
            </SelectTrigger>
            <SelectContent>
              {attractions.map(attr => <SelectItem key={attr.id} value={attr.name}>
                  {attr.name}
                </SelectItem>)}
            </SelectContent>
          </Select>

          <Select onValueChange={setTravelMode} value={travelMode}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="出行方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="driving">自驾</SelectItem>
              <SelectItem value="walking">步行</SelectItem>
              <SelectItem value="bus">公共交通</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handlePlanRoute} className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={!destination}>
            规划路线
          </Button>
        </div>

        {routeInfo && <div className="p-3 bg-green-100 rounded-lg border border-green-200">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-green-800">路线信息</span>
                <div className="flex items-center space-x-1 text-green-600">
                  {getModeIcon(routeInfo.mode)}
                  <span className="text-sm">{routeInfo.mode === 'driving' ? '自驾' : routeInfo.mode === 'walking' ? '步行' : '公交'}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>距离:</span>
                <span className="font-medium">{routeInfo.distance}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>预计时间:</span>
                <span className="font-medium flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{routeInfo.time}</span>
                </span>
              </div>
              
              <div className="text-xs text-green-600 italic">
                {routeInfo.tips}
              </div>
            </div>
          </div>}
      </CardContent>
    </Card>;
};
export { RoutePlanner };