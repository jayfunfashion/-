
import React from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { VideoItem, WatchRecord } from '../types';
import { Sparkles, Play, Clock } from 'lucide-react';

interface HomeProps {
  videos: VideoItem[];
  history: WatchRecord[];
  favorites: VideoItem[];
  onToggleFavorite: (video: VideoItem) => void;
}

const Home: React.FC<HomeProps> = ({ videos, history, favorites, onToggleFavorite }) => {
  const navigate = useNavigate();

  const continueVideoRecord = history.length > 0 ? history[0] : null;
  const continueVideo = continueVideoRecord 
    ? videos.find(v => v.id === continueVideoRecord.videoId) 
    : null;

  const recentVideos = history
    .map(h => ({
      video: videos.find(v => v.id === h.videoId),
      record: h
    }))
    .filter(item => item.video !== undefined) as { video: VideoItem, record: WatchRecord }[];

  return (
    <div className="p-6">
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

      <h2 className="text-xl font-black text-gray-800 mb-4 px-1 flex items-center gap-2">
        最近观看
      </h2>
      <div className="space-y-4 mb-10">
        {recentVideos.length === 0 ? (
          <div className="bg-gray-50 rounded-[32px] p-8 text-center border-2 border-dashed border-gray-100 text-gray-300 font-bold text-sm italic">
            暂无观看历史
          </div>
        ) : (
          recentVideos.map(({ video }) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              isFavorite={favorites.some(f => f.id === video.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        )}
      </div>

      {continueVideo && (
        <div className="mb-8">
          <h2 className="text-xl font-black text-gray-800 mb-4 px-1 flex items-center gap-2">
            <Clock size={20} className="text-[#FFB300]" />
            继续观看
          </h2>
          <div 
            onClick={() => navigate(`/player/${continueVideo.id}`)}
            className="relative bg-white rounded-[32px] overflow-hidden shadow-lg border-2 border-yellow-100 group active:scale-[0.98] transition-all"
          >
            <div className="aspect-video bg-gray-200 relative">
               <div className="absolute inset-0 zebra-gradient flex items-center justify-center text-white">
                  <Play size={64} fill="currentColor" strokeWidth={0} className="drop-shadow-lg" />
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20">
                  <div 
                    className="h-full bg-yellow-400" 
                    style={{ width: `${(continueVideoRecord!.progress / continueVideoRecord!.duration) * 100}%` }}
                  ></div>
               </div>
            </div>
            <div className="p-5 flex items-center justify-between bg-white">
              <div className="flex-1 overflow-hidden pr-4">
                <h3 className="font-black text-gray-800 truncate text-lg">{continueVideo.title}</h3>
                <p className="text-xs text-gray-400 font-bold mt-1">
                  进度：{Math.floor(continueVideoRecord!.progress / 60)}:{(Math.floor(continueVideoRecord!.progress % 60)).toString().padStart(2, '0')} / {Math.floor(continueVideoRecord!.duration / 60)}:{(Math.floor(continueVideoRecord!.duration % 60)).toString().padStart(2, '0')}
                </p>
              </div>
              <div className="bg-yellow-400 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md shadow-yellow-200">
                 <Play size={24} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
