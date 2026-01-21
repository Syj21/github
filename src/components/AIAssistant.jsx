// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    id: 1,
    type: 'bot',
    content: '您好！我是敦煌旅游AI助手，可以为您介绍敦煌的景点、历史文化、美食等信息。有什么问题请随时问我！',
    timestamp: new Date()
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);
    try {
      // 调用OpenAI云函数，设置超时时间为25秒
      const response = await $w.cloud.callFunction({
        name: 'openai-chat',
        data: {
          message: currentInput,
          history: messages.slice(-10).map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        },
        timeout: 25000 // 25秒超时
      });
      // 检查响应结构
      if (response.result && response.result.success) {
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          content: response.result.reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // 处理API返回的错误
        const errorMsg = response.result?.error || 'AI助手响应异常';
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('AI助手调用失败:', error);
      let errorMsg = '抱歉，我现在遇到了一些技术问题，无法为您提供智能回复。';

      // 处理云函数返回的错误信息
      if (error.result && error.result.error) {
        errorMsg = error.result.error;
      } else if (error.message) {
        errorMsg = error.message;
      }
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: errorMsg,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return <>
      {/* 聊天按钮 */}
      <button onClick={() => setIsOpen(true)} className="fixed top-6 right-6 z-50 bg-gradient-to-r from-[#D4A574] to-[#E8A849] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{
      fontFamily: 'Noto Sans SC, sans-serif'
    }}>
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* 聊天窗口 */}
      {isOpen && <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200">
          {/* 头部 */}
          <div className="bg-gradient-to-r from-[#D4A574] to-[#E8A849] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6" />
              <h3 className="font-bold text-lg" style={{
            fontFamily: 'Noto Serif SC, serif'
          }}>
                敦煌AI助手
              </h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-white/80 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'bot' && <div className="bg-[#D4A574]/10 p-2 rounded-full flex-shrink-0">
                    <Bot className="w-4 h-4 text-[#D4A574]" />
                  </div>}
                <div className={`max-w-[80%] p-3 rounded-2xl ${message.type === 'user' ? 'bg-[#D4A574] text-white' : 'bg-gray-100 text-gray-800'}`} style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit'
              })}
                  </p>
                </div>
                {message.type === 'user' && <div className="bg-[#D4A574] p-2 rounded-full flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>}
              </div>)}
            
            {/* 打字指示器 */}
            {isTyping && <div className="flex gap-3 justify-start">
                <div className="bg-[#D4A574]/10 p-2 rounded-full flex-shrink-0">
                  <Bot className="w-4 h-4 text-[#D4A574]" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                animationDelay: '0.1s'
              }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                animationDelay: '0.2s'
              }}></div>
                  </div>
                </div>
              </div>}
          </div>

          {/* 输入框 */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="请输入您的问题..." className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-transparent" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }} disabled={isTyping} />
              <button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} className="bg-[#D4A574] text-white p-2 rounded-full hover:bg-[#B8956A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>}
    </>;
}