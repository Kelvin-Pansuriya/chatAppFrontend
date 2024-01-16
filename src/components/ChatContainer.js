import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { addMsgURL, getMsgURL } from "../utils/APIRouter";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import {v4 as uuidv4} from "uuid"

function ChatContainer(props) {
  const scrollRef = useRef()
  const { currentChat, currentUser, socket } = props;
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null)

  const getAllMessages = async () => {
    try{
      if(currentChat){
        const response = await axios.post(`${getMsgURL}`, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data.projectMessages);
      }
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, [currentChat]);

  const sendMsg = async (msg) => {
    // alert(msg)
    await axios.post(`${addMsgURL}`, {
      message: msg,
      from: currentUser._id,
      to: currentChat._id,
    });
    socket.current.emit("send-msg",{
      from:currentUser._id,
      to:currentChat._id,
      message:msg
    })
      
    const msgs = [...messages]
    msgs.push({fromSelf:true,message:msg})
    setMessages(msgs)
  };

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        setArrivalMessage({fromSelf:false,message:msg})
      })
    }
  },[])

  useEffect(()=>{
    arrivalMessage && setMessages((pre)=>[...pre,arrivalMessage])
  },[arrivalMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <div className="logout">
              <Logout />
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div className={`message ${msg.fromSelf ? "sended" : "recived"}`} >
                    <div className="content">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chat-input">
            <ChatInput sendMsg={sendMsg} />
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  height: 100%;
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.84rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 4rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    height: 70%;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb{
        background-color: #ffffff39; 
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.2rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended{
      justify-content: flex-end;
      .content{
        background-color: #4f04ff21;
      }
    }
    .recived{
      justify-content: flex-start;
      .content{
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;
