import { authTypes } from "../types/types"

export const authReducer = (state:any,action:any) => {
  const { type, payload } = action
  switch (type) {
    case authTypes.UPDATE_USER:
      return payload
    
    case authTypes.SIGNUP:
      return payload

    case authTypes.LOGIN:
      return payload

    case authTypes.LOGOUT:
      return payload
  
    default:
      return state
  }
}