import { NestedModal } from './NestedModal/index'
import { IPokemon } from '../../models/IPokemon';
import { Modalstyle } from './style'
import { CardMedia, Grid, Button, Modal, Box } from '@mui/material';

export function DeleteConfirmationModal(props: { open: boolean, handleClose: () => void, pokemon: IPokemon, goToMenu: () => void }) {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...Modalstyle, width: 400 }}>
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
                        <NestedModal goToMenu={props.goToMenu} closeParentModal={props.handleClose} pokemon={props.pokemon} />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
