import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {registerURL} from "../utils/APIRouter";

function Register() {
  const navigate = useNavigate()
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  const toastOptions = {
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  const registerValidation = ()=>{
    const {username,email,password,confirmPassword} = registerData
    if(password !== confirmPassword){
        toast.error("Password And Confirm Password Are Not Same",toastOptions)
        return false;
    }
    else if(username.length <= 4){
        toast.error("Please Enter Username More Than Equal 4 Characters",toastOptions)
        return false;
    }
    else if(email === ""){
        toast.error("Email Is Not Valid",toastOptions)
        return false;
    }
    else if(password < 8){
        toast.error("Please Enter Password More Than Equal 4 Characters",toastOptions)
        return false;
    }
    else{
        return true
    }
  }

  const submitRegister = async(event) => {
    event.preventDefault();
    if(registerValidation()){
        const {data} = await axios.post(registerURL,{
            username:registerData.username,
            email:registerData.email,
            password:registerData.password,
        })
        if(data.status === false){
          toast.error(data.err,toastOptions)
        }
        else if(data.status){
          localStorage.setItem("chat-app-user",JSON.stringify(data.user))
          localStorage.setItem("chat-app-user-token",data.registerToken)
          navigate("/setAvatar")
        }
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/setAvatar")
    }
  },[])

  return (
    <>
      <div id="registerMainDiv">
        <form onSubmit={submitRegister} id="registerForm">
          <div className="companyRegister">
            <img src={logo} alt="logo" id="registerLogo" />
            <h1 id="registerCompanyName">EasyChat</h1>
          </div>
          <input
            type="text"
            className="registerInputes"
            id="username"
            name="username"
            placeholder="Username"
            value={registerData.username}
            onChange={registerChange}
          />
          <input
            type="email"
            className="registerInputes"
            id="email"
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={registerChange}
          />
          <input
            type="password"
            className="registerInputes"
            id="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={registerChange}
          />
          <input
            type="password"
            className="registerInputes"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={registerData.confirmPassword}
            onChange={registerChange}
          />
          <span>
            Already Have An Account ? <Link to="/login">Login</Link>
          </span>
          <button type="submit">Register</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

// const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .companyRegister {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 1rem;
//     img {
//       height: 5rem;
//       width: 5rem;
//     }
//     h1 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }
//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     background-color: #00000076;
//     border-radius: 2rem;
//     padding: 3rem 5rem;
//     input {
//       background-color: transparent;
//       padding: 1rem;
//       border: 0.1rem solid #4e0eff;
//       border-radius: 0.4rem;
//       color: white;
//       width: 100%;
//       font-size: 1rem;
//     }
//   }
// `;

export default Register;
