// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Droplets } from 'lucide-react';

const WeatherWidget = ({
  location = '敦煌'
}) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // 模拟天气数据
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 模拟敦煌天气数据
        const mockWeather = {
          temperature: 18,
          condition: 'sunny',
          humidity: 35,
          windSpeed: 12,
          description: '晴朗',
          feelsLike: 20,
          uvIndex: 6,
          visibility: '良好'
        };
        setWeather(mockWeather);
      } catch (error) {
        console.error('获取天气数据失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [location]);
  const getWeatherIcon = condition => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'snowy':
        return <CloudSnow className="w-6 h-6 text-blue-300" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };
  if (loading) {
    return <Card className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-blue-600">获取天气中...</span>
          </div>
        </CardContent>
      </Card>;
  }
  return <Card className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800 font-noto-serif">
          <Cloud className="w-5 h-5" />
          实时天气 - {location}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-3xl font-bold text-blue-700">{weather.temperature}°C</div>
              <div className="text-sm text-blue-600">{weather.description}</div>
            </div>
          </div>
          <div className="text-right text-sm text-blue-600">
            <div>体感 {weather.feelsLike}°C</div>
            <div>紫外线 {weather.uvIndex}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span>湿度: {weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-blue-500" />
            <span>风速: {weather.windSpeed}km/h</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-blue-500" />
            <span>能见度: {weather.visibility}</span>
          </div>
        </div>
        
        <div className="text-xs text-blue-500 italic">
          敦煌气候干燥，建议携带防晒用品和充足饮用水
        </div>
      </CardContent>
    </Card>;
};
export { WeatherWidget };