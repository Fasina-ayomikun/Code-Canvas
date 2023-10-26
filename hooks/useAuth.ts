import axios from "@/config/axios";
import { toggleIsFetchingUserDetails } from "@/redux/slices/loading";
import { setUserDetails } from "@/redux/slices/profile";
import React from "react";
import { useDispatch } from "react-redux";

//TODO: refactor any auth code into this file.
export default () => {
  const dispatch = useDispatch();

  const getUserDetails = async (
    username: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    dispatch(toggleIsFetchingUserDetails());

    setIsLoading(true);
    try {
      const response = await axios().get(`/auth/user-details/${username}`);
      dispatch(setUserDetails(response?.data));
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      dispatch(toggleIsFetchingUserDetails());
    }
  };

  return {
    getUserDetails,
  };
};
