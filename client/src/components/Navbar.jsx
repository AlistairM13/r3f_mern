import toast from "react-hot-toast"

import { logout } from "../../actions/user-actions"
import useUserStore from '../../hooks/useUserStore'
import useAuthModal from '../../hooks/useAuthModal'
import useChatModal from '../../hooks/useChatModal'


export default function Navbar() {
    const { onOpen } = useAuthModal()
    const { isOpen, onOpen: openChat, onClose: closeChat } = useChatModal()
    const { user, clearUser } = useUserStore()

    async function authHandler() {
        if (user) {
            closeChat()
            try {
                const response = await logout()
                if (response.status === 200) {
                    clearUser()
                } else {
                    throw new Error()
                }
            } catch (err) {
                let error = "Something went wrong"
                if (err.name === "AxiosError") {
                    error = err.response.data.message
                }
                toast.error(error)
            }
        } else {
            onOpen()
        }
    }

    return (
        <nav className="rounded-xl flex bg-orange-300/50 backdrop-blur-sm p-4 justify-between w-full ml-auto">
            <h2 className="text-xl font-bold">Logo</h2>
            <ul className="flex text-xl gap-2">
                {user && !isOpen && <li className="cursor-pointer" onClick={openChat}>Chat</li>}
                <li className="cursor-pointer" onClick={authHandler}>{user ? "Logout" : "Login"}</li>
            </ul>
        </nav>
    )
}