export interface BasePost {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

export interface PostsProps {
  posts: BasePost[];
}

export interface PostProps {
  post: BasePost;
}
