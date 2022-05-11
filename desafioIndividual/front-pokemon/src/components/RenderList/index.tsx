import { IPokemon } from "../../models/IPokemon"
import { Pagination, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material';

export function List(data: any) {
    return data.data?.map((pokemon: IPokemon, index: number) => {
        return (
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
        )
    })
}