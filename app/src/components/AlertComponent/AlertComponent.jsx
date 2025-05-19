import * as React from 'react';
import Alert from '@mui/material/Alert';

const AlertComponent = ({ message, severity, onClose }) => {
    return (
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
    );
}

export default AlertComponent;