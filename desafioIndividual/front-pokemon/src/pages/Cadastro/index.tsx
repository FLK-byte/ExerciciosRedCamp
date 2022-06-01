import { DividerPage, Input, InputArea, LeftPage, LoginArea, Page, RightPage, ImgPokemon, LabelInput } from './style'
import { Button } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LogoComponent } from '../../components/LogoComponent'

export function Cadastro(): JSX.Element {
	const [email, setEmail] = useState<string>('pongo@gmail.com')
	const [senha, setSenha] = useState<string>()
	const [confirmationSenha, setConfirmationSenha] = useState<string>()
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
	return (
		<Page>
			<LeftPage>
				<LogoComponent/>
				<a onClick={() => { navigate('/') }} style={{ textDecoration: "underline", color: 'white', marginTop: "10px" }}>{"<- Login"}</a>
				<LoginArea>
					<InputArea>
						<LabelInput> Email </LabelInput>
						<Input type='email' onChange={(e) => { setEmail(e.target.value) }} />

						<LabelInput> Senha </LabelInput>
						<Input type='password' onChange={(e) => { setSenha(e.target.value) }} />

						<LabelInput> Confirme sua senha </LabelInput>
						<Input type='password' onChange={(e) => { setConfirmationSenha(e.target.value) }} />
					</InputArea>
					<a href='' style={{ textDecoration: "none", color: 'yellow', marginTop: "10px" }}>Esqueci minha senha</a>
					<Button variant="contained" sx={{ marginTop: '10px' }} disabled={!(senha == confirmationSenha && (senha && confirmationSenha))} onClick={async () => { await callApi(), navigate("/home") }}>Cadastrar</Button>
				</LoginArea>
			</LeftPage>
			<DividerPage>
				<img src="./src/assets/Eclipse.png" style={{ height: "100px", zIndex: "1" }} />
			</DividerPage>
			<RightPage>
				<ImgPokemon src="./src/assets/CharmanderCadastro.png" />
			</RightPage>
		</Page>
	)
}