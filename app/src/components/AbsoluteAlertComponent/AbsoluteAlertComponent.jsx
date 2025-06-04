import * as React from 'react';
import Alert from '@mui/material/Alert';
import { AbsoluteAlertContainer } from './AbsoluteAlertComponent.style';

const AbsoluteAlertComponent = ({ message, severity, onClose, top, bottom, left, right, visible=true }) => {
    return (
        <AbsoluteAlertContainer top={top} bottom={bottom} left={left} right={right} visible={visible}>
        <Alert
            onClose={onClose}
            severity={severity}
            sx={{
                width: '70%',
                fontSize: '1em',
            }}
        >
            {message}
        </Alert>
        </AbsoluteAlertContainer>
    );
}

export default AbsoluteAlertComponent;