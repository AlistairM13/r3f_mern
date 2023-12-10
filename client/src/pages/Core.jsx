import AuthModal from '../components/Modal'
import Navbar from "../components/Navbar"
import ChatBox from '../components/ChatBox'

import useAuthModal from '../../hooks/useAuthModal'
import useChatModal from '../../hooks/useChatModal'

function Core() {
  const { isOpen: isAuthModalOpen } = useAuthModal()
  const { isOpen: isChatOpen } = useChatModal()
  return (
    <>
      {isAuthModalOpen && <AuthModal />}
      <div className="fixed top-0 left-0 bg-gray-900/10 backdrop-blur-sm h-full w-full z-10">
        <div className="h-full max-w-7xl mx-auto p-10">
          <Navbar />
          <div className="h-full flex justify-center items-center">
            {isChatOpen && <ChatBox />}
            {!isChatOpen  && <h1 className="font-kalnia text-center  font-medium text-4xl" >Join the<br />community</h1>}
          </div>
        </div>
      </div>
    </>
  )
}



export default Core