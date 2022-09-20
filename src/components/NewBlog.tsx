import { useState, useEffect } from 'react'
import axios from 'axios'
import { MdCloudUpload } from 'react-icons/md'
import { SERVER_BASE_URL } from '../constants'
import { noteTypes } from '../types/types'
import { v4 as uuid } from 'uuid'
import { useNotes } from '../hooks/useNotes'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

export default function NewBlog() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [keyword1, setKeyword1] = useState("")
  const [keyword2, setKeyword2] = useState("")
  const [keyword3, setKeyword3] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [btnDis, setBtnDis] = useState(false)
  const { noteDispatch } = useNotes()
  const { loggedIn } = useAuth()

  useEffect(() => {
    if(files?.length === 1){
      setImgUrl(URL.createObjectURL(files[0]))
    }
  },[files])

  const createBlog = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBtnDis(true)
    if(files!==null){
      const formData = new FormData()
      formData.append('file',files[0])
      formData.append("upload_preset", "blogreal")
      formData.append("cloud_name","ddwkg0hpz")

      axios.post('https://api.cloudinary.com/v1_1/ddwkg0hpz/image/upload',formData)
      .then(async ({ data }) => {
        try {
          let res = await axios.post(`${SERVER_BASE_URL}/api/newblog`,{ title, description, keyword1, keyword2, keyword3, url:data.secure_url },{ headers : { Authorization : localStorage.getItem('blogrealauthtoken')!}})
          if(res.data.statusload){
            setTitle("");setDescription("");setKeyword1("");setKeyword2("");setKeyword3("");setFiles(null);
            noteDispatch({type:noteTypes.ADDNOTE,payload:{id:uuid(),content:res.data.msg,errorOrNot:false}})
          }else{
            noteDispatch({type:noteTypes.ADDNOTE,payload:{id:uuid(),content:res.data.msg,errorOrNot:true}})
          }
        } catch (error) {
          noteDispatch({type:noteTypes.ADDNOTE,payload:{id:uuid(),content:"Error Creating Blog",errorOrNot:true}})
        }
      })
      .catch(() => noteDispatch({type:noteTypes.ADDNOTE,payload:{id:uuid(),content:"Error Uploading Image",errorOrNot:true}}))
      .finally(() => setBtnDis(false))
    }
  }

  if(!loggedIn) return <Navigate to="/"/>

  return (
    <div className="mx-auto w-[95%] md:w-[80%]">
      <div
        className='font-anton text-3xl text-center m-3'
      >Create A New Blog</div>

        {imgUrl  && (
          <img src={imgUrl} alt="Upload Image Preview" className='mx-auto' title='Selected Image Preview'/>
        )}

      <form
        onSubmit={createBlog}
        className='flex flex-col justify-around'
      >

        <label htmlFor="file-input" className='cursor-pointer my-1 outline-none p-3 font-roboto rounded-sm bg-slate-900 text-slate-300'>
          <span className='flex items-center'>
            <MdCloudUpload size={24}/>
            <div className='ml-2'>Choose a image</div>
          </span>
          <input
            id='file-input'
            type="file" 
            placeholder='Title'
            className='hidden pointer-events-none'
            onChange={(e) => setFiles(e.target.files)}
            accept="image/*"
          />
        </label>
        <input 
          type="text" 
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className='my-1 outline-none p-3 font-roboto rounded-sm bg-slate-900 text-slate-300'
        />
        <textarea 
          placeholder='Description'
          cols={30} 
          rows={5}
          value={description}
          onChange={e => setDescription(e.target.value)}
          className='my-1 resize-none outline-none p-3 font-roboto rounded-sm bg-slate-900 text-slate-300'
          required
        ></textarea>

          <input 
            type="text" 
            placeholder='Keyword 1'
            value={keyword1}
            onChange={e => setKeyword1(e.target.value)}
            required
            maxLength={15}
            className='my-1 outline-none p-3 font-roboto rounded-sm bg-slate-900 text-slate-300'
            />
          <input 
            type="text" 
            placeholder='Keyword 2'
            value={keyword2}
            onChange={e => setKeyword2(e.target.value)}
            required
            maxLength={15}
            className='my-1 outline-none p-3 font-roboto rounded-sm bg-slate-900 text-slate-300'
            />
          <input 
            type="text" 
            placeholder='Keyword 3'
            value={keyword3}
            onChange={e => setKeyword3(e.target.value)}
            required
            maxLength={15}
            className='my-1 outline-none p-3 font-roboto rounded-sm bg-slate-900 text-slate-300'
          />

        <button
          disabled={btnDis}
          className='flex items-center bg-slate-900 my-1 w-max px-4 py-2 font-roboto rounded-full text-slate-400 hover:text-slate-100'
        >
          <div>Create</div>
            {!btnDis &&
              <div className='ml-2'>
               <BsFillArrowRightCircleFill/>
              </div>
            }
        </button>
      </form>
    </div>
  )
}
