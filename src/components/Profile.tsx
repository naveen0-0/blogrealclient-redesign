
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Profile() {
  const { loggedIn } = useAuth()

  if(!loggedIn) return <Navigate to="/"/>
  
  return (
    <div>
      Profile
    </div>
  )
}
