
import React from 'react';
import VideoCard from '../components/VideoCard';
import { VideoItem } from '../types';
import { Sparkles } from 'lucide-react';

interface HomeProps {
  videos: VideoItem[];
}

const Home: React.FC<HomeProps> = ({ videos }) => {
  return (
    <div className="p-6">
      {/* Header section with Zebra branding */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
            斑马视频 <Sparkles className="text-yellow-400" />
          </h1>
          <p className="text-gray-500 font-medium">今天想看什么有趣的视频呢？</p>
        </div>
        <div className="w-12 h-12 bg-yellow-400 rounded-full border-4 border-white shadow-md overflow-hidden">
           <img src="https://picsum.photos/seed/zebra/100/100" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Featured Banner */}
      <div className="mb-8 rounded-[32px] overflow-hidden zebra-gradient p-6 text-white relative shadow-lg">
        <div className="relative z-10">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">热门推荐</span>
          <h2 className="text-2xl font-black mb-2">探索奇妙世界</h2>
          <p className="text-white/80 text-sm">通过视频学习，让成长更有趣！</p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 -mr-4 -mt-4 bg-white/10 rounded-full"></div>
      </div>

      <h2 className="text-xl font-black text-gray-800 mb-4 px-1">最近观看</h2>
      
      {videos.length === 0 ? (
        <div className="bg-gray-50 rounded-[32px] p-12 text-center border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
             <Sparkles size={40} />
          </div>
          <p className="text-gray-400 font-bold">还没有添加视频哦</p>
          <p className="text-gray-300 text-xs mt-1">去“视频库”上传你的本地视频吧</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {videos.slice(0, 5).map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
