
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListVideo, Play, Trash2, Clock } from 'lucide-react';
import { VideoItem, WatchRecord } from '../types';

interface PlaylistProps {
  playlist: VideoItem[];
  history: WatchRecord[];
  lastPlayedVideoId: string | null;
  onRemoveFromPlaylist: (id: string) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, history, lastPlayedVideoId, onRemoveFromPlaylist }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-[#F7F9FC] min-h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#FFF7E1] p-3 rounded-2xl text-[#FFB300]">
          <ListVideo size={28} />
        </div>
        <h1 className="text-2xl font-black text-gray-900">播放列表</h1>
      </div>

      {playlist.length === 0 ? (
        <div className="bg-white rounded-[40px] p-12 text-center shadow-sm border border-gray-100 mt-10">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ListVideo size={32} className="text-gray-200" />
          </div>
          <p className="text-gray-400 font-bold">列表还是空的呢</p>
          <p className="text-gray-300 text-xs mt-1">快去视频库添加你喜欢的视频吧！</p>
        </div>
      ) : (
        <div className="space-y-4">
          {playlist.map((video) => {
            const isActive = video.id === lastPlayedVideoId;
            const record = history.find(h => h.videoId === video.id);
            const progressPercent = record ? (record.progress / record.duration) * 100 : 0;

            return (
              <div 
                key={video.id} 
                className={`relative group bg-white rounded-[28px] p-4 flex items-center gap-4 border-2 transition-all active:scale-[0.98] ${
                  isActive ? 'border-[#FFD600] shadow-md shadow-yellow-100 bg-[#FFFEF9]' : 'border-transparent shadow-sm'
                }`}
              >
                <div 
                  className="w-16 h-16 rounded-2xl overflow-hidden relative shrink-0 cursor-pointer"
                  onClick={() => navigate(`/player/${video.id}`)}
                >
                  <div className="w-full h-full zebra-gradient flex items-center justify-center text-white">
                    <Play size={20} fill="currentColor" />
                  </div>
                  {record && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                      <div className="h-full bg-yellow-400" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-hidden cursor-pointer" onClick={() => navigate(`/player/${video.id}`)}>
                  <h3 className={`font-black text-sm truncate ${isActive ? 'text-[#FF9900]' : 'text-gray-800'}`}>
                    {video.title}
                  </h3>
                  {record ? (
                    <p className="text-[10px] font-bold text-gray-400 mt-1 flex items-center gap-1">
                      <Clock size={10} />
                      已观看 {Math.floor(progressPercent)}%
                    </p>
                  ) : (
                    <p className="text-[10px] font-bold text-gray-300 mt-1 uppercase tracking-wider">
                      准备播放
                    </p>
                  )}
                </div>

                <button 
                  onClick={() => onRemoveFromPlaylist(video.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>

                {isActive && (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#FFD600] rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      <div className="mt-10 p-4 bg-blue-50 rounded-[28px] flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-sm">
          <Play size={16} fill="currentColor" />
        </div>
        <p className="text-[11px] font-bold text-blue-600 leading-tight">
          列表记忆：系统已为您保存每个视频的最后播放位置。
        </p>
      </div>
    </div>
  );
};

export default Playlist;
