import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./slices/profile";
import postSlice from "./slices/post";
import loadingSlice from "./slices/loading";

export default configureStore({
    reducer: {
        profile: profileSlice,
        post: postSlice,
        loading: loadingSlice
    }
})