import axios from 'axios'
import { useState } from 'react';
import { IPokemon } from '../../../models/IPokemon';
import {Modalstyle} from '../style'
import { CardMedia, Grid, Button, Modal, Box } from '@mui/material';

export function NestedModal(props: { goToMenu: () => void, closeParentModal: () => void, pokemon: IPokemon }) {
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
              <Box sx={{ ...Modalstyle, width: 200 }}>
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
