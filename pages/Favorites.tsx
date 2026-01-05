
import React from 'react';
import VideoCard from '../components/VideoCard';
import { VideoItem } from '../types';
import { Heart, Sparkles } from 'lucide-react';

interface FavoritesProps {
  favorites: VideoItem[];
  onToggleFavorite: (video: VideoItem) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onToggleFavorite }) => {
  return (
    <div className="p-6 bg-[#F7F9FC] min-h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#FFF1F1] p-3 rounded-2xl text-red-500">
          <Heart size={28} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">我的收藏</h1>
          <p className="text-xs text-gray-400 font-bold">收藏你最喜欢的视频片段</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-[40px] p-12 text-center shadow-sm border border-gray-100 mt-10">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={32} className="text-gray-200" />
          </div>
          <p className="text-gray-400 font-bold">还没有收藏任何视频</p>
          <p className="text-gray-300 text-xs mt-1">在视频库或播放器中点击爱心收藏吧！</p>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-10 p-4 bg-yellow-50 rounded-[28px] border border-yellow-100 flex items-center gap-3">
          <Sparkles className="text-yellow-500" size={20} />
          <p className="text-[11px] font-bold text-yellow-700 leading-tight">
            这里是你所有的宝藏视频，随时可以重温那些精彩瞬间。
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
