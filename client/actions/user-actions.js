import axios from "axios"
const BASE_URL = "http://localhost:5000/api"

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