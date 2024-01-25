import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const QuantityModal = ({ open, onClose, onConfirm, operation, symbol }) => {
  const [quantity, setQuantity] = useState('');

  const handleConfirm = () => {
    if (quantity.trim() !== '') {
      onConfirm({ symbol, quantity: parseInt(quantity, 10) });
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <TextField label="Quantity" type="number" fullWidth value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ marginTop: '16px' }}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default QuantityModal;
