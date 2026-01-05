
import React, { useRef } from 'react';
import VideoCard from '../components/VideoCard';
import { VideoItem } from '../types';
import { Plus, Video, Search } from 'lucide-react';

interface LibraryProps {
  videos: VideoItem[];
  onAddVideo: (file: File) => void;
}

const Library: React.FC<LibraryProps> = ({ videos, onAddVideo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAddVideo(file);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-gray-900">视频库</h1>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#4CAF50] text-white p-3 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2 font-bold"
        >
          <Plus size={20} />
          添加视频
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="搜索你的视频..." 
          className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-yellow-400 font-medium placeholder-gray-400"
        />
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="video/*" 
        onChange={handleFileChange} 
      />

      <div className="space-y-4">
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
            <Video size={64} className="mb-4 text-gray-400" />
            <p className="font-bold text-lg">暂无视频</p>
            <p className="text-sm">点击右上角添加视频文件</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
             {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
