import React from "react";
import { styled } from "styled-components";
import Robot from "../assets/robot.gif";

function Welcome(props) {
  const { currentUser } = props;
  return (
    <>
      <Container>
        <img src={Robot} alt="Robot" />
        <h2>
          Welcome, <span>{currentUser.username}</span>
        </h2>
        <h4>Please Select A Chat For Start Messaging</h4>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;

export default Welcome;
