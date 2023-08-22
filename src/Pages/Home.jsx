import Navbar from '../Component/Navbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/user'
import { useDispatch } from 'react-redux'
import Tweet from '../Component/Tweet'
import CreateTweet from '../Component/createTweet'
import Loading from '../Component/Loading'

import { useSelector } from 'react-redux'
import { getHome, getOwnTweet } from '../api/requests/requests'

function App() {
  const user = useSelector(state => state.user)
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)

  const [ownTweets, setOwnTweets] = useState([])
  const [ownTweetLoading, setOwnTweetLoading] = useState(true)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const refresh = () => {
    const data ={
      following: user.following
    }
    getHome(setTweets, setLoading);
    getOwnTweet(data,setOwnTweets,setOwnTweetLoading);
  }

  const reloadOperation = async ()=> {
    if (!localStorage.getItem("token")) return navigate("/login")
    const data = await JSON.parse(localStorage.getItem("userInfo"));
    dispatch(login(data));
    refresh()
  }
  
  useEffect(() => {
   reloadOperation();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user.token) return;

  return (
    <div className='flex flex-row'>
    <div>
      <Navbar/>
    </div>
      <div>
      <main className='flex items-start' >
      <div className='' >
        <div className='flex items-end justify-end gap-10' >
          <div id='tweets' className='border-l md:w-[592px] w-full border-l-gray-500 border-r border-r-gray-500 border-opacity-50 self-start flex flex-col items-center' >
            <CreateTweet refresh={refresh} />
            <div className='w-full flex flex-col' >
              <div className='flex justify-center m-2 underline'>
              <span className='font-bold'>Your are following</span>
            </div>
              {ownTweetLoading ?
                <Loading /> :
                ownTweets.map((tweet, index) => {
                  return (
                    <Tweet key={index} id={tweet.user} content={tweet.content} date={tweet.date} />
                  )
                })
              }
            </div>
            <div className='w-full flex flex-col min-h-screen' >
            <div className='flex justify-center m-2 underline'>
              <span className='font-bold'>Suggested Tweets</span>
            </div>
              {loading ?
                <Loading /> :
                tweets.map((tweet, index) => {
                  return (
                    <Tweet key={index} id={tweet.user} content={tweet.content} date={tweet.date} />
                  )
                })
              }
            </div>

          </div>

        </div>
      </div>
    </main >
      </div>
    </div>
   
  )
}

export default App
