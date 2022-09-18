import { useReducer } from "react"
import { authReducer } from "../reducers/AuthReducer"
import { initialValue, AuthContext } from "../context/AuthContext"


export const AuthProvider = ({ children }:any) => {
  const [state,authDispatch] = useReducer(authReducer, initialValue)

  return (
    <AuthContext.Provider value={{ ...state, authDispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
