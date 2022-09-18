import { useEffect } from 'react'
import { useNotes } from '../hooks/useNotes'
import { noteTypes } from '../types/types'
import { ImCross } from 'react-icons/im'
import { HiCheckCircle } from 'react-icons/hi'

export default function Notification({ note }:any) {
    const { noteDispatch } = useNotes()

  useEffect(() => {
    setTimeout(() => {
      noteDispatch({ type : noteTypes.REMOVENOTE, payload:note.id })
    },3000)
  },[])
  
  return (
    <div 
      className={`border-4 ${note.errorOrNot? 'border-red-500 bg-red-400' : 'border-green-500 bg-green-400' } p-2 my-1 text-slate-900 rounded-sm font-roboto flex justify-around items-center`}>
      <button onClick={() => noteDispatch({ type : noteTypes.REMOVENOTE, payload:note.id })} title="Close Note">
        {note.errorOrNot? <ImCross /> : <HiCheckCircle size={28}/>}
      </button>
      <div className='flex-1 ml-2'>{note.content}</div>
    </div>
  )
}
