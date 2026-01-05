
import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, 
  Search, 
  ChevronLeft, 
  Home as HomeIcon, 
  FolderPlus,
  FileVideo,
  Play,
  Trash2,
  PlusCircle,
  PlayCircle
} from 'lucide-react';
import { FileNode, VideoItem } from '../types';

interface LibraryProps {
  rootNode: FileNode;
  onAddItems: (files: FileList | File[]) => void;
  onRemoveNode: (id: string) => void;
  currentFolderId: string;
  setCurrentFolderId: (id: string) => void;
  onAddToPlaylist: (video: VideoItem) => void;
  onAddFolderToPlaylist: (node: FileNode) => void;
}

const Library: React.FC<LibraryProps> = ({ 
  rootNode, 
  onAddItems, 
  onRemoveNode, 
  currentFolderId, 
  setCurrentFolderId,
  onAddToPlaylist,
  onAddFolderToPlaylist
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const findNode = (node: FileNode, id: string): FileNode | null => {
    if (node.id === id) return node;
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
    return null;
  };

  const currentNode = useMemo(() => findNode(rootNode, currentFolderId) || rootNode, [rootNode, currentFolderId]);

  const handleBack = () => {
    if (currentNode.parentId) {
      setCurrentFolderId(currentNode.parentId);
    }
  };

  const filteredChildren = currentNode.children.filter(child => 
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#F7F9FC]">
      <div className="p-6 bg-white rounded-b-[40px] shadow-sm z-10 sticky top-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {currentFolderId !== 'root' && (
              <div className="flex gap-2">
                <button onClick={handleBack} className="p-2 bg-[#FFF7E1] text-[#FFB300] rounded-xl shadow-sm">
                  <ChevronLeft size={20} strokeWidth={3} />
                </button>
                <button onClick={() => setCurrentFolderId('root')} className="p-2 bg-gray-100 text-gray-500 rounded-xl shadow-sm">
                  <HomeIcon size={20} />
                </button>
              </div>
            )}
            <div className="flex flex-col">
               <span className="text-[10px] text-[#FFB300] font-black uppercase">当前位置</span>
               <h1 className="text-xl font-black text-gray-900 truncate max-w-[140px]">{currentNode.name}</h1>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => fileInputRef.current?.click()} className="bg-blue-500 text-white p-2.5 rounded-2xl shadow-md">
              <FileVideo size={20} />
            </button>
            <button onClick={() => folderInputRef.current?.click()} className="bg-[#4CAF50] text-white p-2.5 rounded-2xl shadow-md">
              <FolderPlus size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索..." className="w-full bg-gray-100 rounded-2xl py-2.5 pl-11 pr-4 font-bold text-sm shadow-inner border-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      <input type="file" ref={fileInputRef} className="hidden" accept="video/*" multiple onChange={(e) => e.target.files && onAddItems(e.target.files)} />
      <input type="file" ref={folderInputRef} className="hidden" webkitdirectory="" onChange={(e) => e.target.files && onAddItems(e.target.files)} />

      <div className="flex-1 overflow-y-auto pt-6 px-4">
        {filteredChildren.length > 0 && (
          <div className="flex items-center justify-between mb-4 px-2">
             <h2 className="text-lg font-black text-gray-800">
                {currentNode.children.some(c => c.type === 'folder') ? '文件夹 shelf' : '视频列表 shelf'}
             </h2>
             {currentNode.type === 'folder' && currentNode.children.length > 0 && (
               <button 
                onClick={() => onAddFolderToPlaylist(currentNode)}
                className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-transform"
               >
                 <PlayCircle size={14} /> 全部添加到播放列表
               </button>
             )}
          </div>
        )}

        {filteredChildren.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Folder size={64} className="mb-4" />
            <p className="font-black text-lg">内容已清空</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-8 gap-5 px-2 scrollbar-hide snap-x">
            {filteredChildren.map((child) => (
              <div key={child.id} className="snap-center shrink-0 w-40 group relative">
                <div 
                  onClick={() => child.type === 'folder' ? setCurrentFolderId(child.id) : navigate(`/player/${child.id}`)}
                  className={`aspect-square rounded-[40px] mb-4 relative overflow-hidden transition-all duration-300 active:scale-90 shadow-lg border-4 border-white ${
                    child.type === 'folder' ? 'bg-[#FFF9E6]' : 'bg-gray-100'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {child.type === 'folder' ? (
                      <Folder size={64} fill="#FFD600" className="text-[#FFB300]" />
                    ) : (
                      <div className="w-full h-full zebra-gradient flex items-center justify-center text-white">
                         <Play size={32} fill="currentColor" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Overlay controls for removal and playlist */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                    onClick={(e) => { e.stopPropagation(); onRemoveNode(child.id); }}
                    className="p-2 bg-red-500 text-white rounded-full shadow-md"
                   >
                      <Trash2 size={12} />
                   </button>
                   {child.type === 'video' && child.videoData && (
                     <button 
                      onClick={(e) => { e.stopPropagation(); onAddToPlaylist(child.videoData!); }}
                      className="p-2 bg-blue-500 text-white rounded-full shadow-md"
                     >
                        <PlusCircle size={12} />
                     </button>
                   )}
                </div>

                <div className="text-center">
                  <p className="text-gray-800 font-black text-sm truncate leading-tight px-2">{child.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default Library;
