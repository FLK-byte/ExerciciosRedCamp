import { useEffect, useState } from 'react'
import { Pagination, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material';
import { IDataApi } from '../../models/IDataApi';
import { IPokemon } from '../../models/IPokemon'
import axios from 'axios'
import { Page } from './style'
import { List } from '../RenderList/index'

export function PokemonsListRendering(props: { pokemon: IPokemon[] }) {
    const [data, setData] = useState<IPokemon[]>()
    const [count, setCount] = useState<number>(0)
    const [pageAmount, setPageAmount] = useState<number>()
    useEffect(() => {
        async function callApi() {
            const { data }: IDataApi = await axios(`http://localhost:1337/pokemon?page=${count - 1}&limit=12`)
            setData(data.data)
            setPageAmount(parseInt((data.metaData[0].total / 6).toString()))
            console.log((data.metaData[0].total))
        }
        callApi()
    }, [count])

    return (
        <Page>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, whiteSpace: "nowrap "}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name Pokemon</TableCell>
                            <TableCell align="right">Pokedex Number</TableCell>
                            <TableCell align="right">Img Name</TableCell>
                            <TableCell align="right">Generation</TableCell>
                            <TableCell align="right">Evolution Stage</TableCell>
                            <TableCell align="right">Evolved</TableCell>
                            <TableCell align="right">Cross gen</TableCell>
                            <TableCell align="right">Type 1</TableCell>
                            <TableCell align="right">Type 2</TableCell>
                            <TableCell align="right">Weather 1</TableCell>
                            <TableCell align="right">Weather 2</TableCell>
                            <TableCell align="right">Stat Total</TableCell>
                            <TableCell align="right">ATK</TableCell>
                            <TableCell align="right">DEF</TableCell>
                            <TableCell align="right">STA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <List data={(props.pokemon != undefined ? props.pokemon[0] != null ? props.pokemon : null : null) || data}/>
                        {/* {data?.map((pokemon, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {pokemon.Name}
                                </TableCell>
                                <TableCell align="right">{pokemon['Pokedex Number']}</TableCell>
                                <TableCell align="right">{pokemon['Img name']}</TableCell>
                                <TableCell align="right">{pokemon.Generation}</TableCell>
                                <TableCell align="right">{pokemon['Evolution Stage']}</TableCell>
                                <TableCell align="right">{pokemon.Evolved}</TableCell>
                                <TableCell align="right">{pokemon['Cross Gen']}</TableCell>
                                <TableCell align="right">{pokemon['Type 1']}</TableCell>
                                <TableCell align="right">{pokemon['Type 2']}</TableCell>
                                <TableCell align="right">{pokemon['Weather 1']}</TableCell>
                                <TableCell align="right">{pokemon['Weather 2']}</TableCell>
                                <TableCell align="right">{pokemon['STAT TOTAL']}</TableCell>
                                <TableCell align="right">{pokemon.ATK}</TableCell>
                                <TableCell align="right">{pokemon.DEF}</TableCell>
                                <TableCell align="right">{pokemon.STA}</TableCell>
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination onChange={(e, page) => { setCount(page) }} sx={{ display: 'flex', width: 80 + 'vw', justifyContent: 'center' }} count={(props.pokemon != undefined ? props.pokemon[0] != null ? 1 : null : null) || pageAmount} color="primary" />
        </Page>
    );
}
