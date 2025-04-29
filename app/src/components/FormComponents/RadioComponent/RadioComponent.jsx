import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';

const RadioComponent = ({children}) => {
    return (
        <RadioGroup
            aria-labelledby="demo-column-radio-buttons-group-label"
            name="column-radio-buttons-group"
        >
            {children}
        </RadioGroup>
    );
}

export default RadioComponent;