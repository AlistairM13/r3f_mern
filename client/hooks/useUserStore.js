import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthModal = create(
    persist((set) => ({
        token: null,
        user: null,
        setToken: (token) =>set({ token: token }),
        setUser: (user) => set({ user: user }),
        clearUser: () => set({ user: null }),
    }), {
        name: 'userInfo'
    }))

export default useAuthModal