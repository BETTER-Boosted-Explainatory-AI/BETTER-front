import * as React from 'react';
import Button from '@mui/material/Button';
import { ButtonContainer } from './ButtonComponent.style';

const ButtonComponent = ({ label, onClickHandler, disabled }) => {
    return (
        <>
            <ButtonContainer>
                <Button variant="contained" onClick={onClickHandler} disabled={disabled}>{label}</Button>
            </ButtonContainer>
        </>
    );
}

export default ButtonComponent;