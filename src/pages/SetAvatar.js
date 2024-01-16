import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { styled } from "styled-components";
import { setAvatarURL } from "../utils/APIRouter";

function SetAvatar() {
  const navigate = useNavigate();
  const api = "https://api.multiavatar.com/45678984";

  const [avatars, setAvatars] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  async function fetchAvatar() {
    try{
      let data = [];
      for (let i = 0; i < 4; i++) {
        let image = await axios.get(`${api}/${Math.floor(Math.random() * 1000)}`);
        const buffer = new Buffer(image.data);
        data[i] = buffer.toString("base64");
      }
      // console.log(data);
      setAvatars(data);
      setIsLoding(false);
    }
    catch(err){
      console.log(err);
    }
  }

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please Select Any Avatar As Profile Picture", toastOptions);
    }
    else{
      const user = JSON.parse(localStorage.getItem("chat-app-user"))
      console.log(user);
      const {data} = await axios.post(`${setAvatarURL}/${user._id}`,{
        avatarImage:avatars[selectedAvatar]
      })

      if(data.user.isAvatarImageSet){
        // user.isAvatarImageSet = true
        // user.avatarImage = data.avatarImage
        // console.log(user);
        console.log(data);
        localStorage.setItem("chat-app-user",JSON.stringify(data.user))
        navigate("/")
      }
      else{
        toast.error("Avatar Error, Please Try Again",toastOptions)
      }
    }
  };

  useEffect(() => {
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }
    else{
      fetchAvatar();
    }
  }, []);
  return (
    <>
      {isLoding ? (
        <Container>
          <img src={loader} className="loader" alt="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pic And Avatar As You Wants To Set Profile Picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div className={`avatar ${ selectedAvatar === index ? "selected" : ""}`} key={index} >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => {
                      setSelectedAvatar(index);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture}>Set Avatar As Profile Picture</button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  gap: 3rem;
  button {
    width: 26%;
    color: white;
    background-color: #997af0;
    font-size: 14px;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    padding: 8px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }
  button:hover {
    background-color: #4e0eff;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
  }
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: 0.44s ease-in-out;
      img {
        height: 8rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
`;

export default SetAvatar;
