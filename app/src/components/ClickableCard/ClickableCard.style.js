import {styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

export const ClickableCardStyle = styled(Card)(({ theme, selected }) => ({
    width: 'auto',
    height: '7vh',
    backgroundColor: selected ? theme.palette.customColors.softBlue : theme.palette.primary.bg,
    color: theme.palette.primary.main,
    fontWeight: selected ? '600' : '400',
    cursor: 'pointer',
    transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), background-color 0.2s',
    '&:hover': {
        backgroundColor: theme.palette.customColors.paleBlue,
        color: theme.palette.primary.main,
    },
    '&:active': {
        transform: 'scale(1.1)',
    },
    padding: '0.2em 0.3em 0em 0.3em',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));