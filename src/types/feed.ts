export interface FeedPost {
  id: string;
  blogProfile: {
    profilePic: string;
    name: string;
    jobTitle: string;
    location: string;
    email: string;
  };
  user: {
    avatar: string;
  };
  title: string;
  content: string;
  image?: string;
  mentions?: string[];
  timestamp: string | Date;
  likes: number;
  comments: number;
  reposts: number;
  shares: number;
}
