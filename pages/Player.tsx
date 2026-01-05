
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VideoItem, WatchRecord } from '../types';

interface PlayerProps {
  videos: VideoItem[];
  history: WatchRecord[];
  onUpdateProgress: (videoId: string, progress: number, duration: number) => void;
}

const Player: React.FC<PlayerProps> = ({ videos, history, onUpdateProgress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const video = videos.find(v => v.id === id);
  const existingRecord = history.find(h => h.videoId === id);

  useEffect(() => {
    if (videoRef.current && existingRecord && existingRecord.progress > 0) {
      videoRef.current.currentTime = existingRecord.progress;
    }
  }, [id, existingRecord]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        onUpdateProgress(id!, videoRef.current.currentTime, videoRef.current.duration);
      }
    }, 2000);
    return () => {
      if (videoRef.current) {
        // Save final position on component unmount
        onUpdateProgress(id!, videoRef.current.currentTime, videoRef.current.duration);
      }
      clearInterval(interval);
    };
  }, [id, onUpdateProgress]);

  if (!video) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-black text-white">
        <h2 className="text-xl font-bold mb-4">找不到该视频文件</h2>
        <button onClick={() => navigate(-1)} className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-black">返回</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header Overlay - Custom Back Button */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-4 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white pointer-events-auto active:scale-90 transition-transform"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white font-bold truncate text-base pr-8 drop-shadow-md">{video.title}</h2>
      </div>

      {/* Main Video Element with NATIVE controls as requested */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <video 
          ref={videoRef} 
          src={video.url} 
          className="w-full max-h-screen" 
          autoPlay 
          controls 
          playsInline
        />
      </div>
    </div>
  );
};

export default Player;
