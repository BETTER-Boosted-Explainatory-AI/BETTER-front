
import Box from '@mui/material/Box';
import {styled } from '@mui/material/styles';

export const ModalWrapper = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5em',
  padding: '3em 0em',
});