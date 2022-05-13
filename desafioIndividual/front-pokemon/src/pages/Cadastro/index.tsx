import { DividerPage, Input, InputArea, LeftPage, LoginArea, Page, RightPage, ImgPokemon } from './style'
import { TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function Cadastro() {
    const [email, setEmail] = useState<string>('pongo@gmail.com')
    const [senha, setSenha] = useState<string>('senhaSeguraConfia')
    const [confirmationSenha, setConfirmationSenha] = useState<string>('senhaSeguraConfia')
    const navigate = useNavigate();

    async function callApi() {
        try {
            const { data } = await axios.post('http://localhost:1337/user', {
                email: email,
                senha: senha,
                listas: [],
                myPokemons: []
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            localStorage.setItem('jwt', data.token)
        } catch (err) {
            console.log(err)
        }
    }
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
                    <label style={{ color: "white" }}>Email</label>
                    <Input type='email' onChange={(e) => { setEmail(e.target.value) }} />
                    <label style={{ marginTop: "10px", color: "white" }}>Senha</label>
                    <Input type='password' onChange={(e) => { setSenha(e.target.value) }} />
                    <label style={{ marginTop: "10px", color: "white" }} >Confirme sua senha</label>
                    <Input type='password' onChange={(e) => { setConfirmationSenha(e.target.value) }} />
                </InputArea>
                <a href='' style={{ textDecoration: "none", color: 'yellow', marginTop: "10px" }}>Esqueci minha senha</a>
                <Button variant="contained" sx={{ marginTop: '10px' }} disabled={!(senha && confirmationSenha)} onClick={async () => { await callApi(), navigate("/home") }}>Cadastrar</Button>
            </LoginArea>
        </LeftPage>
        <DividerPage>
            <div style={{ display: "flex", alignItems: "center", zIndex: "1" }}>
                <img src="./src/assets/Eclipse.png" style={{ height: "100px" }} />
            </div>
        </DividerPage>
        <RightPage>
            <ImgPokemon src="./src/assets/CharmanderCadastro.png" />
        </RightPage>
    </Page>)
}