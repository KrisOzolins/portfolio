import { Post } from './post';
import { Comment } from './comment';
import { Log } from './log';

export interface User {
  id: number;
  username?: string;
  email: string;
  password?: string;
  fullName?: string;
  settings: object;
  role?: 'admin' | 'moderator' | 'user';
  verified: boolean;
  token?: string;
  googleId?: string;
  photo?: string;
  currentLoginAt?: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  currentLoginIp?: string;
  signInCount: number;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  slug?: string;
  enable2fa: boolean;
  twoFactorSecret?: string;
  banned: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  posts?: Post[];
  comments?: Comment[];
  logs?: Log[];
}
