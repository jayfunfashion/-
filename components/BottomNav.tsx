
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlaySquare, ListVideo, Heart, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: '/', label: '首页', icon: Home },
    { id: '/library', label: '视频库', icon: PlaySquare },
    { id: '/playlist', label: '列表', icon: ListVideo },
    { id: '/favorites', label: '收藏', icon: Heart },
    { id: '/profile', label: '我的', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-center py-2 safe-bottom z-40">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.id)}
            className="flex flex-col items-center justify-center w-1/5 py-1 transition-all"
          >
            <div className={`p-1.5 rounded-2xl transition-all ${isActive ? 'bg-[#FFF7E1] text-[#FFB300]' : 'text-gray-400'}`}>
              <Icon size={22} strokeWidth={isActive ? 3 : 2} />
            </div>
            <span className={`text-[10px] mt-1 font-bold ${isActive ? 'text-[#FFB300]' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
