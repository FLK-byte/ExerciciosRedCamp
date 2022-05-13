import { useFormik } from 'formik';
import { TextField, Button, Grid, Container, CardMedia } from '@mui/material';
import { IPokemon } from '../../models/IPokemon';
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios'
import { DeleteConfirmationModal } from '../DeleteModal/index'
export const FormPokemon = (props: { pokemon?: IPokemon, handleTeste?: () => void }) => {
    const [editPermission, setEditPermission] = useState<boolean>(false)
    const [errorImg, setErrorImg] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            PokemonName: props.pokemon?.Name || "",
            PokedexNumber: props.pokemon?.['Pokedex Number'] || "0",
            ImgName: props.pokemon?.['Img name'] || "0",
            Generation: props.pokemon?.Generation || "0",
            EvolutionStage: props.pokemon?.['Evolution Stage'] || '0',
            Evolved: props.pokemon?.Evolved || '0',
            FamilyID: props.pokemon?.FamilyID || "0",
            CrossGen: props.pokemon?.['Cross Gen'] || "0",
            Type1: props.pokemon?.['Type 1'] || "",
            Type2: props.pokemon?.['Type 2'] || "",
            Weather1: props.pokemon?.['Weather 1'] || "",
            Weather2: props.pokemon?.['Weather 2'] || "",
            StatTotal: props.pokemon?.['STAT TOTAL'] || "0",
            ATK: props.pokemon?.ATK || "0",
            DEF: props.pokemon?.DEF || "0",
            STA: props.pokemon?.STA || "0",
            Legendary: props.pokemon?.Legendary || "0",
            Aquireable: props.pokemon?.Aquireable || "0",
            Spawns: props.pokemon?.Spawns || "0",
            Regional: props.pokemon?.Regional || "0",
            Raidable: props.pokemon?.Raidable || "0",
            Hatchable: props.pokemon?.Hatchable || "0",
            Shiny: props.pokemon?.Shiny || "0",
            Nest: props.pokemon?.Nest || "0",
            New: props.pokemon?.New || "0",
            NotGettable: props.pokemon?.['Not-Gettable'] || "0",
            FutureEvolve: props.pokemon?.['Future Evolve'] || "0",
            CP40: props.pokemon?.['100% CP @ 40'] || "0",
            CP39: props.pokemon?.['100% CP @ 39'] || "0",
            Description: props.pokemon?.Description || 'Este pokemon não tem descrição'
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            axios.put(`http://localhost:1337/pokemon/${props.pokemon?._id}`, {
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
            })
                .then(res => { console.log(res) })
                .catch(err => { console.log(err) })
            props.handleTeste ? props.handleTeste() : null
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
                            <Grid item xs={8}>
                                <Button onClick={() => props.handleTeste ? props.handleTeste() : null}>{"<- Lista geral"}</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <EditIcon onClick={() => setEditPermission(!editPermission)}>{"Editar"}</EditIcon>
                                <DeleteForeverIcon onClick={() => { setOpenDeleteModal(true) }}>{"Deletar"}</DeleteForeverIcon>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    id="PokemonName"
                                    name="PokemonName"
                                    label="Pokemon Name"
                                    disabled={!editPermission}
                                    value={values.PokemonName}
                                    onChange={handleChange}
                                />
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
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Descrição do pokemon"
                                    name="Description"
                                    multiline
                                    minRows={6}
                                    maxRows={12}
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
                                    value={values.CP39}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button color="primary" variant="contained" fullWidth type="submit" disabled={!editPermission}>
                                    {editPermission ? "Editar Pokemon" : "Clique no lapis para editar"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <DeleteConfirmationModal open={openDeleteModal} handleClose={() => setOpenDeleteModal(false)} pokemon={props.pokemon as IPokemon} goToMenu={()=>props.handleTeste ? props.handleTeste() : null}/>
            </Container>
        </form >
    );
};