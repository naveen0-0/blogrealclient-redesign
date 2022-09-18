import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useEffect, useState } from "react"
import axios from "axios"
import { SERVER_BASE_URL } from "../constants"
import Spinner from "./Spinner"
import ProfileBlogs from "./ProfileBlogs"

export default function Profile() {
  const { loggedIn, username, email } = useAuth()
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(false)
  
  useEffect(() => {
    getOwnBlogs()
  },[])

  const getOwnBlogs = async () => {
    setLoading(true)
    try {
      let { data } = await axios.get(`${SERVER_BASE_URL}/api/ownblogs`,{ headers : { Authorization : localStorage.getItem('blogrealauthtoken')!}})
      if(data.statusload){
        setBlogs(data.blogs)
      }else{
        setError(true)
      }
    } catch (error) {
      throw new Error("Axios Error Happened");
    }finally{
      setLoading(false)
    }
  }
  
  if(!loggedIn) return <Navigate to="/"/>
  if(error) return <div className="text-center font-anton text-4xl md:text-6xl xl:text-[100px] flex justify-center items-center h-full drop-shadow-3xl">Error</div>

  return (
    <div className="w-[95%] md:w-[80%] mx-auto">

      <div className="bg-slate-900 p-2 my-3 rounded-md shadow-2xl font-roboto flex flex-col md:flex-row items-center">
        <div className="bg-slate-500 text-slate-900 flex justify-center items-center w-[80px] h-[80px] mx-auto rounded-full">{username[0].toUpperCase()}</div>

        <div className="flex-1 my-2 text-center text-xl text-slate-400">
          <div>{username}</div>
          <div>{email}</div>
        </div>
      </div>

      {loading? <Spinner/> : <ProfileBlogs blogs={blogs}/> }

    </div>
  )
}
