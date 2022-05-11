import { Button, TextField } from '@mui/material'
import { SearchArea, Title, TopPageArea, Page, SearchInput, ChangeDisplay, RenderArea } from './style'
import ListIcon from '@mui/icons-material/List';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { useState } from 'react'
import { PokemonsCardsRendering } from '../../components/PokemonsCardsRendering'
import { PokemonsListRendering } from '../../components/PokemonsListRendering'

export function AllPokemons() {
    const [VisionType, setVisionType] = useState<string>("cards")
    return (
        <Page>
            <TopPageArea>
                <Title>TODOS OS POKEMONS</Title>
                <SearchArea>
                    <SearchInput>
                        <img src="./src/assets/Lupa.png" style={{ position: "absolute", top: '21px', left: '-22px' }} />
                        <TextField id="standard-basic" label="Pesquise um pokemon" variant="standard" sx={{ width: "55vw" }} />
                    </SearchInput>
                    <Button variant="contained" sx={{ color: "white", width: "12vw" }} color="error">Buscar</Button>
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
                <PokemonsCardsRendering/> :
                <PokemonsListRendering/>
            }
            </RenderArea>
        </Page>
    )
}