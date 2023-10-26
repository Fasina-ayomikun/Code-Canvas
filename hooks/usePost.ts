import axios from "@/config/axios";
import { toggleIsLoading } from "@/redux/slices/loading";
import { setPosts } from "@/redux/slices/post";
import { useDispatch } from "react-redux";

//TODO: add all posts relating api to this file.
export default () => {

    const dispatch = useDispatch()

    const fetchUserPost = async ({ userId }: { userId: string }) => {
        dispatch(toggleIsLoading());
        console.log("fetching ==================")
        try {
            const response = await axios().get(`/create-post/user/${userId}`);
            console.log(response);
            dispatch(setPosts(response.data));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(toggleIsLoading());
        }
    }

    return {
        fetchUserPost
    }
}