import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginURL } from "../utils/APIRouter";

function Login() {
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({email:"",password:""})

  const loginChange = (event)=>{
    setLoginData({...loginData,[event.target.name]:event.target.value})
  }

  const toastOptions = {
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  const loginValidation = ()=>{
    const {email,password} = loginData
    if(email === ""){
      toast.error("Username And Password Is Required",toastOptions)
      return false
    }
    else if(password === ""){
      toast.error("Username And Password Is Required",toastOptions)
      return false
    }
    else{
      return true
    }
  }

  const submitLogin = async(event)=>{
    event.preventDefault()
    if(loginValidation()){
      const {data} = await axios.post(loginURL,{email:loginData.email,password:loginData.password})
      if(data.status === false){
        toast.error(data.err,toastOptions)
      }
      else if(data.status){
        localStorage.setItem("chat-app-user",JSON.stringify(data.user))
        localStorage.setItem("chat-app-user-token",data.loginToken)
        navigate("/setAvatar")
      }
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/setAvatar")
    }
  },[])

  return (
    <>
      <div id="registerMainDiv">
        <form onSubmit={submitLogin} id="registerForm">
          <div className="companyRegister">
            <img src={logo} alt="logo" id="registerLogo" />
            <h1 id="registerCompanyName">EasyChat</h1>
          </div>
          <input
            type="email"
            className="registerInputes"
            id="email"
            name="email"
            placeholder="Email"
            max={50}
            value={loginData.email}
            onChange={loginChange}
          />
          <input
            type="password"
            className="registerInputes"
            id="password"
            name="password"
            placeholder="Password"
            min={8}
            value={loginData.password}
            onChange={loginChange}
          />
          <span>
            Does Not Have An Account ? <Link to="/register">Register</Link>
          </span>
          <button type="submit">Login</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
