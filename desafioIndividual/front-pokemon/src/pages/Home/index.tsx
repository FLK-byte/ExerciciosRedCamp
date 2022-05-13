import { AllPage, LeftBar, RightBar, Options, ExitArea, CreatePokemonModal } from './style'
import { LogoComponent } from '../../components/LogoComponent'
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Box, Modal } from '@mui/material';
import { Link } from 'react-router-dom'
import { AllPokemons } from '../../components/AllPokemons'
import { MyLists } from '../../components/MyLists'
import { MyPokemons } from '../../components/MyPokemons'
import { useState } from 'react'
import { FormCreatePokemon } from '../../components/CreatePokemonForm/index'


export function Home() {
    const [ToRender, setToRender] = useState<string>("AllPokemons")
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const handleOpen = () => setOpenCreateModal(true);
    const handleClose = () => {setOpenCreateModal(false), setToRender("AllPokemons")};
    return (
        <AllPage>
            <LeftBar>
                <LogoComponent />
                <Options>
                    <Button variant="text" sx={ToRender == "AllPokemons" ? { color: "yellow", fontSize: "15px" } : { color: "white", fontSize: "15px" }}
                        onClick={() => { setToRender("AllPokemons") }}
                    >Todos os pokemons</Button>
                    <Button variant="text" sx={ToRender == "MyLists" ? { color: "yellow", fontSize: "15px" } : { color: "white", fontSize: "15px" }}
                        onClick={() => { setToRender("MyLists") }}
                    >Minhas Listas</Button>
                    <Button variant="text" sx={ToRender == "MyPokemons" ? { color: "yellow", fontSize: "15px" } : { color: "white", fontSize: "15px" }}
                        onClick={() => { setToRender("MyPokemons") }}
                    >Meus pokemons</Button>
                    <Button variant="text" sx={{ color: "white", fontSize: "15px" }}
                        onClick={() => { alert("Criar nova lista ainda nao ta feito") }}
                    >Criar nova lista</Button>
                    <Button variant="text" sx={ToRender == "MyForm" ? { color: "yellow", fontSize: "15px" } : { color: "white", fontSize: "15px" }}
                        onClick={() => { setToRender("MyForm"), handleOpen() }}
                    >Criar novo pokemon</Button>
                </Options>
                <ExitArea>
                    <LogoutIcon />
                    <Link to="/"><Button sx={{ color: "white" }}>Sair</Button></Link>
                </ExitArea>
            </LeftBar>
            <RightBar>
                {
                    ToRender == "AllPokemons" ? <AllPokemons /> :
                    ToRender == "MyLists" ? <MyLists /> :
                    ToRender == "MyPokemons" ? <MyPokemons /> : <AllPokemons />
                }
                <Modal
                    open={openCreateModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={CreatePokemonModal}>
                        <FormCreatePokemon handleClose={handleClose}/>
                    </Box>
                </Modal>
            </RightBar>
        </AllPage>
    )
}