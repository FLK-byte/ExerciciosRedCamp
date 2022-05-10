import { LeftPage, Page, RightPage, LoginArea, Input, InputArea, DividerPage } from './style'
import { TextField, Button } from '@mui/material'
import {Link} from 'react-router-dom'

export function Login() {
    return (<Page>
        <LeftPage>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src="./src/assets/LogoRedFox.png" />
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <img src="./src/assets/RedFoxBranco.png" />
                    <label style={{ color: "white", fontSize: "36px" }}>fox</label>
                </div>
            </div>
            <LoginArea>
                <InputArea>
                    <label style={{ color: "white" }}>Usuário</label>
                    <Input placeholder='insira seu usuário aqui'></Input>
                    <label style={{ marginTop: "10px", color: "white" }}>Senha</label>
                    <Input placeholder='insira sua senha aqui'></Input>
                </InputArea>
                {/* <TextField label="Usuário" focused color='info' />
                <TextField label="Senha" focused color='info' sx={{marginTop : '10px'}}/> */}
                <a href='' style={{ textDecoration: "none", color: 'yellow', marginTop: "10px" }}>Esqueci minha senha</a>
                <Link to="home"><Button variant="contained" sx={{ marginTop: '10px' }}>Entrar</Button></Link>
            </LoginArea>
            <Link to="cadastro"><a style={{ textDecoration: "underline", color: 'white', marginTop: "10px" }}>Fazer Cadastro</a></Link>
        </LeftPage>
        <DividerPage>
            <div style={{ display: "flex", alignItems: "center", zIndex: "1" }}>
                <img src="./src/assets/Eclipse.png" style={{ height: "100px" }} />
            </div>
        </DividerPage>
        <RightPage>
        <img src="./src/assets/PikachuLogin.png" width="100%" height="99%"/>
        </RightPage>
    </Page>)
}