import React from 'react';
import {SubtitleStyle } from './Subtitle.style';


const Subtitle = ({ title }) => {
    return (
        <SubtitleStyle>
            {title}
        </SubtitleStyle>
    );
}

export default Subtitle;