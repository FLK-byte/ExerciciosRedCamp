import { LeftPage, Page, RightPage, LoginArea, Input, InputArea, DividerPage, ImgPokemon } from './style'
import { TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { LogoComponent } from '../../components/LogoComponent'

export function Login() {
    const a = true
    const navigate = useNavigate();
    return (<Page>
        <LeftPage>
            <LogoComponent />
            <LoginArea>
                <InputArea>
                    <label style={{ color: "white" }}>Usuário</label>
                    <Input/>
                    <label style={{ marginTop: "10px", color: "white" }}>Senha</label>
                    <Input/>
                </InputArea>
                <a href='' style={{ textDecoration: "none", color: 'yellow', marginTop: "10px" }}>Esqueci minha senha</a>
                <Button variant="contained" sx={{ marginTop: '10px' }} onClick={() => {a ? navigate("/home") : null}}>Entrar</Button>
            </LoginArea>
            <Button style={{ textDecoration: "underline", color: 'white', marginTop: "10px" }}>Fazer Cadastro</Button>
        </LeftPage>
        <DividerPage>
            <div style={{ display: "flex", alignItems: "center", zIndex: "1" }}>
                <img src="./src/assets/Eclipse.png" style={{ height: "100px" }} />
            </div>
        </DividerPage>
        <RightPage>
            <ImgPokemon src="./src/assets/PikachuLogin.png"/>
        </RightPage>
    </Page>)
}