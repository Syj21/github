// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Brain, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';

export function QuizGame({
  attraction
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  // 景点知识问答数据
  const quizData = {
    '莫高窟': [{
      question: '莫高窟始建于哪个朝代？',
      options: ['汉朝', '十六国时期', '唐朝', '宋朝'],
      correct: 1,
      explanation: '莫高窟始建于十六国时期的前秦建元二年（公元366年）'
    }, {
      question: '莫高窟被列为世界文化遗产是在哪一年？',
      options: ['1985年', '1987年', '1990年', '1992年'],
      correct: 1,
      explanation: '莫高窟于1987年被联合国教科文组织列为世界文化遗产'
    }, {
      question: '莫高窟俗称什么？',
      options: ['千佛洞', '万佛洞', '百佛洞', '佛祖洞'],
      correct: 0,
      explanation: '莫高窟俗称千佛洞，因洞窟内供奉着大量佛像而得名'
    }, {
      question: '莫高窟现存洞窟数量约为多少个？',
      options: ['492个', '735个', '1000个', '500个'],
      correct: 1,
      explanation: '莫高窟现存洞窟735个，壁画4.5万平方米，彩塑2415尊'
    }, {
      question: '莫高窟壁画中最著名的题材是什么？',
      options: ['山水画', '佛教故事', '花鸟画', '人物画'],
      correct: 1,
      explanation: '莫高窟壁画以佛教故事为主要题材，展现了丰富的佛教艺术'
    }],
    '鸣沙山月牙泉': [{
      question: '鸣沙山月牙泉位于敦煌市城南多少公里处？',
      options: ['3公里', '5公里', '8公里', '10公里'],
      correct: 1,
      explanation: '鸣沙山月牙泉位于敦煌市城南5公里处'
    }, {
      question: '鸣沙山因何而得名？',
      options: ['山形像沙子', '沙动成响', '沙子颜色', '山上有沙'],
      correct: 1,
      explanation: '鸣沙山因沙动成响而得名，风吹沙动发出声响'
    }, {
      question: '月牙泉的形状像什么？',
      options: ['圆形', '方形', '新月形', '椭圆形'],
      correct: 2,
      explanation: '月牙泉因形酷似一弯新月而得名'
    }, {
      question: '月牙泉为什么不会干涸？',
      options: ['人工注水', '地下水源补给', '雨水充足', '地势低洼'],
      correct: 1,
      explanation: '月牙泉有地下水源补给，因此能够保持水位不干涸'
    }, {
      question: '鸣沙山月牙泉被称为什么？',
      options: ['沙漠明珠', '沙漠奇观', '沙漠绿洲', '沙漠仙境'],
      correct: 1,
      explanation: '鸣沙山月牙泉古往今来以"沙漠奇观"著称于世'
    }],
    '玉门关': [{
      question: '玉门关位于敦煌市西北多少公里处？',
      options: ['60公里', '90公里', '120公里', '150公里'],
      correct: 1,
      explanation: '玉门关位于敦煌市西北90公里处的戈壁滩上'
    }, {
      question: '玉门关始建于哪个时期？',
      options: ['秦朝', '汉武帝时期', '唐朝', '宋朝'],
      correct: 1,
      explanation: '玉门关始建于汉武帝时期，是古代丝绸之路的重要关隘'
    }, {
      question: '玉门关因何而得名？',
      options: ['形状像玉', '美玉经此输入中原', '用玉石建造', '附近产玉'],
      correct: 1,
      explanation: '相传古代西域和田等地的美玉经此关口输入中原，故名玉门关'
    }, {
      question: '哪位诗人的诗句让玉门关名扬天下？',
      options: ['李白', '杜甫', '王之涣', '白居易'],
      correct: 2,
      explanation: '唐代诗人王之涣的"羌笛何须怨杨柳，春风不度玉门关"使其名扬天下'
    }, {
      question: '玉门关在古代丝绸之路上的作用是什么？',
      options: ['商业中心', '军事要塞', '咽喉要隘', '宗教圣地'],
      correct: 2,
      explanation: '玉门关是古代丝绸之路通往西域北道的咽喉要隘'
    }],
    '雅丹魔鬼城': [{
      question: '雅丹魔鬼城位于敦煌市西北多少公里处？',
      options: ['120公里', '150公里', '180公里', '200公里'],
      correct: 2,
      explanation: '雅丹魔鬼城位于敦煌市西北180公里的罗布泊边缘'
    }, {
      question: '雅丹魔鬼城又称什么？',
      options: ['雅丹国家森林公园', '雅丹国家地质公园', '雅丹国家自然保护区', '雅丹国家风景区'],
      correct: 1,
      explanation: '雅丹魔鬼城又称雅丹国家地质公园'
    }, {
      question: '雅丹地貌是如何形成的？',
      options: ['火山喷发', '风蚀作用', '水流侵蚀', '冰川作用'],
      correct: 1,
      explanation: '雅丹地貌是由风蚀作用形成的各种奇特地貌'
    }, {
      question: '为什么被称为"魔鬼城"？',
      options: ['形状像魔鬼', '大风发出怪异声音', '传说有魔鬼', '夜晚很恐怖'],
      correct: 1,
      explanation: '每当大风刮过，发出各种怪异的声音，仿佛鬼哭狼嚎，因此被称为"魔鬼城"'
    }, {
      question: '雅丹魔鬼城最适合什么时候游览？',
      options: ['清晨', '中午', '下午', '傍晚或日落时分'],
      correct: 3,
      explanation: '傍晚或日落时分光线最佳，可以拍到壮观的日落景色'
    }]
  };
  const questions = quizData[attraction.name] || quizData['莫高窟'];
  const handleAnswerSelect = index => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
  };
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameCompleted(true);
    }
  };
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameCompleted(false);
  };
  if (gameCompleted) {
    const percentage = Math.round(score / questions.length * 100);
    return <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#D4A574]/10 p-2 rounded-full">
            <Trophy className="w-5 h-5 text-[#D4A574]" />
          </div>
          <h3 className="text-xl font-bold text-[#2C2C2C]" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            知识问答
          </h3>
        </div>

        <div className="text-center py-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#D4A574] to-[#E8A849] rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-[#2C2C2C] mb-2" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            恭喜完成！
          </h4>
          <div className="text-5xl font-bold text-[#D4A574] mb-4" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            {percentage}%
          </div>
          <p className="text-[#2C2C2C]/80 mb-6" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            您答对了 {score} / {questions.length} 道题
          </p>
          <button onClick={handleRestart} className="flex items-center justify-center gap-2 mx-auto px-8 py-3 bg-gradient-to-r from-[#D4A574] to-[#E8A849] text-white rounded-xl font-semibold hover:from-[#C49463] hover:to-[#D99838] transition-all duration-300 shadow-lg hover:shadow-xl" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            <RotateCcw className="w-5 h-5" />
            再来一次
          </button>
        </div>
      </div>;
  }
  return <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#D4A574]/10 p-2 rounded-full">
          <Brain className="w-5 h-5 text-[#D4A574]" />
        </div>
        <h3 className="text-xl font-bold text-[#2C2C2C]" style={{
        fontFamily: 'Noto Serif SC, serif'
      }}>
          知识问答
        </h3>
        <span className="ml-auto text-sm text-[#2C2C2C]/60" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
          {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      {/* 进度条 */}
      <div className="mb-6">
        <div className="h-2 bg-[#D4A574]/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#D4A574] to-[#E8A849] transition-all duration-300" style={{
          width: `${(currentQuestion + 1) / questions.length * 100}%`
        }} />
        </div>
      </div>

      {/* 问题 */}
      <div className="p-6 bg-gradient-to-br from-[#D4A574]/10 to-[#E8A849]/10 rounded-xl mb-6 border border-[#D4A574]/20">
        <h4 className="text-lg font-semibold text-[#2C2C2C] mb-4" style={{
        fontFamily: 'Noto Serif SC, serif'
      }}>
          {questions[currentQuestion].question}
        </h4>
      </div>

      {/* 选项 */}
      <div className="space-y-3 mb-6">
        {questions[currentQuestion].options.map((option, index) => {
        let optionClass = 'p-4 rounded-xl border-2 transition-all text-left cursor-pointer hover:border-[#D4A574]/50';
        let icon = null;
        if (showResult) {
          if (index === questions[currentQuestion].correct) {
            optionClass += ' border-green-500 bg-green-50';
            icon = <CheckCircle className="w-5 h-5 text-green-500" />;
          } else if (index === selectedAnswer && index !== questions[currentQuestion].correct) {
            optionClass += ' border-red-500 bg-red-50';
            icon = <XCircle className="w-5 h-5 text-red-500" />;
          } else {
            optionClass += ' border-[#D4A574]/20 bg-[#FDF8F3] opacity-50';
          }
        } else {
          optionClass += ' border-[#D4A574]/20 bg-[#FDF8F3] hover:bg-[#D4A574]/10';
        }
        return <button key={index} onClick={() => handleAnswerSelect(index)} disabled={showResult} className={`w-full flex items-center justify-between ${optionClass}`}>
              <span className={`font-medium ${showResult && index === questions[currentQuestion].correct ? 'text-green-700' : showResult && index === selectedAnswer && index !== questions[currentQuestion].correct ? 'text-red-700' : 'text-[#2C2C2C]'}`} style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
                {option}
              </span>
              {icon}
            </button>;
      })}
      </div>

      {/* 解析 */}
      {showResult && <div className="p-4 bg-[#FDF8F3] rounded-xl mb-6 border border-[#D4A574]/20">
          <p className="text-[#2C2C2C]/80" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
            <span className="font-semibold text-[#2C2C2C]">解析：</span>
            {questions[currentQuestion].explanation}
          </p>
        </div>}

      {/* 下一题按钮 */}
      {showResult && <button onClick={handleNextQuestion} className="w-full bg-gradient-to-r from-[#D4A574] to-[#E8A849] text-white py-4 rounded-xl font-bold text-lg hover:from-[#C49463] hover:to-[#D99838] transition-all duration-300 shadow-lg hover:shadow-xl" style={{
      fontFamily: 'Noto Sans SC, sans-serif'
    }}>
          {currentQuestion < questions.length - 1 ? '下一题' : '查看结果'}
        </button>}
    </div>;
}