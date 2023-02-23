import signupimg from "../images/authen1.svg";
import { useState } from "react";
import { SERVER_BASE_URL } from "../constants";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { authTypes, noteTypes } from "../types/types";
import { Navigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import { v4 as uuid } from "uuid";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authDispatch, loggedIn } = useAuth();
  const { noteDispatch } = useNotes();

  const signUp = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { data } = await axios.post(`${SERVER_BASE_URL}/auth/signup`, {
      username,
      email,
      password,
    });
    if (data.statusload) {
      localStorage.setItem("blogrealauthtoken", data.token);
      authDispatch({ type: authTypes.SIGNUP, payload: data.user });
      noteDispatch({
        type: noteTypes.ADDNOTE,
        payload: { id: uuid(), content: data.msg, errorOrNot: false },
      });
    } else {
      noteDispatch({
        type: noteTypes.ADDNOTE,
        payload: { id: uuid(), content: data.msg, errorOrNot: true },
      });
    }
  };

  if (loggedIn) return <Navigate to="/" />;

  return (
    <div className="w-[90%] mx-auto">
      <div className="py-12">
        <div className="hidden">
          <img src={signupimg} alt="Signup" />
        </div>

        <div>
          <div className="font-anton text-5xl text-center my-4">Sign Up</div>
          <form className="flex flex-col h-80 justify-around" onSubmit={signUp}>
            <input
              type="text"
              required
              placeholder="Enter your username ...."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="outline-none p-3 rounded-sm bg-slate-900 font-roboto text-slate-300"
            />
            <input
              type="email"
              required
              placeholder="Enter your email ...."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none p-3 rounded-sm bg-slate-900 font-roboto text-slate-300"
            />
            <input
              type="password"
              required
              placeholder="Enter your password ...."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none p-3 rounded-sm bg-slate-900 font-roboto text-slate-300"
            />

            <button className="bg-slate-900 text-slate-300 font-roboto px-4 py-2 w-max rounded-full">
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
