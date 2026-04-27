import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const apiClient = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const healthcheck = async() => {
    try {
        return await apiClient.get("/healthcheck").then(res => res.data);
    } catch (e) {
        console.error(e.message);
    }
}

export const analysisCode = async(code) => {
    return await apiClient.post('/analysis', {code}).then(res => res.data).then(res => res.data).catch(e => console.error(e.message)); 
}
