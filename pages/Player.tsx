
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, RotateCw, Play, Pause, Maximize } from 'lucide-react';
import { VideoItem } from '../types';

interface PlayerProps {
  videos: VideoItem[];
}

const Player: React.FC<PlayerProps> = ({ videos }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const video = videos.find(v => v.id === id);

  if (!video) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-4">视频找不到啦 😢</h2>
        <button onClick={() => navigate('/')} className="bg-yellow-400 px-6 py-2 rounded-xl font-bold">返回首页</button>
      </div>
    );
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Player Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-4 bg-gradient-to-b from-black/60 to-transparent z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white active:scale-90 transition-transform"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white font-bold truncate text-lg pr-8">{video.title}</h2>
      </div>

      {/* Main Video Element */}
      <div className="flex-1 flex items-center justify-center">
        <video 
          ref={videoRef}
          src={video.url}
          className="w-full max-h-screen"
          autoPlay
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          playsInline
          controls={false}
        />
      </div>

      {/* Zebra-Style Custom Controls */}
      <div className="p-6 pb-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex items-center justify-center gap-8 text-white">
          <button onClick={() => skip(-10)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <RotateCcw size={32} />
          </button>
          <button 
            onClick={togglePlay}
            className="w-16 h-16 bg-[#FFD600] rounded-full flex items-center justify-center text-black active:scale-90 transition-transform shadow-lg"
          >
            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} className="ml-1" fill="currentColor" />}
          </button>
          <button onClick={() => skip(10)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <RotateCw size={32} />
          </button>
        </div>

        {/* Simplified Progress bar */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-white/60 text-xs font-mono">00:00</span>
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-[#FFD600] rounded-full"></div>
          </div>
          <span className="text-white/60 text-xs font-mono">--:--</span>
          <button className="text-white/60">
            <Maximize size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
