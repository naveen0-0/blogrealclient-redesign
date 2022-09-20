import { TbEdit } from 'react-icons/tb'
import { MdDelete } from 'react-icons/md'
import { BiLinkExternal } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { noteTypes } from '../types/types'
import { useNotes } from '../hooks/useNotes'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { SERVER_BASE_URL } from '../constants'

type BlogType = {
  url : string,
  title : string,
  description : string,
  _id:string
}


export default function ProfileBlogs({ blogs, setBlogs }:any) {
  const [modalActive, setModalActive] = useState(false)

  return (
    <div>
      <div className="font-anton text-3xl text-center">Your Blogs</div>
      <div>
        {blogs.map((blog:BlogType) => <Blog blog={blog} key={blog._id} setModalActive={setModalActive} modalActive={modalActive} setBlogs={setBlogs}/>)}
      </div>
    </div>
  )
}


const Blog = ({ blog, setModalActive, modalActive, setBlogs }:{ blog:BlogType, setModalActive:any, modalActive:boolean, setBlogs:any }) => {

  const [showModal, setShowModal] = useState(false)
  const [btnDis, setBtnDis] = useState(false)
  const { noteDispatch } = useNotes()

  useEffect(() => {
    setModalActive(showModal)
  },[showModal])

  const goto = useNavigate()

  const openModal = () => setShowModal(!showModal)
  const deleteBlog = async (id:string) => {
    setBtnDis(true)
    try {
      let { data } = await axios.delete(`${SERVER_BASE_URL}/api/blog/delete/${id}`,{ headers : { Authorization : localStorage.getItem('blogrealauthtoken')!}})
      if(data.statusload){
        setBlogs((prev:BlogType[]) => prev.filter((prevBlog:BlogType) => prevBlog._id !== id))
        noteDispatch({type:noteTypes.ADDNOTE,payload:{id:uuid(),content:"Blog Delete SuccessFully",errorOrNot:false}})
      }else{
        noteDispatch({type:noteTypes.ADDNOTE,payload:{id:uuid(),content:"Error Deleting The Blog",errorOrNot:true}})
      }
    } catch (error) {
      noteDispatch({type:noteTypes.ADDNOTE,payload:{id:uuid(),content:"Error Making The Delete Request",errorOrNot:true}})
    }finally{
      setBtnDis(false)
      setShowModal(false)
    }
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
          <button title="Delete" disabled={modalActive} onClick={openModal} className={`${modalActive?'cursor-not-allowed':'hover:bg-slate-800'} ml-4 rounded-full p-2`}><MdDelete size={22} color="#64748B"/></button>
        </div>

        {showModal&&
          <div className='text-center p-4 z-20 cursor-default bg-slate-500 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] md:w-[80%] xl:w-[500px] shadow-slate-900 shadow-md rounded-md'>
            <div className='text-2xl py-1'>{blog.title}</div>
            <div className='text-xl py-1'>Are you sure you want to delete this blog?</div>
            <div className='flex flex-col md:flex-row justify-around py-2 h-32 md:h-max'>
              <button disabled={btnDis} onClick={() => deleteBlog(blog._id)} className={`${btnDis&&'cursor-not-allowed'} outline-none bg-red-500 px-4 py-1 rounded-full shadow-slate-900 shadow-sm`}>Yes</button>
              <button disabled={btnDis} onClick={() => setShowModal(false)} className={`${btnDis&& 'cursor-not-allowed'} outlie-none bg-green-500 px-4 py-1 rounded-full shadow-slate-900 shadow-sm`}>No</button>
            </div>
          </div>
        } 
      </div>
  )
}