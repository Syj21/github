// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Ticket, Calendar, Users, Check, Info, Trash2, Clock } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export function TicketBooking({
  attraction,
  $w
}) {
  const {
    toast
  } = useToast();
  const [selectedDate, setSelectedDate] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [showPolicy, setShowPolicy] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // 景点票价配置
  const ticketPrices = {
    '莫高窟': {
      adult: 238,
      student: 148,
      senior: 118,
      child: 0
    },
    '鸣沙山月牙泉': {
      adult: 110,
      student: 55,
      senior: 55,
      child: 0
    },
    '玉门关': {
      adult: 40,
      student: 20,
      senior: 20,
      child: 0
    },
    '雅丹魔鬼城': {
      adult: 120,
      student: 60,
      senior: 60,
      child: 0
    }
  };
  const prices = ticketPrices[attraction.name] || ticketPrices['莫高窟'];
  const calculateTotal = () => {
    return prices.adult * ticketCount;
  };

  // 加载订单列表
  const loadBookings = async () => {
    if (!attraction?.id || !$w) return;
    setLoading(true);
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'booking',
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
      if (result && result.records) {
        const formattedBookings = result.records.map(record => ({
          id: record._id,
          attractionName: record.attractionName,
          visitDate: record.visitDate,
          ticketCount: record.ticketCount,
          totalPrice: record.totalPrice,
          ticketType: record.ticketType,
          userName: record.userName,
          userId: record.userId,
          status: record.status,
          date: new Date(record.createdAt).toLocaleDateString('zh-CN')
        }));
        setBookings(formattedBookings);
      }
    } catch (error) {
      console.error('加载订单失败:', error);
      toast({
        title: '加载失败',
        description: '无法加载订单列表',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // 组件加载时获取订单
  useEffect(() => {
    if ($w && attraction?.id) {
      loadBookings();
    }
  }, [$w, attraction?.id]);
  const handleBooking = async () => {
    if (!selectedDate) {
      toast({
        title: '请选择日期',
        description: '请选择游览日期',
        variant: 'destructive'
      });
      return;
    }
    try {
      // 获取当前用户信息
      const currentUser = $w.auth.currentUser;
      const userName = currentUser?.nickName || currentUser?.name || '游客';
      const userId = currentUser?.userId || '';

      // 保存订单到数据模型
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'booking',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            attractionName: attraction.name,
            attractionId: String(attraction.id),
            visitDate: selectedDate,
            ticketCount: ticketCount,
            totalPrice: calculateTotal(),
            ticketType: '成人票',
            userName: userName,
            userId: userId,
            status: '已预订'
          }
        }
      });
      if (result && result.id) {
        toast({
          title: '预订成功',
          description: `景点：${attraction.name}\n日期：${selectedDate}\n数量：${ticketCount}张\n总价：¥${calculateTotal()}`
        });

        // 重新加载订单列表
        await loadBookings();

        // 重置表单
        setSelectedDate('');
        setTicketCount(1);
      }
    } catch (error) {
      console.error('预订失败:', error);
      toast({
        title: '预订失败',
        description: error.message || '无法完成预订，请稍后重试',
        variant: 'destructive'
      });
    }
  };

  // 删除订单
  const handleDelete = async bookingId => {
    if (!confirm('确定要取消这个订单吗？')) {
      return;
    }
    try {
      // 检查是否是自己的订单
      const booking = bookings.find(b => b.id === bookingId);
      const currentUser = $w.auth.currentUser;
      if (!booking) {
        toast({
          title: '删除失败',
          description: '订单不存在',
          variant: 'destructive'
        });
        return;
      }

      // 如果订单有 userId 且与当前用户不匹配，则不允许删除
      if (booking.userId && booking.userId !== currentUser?.userId) {
        toast({
          title: '权限不足',
          description: '只能取消自己的订单',
          variant: 'destructive'
        });
        return;
      }

      // 从数据模型中删除订单
      await $w.cloud.callDataSource({
        dataSourceName: 'booking',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: bookingId
              }
            }
          }
        }
      });

      // 从本地状态中移除订单
      setBookings(bookings.filter(b => b.id !== bookingId));
      toast({
        title: '取消成功',
        description: '订单已成功取消'
      });
    } catch (error) {
      console.error('取消订单失败:', error);
      toast({
        title: '取消失败',
        description: error.message || '无法取消订单，请稍后重试',
        variant: 'destructive'
      });
    }
  };
  return <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#D4A574]/10 p-2 rounded-full">
          <Ticket className="w-5 h-5 text-[#D4A574]" />
        </div>
        <h3 className="text-xl font-bold text-[#2C2C2C]" style={{
        fontFamily: 'Noto Serif SC, serif'
      }}>
          门票预订
        </h3>
      </div>

      {/* 票价信息 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-[#D4A574]/10 to-[#E8A849]/10 rounded-xl border border-[#D4A574]/20">
          <div className="text-sm text-[#2C2C2C]/70 mb-1" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            成人票
          </div>
          <div className="text-2xl font-bold text-[#D4A574]" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            ¥{prices.adult}
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-[#D4A574]/10 to-[#E8A849]/10 rounded-xl border border-[#D4A574]/20">
          <div className="text-sm text-[#2C2C2C]/70 mb-1" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            学生票
          </div>
          <div className="text-2xl font-bold text-[#D4A574]" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            ¥{prices.student}
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-[#D4A574]/10 to-[#E8A849]/10 rounded-xl border border-[#D4A574]/20">
          <div className="text-sm text-[#2C2C2C]/70 mb-1" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            老人票
          </div>
          <div className="text-2xl font-bold text-[#D4A574]" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            ¥{prices.senior}
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-[#D4A574]/10 to-[#E8A849]/10 rounded-xl border border-[#D4A574]/20">
          <div className="text-sm text-[#2C2C2C]/70 mb-1" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            儿童票
          </div>
          <div className="text-2xl font-bold text-[#D4A574]" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            免费
          </div>
        </div>
      </div>

      {/* 预订表单 */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#2C2C2C] mb-2" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            <Calendar className="w-4 h-4 text-[#D4A574]" />
            选择日期
          </label>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-[#D4A574]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-transparent transition-all" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#2C2C2C] mb-2" style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            <Users className="w-4 h-4 text-[#D4A574]" />
            购票数量
          </label>
          <div className="flex items-center gap-4">
            <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-10 h-10 flex items-center justify-center bg-[#D4A574]/10 hover:bg-[#D4A574]/20 text-[#D4A574] rounded-lg transition-all font-bold text-xl">
              -
            </button>
            <span className="text-2xl font-bold text-[#2C2C2C] w-12 text-center" style={{
            fontFamily: 'Noto Serif SC, serif'
          }}>
              {ticketCount}
            </span>
            <button onClick={() => setTicketCount(ticketCount + 1)} className="w-10 h-10 flex items-center justify-center bg-[#D4A574]/10 hover:bg-[#D4A574]/20 text-[#D4A574] rounded-lg transition-all font-bold text-xl">
              +
            </button>
          </div>
        </div>
      </div>

      {/* 总价 */}
      <div className="p-4 bg-gradient-to-r from-[#D4A574] to-[#E8A849] rounded-xl mb-6">
        <div className="flex items-center justify-between text-white">
          <span style={{
          fontFamily: 'Noto Sans SC, sans-serif'
        }}>
            总价
          </span>
          <span className="text-3xl font-bold" style={{
          fontFamily: 'Noto Serif SC, serif'
        }}>
            ¥{calculateTotal()}
          </span>
        </div>
      </div>

      {/* 预订按钮 */}
      <button onClick={handleBooking} className="w-full bg-gradient-to-r from-[#D4A574] to-[#E8A849] text-white py-4 rounded-xl font-bold text-lg hover:from-[#C49463] hover:to-[#D99838] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2" style={{
      fontFamily: 'Noto Sans SC, sans-serif'
    }}>
        <Ticket className="w-5 h-5" />
        立即预订
      </button>

      {/* 优惠政策 */}
      <button onClick={() => setShowPolicy(!showPolicy)} className="mt-4 flex items-center gap-2 text-[#D4A574] hover:text-[#C49463] transition-colors" style={{
      fontFamily: 'Noto Sans SC, sans-serif'
    }}>
        <Info className="w-4 h-4" />
        <span>查看优惠政策</span>
      </button>

      {showPolicy && <div className="mt-4 p-4 bg-[#FDF8F3] rounded-xl border border-[#D4A574]/20">
          <h4 className="font-semibold text-[#2C2C2C] mb-3 flex items-center gap-2" style={{
        fontFamily: 'Noto Serif SC, serif'
      }}>
            <Check className="w-4 h-4 text-[#D4A574]" />
            优惠政策
          </h4>
          <ul className="space-y-2 text-sm text-[#2C2C2C]/80" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#D4A574] mt-0.5 flex-shrink-0" />
              <span>学生票：凭有效学生证可享优惠</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#D4A574] mt-0.5 flex-shrink-0" />
              <span>老人票：60周岁以上凭身份证可享优惠</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#D4A574] mt-0.5 flex-shrink-0" />
              <span>儿童票：1.2米以下儿童免费</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#D4A574] mt-0.5 flex-shrink-0" />
              <span>军人、残疾人凭有效证件免费</span>
            </li>
          </ul>
        </div>}

      {/* 我的订单 */}
      <div className="mt-8">
        <h4 className="text-lg font-bold text-[#2C2C2C] mb-4 flex items-center gap-2" style={{
        fontFamily: 'Noto Serif SC, serif'
      }}>
          <Ticket className="w-5 h-5 text-[#D4A574]" />
          我的订单
        </h4>
        {loading ? <div className="text-center py-8 text-[#2C2C2C]/60" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
            加载中...
          </div> : bookings.length === 0 ? <div className="text-center py-8 text-[#2C2C2C]/60" style={{
        fontFamily: 'Noto Sans SC, sans-serif'
      }}>
            暂无订单
          </div> : <div className="space-y-3">
            {bookings.map(booking => <div key={booking.id} className="p-4 bg-gradient-to-br from-[#FDF8F3] to-white rounded-xl border border-[#D4A574]/10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-[#2C2C2C]" style={{
                  fontFamily: 'Noto Sans SC, sans-serif'
                }}>
                        {booking.attractionName}
                      </span>
                      <span className="px-2 py-0.5 bg-[#D4A574]/20 text-[#D4A574] text-xs rounded-full" style={{
                  fontFamily: 'Noto Sans SC, sans-serif'
                }}>
                        {booking.ticketType}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#2C2C2C]/70 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#D4A574]" />
                        <span style={{
                    fontFamily: 'Noto Sans SC, sans-serif'
                  }}>
                          {booking.visitDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[#D4A574]" />
                        <span style={{
                    fontFamily: 'Noto Sans SC, sans-serif'
                  }}>
                          {booking.ticketCount}张
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#D4A574]" />
                        <span style={{
                    fontFamily: 'Noto Sans SC, sans-serif'
                  }}>
                          {booking.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-[#D4A574]" style={{
                fontFamily: 'Noto Serif SC, serif'
              }}>
                      ¥{booking.totalPrice}
                    </div>
                  </div>
                  {/* 只显示自己订单的删除按钮 */}
                  {(!booking.userId || booking.userId === $w.auth.currentUser?.userId) && <button onClick={() => handleDelete(booking.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="取消订单">
                      <Trash2 className="w-4 h-4" />
                    </button>}
                </div>
              </div>)}
          </div>}
      </div>
    </div>;
}