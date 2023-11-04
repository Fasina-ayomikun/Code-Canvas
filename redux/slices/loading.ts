import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isUserPostLoading: false,
        isFetchingUserDetails: false,
        isLoadingFollowing: false
    },
    reducers: {
        toggleIsUserPostLoading(state) {
            state.isUserPostLoading = !state.isUserPostLoading;
        },
        toggleIsFetchingUserDetails(state) {
            state.isFetchingUserDetails = !state.isFetchingUserDetails;
        },
        toggleIsLoadingFollowing(state) {
            state.isLoadingFollowing = !state.isLoadingFollowing;
        }
    }
})

export const { 
    toggleIsUserPostLoading, 
    toggleIsFetchingUserDetails,
    toggleIsLoadingFollowing
} = loadingSlice.actions;

export default loadingSlice.reducer;