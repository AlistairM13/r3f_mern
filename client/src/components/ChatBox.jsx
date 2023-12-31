import { useEffect, useState } from "react"
import { X, SendHorizonal } from "lucide-react"
import io from 'socket.io-client'

import useUserStore from '../../hooks/useUserStore'
import useChatModal from '../../hooks/useChatModal'

const socket = io(
    "https://mern-three-api.onrender.com", {
    withCredentials: true,
})

function Message({ message }) {
    return (
        <li
            className={`
          relative flex flex-col py-1 px-4 rounded-md
          ${message.isSelf ? 'mr-2 self-end bg-orange-300' : 'ml-2 self-start bg-gray-300'}
        `}
        >
            <div className={`absolute top-1 h-4 w-4 rotate-45
            ${message.isSelf ? "-right-1 bg-orange-300" : "-left-1 bg-gray-300"}
            `} />
            {message.isSelf ? null : <span className="font-bold">{message.username}</span>}
            <span>{message.message}</span>
        </li>
    )
}

function ChatBox() {
    const { user } = useUserStore()
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const { onClose } = useChatModal()

    function sendMessage(e) {
        e.preventDefault()
        socket.emit("send_message", { message, userId: user.id, username: user.username })
        setMessages(prev => [...prev, {
            message,
            userId: user.id,
            username: user.username,
            isSelf: true
        }])
        setMessage("")
    }

    useEffect(() => {
        socket.emit("join_room", "global")
        return () => {
            socket.off("receive_message");
        };
    }, [])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages(prev => [...prev, {
                ...data,
                isSelf: message.userid === user.id
            }])
        })

        return () => {
            socket.off("receive_message");
        };
    }, [socket])

    return (
        <div className="bg-orange-300/60 backdrop-blur-sm justify-between md:justify-start w-full rounded-lg flex flex-col gap-2 p-4 h-[90%] md:w-[70%] max-w-2xl">
            <div className="flex justify-between grow-0">
                <h2 className="text-xl font-semibold">Chat <span className="font-normal">({messages.length})</span></h2>
                <button onClick={onClose}><X size={20} color="black" /></button>
            </div>
            <div className="flex flex-col h-[90%] md:h-full w-full rounded-sm border border-gray-400">
                <div className="h-full overflow-y-auto bg-white pt-2">
                    <ul className="flex flex-col gap-1">
                        {messages.map((message, idx) =>
                            <Message key={idx} message={message} />
                        )}
                    </ul>
                </div>
                <form className="border-t-gray-500 border flex" onSubmit={sendMessage}>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Chat publicly as ${user?.username}`} className="grow p-4 shrink" />
                    <button className="p-4 focus:bg-gray-900 bg-black" type="submit" ><SendHorizonal size={20} color="white" /></button>
                </form>
            </div>
        </div>
    )
}

export default ChatBox