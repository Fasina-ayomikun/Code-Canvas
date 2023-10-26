import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        isLoggedInUser: false,
        userDetails: {},
        sessionUserData: {}
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
    }
});

export const { 
    setIsLoggedInUser, 
    setUserDetails,
    setSessionUserDetails
} = profileSlice.actions;

export default profileSlice.reducer;