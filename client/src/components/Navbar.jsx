import toast from "react-hot-toast"
import { Menu, X } from "lucide-react"

import { logout } from "../../actions/user-actions"
import useProfileModal from "../../hooks/useProfileModal"
import useUserStore from '../../hooks/useUserStore'
import useAuthModal from '../../hooks/useAuthModal'
import useChatModal from '../../hooks/useChatModal'
import { useState } from "react"


export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const { onOpen } = useAuthModal()

    const { isOpen: isChatOpen, onOpen: openChat, onClose: closeChat } = useChatModal()
    const { isOpen: isProfileOpen, onOpen: openProfile, onClose: closeProfile } = useProfileModal()
    const { user, clearUser } = useUserStore()

    function chatClickHandler(){
        setNavbarOpen(false)
        openChat()
    }

    function profileClickHandler(){
        setNavbarOpen(false)
        openProfile()
    }

    async function authHandler() {
        if (user) {
            closeChat()
            closeProfile()
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
        <>
            <nav className="rounded-xl uppercase flex items-center bg-orange-300/50 backdrop-blur-sm p-4 justify-between w-full ml-auto">
                <h2 className="text-2xl font-bold tracking-wide">LOGO</h2>
                <ul className="hidden md:flex text-lg items-center gap-4">
                    {user && !isChatOpen && <li className="cursor-pointer hover:underline" onClick={openChat}>Chat</li>}
                    {user && !isProfileOpen && <li className="cursor-pointer hover:underline" onClick={openProfile}>Profile</li>}
                    <li className="cursor-pointer hover:underline" onClick={authHandler}>{user ? "Logout" : "Login"} </li>
                </ul>
                <div className="block md:hidden">
                    <button onClick={() => setNavbarOpen(!navbarOpen)}>
                        {navbarOpen ? <X size={20} color="black" /> : <Menu size={20} color="black" />}
                    </button>
                </div>
            </nav>

            <div className={navbarOpen ? "fixed z-30 left-0 top-0 w-[60%] h-full bg-orange-300 border-r border-r-orange-400 ease-in-out duration-500" : "fixed left-[-100%]"}>
                <h2 className="m-4 mt-8 text-2xl font-bold tracking-wide">LOGO</h2>
                <ul className="pt-10 uppercase">
                    {user && !isChatOpen && <li className="p-4 mx-2  border-b-black border-b cursor-pointer hover:underline" onClick={chatClickHandler}>Chat</li>}
                    {user && !isProfileOpen && <li className="p-4 mx-2 border-b-black border-b  cursor-pointer hover:underline" onClick={profileClickHandler}>Profile</li>}
                    <li className="p-4 mx-2 border-b-black border-b  cursor-pointer hover:underline" onClick={authHandler}>{user ? "Logout" : "Login"} </li>
                </ul>
            </div>
        </>
    )
}