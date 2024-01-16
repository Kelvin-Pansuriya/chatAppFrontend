import React from 'react'
import {styled} from "styled-components"

function Messages() {
  return (
    <>
        <Container>
            <div>Hello World</div>
        </Container>
    </>
  )
}

const Container = styled.div`
    height: 100%;
    border: 2px solid red;
`;

export default Messages