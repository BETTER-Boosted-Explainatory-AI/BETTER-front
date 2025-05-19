import * as React from 'react';
import Button from '@mui/material/Button';
import { ButtonContainer } from './ButtonComponent.style';

const ButtonComponent = ({ label, onClickHandler }) => {
    return (
        <>
            <ButtonContainer>
                <Button variant="contained" onClick={onClickHandler}>{label}</Button>
            </ButtonContainer>
        </>
    );
}

export default ButtonComponent;