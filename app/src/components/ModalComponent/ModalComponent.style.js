
import Box from '@mui/material/Box';
import {styled } from '@mui/material/styles';

export const ModalWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "modalWidth" && prop !== "modalHeight" && prop !== "hasStickyHeader",
})(({ modalWidth, modalHeight, hasStickyHeader }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: modalWidth,
  height: modalHeight,
  overflowY: 'auto',
  boxShadow: 24,
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: hasStickyHeader ? '0' : '2em',
  gap: '1em',
}));