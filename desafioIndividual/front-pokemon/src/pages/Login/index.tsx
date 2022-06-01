import { LeftPage, Page, RightPage, LoginArea, Input, InputArea, DividerPage, ImgPokemon, LabelInput } from './style'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LogoComponent } from '../../components/LogoComponent'
import axios from 'axios'
import { useState } from 'react'


export function Login(): JSX.Element {
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
	return (
		<Page>
			<LeftPage>
				<LogoComponent />
				<LoginArea>
					<InputArea>
						<LabelInput>Usuário</LabelInput>
						<Input onChange={(e) => { setEmail(e.target.value) }} type='email' />

						<LabelInput >Senha</LabelInput>
						<Input onChange={(e) => { setSenha(e.target.value) }} type='password' />
					</InputArea>
					<a href='' style={{ textDecoration: "none", color: 'yellow', marginTop: "10px" }}>Esqueci minha senha</a>
					<Button variant="contained" sx={{ marginTop: '10px' }} onClick={async () => { await callApi(), navigate("/home") }}>Entrar</Button>
				</LoginArea>
				<Button sx={{ textDecoration: "underline", color: 'white', marginTop: "10px" }} onClick={() => { navigate('/cadastro') }}>Fazer Cadastro</Button>
			</LeftPage>
			<DividerPage>
				<img src="./src/assets/Eclipse.png" style={{ height: "100px", zIndex: "1" }} />
			</DividerPage>
			<RightPage>
				<ImgPokemon src="./src/assets/PikachuLogin.png" />
			</RightPage>
		</Page>
	)
}