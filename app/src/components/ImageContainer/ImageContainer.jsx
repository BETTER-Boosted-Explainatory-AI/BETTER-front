import React from 'react';
import {ImageContainerStyle, ImageStyle} from './ImageContainer.style';

const ImageContainer = ({ imageUrl, altText }) => {
    const base64Prefix = imageUrl.startsWith("data:image") ? "" : "data:image/png;base64,";

    return (
        <ImageContainerStyle>
            <ImageStyle src={`${base64Prefix}${imageUrl}`} alt={altText}/>
        </ImageContainerStyle>
    );
}

export default ImageContainer;