import React,{useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom"
import { styled } from "styled-components";
import axios from "axios"
import {allUsersURL, apiURL} from "../utils/APIRouter"
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client"

function Chat() {
  const socket = useRef()
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }
    else{
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
      setIsLoaded(true)
    }
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current = io(apiURL)
      socket.current.emit("add-user",currentUser._id)
    }
  },[currentUser])

  async function getAllContacts(){
    try{
      const data = await axios.get(`${allUsersURL}/${currentUser._id}`)
      setContacts(data.data.users)
    }
    catch(err){
      console.log(err);
    }
  } 

  useEffect(()=>{
    if(currentUser){
      if(currentUser.isAvatarImageSet){
        getAllContacts()
      }
      else{
        navigate("/setAvatar")
      }
    }
  },[currentUser])

  function changeChat(chat){
    setCurrentChat(chat)
  }

  return (
    <>
      <Container>
        <div className="main-container">
          <div className="container-fluid p-0 m-0">
            <div className="row p-0 m-0">
              <div className="col-12 col-md-4 p-0 m-0">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={changeChat} />
              </div>
              <div className="col-12 col-md-8 p-0 m-0">
                {
                  isLoaded && currentChat === undefined ? (<Welcome currentUser={currentUser} />) : (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />)
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .main-container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    overflow:auto;
    .container-fluid{
      height:100%;
      .row{
        height: 100%;
        .col-md-4, .col-md-8{
          height:100%;
          overflow: auto;
        }
      }
    }
  }
`;

export default Chat;
