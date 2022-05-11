import { AllPage, LeftBar, RightBar, Options, ExitArea } from './style'
import { LogoComponent } from '../../components/LogoComponent'
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { AllPokemons } from '../../components/AllPokemons'
import { MyLists } from '../../components/MyLists'
import { MyPokemons } from '../../components/MyPokemons'
import {useState} from 'react'
export function Home() {
    const [ToRender, setToRender] = useState<string>("AllPokemons")
    return (
        <AllPage>
            <LeftBar>
                <LogoComponent />
                <Options>
                    <Button variant="text" sx={ToRender == "AllPokemons" ? {color: "yellow", fontSize: "15px" } : {color: "white", fontSize: "15px" }}
                    onClick={()=>{setToRender("AllPokemons")}}
                    >Todos os pokemons</Button>
                    <Button variant="text" sx={ToRender == "MyLists" ? {color: "yellow", fontSize: "15px" } : {color: "white", fontSize: "15px" }}
                    onClick={()=>{setToRender("MyLists")}}
                    >Minhas Listas</Button>
                    <Button variant="text" sx={ToRender == "MyPokemons" ? {color: "yellow", fontSize: "15px" } : {color: "white", fontSize: "15px" }}
                    onClick={()=>{setToRender("MyPokemons")}}
                    >Meus pokemons</Button>
                    <Button variant="text" sx={{ color: "white", fontSize: "15px" }}
                    onClick={()=>{alert("Criar nova lista ainda nao ta feito")}}
                    >Criar nova lista</Button>
                    <Button variant="text" sx={{ color: "white", fontSize: "15px" }}
                    onClick={()=>{alert("Criar novo pokemon ainda nao ta feito")}}
                    >Criar novo pokemon</Button>
                </Options>
                <ExitArea>
                    <LogoutIcon />
                    <Link to="/"><Button sx={{ color: "white" }}>Sair</Button></Link>
                </ExitArea>
            </LeftBar>
            <RightBar>
                {
                   ToRender == "AllPokemons" ? <AllPokemons/> : 
                   ToRender == "MyLists" ? <MyLists/> : 
                   ToRender == "MyPokemons" ? <MyPokemons/> : null
                }
            </RightBar>
        </AllPage>
    )
}