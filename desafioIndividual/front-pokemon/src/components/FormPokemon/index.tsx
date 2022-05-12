import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Grid, Container } from '@mui/material';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const FormPokemon = () => {
    const formik = useFormik({
        initialValues: {
            Name: "",
            PokedexNumber: "",
            ImgName: "",
            Generation: "",
            EvolutionStage: '',
            Evolved: '',
            FamilyID: "",
            CrossGen: "",
            Type1: "",
            Type2: "",
            Weather1: "",
            Weather2: "",
            StatTotal: "",
            ATK: "",
            DEF: "",
            STA: "",
            Legendary: "",
            Aquireable: "",
            Spawns: "",
            Regional: "",
            Raidable: "",
            Hatchable: "",
            Shiny: "",
            Nest: "",
            New: "",
            NotGettable: "",
            FutureEvolve: "",
            CP40: "",
            CP39: "",
            Description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert("A")
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="PokedexNumber"
                                name="PokedexNumber"
                                label="ALALALLALAA"
                                value={formik.values.PokedexNumber}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
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
                            value={formik.values.StatTotal}
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
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        </form>
    );
};