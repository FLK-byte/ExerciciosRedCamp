import axios from 'axios'
import { useEffect, useState } from 'react'
import { CardActionArea, Card, CardContent, CardMedia, Typography, Pagination } from '@mui/material';
import { IPokemon } from '../../models/IPokemon'
import { Page, Pokemons } from './style'
import { IDataApi } from '../../models/IDataApi';


export function PokemonsCardsRendering() {
    const [data, setData] = useState<IPokemon[]>()
    const [count, setCount] = useState<number>(0)
    const [pageAmount, setPageAmount] = useState<number>()
    useEffect(() => {
        async function callApi() {
            const { data }: IDataApi = await axios(`http://localhost:1337/pokemon?page=${count-1}&limit=6`)
            setData(data.data)
            setPageAmount(parseInt((data.metaData[0].total/6).toString()))
            console.log((data.metaData[0].total))
        }
        callApi()
    }, [count])

    return (
        <Page>
            <Pokemons>
                {data?.map((pokemon: IPokemon, index) => {
                    return (<Card sx={{ width: 21 + "vw", height: 39 + 'vh', borderRadius: 10 + 'px' }} key={index}>
                        <CardActionArea sx={{ height: 100 + '%' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon['Pokedex Number'].toString().padStart(3, "0")}.png`}
                                sx={{ objectFit: 'contain' }}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {pokemon.Name}
                                </Typography>
                                <Typography paragraph sx={{ marginBottom: 0 }}>ATK: {pokemon.ATK}</Typography>
                                <Typography paragraph sx={{ marginBottom: 0 }}>DEF: {pokemon.DEF}</Typography>
                                <Typography paragraph sx={{ marginBottom: 0 }}>STA: {pokemon.STA}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>)
                })}
            </Pokemons>
            <Pagination onChange={(e, page) => { setCount(page)}} sx={{ display: 'flex', width: 80 + 'vw', justifyContent: 'center' }} count={pageAmount} color="primary" />
        </Page>
    )
}