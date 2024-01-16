import React,{useState} from 'react'
import {styled} from "styled-components"
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"

function ChatInput(props) {
    const {sendMsg} = props
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")

    const emojiPickerToggle = ()=>{
        setShowEmojiPicker(!showEmojiPicker)
    }

    function msgChanges(event){
        setMsg(event.target.value)
    }

    const emojiClick = (event)=>{
        let message = msg
        message += event.emoji
        setMsg(message)
    }

    const sendChat = (event)=>{
        event.preventDefault()
        if(msg){
            if(msg.length>0){
                sendMsg(msg)
                setMsg("")
            }
        }
    }

  return (
    <>
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={emojiPickerToggle} />
                    { showEmojiPicker && <Picker className='styled-picker' onEmojiClick={emojiClick} /> }
                </div>
            </div>
            <form className="input-container" onSubmit={sendChat}>
                <input type="text" value={msg} onChange={msgChanges} placeholder='type your message here' />
                <button type='submit' className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    </>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.4rem;
    .button-container{
        display: flex;
        align-items: center;
        gap: 1rem;
        color: white;
        .emoji{
            position: relative;
            svg{
                font-size: 2rem;
                color: #ffff00C8;
                cursor: pointer;
                margin-left: -8px;
            }
            .styled-picker{
                height: 326px !important;
                position: absolute;
                top: -344px;
                background-color: #080420;
                box-shadow: 0px 5px 10px #9a86f3;
                border-color: #9a86f3;
                .epr_bftf4a{
                    height: 26px !important;
                }
                .epr_-a4fw28{
                    height: 28px !important;
                }
                .epr_-ho5tjb{
                    position:relative;
                    top: -14px;
                    left: 8px;
                }
                .epr_-8ygbw8{
                    padding: 8px !important;
                }
                .epr_1ttcuj{
                    height:auto !important;
                    padding: 4px;
                    border-radius: 0.44rem;
                }
                .epr_c90x4z{
                    height:auto !important;
                    padding: 2px;
                }
                .epr_b8hfyo{
                    &::-webkit-scrollbar{
                        width: 8px !important;
                        background-color: #080420;
                        &-thumb{
                            height:84px;
                            border-radius:2rem;
                            background-color: #9a86f3;
                        }
                    }
                }
                .emoji-categories{
                    button{
                        filter: contrast(0);
                    }
                }
                .emoji-search{
                    background-color: trasparent;
                    border-color: #9a86f3;
                }
                .emoji-group:before{
                    background-color: #080420;
                }
            }
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        input{
            height: 60%;
            width: 90%;
            color: white;
            background-color: transparent;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection{
                background-color: #9186f3;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.4rem 2rem;
            background-color: #9a86f3;
            border-radius: 2rem;
            border: none;
            svg{
                font-size: 2rem;
                color: white;
            }
        }
    }
`;

export default ChatInput