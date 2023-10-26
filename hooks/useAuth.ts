import axios from "@/config/axios";
import { setUserDetails } from "@/redux/slices/profile";
import { useDispatch } from "react-redux";


//TODO: refactor any auth code into this file.
export default () => {
    const dispatch = useDispatch();

    const getUserDetails = async ({ username }: any) => {
        try {
            const response = await axios().get(`/auth/user-details/${username}`);
            dispatch(setUserDetails(response.data));
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getUserDetails
    }
}