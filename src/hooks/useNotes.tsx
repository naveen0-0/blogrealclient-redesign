import { useContext } from 'react'
import { NoteContext } from '../context/NotificationContext'

export const useNotes = () => {
  const context = useContext(NoteContext)
  if(context === undefined){
    throw new Error("Notification Context Errors");
  }
  return context
}