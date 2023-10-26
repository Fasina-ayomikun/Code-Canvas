import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isUserPostLoading: false,
        isFetchingUserDetails: false
    },
    reducers: {
        toggleIsUserPostLoading(state) {
            state.isUserPostLoading = !state.isUserPostLoading;
        },
        toggleIsFetchingUserDetails(state) {
            state.isFetchingUserDetails = !state.isFetchingUserDetails;
        }
    }
})

export const { toggleIsUserPostLoading, toggleIsFetchingUserDetails } = loadingSlice.actions;

export default loadingSlice.reducer;