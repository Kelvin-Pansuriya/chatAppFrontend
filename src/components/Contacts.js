import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Logo from "../assets/logo.svg";

function Contacts(props) {
  const { contacts, currentUser, changeChat } = props;
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index,contact)=>{
    setCurrentSelected(index)
    changeChat(contact)
  }

  return (
    <>
        {
            currentUserName && currentUserImage && <Container>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                    <h3>EasyChat</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact,index)=>{
                            return(
                                <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={()=>{changeCurrentChat(index,contact)}} >
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                    </div>
                                    <div className="username">
                                        <h4>{contact.username}</h4>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentUserName}</h3>
                    </div>
                </div>
            </Container>
        }
    </>
  );
}

const Container = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;
overflow: hidden;
background-color: #080420;
.brand{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img{
        height: 2.6rem;
    }
    h3{
        color: white;
        text-transform: uppercase;
    }
}
.contacts{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    gap: 0.84rem; 
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            width: 0.1rem;
            background-color: #ffffff39;
        }
    }
    .contact{
        min-height: 5rem;
        width: 90%;
        padding: 0.4rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: #ffffff39;
        cursor: pointer;
        border-radius: 0.2rem;
        transition: 0.44s ease-in-out;
        .avatar{
            img{
                height: 4rem;
            }
        }
        .username{
            h4{
                color: white;
            }
        }
    }
    .selected{
        background-color: #9186f3;
    }
}
.current-user{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: #0d0d30;
    .avatar{
        img{
            height: 4rem;
            max-inline-size: 100%;
        }
    }
    .username{
        h3{
            color: white;
        }
    }
}
`;

export default Contacts;
