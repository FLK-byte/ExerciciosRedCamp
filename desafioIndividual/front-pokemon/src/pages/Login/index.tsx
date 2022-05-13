import { LeftPage, Page, RightPage, LoginArea, Input, InputArea, DividerPage, ImgPokemon } from './style'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LogoComponent } from '../../components/LogoComponent'
import axios from 'axios'
import { useState } from 'react'

export function Login() {
    const [email, setEmail] = useState<string>('cleber@gmail.com')
    const [senha, setSenha] = useState<string>('senhaSeguraConfia')
    async function callApi() {
        try {
            const { data } = await axios.post('http://localhost:1337/user/authenticate', {
                email: email,
                senha: senha
            })
            localStorage.setItem('jwt', data.token)
        } catch (err) {
            console.log(err)
        }
    }
    const navigate = useNavigate();
    return (<Page>
        <LeftPage>
            <LogoComponent />
            <LoginArea>
                <InputArea>
                    <label style={{ color: "white" }}>Usuário</label>
                    <Input onChange={(e) => { setEmail(e.target.value) }} type='email'/>
                    <label style={{ marginTop: "10px", color: "white" }}>Senha</label>
                    <Input onChange={(e) => { setSenha(e.target.value) }} type='password'/>
                </InputArea>
                <a href='' style={{ textDecoration: "none", color: 'yellow', marginTop: "10px" }}>Esqueci minha senha</a>
                <Button variant="contained" sx={{ marginTop: '10px' }} onClick={async () => { await callApi(), navigate("/home") }}>Entrar</Button>
            </LoginArea>
            <Button style={{ textDecoration: "underline", color: 'white', marginTop: "10px" }} onClick={() => { navigate('/cadastro') }}>Fazer Cadastro</Button>
        </LeftPage>
        <DividerPage>
            <div style={{ display: "flex", alignItems: "center", zIndex: "1" }}>
                <img src="./src/assets/Eclipse.png" style={{ height: "100px" }} />
            </div>
        </DividerPage>
        <RightPage>
            <ImgPokemon src="./src/assets/PikachuLogin.png" />
        </RightPage>
    </Page>)
}