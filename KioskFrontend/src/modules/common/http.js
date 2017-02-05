import axios from "axios";

console.log(process.env);
export const HttpClient = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
    headers: {"Content-Type":"application/json"}
});
