/**
 * 공통 타입 정의
 */

// 사용자
export interface User {
  id: string;
  email: string;
  nickname: string;
  profileImage?: string;
  bio?: string;
  website?: string;
  stats?: {
    posts: number;
    followers: number;
    following: number;
  };
  createdAt: string;
  updatedAt: string;
}

// 게시글
export interface Post {
  id: string;
  authorId: string;
  author?: {
    id: string;
    nickname: string;
    profileImage?: string;
  };
  title: string;
  content: string;
  images?: string[];
  tags?: string[];
  stats: {
    likes: number;
    comments: number;
    views?: number;
  };
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

// 댓글
export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    nickname: string;
    profileImage?: string;
  };
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

// 알림
export interface Notification {
  id: string;
  userId: string;
  type: 'system' | 'follow' | 'like' | 'comment';
  title: string;
  message: string;
  actor?: {
    id: string;
    nickname: string;
    profileImage?: string;
  };
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

// 페이지네이션
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
}

// 검색 결과
export interface SearchResult<T> {
  query: string;
  type: 'all' | 'posts' | 'users';
  results: T[];
  pagination: Pagination;
}

// 네비게이션
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Profile: undefined;
  PostDetail: { postId: string };
  UserProfile: { userId: string };
  Settings: undefined;
  EditProfile: undefined;
};
