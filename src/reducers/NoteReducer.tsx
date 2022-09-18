import { noteTypes } from '../types/types'

export const noteReducer = (state:any,action:any) => {
  const { type, payload } = action

  switch (type) {
    case noteTypes.ADDNOTE:
      return {notifications:[payload,...state.notifications] }
    
    case noteTypes.REMOVEALL:
      return state

    case noteTypes.REMOVENOTE:
      return {
        notifications : state.notifications.filter((note:any) => note.id !== payload)
      }
    

    default:
      return state
  }
}