import { useFormik } from 'formik';
import { TextField, Button, Grid, Container, CardMedia } from '@mui/material';
import { IPokemon } from '../../models/IPokemon';
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const FormPokemon = (props: { pokemon?: IPokemon, handleTeste: () => void }) => {
    const [editPermission, setEditPermission] = useState<boolean>(false)
    const formik = useFormik({
        initialValues: {
            Name: props.pokemon?.Name || "",
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
            props.handleTeste()
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Container>
                <Grid container>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Button onClick={() => props.handleTeste()}>{"<- Lista geral"}</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <EditIcon onClick={() => setEditPermission(!editPermission)}>{"Editar"}</EditIcon>
                                <DeleteForeverIcon onClick={() => { alert("O pokemom foi deletado"), props.handleTeste() }}>{"Deletar"}</DeleteForeverIcon>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    id="PokemonName"
                                    name="PokemonName"
                                    label="Pokemon Name"
                                    disabled={!editPermission}
                                    value={formik.values.Name}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formik.values.ImgName.toString().padStart(3, "0")}.png` || `./src/assets/pokemonDiferente.png`}
                                    sx={{ objectFit: 'contain' }}
                                    alt="green iguana"
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Descrição do pokemon"
                                    name="Description"
                                    multiline
                                    maxRows={6}
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
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
                                    disabled={!editPermission}
                                    value={formik.values.CP39}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button color="primary" variant="contained" fullWidth type="submit" disabled={!editPermission}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </form >
    );
};