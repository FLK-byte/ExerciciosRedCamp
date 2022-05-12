import { IPokemon } from "../../models/IPokemon"
import { CardActionArea, Card, CardContent, CardMedia, Typography, Modal, Box } from '@mui/material';
import { useState } from 'react';
import { styleModal } from './style'
import { FormPokemon } from '../FormPokemon/index'

export function Cards(data: any) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (<>
        {data.data?.map((pokemon: IPokemon, index: number) => {
            return (
                <Card onClick={() => data.handleTeste(true)} sx={{ width: 21 + "vw", height: 39 + 'vh', borderRadius: 10 + 'px', boxShadow: '0px 2px 40px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 /14%)' }} key={index}>
                    <CardActionArea sx={{ height: 100 + '%' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon['Img name'].toString().padStart(3, "0")}.png`}
                            sx={{ objectFit: 'contain' }}
                            alt="green iguana"
                        />
                        <CardContent sx={{ backgroundColor: '#09203B', color: 'white', height: 13 + 'vh' }}>
                            <Typography variant="h5" component="div" sx={{ fontSize: 1 + 'rem', }}>
                                {pokemon.Name}
                            </Typography>
                            <Typography paragraph sx={{ marginBottom: 0, fontSize: 0.9 + 'rem' }}>ATK: {pokemon.ATK}</Typography>
                            <Typography paragraph sx={{ marginBottom: 0, fontSize: 0.9 + 'rem' }}>DEF: {pokemon.DEF}</Typography>
                            <Typography paragraph sx={{ marginBottom: 0, fontSize: 0.9 + 'rem' }}>STA: {pokemon.STA}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )
        })}
        <Modal open={open} onClose={handleClose}>
            <Box sx={styleModal}>
                <FormPokemon />
            </Box>
        </Modal>
    </>)
}