import { useState } from 'react';
import { IPokemon } from '../../models/IPokemon';
import { CardMedia, Grid, Button, Modal, Box } from '@mui/material';
import axios from 'axios'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal(props: { goToMenu: () => void, closeParentModal: () => void, pokemon: IPokemon }) {
    async function DeletarPokemon() {
        await axios.delete(`http://localhost:1337/pokemon/${props.pokemon?._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={() => { handleOpen(), DeletarPokemon() }}>Deletar Pokemon</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Pokemon deletado com sucesso</h2>
                    <CardMedia
                        component="img"
                        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png`}
                        height="140"
                        sx={{ objectFit: 'contain' }}
                    />
                    <Button onClick={() => { props.closeParentModal(), props.goToMenu(), handleClose() }}>Voltar Para Lista</Button>
                </Box>
            </Modal>
        </>
    );
}

export function DeleteConfirmationModal(props: { open: boolean, handleClose: () => void, pokemon: IPokemon, goToMenu: () => void }) {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">Você deseja deletar esse pokemon ? </h2>
                <p id="parent-modal-description">
                    Essa ação não pode ser desfeita
                </p>
                <CardMedia
                    component="img"
                    src='./src/assets/PikachuTriste.png'
                    height="140"
                    sx={{ objectFit: 'contain' }}
                />
                <Grid container>
                    <Grid item xs={6}>
                        <Button onClick={() => { props.handleClose() }}>Cancelar Ação</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <ChildModal goToMenu={props.goToMenu} closeParentModal={props.handleClose} pokemon={props.pokemon} />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
