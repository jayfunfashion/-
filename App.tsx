
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Library from './pages/Library';
import Player from './pages/Player';
import Profile from './pages/Profile';
import Playlist from './pages/Playlist';
import Favorites from './pages/Favorites';
import BottomNav from './components/BottomNav';
import { VideoItem, FileNode, WatchRecord } from './types';

const AppContent: React.FC = () => {
  const [rootNode, setRootNode] = useState<FileNode>({
    id: 'root',
    name: '视频库首页',
    type: 'folder',
    children: [],
    parentId: null
  });

  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [watchHistory, setWatchHistory] = useState<WatchRecord[]>([]);
  const [playlist, setPlaylist] = useState<VideoItem[]>([]);
  const [favorites, setFavorites] = useState<VideoItem[]>([]);
  const [lastPlayedVideoId, setLastPlayedVideoId] = useState<string | null>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addItems = (files: FileList | File[]) => {
    const newRoot = { ...rootNode };
    Array.from(files).forEach((file: any) => {
      const pathParts = file.webkitRelativePath 
        ? file.webkitRelativePath.split('/').filter(Boolean) 
        : [file.name];
        
      let currentLevel = newRoot;
      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        const isLast = i === pathParts.length - 1;

        if (isLast) {
          if (/\.(mp4|webm|ogg|mov|m4v)$/i.test(part)) {
            const video: VideoItem = {
              id: generateId(),
              title: part.replace(/\.[^/.]+$/, ""),
              url: URL.createObjectURL(file),
              category: '本地',
              addedAt: Date.now(),
            };
            if (!currentLevel.children.find(c => c.name === video.title && c.type === 'video')) {
              currentLevel.children.push({
                id: video.id,
                name: video.title,
                type: 'video',
                videoData: video,
                children: [],
                parentId: currentLevel.id
              });
            }
          }
        } else {
          let folder = currentLevel.children.find(c => c.type === 'folder' && c.name === part);
          if (!folder) {
            folder = {
              id: generateId(),
              name: part,
              type: 'folder',
              children: [],
              parentId: currentLevel.id
            };
            currentLevel.children.push(folder);
          }
          currentLevel = folder;
        }
      }
    });
    setRootNode({ ...newRoot });
  };

  const removeNode = (id: string) => {
    const deleteFromNode = (node: FileNode): FileNode => {
      return {
        ...node,
        children: node.children
          .filter(child => child.id !== id)
          .map(child => deleteFromNode(child))
      };
    };
    setRootNode(deleteFromNode(rootNode));
    setWatchHistory(prev => prev.filter(h => h.videoId !== id));
    setPlaylist(prev => prev.filter(v => v.id !== id));
    setFavorites(prev => prev.filter(v => v.id !== id));
  };

  const updateProgress = (videoId: string, progress: number, duration: number) => {
    setLastPlayedVideoId(videoId);
    setWatchHistory(prev => {
      const filtered = prev.filter(h => h.videoId !== videoId);
      return [{ videoId, progress, duration, lastPlayedAt: Date.now() }, ...filtered];
    });
  };

  const addToPlaylist = (video: VideoItem) => {
    setPlaylist(prev => {
      if (prev.find(v => v.id === video.id)) return prev;
      return [...prev, video];
    });
  };

  const addFolderToPlaylist = (node: FileNode) => {
    const videos: VideoItem[] = [];
    const collect = (n: FileNode) => {
      if (n.videoData) videos.push(n.videoData);
      n.children.forEach(collect);
    };
    collect(node);
    setPlaylist(prev => {
      const newVids = videos.filter(v => !prev.find(p => p.id === v.id));
      return [...prev, ...newVids];
    });
  };

  const removeFromPlaylist = (id: string) => {
    setPlaylist(prev => prev.filter(v => v.id !== id));
  };

  const toggleFavorite = (video: VideoItem) => {
    setFavorites(prev => {
      if (prev.find(v => v.id === video.id)) {
        return prev.filter(v => v.id !== video.id);
      }
      return [...prev, video];
    });
  };

  const location = useLocation();
  const isPlayerOpen = location.pathname.startsWith('/player');

  const getAllVideos = (node: FileNode): VideoItem[] => {
    let videos: VideoItem[] = [];
    if (node.videoData) videos.push(node.videoData);
    node.children.forEach(child => {
      videos = [...videos, ...getAllVideos(child)];
    });
    return videos;
  };

  const allVideos = getAllVideos(rootNode);

  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto bg-white shadow-xl relative overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={
            <Home 
              videos={allVideos} 
              history={watchHistory} 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          } />
          <Route path="/library" element={
            <Library 
              rootNode={rootNode} 
              onAddItems={addItems} 
              onRemoveNode={removeNode}
              currentFolderId={currentFolderId}
              setCurrentFolderId={setCurrentFolderId}
              onAddToPlaylist={addToPlaylist}
              onAddFolderToPlaylist={addFolderToPlaylist}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          } />
          <Route path="/playlist" element={
            <Playlist 
              playlist={playlist} 
              history={watchHistory}
              lastPlayedVideoId={lastPlayedVideoId}
              onRemoveFromPlaylist={removeFromPlaylist}
            />
          } />
          <Route path="/favorites" element={
            <Favorites 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/player/:id" element={
            <Player 
              videos={allVideos} 
              history={watchHistory}
              onUpdateProgress={updateProgress} 
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          } />
        </Routes>
      </div>
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
