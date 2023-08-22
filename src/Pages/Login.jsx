import Logo from '../assets/logo.png'
import Google from '../assets/google.png'
import Apple from '../assets/apple.svg'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/user'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import { loginUser } from '../api/requests/requests'

function App() {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [next, setNext] = useState(false)
    const [username, setName] = useState(null)
    const [password, setPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        if (localStorage.getItem("token")) return navigate("/home")
    }, [user])

    const auth = () => {
        if (loading) return
        if (!username || !password) return;
        let sendToData = {
            username: username,
            password: password
        }
        const response = (data) => {
            dispatch(login(data))
            navigate("/home")
        }
        loginUser(sendToData, response, setLoading)
    }
   
    return (
        <div className='w-full h-screen flex items-center justify-center' >

            {next ?
                <div className='w-[300px] flex flex-col items-center justify-center gap-6' >
                    <img src={Logo} width="30" alt="" />
                    <span className='text-3xl font-bold' >enter your password</span>
                    <div type="text" className=' flex flex-col items-start justify-center rounded h-14 text-lg w-full opacity-50 border-2 border-gray-600 border-opacity-50 px-4'>
                        <span className='text-xs' >User name</span>
                        <span> {username} </span>
                    </div>
                    <input autoFocus onKeyUp={e => e.key == 'Enter' ? auth() : false} onInput={e => setPassword(e.target.value)} type="password" className='outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4' placeholder='Password' />
                    <button onClick={auth} className='w-full h-10 flex font-bold items-center justify-center gap-4 bg-white text-black rounded-3xl transition-all hover:bg-[#E6E6E6] ' >
                        {loading ?
                            <div className='w-4 h-4 border-gray-600 border-2 border-t-[#1d9bf0] rounded-full animate-spin ' ></div> :
                            <span>Login</span>
                        }
                    </button>
                </div>

                :

                <div className='w-[300px] flex flex-col items-center justify-center gap-6' >
                    <img src={Logo} width="30" alt="" />
                    <span className='text-3xl font-bold' >Login to twitter</span>
                    
                    <Link to="/register" className='w-full h-10 flex items-center justify-center gap-4 bg-[#1d9bf0] text-white rounded-3xl transition-all hover:bg-[#1A8CD8]' >
                        <span>Register with e-mail address</span>
                    </Link>
                    <div className='flex items-center justify-center w-full gap-3' >
                        <div className='h-[1px] bg-gray-500 bg-opacity-50 w-full' ></div>
                        <span>OR</span>
                        <div className='h-[1px] bg-gray-500 bg-opacity-50 w-full' ></div>
                    </div>
                    <input onKeyUp={e => e.key == 'Enter' ? setNext(true) : false} onInput={e => setName(e.target.value)} type="text" className='outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4' placeholder='User name' />
                    <button onClick={() => username ? setNext(true) : false} className='w-full h-10 flex items-center justify-center gap-4 bg-blue-500 text-black rounded-3xl transition-all hover:bg-[#E6E6E6] ' >
                        <span>Next</span>
                    </button>
                    <button className='w-full h-10 flex items-center justify-center gap-4 bg-black text-white border-2 transition-all hover:bg-[#181919] border-gray-600 border-opacity-50 rounded-3xl' >
                        <span>Forgot Password?</span>
                    </button>
                </div>

            }

        </div>
    )
}

export default App