import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import heart from '../assets/heart.svg'
import comment from '../assets/comment.svg'
import upload from '../assets/upload.svg'
import retweet from '../assets/retweet.svg'
import Default from '../assets/default.png'
import { useNavigate, Link, useParams } from 'react-router-dom'
import FollowButton from './FollowButton'
import { useSelector } from 'react-redux'
import { getUser, deleteTweet, editTweet } from '../api/requests/requests'
import Loading from './Loading'

function App({ unique_key,id, content, date,refresh, selfMode }) {
    //console.log(unique_key);
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [followers, followersCallback] = useState([])
    const [following, followingCallback] = useState([])
    const [editedTweet,setEditedTweet] = useState(content)
    const [editMode,setEditMod] = useState(false);
    const currentUser = useSelector(state => state.user)
    const randomNumber = () => {
        return Math.floor(Math.random() * (10000 - 1500) + 1500);
    }

    const userManager = async () => {
        const data = await getUser({ id })
        if (data) {
            setUser(data)
            followersCallback(data.followers)
            followingCallback(data.following)
        }
    }

    useEffect(() => {
        if (user) return
        userManager()
    }, [])

    

    const goPage = () => {
        navigate(`/${user.username}`)
    }

    const handleDelete = () =>{
        let bar = window.confirm('Confirm delete');
        if(bar){
            setLoading(true);
            let sendToData = {
                data: {
                    id:unique_key
                },
                token: currentUser.token
            }
            deleteTweet(sendToData,setLoading);
            refresh();
        }  
    }

    const handleEdit = () =>{
        let bar = window.confirm('Confirm Upate');
        if(bar){
            setLoading(true);
            let sendToData = {
                data: {
                    id:unique_key,
                    content:editedTweet
                },
                token: currentUser.token
            }
            editTweet(sendToData,setLoading,setEditMod);
            refresh();
        }  
    }

    if (!user) return;
    if(loading)return <Loading/>
    return (
        <div className='md:!w-[590px] w-full flex items-start justify-center relative px-4 border-b border-b-gray-500 border-opacity-50 pt-5 gap-3 cursor-pointer transition-all hover:bg-blue-100 ' >
            <div className='group w-max relative transition-all' >
                <img src={user?.photo ?? Default} onClick={goPage} width="54" className="rounded-full cursor-pointer" alt="" />
            </div>
            <div className='w-full flex flex-col items-start justify-center pb-3' >
                <div className='flex items-center justify-center gap-1' >
                    <a onClick={goPage} className='font-semibold cursor-pointer hover:underline' > {user?.name} </a>
                    <span className='text-[#54595D]' > @{user?.username} </span>
                    <span className='text-[#54595D]' >4s</span>
                </div>
                {
                    editMode ?
                    <input value={editedTweet}  onChange={(e)=>setEditedTweet(e.target.value)} type="text" className='outline-none rounded h-14 text-lg w-full bg-transparent transition-all focus-within:border-[#1d9bf0] border-2 border-gray-600 border-opacity-50 px-4' placeholder='Tweet' />
                    : <span> {content} </span>
                }
                
                <div className='flex w-full gap-16 mt-4' >
                    <div className='flex items-start justify-center gap-3 group cursor-pointer' >
                        <img src={comment} width="20" alt="" />
                        <span className='text-[#54595D] text-sm !w-9 !max-w-[2.25rem] overflow-hidden transition-all group-hover:text-[#1D9BF0] ' > {randomNumber()} </span>
                    </div>
                    <div className='flex items-center justify-center gap-3 group cursor-pointer hover:underline' >
                       {
                        selfMode && (editMode ?
                        <button onClick={handleEdit}>Save</button>
                        : <button onClick={()=>setEditMod(true)} className=''>Edit</button>)
                       }
                      
                    </div>
                    {
                        selfMode && <div className='hidden rounded-xl md:flex items-start justify-center gap-3 group hover:underline' >
                       <button onClick={handleDelete} className=''>Delete</button>
                    </div>
                    }
                     
                    {
                        selfMode && editMode && <div className='hidden rounded-xl md:flex items-start justify-center gap-3 group hover:underline' >
                       <button onClick={()=>setEditMod(false)} className=''>Cancel</button>
                    </div>
                       }
                      
                </div>
            </div>

        </div>
    )
}

export default App