import React from 'react';
import {ImageContainerStyle, ImageStyle} from './ImageContainer.style';

const ImageContainer = ({ imageUrl, altText }) => {

    return (
        <ImageContainerStyle>
            <ImageStyle src={imageUrl} alt={altText}/>
        </ImageContainerStyle>
    );
}

export default ImageContainer;