import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function RadioComponent() {
    return (
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
        >
            <FormControlLabel value="imagenet" control={<Radio />} label="ImageNet" />
            <FormControlLabel value="cifar100" control={<Radio />} label="CIFAR-100" />
        </RadioGroup>
    );
}
