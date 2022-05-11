import { Button, TextField } from '@mui/material'
import { SearchArea, Title, TopPageArea, Page, SearchInput, ChangeDisplay, RenderArea } from './style'
import ListIcon from '@mui/icons-material/List';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { useState, useEffect } from 'react'
import { PokemonsCardsRendering } from '../PokemonsCardsRendering/index'
import { PokemonsListRendering } from '../PokemonsListRendering/index'
import { IPokemon } from '../../models/IPokemon';
import { IDataApi } from '../../models/IDataApi';
import axios from 'axios';

export function AllPokemons() {
    const [VisionType, setVisionType] = useState<string>("cards")
    const [pokemonSearched, setPokemonSearched] = useState<[IPokemon]>()
    const [pokemonToSearch, setPokemonToSearch] = useState<string>("")
    async function callApi() {
        const { data }: IDataApi = await axios(`http://localhost:1337/pokemonByName?name=${pokemonToSearch}`)
        setPokemonSearched([data] as [unknown] as [IPokemon])
    }
    return (
        <Page>
            <TopPageArea>
                <Title>TODOS OS POKEMONS</Title>
                <SearchArea>
                    <SearchInput>
                        <img src="./src/assets/Lupa.png" style={{ position: "absolute", top: '21px', left: '-22px' }} />
                        <TextField onChange={(e) => { setPokemonToSearch(e.target.value) }} id="standard-basic" label="Pesquise um pokemon" variant="standard" sx={{ width: "55vw" }} />
                    </SearchInput>
                    <Button variant="contained" sx={{ color: "white", width: "12vw" }} color="error" onClick={() => { callApi() }}>Buscar</Button>
                </SearchArea>
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
            </TopPageArea>
            <RenderArea>
                {VisionType == "cards" ?
                    <PokemonsCardsRendering pokemon={pokemonSearched as [IPokemon]} /> :
                    <PokemonsListRendering pokemon={pokemonSearched as [IPokemon]}/>
                }
            </RenderArea>
        </Page>
    )
}