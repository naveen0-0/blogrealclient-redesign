import { createContext } from "react";

type PayloadType = {
  loggedIn : boolean,
  username : string,
  email : string,
}

type InitialValueType = {
  loggedIn : boolean,
  username : string,
  email : string,
  authDispatch:({type,payload}:{type:string,payload:PayloadType}) => null
}

export const initialValue = {
  loggedIn:false,
  username:"",
  email:"",
  authDispatch:() => null
}


export const AuthContext = createContext<InitialValueType>(initialValue);

