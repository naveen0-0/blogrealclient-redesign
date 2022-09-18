import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import Dashboard from "./components/DashBoard"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { SERVER_BASE_URL } from "./constants"
import { useAuth } from "./hooks/useAuth"
import axios from "axios"
import NavBar from "./components/NavBar"
import { authTypes } from "./types/types"
import SplashScreen from "./components/SplashScreen"
import Profile from "./components/Profile"
import NewBlog from "./components/NewBlog"
import Notifications from "./components/Notifications"
import FullBlog from "./components/FullBlog"
import NotFound from "./components/NotFound"

export default function App() {
  const { authDispatch } = useAuth()
  const [authCheck, setAuthCheck] = useState(true);

  useEffect(() => {
    getUser()
  },[])

  const getUser = async () => {
    setAuthCheck(true)
    try {
      let { data } = await axios.get(`${SERVER_BASE_URL}/auth/getuser`,{ headers : { Authorization : localStorage.getItem('blogrealauthtoken')!}})
      if(data.statusload){
        authDispatch({type:authTypes.UPDATE_USER,payload:data.user})
      }
      setAuthCheck(false)
    } catch (error) {
      throw new Error("Error Fetching The User From Server");
    }
  }

  if(authCheck) return <SplashScreen/>

  return (
    <div className="bg-slate-700 min-h-screen">
      <Notifications/>
        <Router>
          <NavBar/>
          <div className="overflow-y-auto h-[calc(100vh-64px)]">
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/new" element={<NewBlog/>}/>
              <Route path="/user" element={<Profile/>}/>
              <Route path="/:id" element={<FullBlog/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
    </div>
  )
}
