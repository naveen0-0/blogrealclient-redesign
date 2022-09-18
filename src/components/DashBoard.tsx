import axios from "axios"
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { SERVER_BASE_URL } from "../constants"
import Spinner from '../components/Spinner'

type Blog = {
  username : string,
  title:string,
  description:string,
  keyword1:string,
  keyword2:string,
  keyword3:string,
  url:string,
  _id:string
}

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogs()
  },[])

  const getBlogs = async () => {
    setLoading(true)
    let { data } = await axios.get(`${SERVER_BASE_URL}/api/allblogs`)
    setBlogs(data.blogs)
    setLoading(false)
  }

  if(loading) return <Spinner/>
  
  return (
    <div className="m-3">
      {blogs.map(blog => <Blog key={blog._id} blog={blog}/>)}
    </div>
  )
}



function Blog({ blog }:{blog:Blog}) {
  return (
    <Link to={`/${blog._id}`}>
      <div className="rounded-md bg-slate-900 my-3 flex flex-col md:flex-row text-slate-400 shadow-xl shadow-slate-800 md:h-[180px] ">

        <div className="md:w-[200px] overflow-hidden h-40 md:h-full">
          <img 
            src={blog.url} 
            alt={blog.title} 
            className="rounded-t-md md:rounded-none md:rounded-l-md md:h-full object-cover w-full hover:scale-110 transition-all ease-out" 
          />
        </div>

        <div className="flex-1 font-roboto flex-col justify-around p-3 truncate">

          <div className="py-1 text-3xl">{blog.title}</div>

          <div className="py-1 text-md text-slate-500">{blog.description}</div>

          <div className='text-slate-400 flex flex-col md:flex-row font-roboto justify-around md:items-center md:justify-start flex-wrap'>
            <div>
              <span>#</span>
              {blog.keyword1}
            </div>
            <div className='md:ml-4'>
              <span>#</span>
              {blog.keyword2}
            </div>
            <div className='md:ml-4'>
              <span>#</span>
              {blog.keyword3}
            </div>
          </div>

          <div className="pt-1">
            {blog.username}
          </div>

        </div>
        
      </div>
    </Link>
  )
}
