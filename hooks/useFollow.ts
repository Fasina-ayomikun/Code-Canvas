import axios from "@/config/axios";
import { toggleIsLoadingFollowing } from "@/redux/slices/loading";
import { setFollow, setIsFollowing } from "@/redux/slices/profile";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();

  const toggleFollow = async ({
    followerId,
    followingId,
  }: {
    followerId: string;
    followingId: string;
  }) => {
    try {
      const response = await axios().post("/follow/toggle", {
        followerId,
        followingId,
      });

      console.log(response);
      return response;
    } catch (error) {
      throw new Error((<Error>error).message);
    }
  };

  const isFollowing = async ({
    followerId,
    followingId,
  }: {
    followerId: string;
    followingId: string;
  }) => {
    dispatch(toggleIsLoadingFollowing());

    try {
      const response = await axios().get(
        `/follow/${followerId}/isFollowing/${followingId}`
      );

      if (response.data) {
        dispatch(setIsFollowing(true));
      }
    } catch (error) {
      throw new Error((<Error>error).message);
    } finally {
      dispatch(toggleIsLoadingFollowing());
    }
  };

  const getUserFollowersAndFollowing = async ({ id }: { id: string }) => {
    try {
      const response = await axios().get(`/follow/${id}`);

      dispatch(setFollow(response.data));
    } catch (error) {
      throw new Error((<Error>error).message);
    }
  };

  return {
    toggleFollow,
    isFollowing,
    getUserFollowersAndFollowing,
  };
};
