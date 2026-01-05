
export interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  category: string;
  addedAt: number;
}

export interface WatchRecord {
  videoId: string;
  lastPlayedAt: number;
  progress: number; // in seconds
  duration: number; // total duration in seconds
}

export interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'video';
  videoData?: VideoItem;
  children: FileNode[];
  parentId: string | null;
}

export type AppTab = 'home' | 'library' | 'playlist' | 'favorites' | 'me';
