import { useEffect, useState } from 'react'
import { Pagination, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material';
import { IDataApi } from '../../models/IDataApi';
import { IPokemon } from '../../models/IPokemon'
import axios from 'axios'

export function PokemonsListRendering() {
    const [data, setData] = useState<IPokemon[]>()
    const [count, setCount] = useState<number>(0)
    const [pageAmount, setPageAmount] = useState<number>()
    useEffect(() => {
        async function callApi() {
            const { data }: IDataApi = await axios(`http://localhost:1337/pokemon?page=${count - 1}&limit=6`)
            setData(data.data)
            setPageAmount(parseInt((data.metaData[0].total / 6).toString()))
            console.log((data.metaData[0].total))
        }
        callApi()
    }, [count])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name Pokemon</TableCell>
                            <TableCell align="right">ATK</TableCell>
                            <TableCell align="right">DEF</TableCell>
                            <TableCell align="right">STA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((pokemon, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {pokemon.Name}
                                </TableCell>
                                <TableCell align="right">{pokemon.ATK}</TableCell>
                                <TableCell align="right">{pokemon.DEF}</TableCell>
                                <TableCell align="right">{pokemon.STA}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination onChange={(e, page) => { setCount(page) }} sx={{ display: 'flex', width: 80 + 'vw', justifyContent: 'center' }} count={pageAmount} color="primary" />
        </>
    );
}
