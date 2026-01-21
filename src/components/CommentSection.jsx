// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Star, MessageCircle, Send, Trash2 } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export function CommentSection({
  attractionId,
  comments: initialComments,
  $w
}) {
  const {
    toast
  } = useToast();
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState({
    name: '',
    rating: 5,
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 加载评论列表
  const loadComments = async () => {
    setIsLoading(true);
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'comment',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              attractionId: {
                $eq: String(attractionId)
              }
            }
          },
          orderBy: [{
            createdAt: 'desc'
          }],
          select: {
            $master: true
          },
          getCount: true,
          pageSize: 100,
          pageNumber: 1
        }
      });
      if (result && result.records) {
        const formattedComments = result.records.map(record => ({
          id: record._id,
          name: record.userName,
          rating: record.rating,
          content: record.content,
          avatar: record.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${record.userName}`,
          date: new Date(record.createdAt).toLocaleDateString('zh-CN'),
          userId: record.userId
        }));
        setComments(formattedComments);
      }
    } catch (error) {
      console.error('加载评论失败:', error);
      toast({
        title: '加载失败',
        description: '无法加载评论列表，请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 组件加载时获取评论
  useEffect(() => {
    if ($w && attractionId) {
      loadComments();
    }
  }, [$w, attractionId]);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.content.trim()) {
      toast({
        title: '请填写完整',
        description: '请输入您的姓名和评论内容',
        variant: 'destructive'
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // 获取当前用户信息
      const currentUser = $w.auth.currentUser;
      const userId = currentUser?.userId || '';
      const userName = currentUser?.nickName || currentUser?.name || newComment.name;
      const avatar = currentUser?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;
      console.log('开始提交评论:', {
        userName: userName,
        rating: newComment.rating,
        content: newComment.content,
        attractionId: String(attractionId),
        userId: userId
      });
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'comment',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            userName: userName,
            rating: newComment.rating,
            content: newComment.content,
            avatar: avatar,
            attractionId: String(attractionId),
            userId: userId,
            likes: 0,
            replies: 0,
            status: 'approved'
          }
        }
      });
      console.log('提交评论结果:', result);
      if (result && result.id) {
        const comment = {
          id: result.id,
          name: userName,
          rating: newComment.rating,
          content: newComment.content,
          avatar: avatar,
          date: new Date().toLocaleDateString('zh-CN'),
          userId: userId
        };
        setComments([comment, ...comments]);
        setNewComment({
          name: '',
          rating: 5,
          content: ''
        });
        toast({
          title: '发布成功',
          description: '您的评论已成功发布'
        });
      } else {
        console.error('提交评论返回结果异常:', result);
        toast({
          title: '发布失败',
          description: '服务器返回异常，请稍后重试',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('提交评论失败:', error);
      console.error('错误详情:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      toast({
        title: '发布失败',
        description: error.message || '无法发布评论，请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 删除评论
  const handleDelete = async commentId => {
    try {
      // 检查是否是自己的评论
      const comment = comments.find(c => c.id === commentId);
      const currentUser = $w.auth.currentUser;
      if (!comment) {
        toast({
          title: '删除失败',
          description: '评论不存在',
          variant: 'destructive'
        });
        return;
      }

      // 如果评论有 userId 且与当前用户不匹配，则不允许删除
      if (comment.userId && comment.userId !== currentUser?.userId) {
        toast({
          title: '权限不足',
          description: '只能删除自己的评论',
          variant: 'destructive'
        });
        return;
      }
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'comment',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: commentId
              }
            }
          }
        }
      });
      if (result && result.count > 0) {
        setComments(comments.filter(comment => comment.id !== commentId));
        toast({
          title: '删除成功',
          description: '评论已成功删除'
        });
      }
    } catch (error) {
      console.error('删除评论失败:', error);
      toast({
        title: '删除失败',
        description: error.message || '无法删除评论，请稍后重试',
        variant: 'destructive'
      });
    }
  };
  const renderStars = rating => {
    return Array.from({
      length: 5
    }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-[#E8A849] text-[#E8A849]' : 'text-gray-300'}`} />);
  };
  return <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#D4A574]/10 p-2 rounded-full">
          <MessageCircle className="w-5 h-5 text-[#D4A574]" />
        </div>
        <h3 className="text-xl font-bold text-[#2C2C2C]" style={{
        fontFamily: 'Noto Serif SC, serif'
      }}>
          游客评论 ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-5 bg-gradient-to-br from-[#D4A574]/5 to-[#E8A849]/5 rounded-xl border border-[#D4A574]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[#2C2C2C] mb-2" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
              您的姓名
            </label>
            <input type="text" value={newComment.name} onChange={e => setNewComment({
            ...newComment,
            name: e.target.value
          })} placeholder="请输入您的姓名" className="w-full px-4 py-2 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2C2C2C] mb-2" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
              评分
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => <button key={star} type="button" onClick={() => setNewComment({
              ...newComment,
              rating: star
            })} className="p-1 hover:scale-110 transition-transform">
                  <Star className={`w-6 h-6 ${star <= newComment.rating ? 'fill-[#E8A849] text-[#E8A849]' : 'text-gray-300'}`} />
                </button>)}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#2C2C2C] mb-2" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            分享您的体验
          </label>
          <textarea value={newComment.content} onChange={e => setNewComment({
          ...newComment,
          content: e.target.value
        })} placeholder="请分享您的游览体验..." rows={3} className="w-full px-4 py-2 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all resize-none" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }} />
        </div>
        <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2 bg-gradient-to-r from-[#D4A574] to-[#E8A849] text-white rounded-lg font-semibold hover:from-[#C49463] hover:to-[#D99838] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
          <Send className="w-4 h-4" />
          {isSubmitting ? '提交中...' : '发布评论'}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? <div className="text-center py-8 text-[#2C2C2C]/60" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
            加载中...
          </div> : comments.length === 0 ? <div className="text-center py-8 text-[#2C2C2C]/60" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
            暂无评论，快来分享您的体验吧！
          </div> : comments.map(comment => <div key={comment.id} className="p-4 bg-gradient-to-br from-[#FDF8F3] to-white rounded-xl border border-[#D4A574]/10">
            <div className="flex items-start gap-4">
              <img src={comment.avatar} alt={comment.name} className="w-12 h-12 rounded-full bg-[#D4A574]/20" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-[#2C2C2C]" style={{
                  fontFamily: 'Noto Sans SC, sans-serif'
                }}>
                        {comment.name}
                      </h4>
                    <div className="flex items-center gap-1">
                      {renderStars(comment.rating)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#2C2C2C]/60" style={{
                  fontFamily: 'Noto Sans SC, sans-serif'
                }}>
                      {comment.date}
                    </span>
                    {/* 只显示自己评论的删除按钮 */}
                    {(!comment.userId || comment.userId === $w.auth.currentUser?.userId) && <button onClick={() => handleDelete(comment.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="删除评论">
                        <Trash2 className="w-4 h-4" />
                      </button>}
                  </div>
                </div>
                <p className="text-[#2C2C2C]/80 leading-relaxed" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                  {comment.content}
                </p>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}