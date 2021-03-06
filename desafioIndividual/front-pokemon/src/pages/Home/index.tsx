import { AllPage, LeftBar, RightBar, Options, ExitArea, CreatePokemonModal, CreateListModal, ButtonActivated, ButtonDesactivated } from './style'
import { LogoComponent } from '../../components/LogoComponent'
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Box, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { AllPokemons } from '../../components/AllPokemons'
import { MyLists } from '../../components/MyLists'
import { MyPokemons } from '../../components/MyPokemons'
import { useState } from 'react'
import { FormCreatePokemon } from '../../components/CreatePokemonForm/index'
import { FormCreateList } from '../../components/CreateList/index'

export function Home(): JSX.Element {
    const [ToRender, setToRender] = useState<string>("AllPokemons")

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => { setOpenCreateModal(false), setToRender("AllPokemons") };

    const [openListModal, setOpenListModal] = useState(false);
    const handleOpenListModal = () => setOpenListModal(true);
    const handleCloseListModal = () => { setOpenListModal(false), setToRender("AllPokemons") };

    const navigate = useNavigate()
    return (
        <AllPage>
            <LeftBar>
                <LogoComponent />
                <Options>
                    <Button variant="text" sx={ToRender == "AllPokemons" ? { ...ButtonActivated } : { ...ButtonDesactivated }}
                        onClick={() => { setToRender("AllPokemons") }}
                    >Todos os pokemons</Button>
                    <Button variant="text" sx={ToRender == "MyLists" ? { ...ButtonActivated } : { ...ButtonDesactivated }}
                        onClick={() => { setToRender("MyLists") }}
                    >Minhas Listas</Button>
                    <Button variant="text" sx={ToRender == "MyPokemons" ? { ...ButtonActivated } : { ...ButtonDesactivated }}
                        onClick={() => { setToRender("MyPokemons") }}
                    >Meus pokemons</Button>
                    <Button variant="text" sx={ToRender == "MyCreateList" ? { ...ButtonActivated } : { ...ButtonDesactivated }}
                        onClick={() => { setToRender("MyCreateList"), handleOpenListModal() }}
                    >Criar nova lista</Button>
                    <Button variant="text" sx={ToRender == "MyForm" ? { ...ButtonActivated } : { ...ButtonDesactivated }}
                        onClick={() => { setToRender("MyForm"), handleOpenCreateModal() }}
                    >Criar novo pokemon</Button>
                </Options>
                <ExitArea>
                    <LogoutIcon />
                    <Button onClick={() => { localStorage.removeItem('jwt'), navigate('/') }} sx={{ color: "white" }}>Sair</Button>
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
                    onClose={handleCloseCreateModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={CreatePokemonModal}>
                        <FormCreatePokemon handleClose={handleCloseCreateModal} />
                    </Box>
                </Modal>

                <Modal
                    open={openListModal}
                    onClose={handleCloseListModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={CreateListModal}>
                        <FormCreateList handleClose={handleCloseListModal} />
                    </Box>
                </Modal>
            </RightBar>
        </AllPage>
    )
}