import {styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

export const ClickableCardStyle = styled(Card)(({ theme, selected }) => ({
    width: 'auto',
    height: '7vh',
    backgroundColor: selected ? theme.palette.customColors.softBlue : theme.palette.primary.bg,
    color: selected ? theme.palette.secondary.text : theme.palette.primary.main,
    fontWeight: selected ? '600' : '400',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.customColors.paleBlue,
        color: theme.palette.primary.main,
    },
    padding: '0.2em 0.3em 0em 0.3em',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));