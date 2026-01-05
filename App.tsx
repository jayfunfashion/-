
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Library from './pages/Library';
import Player from './pages/Player';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';
import { VideoItem, AppTab } from './types';

const AppContent: React.FC = () => {
  const [localVideos, setLocalVideos] = useState<VideoItem[]>([]);
  const location = useLocation();
  const isPlayerOpen = location.pathname.startsWith('/player');

  const addVideo = (file: File) => {
    const newVideo: VideoItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: file.name.replace(/\.[^/.]+$/, ""),
      url: URL.createObjectURL(file),
      category: '本地视频',
      addedAt: Date.now(),
    };
    setLocalVideos(prev => [newVideo, ...prev]);
  };

  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      <Routes>
        <Route path="/" element={<Home videos={localVideos} />} />
        <Route path="/library" element={<Library videos={localVideos} onAddVideo={addVideo} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/player/:id" element={<Player videos={localVideos} />} />
      </Routes>
      
      {!isPlayerOpen && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
