export interface Log {
  id: number;
  userId?: number;
  relationId?: number;
  relationType: string;
  relationValue: string;
  additionalData?: object;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
