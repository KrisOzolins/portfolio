export interface Comment {
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
