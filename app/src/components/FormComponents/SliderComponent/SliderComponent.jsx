import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {SliderStyle } from './SliderComponent.style';

const SliderComponent = ({ minValue=0, maxValue=100}) => {
    return (
        <Box sx={{ width: 320 }}>
            <SliderStyle
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={20}
                min={minValue}
                max={maxValue}
            />
        </Box>
    );
}

export default SliderComponent;
