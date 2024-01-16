import React from 'react'
import {styled} from "styled-components"
import {useNavigate} from "react-router-dom"
import {BiPowerOff} from "react-icons/bi"

function Logout() {
    const navigate = useNavigate()
    function logout(){
        localStorage.clear()
        navigate("/login")
    }
  return (
    <>
        <Button onClick={logout}>
            <BiPowerOff />
        </Button>
    </>
  )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg{
        font-size: 1.4rem;
        color: #ebe7ff;
        transition: 0.44s ease-in-out;
    }
    &&:hover svg{
        font-size: 1.84rem;
    }
    &&:hover{
        background-color: red;
    }
`;

export default Logout