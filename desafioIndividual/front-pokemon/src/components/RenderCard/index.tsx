import { IPokemon } from "../../models/IPokemon"
import { CardActionArea, Card, CardContent, CardMedia, Typography, Pagination } from '@mui/material';

export function Cards(data: any) {
     return data.data?.map((pokemon: IPokemon, index: number) => {
        return(<Card sx={{ width: 21 + "vw", height: 39 + 'vh', borderRadius: 10 + 'px', boxShadow: '0px 2px 40px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 /14%)' }} key={index}>
            <CardActionArea sx={{ height: 100 + '%' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon['Img name'].toString().padStart(3, "0")}.png`}
                    sx={{ objectFit: 'contain' }}
                    alt="green iguana"
                />
                <CardContent sx={{ backgroundColor: '#09203B', color: 'white' }}>
                    <Typography variant="h5" component="div">
                        {pokemon.Name}
                    </Typography>
                    <Typography paragraph sx={{ marginBottom: 0 }}>ATK: {pokemon.ATK}</Typography>
                    <Typography paragraph sx={{ marginBottom: 0 }}>DEF: {pokemon.DEF}</Typography>
                    <Typography paragraph sx={{ marginBottom: 0 }}>STA: {pokemon.STA}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>)
    })
}