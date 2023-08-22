import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { login } from '../store/user'

function Auth() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);
    const emptyObj={
    "name":null,
    "username":null,
    "token":null,
    "photo": null,
    "banner": null,
    "id":null,
    "description": '',
    "followers": [],
    "following": []
  }
    useEffect(()=>{
       const info = JSON.parse(localStorage.getItem("userInfo"));
       if(info) dispatch(login(info));
       else dispatch(login(emptyObj));
    },[])
    return(
        user.token ? 
        <Outlet/>: 
        <Navigate to="login" replace={true}/>
    )
}

export default Auth;