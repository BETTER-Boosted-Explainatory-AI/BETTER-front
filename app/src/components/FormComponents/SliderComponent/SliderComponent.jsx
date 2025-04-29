import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {SliderStyle } from './SliderComponent.style';

const SliderComponent = ({ minValue=0, maxValue=100}) => {
    const initialValue = (maxValue - minValue) / 2 + minValue;

    return (
        <Box>
            <SliderStyle
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={initialValue}
                min={minValue}
                max={maxValue}
            />
        </Box>
    );
}

export default SliderComponent;
