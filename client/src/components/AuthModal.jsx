import { useState } from 'react'
import { X } from "lucide-react"
import toast from "react-hot-toast"

import useAuthModal from "../../hooks/useAuthModal"
import useUserStore from '../../hooks/useUserStore'
import { login, register } from "../../actions/user-actions"

export default function AuthModal() {
  const { isOpen, onClose } = useAuthModal()
  const { setUser: setUserToStore, setToken } = useUserStore()

  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState({ username: "", email: "", password: "" })

  const onChangeHandler = (event) => {
    const property = event.target.id
    setUser(prev => ({ ...prev, [property]: event.target.value }))
  }

  async function submitForm(event) {
    event.preventDefault()
    try {
      let userResponse
      if (isLogin) {
        userResponse = await login(user)
      } else {
        userResponse = await register(user)
      }
      setUserToStore(userResponse.data.user)
      setToken(userResponse.data.token)
    } catch (err) {
      let error = "Something went wrong"
      if (err.name === "AxiosError") {
        error = err.response.data.message
      }
      toast.error(error)
    } finally {
      onClose()
    }
  }
  return (
    <>
      <div className="fixed h-full w-full  top-0 left-0 z-20 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed h-full w-full top-0 left-0 z-20 flex justify-center items-center" open={isOpen} onClose={onClose}>
        <form className="bg-white rounded-t-3xl p-4  w-full h-fit md:rounded-3xl md:p-8 md:w-1/3 flex  flex-col justify-center gap-2 self-end md:self-auto">
          <div className="mb-3 mt-2 flex justify-between items-center">
            <h2 className="font-bold text-xl">{isLogin ? "Login" : "Register"}</h2>
            <button onClick={onClose}><X size={24} color="black" /></button>
          </div>
          {!isLogin && <>
            <label htmlFor="username">Username</label>
            <input id="username" value={user.username} onChange={onChangeHandler} placeholder="Your username here" className="ring-1 rounded-sm p-2 mb-4" />
          </>
          }
          <label htmlFor="email">Email</label>
          <input id="email" value={user.email} onChange={onChangeHandler} placeholder="Your email here" type="email" className="ring-1  rounded-sm p-2 mb-4" />
          <label htmlFor="password">Password</label>
          <input id="password" value={user.password} onChange={onChangeHandler} placeholder="Your password here" type="password" className="ring-1 rounded-sm p-2 mb-4" />
          <p
            onClick={() => setIsLogin(!isLogin)}
            className="mb-3"
          >
            {isLogin ? "First time here?" : "Already have an account?"}&nbsp;
            <span
              className="font-bold cursor-pointer hover:underline"
            >{isLogin ? "Register" : "Login"}
            </span>
          </p>

          <button className="bg-black hover:bg-gray-900 focus:ring-4 focus:ring-gray-500  p-3 text-white rounded-lg" type="submit" onClick={submitForm}>{isLogin ? "Login" : "Register"}</button>
        </form>
      </div>
    </>
  )
}