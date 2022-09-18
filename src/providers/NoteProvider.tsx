import { useReducer } from "react"
import { noteReducer } from "../reducers/NoteReducer"
import { initialValue, NoteContext} from "../context/NotificationContext"


export const NoteProvider = ({ children }:any) => {
  const [state,noteDispatch] = useReducer(noteReducer, initialValue)

  return (
    <NoteContext.Provider value={{ ...state, noteDispatch }}>
      {children}
    </NoteContext.Provider>
  )
}
