
import React from 'react';
import { Settings, CreditCard, Shield, HelpCircle, ChevronRight, Award } from 'lucide-react';

const Profile: React.FC = () => {
  const menuItems = [
    { icon: Award, label: '我的勋章', color: 'text-orange-500' },
    { icon: CreditCard, label: '会员中心', color: 'text-blue-500' },
    { icon: Shield, label: '家长锁', color: 'text-purple-500' },
    { icon: HelpCircle, label: '常见问题', color: 'text-green-500' },
    { icon: Settings, label: '设置', color: 'text-gray-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black text-gray-900 mb-8">我的</h1>
      
      {/* User Info Section */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center gap-4 mb-8">
        <div className="w-20 h-20 bg-yellow-400 rounded-full border-4 border-white shadow-md overflow-hidden shrink-0">
          <img src="https://picsum.photos/seed/user1/200/200" alt="User" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-800">斑马小队长</h2>
          <div className="mt-1 bg-yellow-100 text-yellow-700 text-[10px] font-black px-2 py-0.5 rounded-full inline-block">
            LV.5 能量充盈
          </div>
          <p className="text-gray-400 text-xs mt-1">今天已经学习了 15 分钟啦</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 rounded-[24px] p-4 text-center">
          <span className="block text-2xl font-black text-blue-600">12</span>
          <span className="text-blue-400 text-xs font-bold">收藏视频</span>
        </div>
        <div className="bg-green-50 rounded-[24px] p-4 text-center">
          <span className="block text-2xl font-black text-green-600">85</span>
          <span className="text-green-400 text-xs font-bold">学习天数</span>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-gray-50 rounded-[32px] overflow-hidden">
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            className={`w-full flex items-center justify-between p-5 active:bg-gray-100 transition-colors ${idx !== menuItems.length - 1 ? 'border-b border-white' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className={`${item.color} bg-white p-2.5 rounded-2xl shadow-sm`}>
                <item.icon size={20} />
              </div>
              <span className="font-bold text-gray-700">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 text-[10px] font-medium uppercase tracking-widest">Version 1.0.0 (Zebra Design)</p>
      </div>
    </div>
  );
};

export default Profile;
