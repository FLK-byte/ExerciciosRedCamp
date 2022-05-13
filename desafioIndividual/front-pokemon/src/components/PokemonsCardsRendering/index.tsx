import axios from 'axios'
import { useEffect, useState } from 'react'
import { Pagination } from '@mui/material';
import { IPokemon } from '../../models/IPokemon'
import { Page, Pokemons } from './style'
import { IDataApi } from '../../models/IDataApi';
import { Cards } from '../RenderCard/index'

export function PokemonsCardsRendering(props: { pokemon: IPokemon[], handleTeste: () => void, PokemonForm: (pokemon: any) => void }) {
    const [data, setData] = useState<IPokemon[]>()
    const [count, setCount] = useState<number>(0)
    const [pageAmount, setPageAmount] = useState<number>()

    useEffect(() => {
        async function callApi() {
            const { data }: IDataApi = await axios(`http://localhost:1337/pokemon?page=${count - 1}&limit=12`)
            setData(data.data)
            setPageAmount(parseInt((data.metaData[0].total / 12).toString()))
        }
        callApi()
    }, [count])

    return (
        <Page>
            <Pokemons>
                <Cards data={(props.pokemon != undefined ? props.pokemon[0] != null ? props.pokemon : null : null) || data} handleTeste={props.handleTeste} PokemonForm={props.PokemonForm} />
            </Pokemons>
            <Pagination onChange={(e, page) => { setCount(page) }} sx={{ display: 'flex', width: 80 + 'vw', justifyContent: 'center' }} count={(props.pokemon != undefined ? props.pokemon[0] != null ? 1 : null : null) || pageAmount ? pageAmount as number + 1 : 0} color="primary" />
        </Page>
    )
}

