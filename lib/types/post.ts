import { Comment } from './comment';

export interface PostValues {
  title: string;
  content: string;
  tags: string[];
  archived: boolean;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  archived: boolean;
  slug: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  userId: number | null;
  comments?: Comment[];
}
