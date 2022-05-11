import styled from 'styled-components'


const Page = styled.div`
    height: 100vh;
`
const TopPageArea = styled.div`
    height: 15vh;
`
const Title = styled.span`
    padding-left: 3vw;
    font-size: 20px;
    color: #154A86;
`
const SearchArea = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const SearchInput = styled.div`
    position: relative;
`
const ChangeDisplay = styled.div`
    display: flex;
    align-items: center;
    padding-left: 2vw;
`
const RenderArea = styled.div`
    height: 85vh;
`
export {
    SearchArea, Title, TopPageArea, Page, SearchInput, ChangeDisplay, RenderArea
}