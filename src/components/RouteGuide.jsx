// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { MapPin, Navigation, Car, Bus, Foot, Clock, Route } from 'lucide-react';

export function RouteGuide({
  attraction
}) {
  const [transportMode, setTransportMode] = useState('driving');

  // 景点坐标（高德地图坐标系）
  const attractionCoordinates = {
    '莫高窟': {
      lat: 40.0348,
      lng: 94.7859
    },
    '鸣沙山月牙泉': {
      lat: 40.0826,
      lng: 94.6615
    },
    '玉门关': {
      lat: 40.3569,
      lng: 93.8556
    },
    '雅丹魔鬼城': {
      lat: 40.5272,
      lng: 93.1266
    }
  };
  const coords = attractionCoordinates[attraction.name] || {
    lat: 40.0348,
    lng: 94.7859
  };

  // 距离和预计时间（从敦煌市区出发）
  const routeInfo = {
    '莫高窟': {
      driving: {
        distance: '25公里',
        time: '30分钟'
      },
      bus: {
        distance: '25公里',
        time: '45分钟'
      },
      walking: {
        distance: '25公里',
        time: '5小时'
      }
    },
    '鸣沙山月牙泉': {
      driving: {
        distance: '5公里',
        time: '10分钟'
      },
      bus: {
        distance: '5公里',
        time: '20分钟'
      },
      walking: {
        distance: '5公里',
        time: '1小时'
      }
    },
    '玉门关': {
      driving: {
        distance: '90公里',
        time: '1.5小时'
      },
      bus: {
        distance: '90公里',
        time: '2.5小时'
      },
      walking: {
        distance: '90公里',
        time: '18小时'
      }
    },
    '雅丹魔鬼城': {
      driving: {
        distance: '180公里',
        time: '2.5小时'
      },
      bus: {
        distance: '180公里',
        time: '4小时'
      },
      walking: {
        distance: '180公里',
        time: '36小时'
      }
    }
  };
  const currentRouteInfo = routeInfo[attraction.name] || routeInfo['莫高窟'];
  const currentInfo = currentRouteInfo[transportMode];

  // 打开高德地图导航
  const openAmapNavigation = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // 移动端：尝试打开高德地图APP
      const iosUrl = `iosamap://path?sourceApplication=DunhuangTour&dlat=${coords.lat}&dlon=${coords.lng}&dname=${encodeURIComponent(attraction.name)}&dev=0`;
      const androidUrl = `androidamap://route/plan/?dlat=${coords.lat}&dlon=${coords.lng}&dname=${encodeURIComponent(attraction.name)}&dev=0&t=${transportMode}`;
      const userAgent = navigator.userAgent;
      if (/iPhone|iPad|iPod/i.test(userAgent)) {
        window.location.href = iosUrl;
      } else if (/Android/i.test(userAgent)) {
        window.location.href = androidUrl;
      }
    } else {
      // PC端：打开高德地图Web版
      const webUrl = `https://uri.amap.com/navigation?to=${coords.lng},${coords.lat},${encodeURIComponent(attraction.name)}&mode=${transportMode}&coordinate=gaode&callnative=1`;
      window.open(webUrl, '_blank');
    }
  };

  // 打开高德地图查看位置
  const openAmapLocation = () => {
    const webUrl = `https://uri.amap.com/marker?position=${coords.lng},${coords.lat}&name=${encodeURIComponent(attraction.name)}&coordinate=gaode&callnative=1`;
    window.open(webUrl, '_blank');
  };
  const transportModes = [{
    id: 'driving',
    label: '驾车',
    icon: Car
  }, {
    id: 'bus',
    label: '公交',
    icon: Bus
  }, {
    id: 'walking',
    label: '步行',
    icon: Foot
  }];
  return <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4A574] to-[#E8A849] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Route className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            路线指引
          </h3>
        </div>
      </div>

      <div className="p-6">
        {/* Location Info */}
        <div className="flex items-start gap-3 mb-6 p-4 bg-[#FDF8F3] rounded-lg">
          <MapPin className="w-5 h-5 text-[#D4A574] mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-[#2C2C2C] mb-1" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
              {attraction.name}
            </p>
            <p className="text-sm text-[#2C2C2C]/70" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
              {attraction.location}
            </p>
            <p className="text-xs text-[#2C2C2C]/50 mt-1">
              坐标：{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Transport Mode Selection */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-[#2C2C2C] mb-3" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            选择出行方式
          </p>
          <div className="grid grid-cols-3 gap-3">
            {transportModes.map(mode => {
            const Icon = mode.icon;
            return <button key={mode.id} onClick={() => setTransportMode(mode.id)} className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${transportMode === mode.id ? 'border-[#D4A574] bg-[#D4A574]/10' : 'border-gray-200 hover:border-[#D4A574]/50'}`}>
                  <Icon className={`w-6 h-6 ${transportMode === mode.id ? 'text-[#D4A574]' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${transportMode === mode.id ? 'text-[#D4A574]' : 'text-gray-600'}`} style={{
                fontFamily: 'Noto Sans SC, sans-serif'
              }}>
                    {mode.label}
                  </span>
                </button>;
          })}
          </div>
        </div>

        {/* Route Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-[#FDF8F3] rounded-lg">
            <Route className="w-5 h-5 text-[#D4A574]" />
            <div>
              <p className="text-xs text-[#2C2C2C]/60 mb-1" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                距离
              </p>
              <p className="text-lg font-bold text-[#2C2C2C]" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                {currentInfo.distance}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#FDF8F3] rounded-lg">
            <Clock className="w-5 h-5 text-[#D4A574]" />
            <div>
              <p className="text-xs text-[#2C2C2C]/60 mb-1" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                预计时间
              </p>
              <p className="text-lg font-bold text-[#2C2C2C]" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                {currentInfo.time}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button onClick={openAmapNavigation} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#E8A849] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-[1.02]" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            <Navigation className="w-5 h-5" />
            打开高德地图导航
          </button>
          <button onClick={openAmapLocation} className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#D4A574] text-[#D4A574] py-3 px-6 rounded-lg font-semibold hover:bg-[#D4A574]/5 transition-all" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            <MapPin className="w-5 h-5" />
            在地图中查看位置
          </button>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-[#D4A574]/5 rounded-lg border border-[#D4A574]/20">
          <p className="text-sm text-[#2C2C2C]/80 leading-relaxed" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            <span className="font-semibold text-[#D4A574]">温馨提示：</span>
            点击导航按钮将自动跳转至高德地图。如未安装高德地图APP，将打开网页版地图。建议提前下载离线地图以备不时之需。
          </p>
        </div>
      </div>
    </div>;
}