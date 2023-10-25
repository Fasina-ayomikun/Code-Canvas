import { Session, User } from "next-auth";

export type PostProps = {
  _id: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  desc: string;
  image: string;
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
  fetchPosts: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;

  setPostToEdit: React.Dispatch<React.SetStateAction<PostProps | null>>;

  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
