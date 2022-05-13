import { Button, TextField, Grid, Container, Stack, Avatar, AvatarGroup } from '@mui/material'
import { Pagination, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { CardMyList, SearchArea, ChangeDisplay } from './style'
import ListIcon from '@mui/icons-material/List';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

interface DataUser {
    email: string,
    listas: [{ listaName: string, pokemons: [] }],
    myPokemons: [],
    senha: string,
    _id: string
}
export function MyLists() {
    const [userData, setUserData] = useState<DataUser>()
    const [VisionType, setVisionType] = useState<string>("cards")
    const navigate = useNavigate()

    async function callApi() {
        try {
            const { data } = await axios(`http://localhost:1337/isAuthenticated`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            const response = await axios(`http://localhost:1337/user/${data.data.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            setUserData(response.data)
        } catch (err) {
            alert("Sua seção expirou")
            localStorage.removeItem('jwt')
            navigate('/')
        }
    }

    useEffect(() => {
        callApi()

    }, [])

    return (
        <Grid container sx={{ width: 80 + 'vw', height: 100 + 'vh' }}>
            <Container>
                <Grid item xs={12} sx={{ height: 26 + 'vh' }}>
                    <h1 style={{ color: '#154A86' }}>Minhas Listas</h1>
                    <SearchArea>
                        <TextField id="standard-basic" label="Pesquise um pokemon" variant="standard" sx={{ width: "55vw" }} />
                        <Button variant="contained" sx={{ color: "white", width: "12vw" }} color="error">Buscar</Button>
                    </SearchArea>
                    <Grid item xs={12}>
                        {VisionType == "cards" ?
                            <ChangeDisplay>
                                <ListIcon />
                                <Button variant='text' onClick={() => { setVisionType("list") }}>Visão por lista</Button>
                            </ChangeDisplay> :
                            <ChangeDisplay>
                                <ViewComfyIcon />
                                <Button variant='text' onClick={() => { setVisionType("cards") }}>Visão por cards</Button>
                            </ChangeDisplay>
                        }
                    </Grid>
                </Grid>
            </Container>
            {(userData?.listas.length != undefined) && userData?.listas.length > 0 ? VisionType == "cards" ? <>
                <Grid item xs={12} sx={{ height: 70 + 'vh', overflow: 'scroll' }}>
                    <Grid container spacing={4} sx={{ marginLeft: '0', width: 78 + 'vw' }}>
                        {userData?.listas.map((el: any, index) => {
                            return <Grid item xs={4}>
                                <Button key={index}>
                                    <CardMyList >
                                        <h3 style={{ color: '#FFCB05' }}>{el.listaName}</h3>
                                        <Stack direction="row" spacing={1}>
                                            <AvatarGroup max={4}>
                                                {el.pokemons.map((el: any, index: number) => {
                                                    return <Avatar sx={{ backgroundColor: "white", color: 'black' }} key={index} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${el.toString().padStart(3, "0")}.png`} />
                                                })}
                                            </AvatarGroup>
                                        </Stack>
                                        <p style={{ color: "white" }}>Existem {el.pokemons.length} pokemons nessa lista</p>
                                        <p style={{ color: "white" }}>Criado em: xx-xx-xxxx</p>
                                    </CardMyList>
                                </Button>
                            </Grid>
                        })}
                    </Grid>
                </Grid>
            </> : <>
                <TableContainer component={Paper} sx={{ overflow: 'scroll', height: 70 + 'vh' }}>
                    <Table sx={{ minWidth: 650, whiteSpace: "nowrap " }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name Pokemon</TableCell>
                                <TableCell align="right">Quantidade de pokemons</TableCell>
                                <TableCell align="right">Data de Criação</TableCell>
                                <TableCell align="right">Última atualização</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData?.listas.map((lista, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {lista.listaName}
                                    </TableCell>
                                    <TableCell align="right">{lista.pokemons.length}</TableCell>
                                    <TableCell align="right">{"xx-xx-xxxx"}</TableCell>
                                    <TableCell align="right">{"xx-xx-xxxx"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </> : <Grid container sx={{ height: 70 + 'vh' }}>
                <Grid item xs={12}>
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}>
                        Parece que voce ainda não cadastrou nenhuma lista, utilize o menu ao lado
                    </h1>
                </Grid>
            </Grid>}
        </Grid>
    )
}