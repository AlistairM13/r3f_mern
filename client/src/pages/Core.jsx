import AuthModal from '../components/AuthModal'
import Navbar from "../components/Navbar"
import ChatBox from '../components/ChatBox'
import ProfileModal from "../components/ProfileModal"

import useAuthModal from '../../hooks/useAuthModal'
import useChatModal from '../../hooks/useChatModal'
import useUserStore from '../../hooks/useUserStore'
import useProfileModal from '../../hooks/useProfileModal'

function Core() {
  const { user } = useUserStore()
  const { isOpen: isAuthModalOpen } = useAuthModal()
  const { isOpen: isChatOpen } = useChatModal()
  const { isOpen: isProfileModalOpen } = useProfileModal()

  return (
    <>
      {isAuthModalOpen && <AuthModal />}
      {isProfileModalOpen && <ProfileModal />}
      <div className="fixed top-0 left-0 bg-gray-900/10 backdrop-blur-sm h-full w-full z-10">
        <div className="h-full max-w-7xl mx-auto p-6 pb-16 md:px-10 ">
          <Navbar />
          <div className="h-full flex justify-center items-center">
            {isChatOpen && <ChatBox />}
            {!user && <h1 className="font-kalnia text-center  font-medium text-4xl" >Join the<br />community</h1>}
            {user && !isChatOpen && <h1 className="font-merriweather text-center  font-black text-4xl" ><span className="font-normal text-3xl">Welcome,</span><br /> {user.username}</h1>}
          </div>
        </div>
      </div>
    </>
  )
}



export default Core