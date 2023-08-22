import logo from '../assets/logo.png'
import HomeLogo from '../assets/home.svg'
import HashLogo from '../assets/hashtag.svg'
import NotificationLogo from '../assets/notification.svg'
import DMlogo from '../assets/message.svg'
import Profile from '../assets/profile.svg'
import More from '../assets/more.svg'
import Bookmark from '../assets/bookmark.svg'
import List from '../assets/list.svg'
import Default from '../assets/default.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    
    const handleLogout =()=>{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <header className='bg-blue-200 flex p-5' >
            <div className="flex flex-col items-start justify-start gap-8 h-screen md:pr-8" >
                <img src={logo} width='30' className='mt-3 ml-4 mb-4' alt="" />
                <NavLink to="/home" className="nav-link flex gap-4" >
                    <img src={HomeLogo} width="30" alt="" />
                    <span>Home</span>
                </NavLink>
                <NavLink to="#" className="nav-link flex  gap-4" >
                    <img src={HashLogo} width="30" alt="" />
                    <span>Discover</span>
                </NavLink>
                <NavLink to="#" className="nav-link flex gap-4" >
                    <img src={NotificationLogo} width="30" alt="" />
                    <span>Notifications</span>
                </NavLink>
                <NavLink to="#" className="nav-link flex gap-4" >
                    <img src={DMlogo} width="30" alt="" />
                    <span>Messages</span>
                </NavLink>

                <a href='#' className='bg-[#1d9bf0] hover:bg-[#1A8CD8] transition-all w-60 h-12 hidden md:flex items-center justify-center rounded-3xl mt-3' >
                    <span className='font-bold text-lg' >Tweeter</span>
                </a>
                <div>
                <button onClick={handleLogout} className='font-bold text-lg' >Logout</button>
                </div>
                <div onClick={()=>user?.username ? navigate(`/${user.username}`) : navigate(`/login`)} className='flex items-center justify-start mt-auto mb-1 relative bottom-3 px-4 py-2 cursor-pointer gap-3 hover:bg-blue-500 transition-all rounded-[30px] w-full' >
                    <img src={user?.photo ? user?.photo : Default} width="40" className='rounded-full' alt="" />
                    <div className='hidden md:flex flex-col items-start justify-start' >
                        <span className='font-bold' > {user?.name} </span>
                        <span className='text-sm text-gray-500' > @{user?.username} </span>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default App