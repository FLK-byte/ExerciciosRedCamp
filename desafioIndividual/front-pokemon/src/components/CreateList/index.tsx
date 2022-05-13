import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function FormCreateList({ handleClose }: any) {
    const [pokemons, setPokemons] = useState()
    const [pokemonsToCreate, setPokemonsToCreate] = useState<any>()
    const [nameList, setNamelist] = useState<any>()
    const navigate = useNavigate()

    const sendPast = async () => {
        try {
            const { data } = await axios(`http://localhost:1337/isAuthenticated`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })

            const response = await axios(`http://localhost:1337/user/${data.data.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })

            const criarLista = await axios.put(`http://localhost:1337/user/${data.data.id}`,{
                listas : [
                    ...response.data.listas,{
                    listaName : nameList,
                    pokemons : pokemonsToCreate
                }]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })

        } catch (err) {
            alert("Sua seção expirou")
            localStorage.removeItem('jwt')
            navigate('/')
        }
    }


    useEffect(() => {
        const callApi = async () => {
            try {
                const { data } = await axios('http://localhost:1337/allPokemonName', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                setPokemons(data)
            } catch (err) {
                console.log(err)
            }
        }
        callApi()
    }, [])
    return (
        <>
            <TextField label="Nome Da Lista" placeholder="Insira o nome da lista" onChange={(e) => setNamelist(e.target.value)} />
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={pokemons ? pokemons : [{ Name: "ulul" }]}
                disableCloseOnSelect
                getOptionLabel={(option) => option.Name}
                onChange={(e, value) => { setPokemonsToCreate(value) }}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.Name}
                    </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} label="Checkboxes" placeholder="Pokemons" />
                )}
            />
            <Button onClick={() =>{sendPast(), handleClose()}}> Criar Lista </Button>
        </>
    );
}
