import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}> How to Play </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pokemon Card Interactions
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Choose a card to play against your opponent's card.
            <br></br><br></br>
            Beat your opponent's card in 2 out of 3 rounds to win the game.
            <br></br><br></br>
            Fire beats Grass, Grass beats Water, and Water beats Fire.
          </Typography>
        
        </Box>
      </Modal>
    </div>
  );
}
