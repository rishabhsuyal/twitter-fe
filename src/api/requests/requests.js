import axios from '../../utils/axios'
import * as url from "../urls";
import { toast } from "react-toastify";

export const loginUser = (data, responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .post(url.LOGIN_USER, data)
        .then(response => {
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            toast.success("Login Successfully");
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(true)
            toast.error("Something went wrong");
            return null
        })
}

// Register a user
export const registerUser = (data, responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .post(url.REGISTER_USER, data)
        .then(response => {
            toast.success("User Registered")
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(true)
            toast.error("Something went wrong");
            return null
        })
}

// Get all tweets
export const getHome = (responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .get(url.GET_HOME)
        .then(response => {
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            toast.error("Something went wrong");
            return null
        })
}
export const getOwnTweet = (data,responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .post(url.GET_OWN_HOME,data)
        .then(response => {
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            toast.error("Something went wrong");
            return null
        })
}

// Get user informations
export const getUser = (data, responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .get(url.GET_USER, {
            params: data
        })
        .then(response => {
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            toast.error("Something went wrong");
            return null
        })
}


// Get tweets of specified user
export const getTweets = (data, responseCB, loadingCB,f1,f2) => {
    console.log("Hi");
    if (loadingCB) loadingCB(true)
    return axios
        .get(url.GET_TWEETS, {
            params: data
        })
        .then(response => {
            console.log(response.data);
            if (responseCB) responseCB(response.data)
            if (loadingCB) loadingCB(false)
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            toast.error("Something went wrong");
            return null
        })
}

// Send a tweet 
export const createTweet = ({ data, token }, responseCB) => {
    return axios
        .post(url.CREATE_TWEET, data, token)
        .then(response => {
            if (responseCB) responseCB(response.data)
            toast.success("Action Completed")
            return response.data
        })
        .catch(err => {
            console.log(err);
            toast.error("Something went wrong");
            return null
        })
}
//Delete Tweet
export const deleteTweet = ({ data, token }, responseCB) => {
    return axios
        .post(url.DELETE_TWEET, data, token)
        .then(response => {
            if (responseCB) responseCB(false);
            toast.success("Tweet deleted");
            return response.data
        })
        .catch(err => {
            console.log(err);
            if (responseCB) responseCB(false);
            toast.error("Something went wrong");
            return null
        })
}

//Edit Tweet
export const editTweet = ({ data, token }, responseCB,editMode) => {
    return axios
        .post(url.EDIT_TWEET, data, token)
        .then(response => {
            if (responseCB) responseCB(false);
            toast.success("Tweet Edited");
            editMode(false);
            return response.data
        })
        .catch(err => {
            console.log(err);
            editMode(false);
            if (responseCB) responseCB(false);
            toast.error("Something went wrong");
            return null
        })
}



// Follow/Unfollow a user
export const followUser = ({ data, token }, responseCB, loadingCB) => {
    if (loadingCB) loadingCB(true)
    return axios
        .post(url.FOLLOW_MANAGER, data, token)
        .then(response => {
            if (loadingCB) loadingCB(false)
            if (responseCB) responseCB(response.data)
            toast.success("Action Completed")
            return response.data
        })
        .catch(err => {
            if (loadingCB) loadingCB(false)
            toast.error("Something went wrong");
            return null
        })
}