import axios from "axios"
const BASE_URL = "https://mern-three-api.onrender.com/api"

export const register = async (userData) => {
    return axios.post(
        `${BASE_URL}/users`,
        userData,
    )
}

export const login = async (userData) => {
    return axios.post(
        `${BASE_URL}/users/login`,
        userData,
    )
}

export const logout = async () => {
    return axios.post(
        `${BASE_URL}/users/logout`,
    )
}

export const updateUserProfile = async (data, token) => {

    return axios.put(
        `${BASE_URL}/users/profile`,
        { ...data },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}