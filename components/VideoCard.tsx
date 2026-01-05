
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Heart } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoCardProps {
  video: VideoItem;
  isFavorite?: boolean;
  onToggleFavorite?: (video: VideoItem) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-50 active:scale-[0.98] transition-all mb-4 relative"
    >
      <div 
        onClick={() => navigate(`/player/${video.id}`)}
        className="relative aspect-video bg-gray-100 flex items-center justify-center cursor-pointer"
      >
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full zebra-gradient flex items-center justify-center text-white">
             <Play size={48} fill="currentColor" strokeWidth={0} />
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
          {video.duration || '本地视频'}
        </div>
      </div>
      
      {onToggleFavorite && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(video);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all active:scale-90 ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/60 text-gray-400'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      )}

      <div className="p-4" onClick={() => navigate(`/player/${video.id}`)}>
        <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-1">
          {video.title}
        </h3>
        <p className="text-[#FFB300] text-sm font-semibold mt-1">
          {video.category}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
