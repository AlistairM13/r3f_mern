import axios from "axios"
const BASE_URL = "https://mern-three-api.onrender.com/api"


export const register = async (userData) => {
    return axios.post(
        `${BASE_URL}/users`,
        userData,
        { withCredentials: true }
    )
}

export const login = async (userData) => {
    return axios.post(
        `${BASE_URL}/users/login`,
        userData,
        { withCredentials: true }
    )
}

export const logout = async () => {
    return axios.post(
        `${BASE_URL}/users/logout`,
        { withCredentials: true }
    )
}

export const updateUserProfile = async (data) => {
    return axios.put(
        `${BASE_URL}/users/profile`,
        { ...data },
        { withCredentials: true }
    )
}