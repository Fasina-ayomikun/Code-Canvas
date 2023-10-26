import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isLoading: false,
    },
    reducers: {
        toggleIsLoading(state) {
            state.isLoading = !state.isLoading;
        }
    }
})

export const { toggleIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;