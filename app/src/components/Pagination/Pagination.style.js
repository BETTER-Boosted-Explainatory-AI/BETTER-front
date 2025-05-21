import { styled } from '@mui/material/styles';

export const PaginationContainer = styled('ul')`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7em;
    padding: 0;
    list-style: none;
`;

export const PaginationDot = styled('li')(({ theme, selected }) => ({
    width: "12px",
    height: "12px",
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: selected ? theme.palette.secondary.main : theme.palette.grey[400],
    '&:hover': {
      transform: 'scale(1.2)',
    }
}));