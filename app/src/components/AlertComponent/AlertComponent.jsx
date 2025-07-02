import * as React from 'react';
import Alert from '@mui/material/Alert';

const AlertComponent = ({ message, severity, onClose, width = "80%" }) => {
    return (
        <Alert
            onClose={onClose}
            severity={severity}
            sx={{
                width: width,
                fontSize: '1em',
            }}
        >
            {message}
        </Alert>
    );
}

export default AlertComponent;