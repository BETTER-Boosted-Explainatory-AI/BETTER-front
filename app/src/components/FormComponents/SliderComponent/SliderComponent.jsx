import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {SliderStyle } from './SliderComponent.style';

const SliderComponent = ({inputName,  minValue=0, maxValue=100, initValue=50}) => {

    return (
        <Box>
            <SliderStyle
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={initValue}
                min={minValue}
                max={maxValue}
                name={inputName}
            />
        </Box>
    );
}

export default SliderComponent;
