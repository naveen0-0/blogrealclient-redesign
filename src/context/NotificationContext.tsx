import { createContext } from 'react'

type Notification = {
  id:string
  content : string,
  errorOrNot:boolean
}

type InitialValueType = {
  notifications : Notification[],
  noteDispatch:({type,payload}:{ type:string, payload:Notification}) => null
}

export const initialValue = {
  notifications : [],
  noteDispatch:() => null
}

export const NoteContext = createContext<InitialValueType>(initialValue);