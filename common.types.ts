import { Session, User } from "next-auth";

export type PostProps = {
  profile: {
    imageUrl: string;
    name: string;
    username: string;
  };
  desc: string;
  imageUrl: string;
  noOfComments: number;
  noOfLikes: number;
  tags: string[];
};
export type SessionType = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  bannerImage?: string;
  username?: string;
  tags?: string[];
  bio?: string;
  expires: string;
};
export type PostCardProps = {
  key: number;
  post: PostProps;
};
