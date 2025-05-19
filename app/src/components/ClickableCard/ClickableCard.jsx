import React from 'react';
import {ClickableCardStyle} from './ClickableCard.style';
import CardContent from '@mui/material/CardContent';

const ClickableCard = ({label, onClick, selected}) => (
    <ClickableCardStyle onClick={onClick} selected={selected}>
        <CardContent>
                {label}
        </CardContent>
    </ClickableCardStyle>
);

export default ClickableCard;
