import React from 'react';
import {SubtitleStyle } from './Subtitle.style';


const Subtitle = ({ title, fontSize = "18px" }) => {
    return (
        <SubtitleStyle fontSize={fontSize}>
            {title}
        </SubtitleStyle>
    );
}

export default Subtitle;