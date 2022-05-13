import { useFormik } from 'formik';
import { TextField, Button, Grid, Container, CardMedia } from '@mui/material';
import { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';

export const FormCreatePokemon = ({handleClose} : any) => {
    const [errorImg, setErrorImg] = useState(false)
    const formik = useFormik({
        initialValues: {
            PokemonName: "",
            PokedexNumber: "0",
            ImgName: "0",
            Generation: "0",
            EvolutionStage:'0',
            Evolved: '0',
            FamilyID: "0",
            CrossGen: "0",
            Type1: "",
            Type2: "",
            Weather1: "",
            Weather2: "",
            StatTotal: "0",
            ATK: "0",
            DEF: "0",
            STA: "0",
            Legendary: "0",
            Aquireable: "0",
            Spawns: "0",
            Regional: "0",
            Raidable: "0",
            Hatchable: "0",
            Shiny: "0",
            Nest: "0",
            New: "0",
            NotGettable: "0",
            FutureEvolve: "0",
            CP40: "0",
            CP39: "0",
            Description: ''
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            handleClose()
        },
    });
    useEffect(() => {
        setErrorImg(false)
    }, [formik.values.ImgName])
    return (
        <form onSubmit={formik.handleSubmit}>
            <Container>
                <Grid container>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item>
                                <CloseIcon onClick={()=>{handleClose()}} />
                            </Grid>
                            <Grid item xs={12}>
                                {errorImg == false ? <CardMedia
                                    component="img"
                                    height="140"
                                    onError={(e: any) => { e.target.onerror = null; setErrorImg(true) }}
                                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formik.values.ImgName.toString().padStart(3, "0")}.png`}
                                    sx={{ objectFit: 'contain' }}
                                    alt="green iguana"
                                /> : <CardMedia
                                    component="img"
                                    height="140"
                                    onLoad={() => { console.log("AMOGUS") }}
                                    src={`./src/assets/pokemonDiferente.png`}
                                    sx={{ objectFit: 'contain' }}
                                    alt="green iguana"
                                />}
                                {/* <img
                                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formik.values.ImgName.toString().padStart(3, "0")}.png`}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = `./src/assets/pokemonDiferente.png`;
                                    }}
                                /> */}
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    id="PokemonName"
                                    name="PokemonName"
                                    label="Pokemon Name"
                                    value={formik.values.PokemonName}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Descrição do pokemon"
                                    name="Description"
                                    placeholder='Adicione uma descrição para este pokemon :)'
                                    multiline
                                    minRows={6}
                                    maxRows={12}
                                    value={formik.values.Description}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* /////////////////////////////////////////////////// */}
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="PokedexNumber"
                                    name="PokedexNumber"
                                    label="Pokedex Number"
                                    value={formik.values.PokedexNumber}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="ImgName"
                                    name="ImgName"
                                    label="Img Name"
                                    value={formik.values.ImgName}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="EvolutionStage"
                                    name="EvolutionStage"
                                    label="Evolution Stage"
                                    value={formik.values.EvolutionStage}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Evolved"
                                    name="Evolved"
                                    label="Evolved"
                                    value={formik.values.Evolved}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="FamilyID"
                                    name="FamilyID"
                                    label="FamilyID"
                                    value={formik.values.FamilyID}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="CrossGen"
                                    name="CrossGen"
                                    label="CrossGen"
                                    value={formik.values.CrossGen}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Type1"
                                    name="Type1"
                                    label="Type 1"
                                    value={formik.values.Type1}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Type2"
                                    name="Type2"
                                    label="Type 2"
                                    value={formik.values.Type2}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Weather1"
                                    name="Weather1"
                                    label="Weather 1"
                                    value={formik.values.Weather1}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Weather2"
                                    name="Weather2"
                                    label="Weather 2"
                                    value={formik.values.Weather2}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="StatTotal"
                                    name="StatTotal"
                                    label="Stat Total"
                                    disabled={true}
                                    value={Number(formik.values.ATK) + Number(formik.values.DEF) + Number(formik.values.STA)}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="ATK"
                                    name="ATK"
                                    label="ATK"
                                    value={formik.values.ATK}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="DEF"
                                    name="DEF"
                                    label="DEF"
                                    value={formik.values.DEF}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="STA"
                                    name="STA"
                                    label="STA"
                                    value={formik.values.STA}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Legendary"
                                    name="Legendary"
                                    label="Legendary"
                                    value={formik.values.Legendary}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Aquireable"
                                    name="Aquireable"
                                    label="Aquireable"
                                    value={formik.values.Aquireable}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Spawns"
                                    name="Spawns"
                                    label="Spawns"
                                    value={formik.values.Spawns}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Regional"
                                    name="Regional"
                                    label="Regional"
                                    value={formik.values.Regional}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Raidable"
                                    name="Raidable"
                                    label="Raidable"
                                    value={formik.values.Raidable}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Hatchable"
                                    name="Hatchable"
                                    label="Hatchable"
                                    value={formik.values.Hatchable}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Shiny"
                                    name="Shiny"
                                    label="Shiny"
                                    value={formik.values.Shiny}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Nest"
                                    name="Nest"
                                    label="Nest"
                                    value={formik.values.Nest}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="NotGettable"
                                    name="NotGettable"
                                    label="Not-Gettable"
                                    value={formik.values.NotGettable}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="FutureEvolve"
                                    name="FutureEvolve"
                                    label="Future Evolve"
                                    value={formik.values.FutureEvolve}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="CP40"
                                    name="CP40"
                                    label="100% CP @ 40"
                                    value={formik.values.CP40}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="CP39"
                                    name="CP39"
                                    label="100% CP @ 39"
                                    value={formik.values.CP39}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button color="primary" variant="contained" fullWidth type="submit" >
                                    Criar Pokemon
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </form >
    );
};