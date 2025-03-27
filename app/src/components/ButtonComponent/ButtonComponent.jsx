import * as React from 'react';
import Button from '@mui/material/Button';
import { ButtonContainer } from './ButtonComponent.style';

const ButtonComponent = ({ label }) => {
    return (
        <>
            <ButtonContainer>
                <Button variant="contained" style={{ width: '50%' }}>{label}</Button>
            </ButtonContainer>
        </>
    );
}

export default ButtonComponent;