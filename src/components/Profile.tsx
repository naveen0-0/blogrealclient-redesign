
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Profile() {
  const { loggedIn, username, email } = useAuth()

  if(!loggedIn) return <Navigate to="/"/>
  
  return (
    <div className="w-[95%] md:w-[80%] mx-auto">

      <div className="bg-slate-600 p-2 my-3 rounded-md shadow-2xl font-roboto flex flex-col md:flex-row">
        <div className="bg-slate-900 text-slate-500 flex justify-center items-center min-w-[80px] mx-auto aspect-square rounded-full">{username[0].toUpperCase()}</div>

        <div className="flex-1 my-2 text-center">
          <div className="p-1">{username}</div>
          <div className="p-1">{email}</div>
        </div>
      </div>


      <div className="bg-slate-600 p-2 my-3 rounded-md shadow-2xl font-roboto">
        Own Blogs
      </div>

    </div>
  )
}
