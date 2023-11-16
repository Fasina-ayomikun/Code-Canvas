import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoggedInUser: false,
    userDetails: {},
    sessionUserData: {},
    isFollowing: false,
    isFollowingId: "",
    follow: {},
  },
  reducers: {
    setIsLoggedInUser(state, action) {
      state.isLoggedInUser = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setSessionUserDetails(state, action) {
      state.sessionUserData = action.payload;
    },
    setIsFollowing(state, action) {
      state.isFollowing = action.payload;
    },
    setIsFollowingId(state, action) {
      state.isFollowingId = action.payload;
    },
    setFollow(state, action) {
      state.follow = action.payload;
    },
  },
});

export const {
  setIsLoggedInUser,
  setUserDetails,
  setSessionUserDetails,
  setIsFollowing,
  setFollow,
  setIsFollowingId,
} = profileSlice.actions;

export default profileSlice.reducer;
