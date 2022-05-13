import { useFormik } from 'formik';
import { TextField, Button, Grid, Container, CardMedia } from '@mui/material';
import { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'

export const FormCreatePokemon = ({ handleClose }: any) => {
    const [errorImg, setErrorImg] = useState(false)
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            PokemonName: "",
            PokedexNumber: "0",
            ImgName: "0",
            Generation: "0",
            EvolutionStage: '0',
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
            axios.post('http://localhost:1337/pokemon', {
                "Name": values.PokemonName,
                "Pokedex Number": values.PokedexNumber,
                "Img name": values.ImgName,
                "Generation": values.Generation,
                "Evolution Stage": values.EvolutionStage,
                "Evolved": values.Evolved,
                "FamilyID": values.FamilyID,
                "Cross Gen": values.CrossGen,
                "Type 1": values.Type1,
                "Type 2": values.Type2,
                "Weather 1": values.Weather1,
                "Weather 2": values.Weather2,
                "STAT TOTAL": values.StatTotal,
                "ATK": values.ATK,
                "DEF": values.DEF,
                "STA": values.STA,
                "Legendary": values.Legendary,
                "Aquireable": values.Aquireable,
                "Spawns": values.Spawns,
                "Regional": values.Regional,
                "Raidable": values.Raidable,
                "Hatchable": values.Hatchable,
                "Shiny": values.Shiny,
                "Nest": values.Nest,
                "New": values.New,
                "Not-Gettable": values.NotGettable,
                "Future Evolve": values.FutureEvolve,
                "100% CP @ 40": values.CP40,
                "100% CP @ 39": values.CP39,
                "Description": values.Description
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
                .then(res => { console.log(res) })
                .catch(err => { console.log(err) })
            handleClose()
        },
    });
    useEffect(() => {
        setErrorImg(false)
    }, [values.ImgName])
    return (
        <form onSubmit={handleSubmit}>
            <Container>
                <Grid container>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item>
                                <CloseIcon onClick={() => { handleClose() }} />
                            </Grid>
                            <Grid item xs={12}>
                                {errorImg == false ? <CardMedia
                                    component="img"
                                    height="140"
                                    onError={(e: any) => { e.target.onerror = null; setErrorImg(true) }}
                                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${values.ImgName.toString().padStart(3, "0")}.png`}
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
                                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${values.ImgName.toString().padStart(3, "0")}.png`}
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
                                    value={values.PokemonName}
                                    onChange={handleChange}
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
                                    value={values.Description}
                                    onChange={handleChange}
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
                                    value={values.PokedexNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="ImgName"
                                    name="ImgName"
                                    label="Img Name"
                                    value={values.ImgName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="EvolutionStage"
                                    name="EvolutionStage"
                                    label="Evolution Stage"
                                    value={values.EvolutionStage}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Evolved"
                                    name="Evolved"
                                    label="Evolved"
                                    value={values.Evolved}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="FamilyID"
                                    name="FamilyID"
                                    label="FamilyID"
                                    value={values.FamilyID}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="CrossGen"
                                    name="CrossGen"
                                    label="CrossGen"
                                    value={values.CrossGen}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Type1"
                                    name="Type1"
                                    label="Type 1"
                                    value={values.Type1}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Type2"
                                    name="Type2"
                                    label="Type 2"
                                    value={values.Type2}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Weather1"
                                    name="Weather1"
                                    label="Weather 1"
                                    value={values.Weather1}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Weather2"
                                    name="Weather2"
                                    label="Weather 2"
                                    value={values.Weather2}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="StatTotal"
                                    name="StatTotal"
                                    label="Stat Total"
                                    disabled={true}
                                    value={Number(values.ATK) + Number(values.DEF) + Number(values.STA)}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="ATK"
                                    name="ATK"
                                    label="ATK"
                                    value={values.ATK}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="DEF"
                                    name="DEF"
                                    label="DEF"
                                    value={values.DEF}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="STA"
                                    name="STA"
                                    label="STA"
                                    value={values.STA}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Legendary"
                                    name="Legendary"
                                    label="Legendary"
                                    value={values.Legendary}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Aquireable"
                                    name="Aquireable"
                                    label="Aquireable"
                                    value={values.Aquireable}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Spawns"
                                    name="Spawns"
                                    label="Spawns"
                                    value={values.Spawns}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Regional"
                                    name="Regional"
                                    label="Regional"
                                    value={values.Regional}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Raidable"
                                    name="Raidable"
                                    label="Raidable"
                                    value={values.Raidable}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Hatchable"
                                    name="Hatchable"
                                    label="Hatchable"
                                    value={values.Hatchable}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Shiny"
                                    name="Shiny"
                                    label="Shiny"
                                    value={values.Shiny}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="Nest"
                                    name="Nest"
                                    label="Nest"
                                    value={values.Nest}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="NotGettable"
                                    name="NotGettable"
                                    label="Not-Gettable"
                                    value={values.NotGettable}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    id="FutureEvolve"
                                    name="FutureEvolve"
                                    label="Future Evolve"
                                    value={values.FutureEvolve}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="CP40"
                                    name="CP40"
                                    label="100% CP @ 40"
                                    value={values.CP40}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="CP39"
                                    name="CP39"
                                    label="100% CP @ 39"
                                    value={values.CP39}
                                    onChange={handleChange}
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