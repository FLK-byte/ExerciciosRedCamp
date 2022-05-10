import styled from 'styled-components'

const Page = styled.div`
  display: flex;
`
const LeftPage = styled.div`
    width: 30vw;
    height: 100vh;
    background-color: #BD2C25;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
`
const Input = styled.input`
   border: none;
   resize: none;
   outline: none;
   width: 25vw; 
   border-Radius : 10px; 
   height: 33px;
`
const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`
const LoginArea = styled.div`
    display: flex;
    flex-direction: column;
`
const DividerPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #09203B;
    width: 2vw;
`
const RightPage = styled.div`
    width: 68vw;
    height: 100vh;
    background-color: black;
`

export {
    Page, LeftPage, RightPage, LoginArea, Input, InputArea, DividerPage
}