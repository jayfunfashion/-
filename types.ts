
export interface VideoItem {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  category: string;
  addedAt: number;
}

export type AppTab = 'home' | 'library' | 'me';
