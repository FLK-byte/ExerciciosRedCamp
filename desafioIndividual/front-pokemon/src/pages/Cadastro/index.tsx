import { DividerPage, Input, InputArea, LeftPage, LoginArea, Page, RightPage, ImgPokemon } from './style'
import { TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export function Cadastro() {
    return (<Page>
        <LeftPage>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src="./src/assets/LogoRedFox.png" />
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <img src="./src/assets/RedFoxBranco.png" />
                    <label style={{ color: "white", fontSize: "36px" }}>fox</label>
                </div>
            </div>
            <Link to="/"><a style={{ textDecoration: "underline", color: 'white', marginTop: "10px" }}>{"<- Login"}</a></Link>
            <LoginArea>
                <InputArea>
                    <label style={{ color: "white" }}>Usuário</label>
                    <Input placeholder='insira seu usuário aqui'></Input>
                    <label style={{ marginTop: "10px", color: "white" }}>Senha</label>
                    <Input placeholder='insira sua senha aqui'></Input>
                    <label style={{ marginTop: "10px", color: "white" }}>Confirme sua senha</label>
                    <Input placeholder='confirme sua senha aqui'></Input>
                </InputArea>
                {/* <TextField label="Usuário" focused color='info' />
                <TextField label="Senha" focused color='info' sx={{marginTop : '10px'}}/> */}
                <a href='' style={{ textDecoration: "none", color: 'yellow', marginTop: "10px" }}>Esqueci minha senha</a>
                <Button variant="contained" sx={{ marginTop: '10px' }}>Entrar</Button>
            </LoginArea>
        </LeftPage>
        <DividerPage>
            <div style={{ display: "flex", alignItems: "center", zIndex: "1" }}>
                <img src="./src/assets/Eclipse.png" style={{ height: "100px" }} />
            </div>
        </DividerPage>
        <RightPage>
            <ImgPokemon src="./src/assets/CharmanderCadastro.png"/>
        </RightPage>
    </Page>)
}