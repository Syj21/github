// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Camera, Upload, Heart, MessageCircle, Share2, X, Trash2, Send } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

// @ts-ignore;
import { ImageViewer } from '@/components/ImageViewer';
export function PhotoShare({
  attraction,
  $w
}) {
  const {
    toast
  } = useToast();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [caption, setCaption] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [expandedPhotoId, setExpandedPhotoId] = useState(null);
  const [photoComments, setPhotoComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [loadingComments, setLoadingComments] = useState({});
  const [submittingComment, setSubmittingComment] = useState({});
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 从数据模型加载照片
  useEffect(() => {
    loadPhotos();
  }, [attraction?.id]);
  const loadPhotos = async () => {
    if (!attraction?.id) return;
    setLoading(true);
    try {
      console.log('开始加载照片，景点ID:', attraction.id);
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'photo',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              attractionId: {
                $eq: String(attraction.id)
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
      console.log('加载照片结果:', result);
      if (result && result.records) {
        const formattedPhotos = result.records.map(record => ({
          id: record._id,
          url: record.imageUrl,
          user: record.userName,
          avatar: record.avatar,
          caption: record.caption,
          likes: record.likes || 0,
          comments: record.comments || 0,
          date: new Date(record.createdAt).toLocaleDateString('zh-CN'),
          userId: record.userId
        }));
        setPhotos(formattedPhotos);
      }
    } catch (error) {
      console.error('加载照片失败:', error);
      toast({
        title: '加载失败',
        description: `无法加载照片: ${error.message || '未知错误'}`,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  const loadComments = async photoId => {
    setLoadingComments(prev => ({
      ...prev,
      [photoId]: true
    }));
    try {
      console.log('开始加载评论，照片ID:', photoId);
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'comment',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              photoId: {
                $eq: photoId
              }
            }
          },
          orderBy: [{
            createdAt: 'asc'
          }],
          select: {
            $master: true
          },
          getCount: true,
          pageSize: 100,
          pageNumber: 1
        }
      });
      console.log('加载评论结果:', result);
      if (result && result.records) {
        const formattedComments = result.records.map(record => ({
          id: record._id,
          user: record.userName,
          avatar: record.avatar,
          content: record.content,
          date: new Date(record.createdAt).toLocaleDateString('zh-CN'),
          userId: record.userId
        }));
        setPhotoComments(prev => ({
          ...prev,
          [photoId]: formattedComments
        }));
      }
    } catch (error) {
      console.error('加载评论失败:', error);
      toast({
        title: '加载失败',
        description: `无法加载评论: ${error.message || '未知错误'}`,
        variant: 'destructive'
      });
    } finally {
      setLoadingComments(prev => ({
        ...prev,
        [photoId]: false
      }));
    }
  };
  const handleFileSelect = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: '提示',
        description: '请选择要上传的照片',
        variant: 'destructive'
      });
      return;
    }
    if (!attraction?.id) {
      toast({
        title: '错误',
        description: '无法确定景点信息',
        variant: 'destructive'
      });
      return;
    }
    setUploading(true);
    try {
      console.log('开始上传照片...');
      console.log('文件信息:', selectedFile.name, selectedFile.size, selectedFile.type);

      // 获取云开发实例
      const tcb = await $w.cloud.getCloudInstance();
      console.log('云开发实例获取成功');

      // 上传图片到云存储
      const cloudPath = `photos/${attraction.id}_${Date.now()}_${selectedFile.name}`;
      console.log('准备上传到云存储，路径:', cloudPath);
      const uploadResult = await tcb.uploadFile({
        cloudPath: cloudPath,
        filePath: selectedFile
      });
      console.log('图片上传成功:', uploadResult);
      console.log('文件ID:', uploadResult.fileID);

      // 获取图片的临时访问URL
      const fileUrl = await tcb.getTempFileURL({
        fileList: [uploadResult.fileID]
      });
      console.log('获取临时URL结果:', fileUrl);
      if (!fileUrl || !fileUrl.fileList || !fileUrl.fileList[0]) {
        throw new Error('获取图片URL失败');
      }
      const imageUrl = fileUrl.fileList[0].tempFileURL;
      console.log('图片URL:', imageUrl);

      // 获取当前用户信息
      const currentUser = $w.auth.currentUser;
      const userName = currentUser?.nickName || currentUser?.name || '匿名游客';
      const avatar = currentUser?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;
      const userId = currentUser?.userId || '';
      console.log('用户信息:', userName, avatar, userId);

      // 准备要保存的数据
      const photoData = {
        userName: userName,
        avatar: avatar,
        imageUrl: imageUrl,
        caption: caption || '分享我的旅行瞬间',
        likes: 0,
        comments: 0,
        attractionId: String(attraction.id),
        userId: userId
      };
      console.log('准备保存的数据:', photoData);

      // 保存照片记录到数据模型
      const createResult = await $w.cloud.callDataSource({
        dataSourceName: 'photo',
        methodName: 'wedaCreateV2',
        params: {
          data: photoData
        }
      });
      console.log('照片记录创建成功:', createResult);

      // 重新加载照片列表
      await loadPhotos();

      // 关闭上传模态框并重置状态
      setShowUploadModal(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setCaption('');
      toast({
        title: '上传成功',
        description: '照片已成功上传！'
      });
    } catch (error) {
      console.error('上传照片失败:', error);
      console.error('错误详情:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      toast({
        title: '上传失败',
        description: `无法上传照片: ${error.message || '未知错误'}`,
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };
  const handleLike = async photoId => {
    try {
      console.log('开始点赞，照片ID:', photoId);

      // 先在本地更新UI
      setPhotos(photos.map(photo => photo.id === photoId ? {
        ...photo,
        likes: photo.likes + 1
      } : photo));

      // 更新数据模型中的点赞数
      const photo = photos.find(p => p.id === photoId);
      if (photo) {
        await $w.cloud.callDataSource({
          dataSourceName: 'photo',
          methodName: 'wedaUpdateV2',
          params: {
            filter: {
              where: {
                _id: {
                  $eq: photoId
                }
              }
            },
            data: {
              likes: photo.likes + 1
            }
          }
        });
        console.log('点赞更新成功');
      }
    } catch (error) {
      console.error('点赞失败:', error);
      // 如果更新失败，恢复原来的点赞数
      setPhotos(photos.map(photo => photo.id === photoId ? {
        ...photo,
        likes: photo.likes - 1
      } : photo));
      toast({
        title: '操作失败',
        description: `点赞失败: ${error.message || '未知错误'}`,
        variant: 'destructive'
      });
    }
  };
  const handleDelete = async photoId => {
    if (!confirm('确定要删除这张照片吗？')) {
      return;
    }
    try {
      console.log('开始删除照片，照片ID:', photoId);

      // 从数据模型中删除照片
      await $w.cloud.callDataSource({
        dataSourceName: 'photo',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: photoId
              }
            }
          }
        }
      });
      console.log('照片删除成功');

      // 从本地状态中移除照片
      setPhotos(photos.filter(photo => photo.id !== photoId));
      toast({
        title: '删除成功',
        description: '照片已成功删除！'
      });
    } catch (error) {
      console.error('删除照片失败:', error);
      toast({
        title: '删除失败',
        description: `无法删除照片: ${error.message || '未知错误'}`,
        variant: 'destructive'
      });
    }
  };
  const handleToggleComments = async photoId => {
    if (expandedPhotoId === photoId) {
      setExpandedPhotoId(null);
    } else {
      setExpandedPhotoId(photoId);
      if (!photoComments[photoId]) {
        await loadComments(photoId);
      }
    }
  };
  const handleSubmitComment = async photoId => {
    const commentText = newComment[photoId];
    if (!commentText || !commentText.trim()) {
      toast({
        title: '提示',
        description: '请输入评论内容',
        variant: 'destructive'
      });
      return;
    }
    setSubmittingComment(prev => ({
      ...prev,
      [photoId]: true
    }));
    try {
      console.log('开始提交评论，照片ID:', photoId);

      // 获取当前用户信息
      const currentUser = $w.auth.currentUser;
      const userName = currentUser?.nickName || currentUser?.name || '匿名游客';
      const avatar = currentUser?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;
      const userId = currentUser?.userId || '';

      // 保存评论到数据模型
      const createResult = await $w.cloud.callDataSource({
        dataSourceName: 'comment',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            userName: userName,
            avatar: avatar,
            content: commentText.trim(),
            photoId: photoId,
            userId: userId,
            likes: 0,
            replies: 0,
            status: 'approved'
          }
        }
      });
      console.log('评论创建成功:', createResult);

      // 更新照片的评论数
      const photo = photos.find(p => p.id === photoId);
      if (photo) {
        await $w.cloud.callDataSource({
          dataSourceName: 'photo',
          methodName: 'wedaUpdateV2',
          params: {
            filter: {
              where: {
                _id: {
                  $eq: photoId
                }
              }
            },
            data: {
              comments: photo.comments + 1
            }
          }
        });
        setPhotos(photos.map(p => p.id === photoId ? {
          ...p,
          comments: p.comments + 1
        } : p));
      }

      // 重新加载评论列表
      await loadComments(photoId);

      // 清空评论输入框
      setNewComment(prev => ({
        ...prev,
        [photoId]: ''
      }));
      toast({
        title: '评论成功',
        description: '评论已成功发布！'
      });
    } catch (error) {
      console.error('提交评论失败:', error);
      toast({
        title: '评论失败',
        description: `无法提交评论: ${error.message || '未知错误'}`,
        variant: 'destructive'
      });
    } finally {
      setSubmittingComment(prev => ({
        ...prev,
        [photoId]: false
      }));
    }
  };
  const currentUser = $w.auth.currentUser;
  const currentUserId = currentUser?.userId || '';
  return <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#D4A574]/10 p-2 rounded-full">
            <Camera className="w-5 h-5 text-[#D4A574]" />
          </div>
          <h3 className="text-xl font-bold text-[#2C2C2C]" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            游客照片
          </h3>
        </div>
        <button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4A574] to-[#E8A849] text-white rounded-lg font-semibold hover:from-[#C49463] hover:to-[#D99838] transition-all duration-300 shadow-md hover:shadow-lg" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
          <Upload className="w-4 h-4" />
          上传照片
        </button>
      </div>

      {/* 照片网格 */}
      {loading ? <div className="flex items-center justify-center py-12">
          <div className="text-[#2C2C2C]/60" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
            加载中...
          </div>
        </div> : photos.length === 0 ? <div className="flex flex-col items-center justify-center py-12 text-[#2C2C2C]/60">
          <Camera className="w-16 h-16 mb-4 text-[#D4A574]/30" />
          <p style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
            暂无照片，快来分享你的旅行瞬间吧！
          </p>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photos.map(photo => <div key={photo.id} className="group overflow-hidden rounded-xl border border-[#D4A574]/20 hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img src={photo.url} alt={photo.caption} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* 删除按钮 - 只显示自己的照片 */}
                {photo.userId === currentUserId && <button onClick={() => handleDelete(photo.id)} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600" title="删除照片">
                    <Trash2 className="w-4 h-4" />
                  </button>}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src={photo.avatar} alt={photo.user} className="w-10 h-10 rounded-full bg-[#D4A574]/20" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#2C2C2C]" style={{
                fontFamily: 'Noto Sans SC, sans-serif'
              }}>
                      {photo.user}
                    </h4>
                    <span className="text-xs text-[#2C2C2C]/60" style={{
                fontFamily: 'Noto Sans SC, sans-serif'
              }}>
                      {photo.date}
                    </span>
                  </div>
                </div>
                <p className="text-[#2C2C2C]/80 mb-3" style={{
            fontFamily: 'Noto Sans SC, sans-serif'
          }}>
                  {photo.caption}
                </p>
                <div className="flex items-center gap-4">
                  <button onClick={() => handleLike(photo.id)} className="flex items-center gap-1 text-[#2C2C2C]/60 hover:text-[#D4A574] transition-colors">
                    <Heart className={`w-4 h-4 ${photo.likes > 0 ? 'fill-[#D4A574] text-[#D4A574]' : ''}`} />
                    <span className="text-sm" style={{
                fontFamily: 'Noto Sans SC, sans-serif'
              }}>
                      {photo.likes}
                    </span>
                  </button>
                  <button onClick={() => handleToggleComments(photo.id)} className="flex items-center gap-1 text-[#2C2C2C]/60 hover:text-[#D4A574] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm" style={{
                fontFamily: 'Noto Sans SC, sans-serif'
              }}>
                      {photo.comments}
                    </span>
                  </button>
                  <button className="flex items-center gap-1 text-[#2C2C2C]/60 hover:text-[#D4A574] transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* 评论区域 */}
                {expandedPhotoId === photo.id && <div className="mt-4 pt-4 border-t border-[#D4A574]/20">
                    {loadingComments[photo.id] ? <div className="text-center py-4 text-[#2C2C2C]/60" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                        加载评论中...
                      </div> : <>
                        {/* 评论列表 */}
                        {photoComments[photo.id] && photoComments[photo.id].length > 0 ? <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                            {photoComments[photo.id].map(comment => <div key={comment.id} className="flex gap-2">
                                <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full bg-[#D4A574]/20 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="bg-[#D4A574]/10 rounded-lg px-3 py-2">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-semibold text-sm text-[#2C2C2C]" style={{
                          fontFamily: 'Noto Sans SC, sans-serif'
                        }}>
                                        {comment.user}
                                      </span>
                                      <span className="text-xs text-[#2C2C2C]/60" style={{
                          fontFamily: 'Noto Sans SC, sans-serif'
                        }}>
                                        {comment.date}
                                      </span>
                                    </div>
                                    <p className="text-sm text-[#2C2C2C]/80" style={{
                        fontFamily: 'Noto Sans SC, sans-serif'
                      }}>
                                      {comment.content}
                                    </p>
                                  </div>
                                </div>
                              </div>)}
                          </div> : <div className="text-center py-4 text-[#2C2C2C]/60" style={{
                fontFamily: 'Noto Sans SC, sans-serif'
              }}>
                            暂无评论，快来发表你的看法吧！
                          </div>}

                        {/* 评论输入框 */}
                        <div className="flex gap-2">
                          <input type="text" value={newComment[photo.id] || ''} onChange={e => setNewComment(prev => ({
                  ...prev,
                  [photo.id]: e.target.value
                }))} placeholder="写下你的评论..." className="flex-1 px-3 py-2 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all text-sm" style={{
                  fontFamily: 'Noto Sans SC, sans-serif'
                }} />
                          <button onClick={() => handleSubmitComment(photo.id)} disabled={submittingComment[photo.id]} className="px-4 py-2 bg-gradient-to-r from-[#D4A574] to-[#E8A849] text-white rounded-lg font-semibold hover:from-[#C49463] hover:to-[#D99838] transition-all disabled:opacity-50 disabled:cursor-not-allowed" style={{
                  fontFamily: 'Noto Sans SC, sans-serif'
                }}>
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </>}
                  </div>}
              </div>
            </div>)}
        </div>}

      {/* 上传模态框 */}
      {showUploadModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#2C2C2C]" style={{
              fontFamily: 'Noto Serif SC, serif'
            }}>
                  上传照片
                </h3>
                <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-[#D4A574]/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-[#2C2C2C]" />
                </button>
              </div>

              {/* 上传区域 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2C2C2C] mb-2" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                  选择照片
                </label>
                <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${previewUrl ? 'border-[#D4A574]' : 'border-[#D4A574]/30 hover:border-[#D4A574]'}`}>
                  {previewUrl ? <img src={previewUrl} alt="预览" className="max-h-64 mx-auto rounded-lg" /> : <>
                      <Upload className="w-12 h-12 text-[#D4A574] mx-auto mb-4" />
                      <p className="text-[#2C2C2C]/80 mb-2" style={{
                  fontFamily: 'Noto Sans SC, sans-serif'
                }}>
                        点击或拖拽上传照片
                      </p>
                      <p className="text-sm text-[#2C2C2C]/60" style={{
                  fontFamily: 'Noto Sans SC, sans-serif'
                }}>
                        支持 JPG、PNG 格式
                      </p>
                    </>}
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
              </div>

              {/* 文字说明 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2C2C2C] mb-2" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                  添加说明
                </label>
                <textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder="分享您的旅行感受..." rows={3} className="w-full px-4 py-3 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all resize-none" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }} />
              </div>

              {/* 按钮 */}
              <div className="flex gap-3">
                <button onClick={() => setShowUploadModal(false)} className="flex-1 px-6 py-3 border border-[#D4A574]/30 text-[#2C2C2C] rounded-lg font-semibold hover:bg-[#D4A574]/10 transition-all" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                  取消
                </button>
                <button onClick={handleUpload} disabled={uploading} className="flex-1 px-6 py-3 bg-gradient-to-r from-[#D4A574] to-[#E8A849] text-white rounded-lg font-semibold hover:from-[#C49463] hover:to-[#D99838] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" style={{
              fontFamily: 'Noto Sans SC, sans-serif'
            }}>
                  {uploading ? '上传中...' : '确认上传'}
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}