import axios from "axios";

// Replace with the production base url
const baseURL = "http://localhost:3000/api";

export default () => {
    return axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json"
        }
    })
}