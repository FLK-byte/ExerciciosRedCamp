import styled from 'styled-components'

const AllPage = styled.div`
    display: flex;
`

const LeftBar = styled.div`
    width: 20vw;
    height: 100vh;
    background-color:#BD2C25;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const RightBar = styled.div`
    width: 80vw;
    height: 100vh;
    background-color: white;
`
const Options = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 42vh;
    justify-content: space-evenly;
`
const ExitArea = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
`
const CreatePokemonModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 90+'vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}
export {
    AllPage, LeftBar, RightBar, Options, ExitArea, CreatePokemonModal
}