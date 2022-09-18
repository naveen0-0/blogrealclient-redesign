import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { authTypes } from "../types/types"

import { GiHamburgerMenu, GiRamProfile } from 'react-icons/gi'
import { MdAddCircleOutline } from 'react-icons/md'
import { GoSignOut } from 'react-icons/go'
import { BiLogIn } from 'react-icons/bi'
import CustomButton from "./CustomButton"

export default function NavBar() {
  const [hideNav, setHideNav] = useState(true)
  const { loggedIn,authDispatch } = useAuth()
  const navigation = useNavigate()

  const goto = (route:string) => {
    setHideNav(true)
    navigation(route)
  }

  const signOut = () => {
    localStorage.removeItem('blogrealauthtoken')
    authDispatch({type:authTypes.LOGOUT,payload:{username : "", email:"", loggedIn:false}})
  }


  return (
    <div className="bg-slate-900 text-slate-300 h-16 flex justify-around items-center shadow-md sticky top-0 w-full z-10">
      <div className="text-2xl font-anton md:text-4xl px-4">
        <Link to="/">BLOGREAL</Link>
      </div>


        <div className="relative flex justify-end items-center flex-1 px-4">
          <button onClick={() => setHideNav(!hideNav)} className="md:hidden">
            <GiHamburgerMenu size={20} color={hideNav?"#fff":"#64748B"}/>
          </button>
          <div
            className={`font-roboto absolute top-10 flex flex-col bg-slate-900 rounded-b-sm shadow-xl justify-between items-center ${hideNav&&'opacity-0 pointer-events-none'} md:flex md:static md:h-full md:w-full ${loggedIn?'md:max-w-[320px] h-40':'md:max-w-[200px] h-28'} p-4 md:flex-row md:opacity-100 md:pointer-events-auto text-slate-900 transition-opacity ease-in`}
          >
            {loggedIn?
              <>
                <CustomButton goto={() => goto('/new')}>
                  <MdAddCircleOutline/>
                  <div className="ml-1 flex-1">newblog</div>
                </CustomButton>

                <CustomButton goto={() => goto('/user')}>
                  <GiRamProfile/>
                  <div className="ml-1 flex-1">profile</div>
                </CustomButton>

                <CustomButton goto={() => signOut()}>
                  <GoSignOut/>
                  <div className="ml-1 flex-1">signout</div>
                </CustomButton>
              </>
              :
              <>
                <CustomButton goto={() => goto('/signup')}>
                  <BiLogIn/>
                  <div className="ml-1 flex-1">signup</div>
                </CustomButton>
                <CustomButton goto={() => goto('/login')}>
                  <BiLogIn/>
                  <div className="ml-1 flex-1">login</div>
                </CustomButton>
              </>
            }
          </div>
        </div>
    </div>
  )
}
