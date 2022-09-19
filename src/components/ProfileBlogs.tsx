import { Link } from "react-router-dom"
import { TbEdit } from 'react-icons/tb'
import { MdDelete } from 'react-icons/md'
import { BiLinkExternal } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

type BlogType = {
  url : string,
  title : string,
  description : string,
  _id:string
}


export default function ProfileBlogs({ blogs }:any) {
  return (
    <div>
      <div className="font-anton text-3xl text-center">Your Blogs</div>
      {blogs.map((blog:BlogType) => <Blog blog={blog} key={blog._id}/>)}
    </div>
  )
}


const Blog = ({ blog }:{ blog:BlogType }) => {

  const goto = useNavigate()

  const editBlog = () => {
    console.log("Blog Edited")
  }

  const deleteBlog = () => {
    console.log("Blog Deleted")
  }


  return (
      <div className="bg-slate-900 my-3 rounded-md shadow-2xl font-roboto">
        <div>
          <img src={blog.url} alt={blog.title} className="w-full h-[100px] object-cover rounded-t-md"/>
        </div>

        <div className="px-2">
          <div className="my-2 text-2xl truncate text-slate-400">{blog.title}</div>
          <div className="my-2 text-md truncate text-slate-500">{blog.description}</div>
        </div>

        <div className="p-2 flex">
          <button onClick={() => goto(`/${blog._id}`)} title="Go to Blog" className="hover:bg-slate-800 rounded-full p-2"><BiLinkExternal size={20} color="#64748B"/></button>
          <button onClick={() => goto(`/edit/${blog._id}`)} title="Edit" className="ml-4 hover:bg-slate-800 rounded-full p-2"><TbEdit size={22} color="#64748B"/></button>
          <button title="Delete" onClick={deleteBlog} className="ml-4 hover:bg-slate-800 rounded-full p-2"><MdDelete size={22} color="#64748B"/></button>
        </div>
      </div>
  )
}