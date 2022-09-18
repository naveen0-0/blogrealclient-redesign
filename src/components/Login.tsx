import loginimg from '../images/authen2.svg'
import { useState } from 'react'
import axios from 'axios'
import { SERVER_BASE_URL } from '../constants'
import { authTypes } from '../types/types'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { useNotes } from '../hooks/useNotes'
import { noteTypes } from '../types/types'
import { v4 as uuid } from 'uuid'

export default function Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { loggedIn, authDispatch } = useAuth()
  const { noteDispatch } = useNotes()

  const login = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    let { data } = await axios.post(`${SERVER_BASE_URL}/auth/login`,{ username, password })
    if(data.statusload){
      localStorage.setItem('blogrealauthtoken',data.token)
      authDispatch({type:authTypes.LOGIN, payload:data.user})
      noteDispatch({type:noteTypes.ADDNOTE,payload:{id:uuid(),content:data.msg,errorOrNot:false}})
    }else{
      noteDispatch({type:noteTypes.ADDNOTE,payload:{id:uuid(),content:data.msg,errorOrNot:true}})
    }
  }

  if(loggedIn) return <Navigate to="/"/>

  return (
    <div className="w-[90%] mx-auto">
      <div className='py-12'>

      <div className='hidden'>
        <img src={loginimg} alt="Signup" />
      </div>

      <div>
        <div className='font-anton text-5xl text-center my-4'>Login</div>
        <form
          className='flex flex-col h-60 justify-around' 
          onSubmit={login}>
          <input 
            type="text" 
            required
            placeholder='Enter your username ....'
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="outline-none p-3 rounded-sm bg-slate-900 font-roboto text-slate-300"
          />

          <input 
            type="password" 
            required
            placeholder='Enter your password ....'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="outline-none p-3 rounded-sm bg-slate-900 font-roboto text-slate-300"
          />

          <button
          className='bg-slate-900 text-slate-300 font-roboto px-4 py-2 w-max rounded-full'
          >
            Login
          </button>
        </form>
      </div>
            </div>
    </div>
  )
}
