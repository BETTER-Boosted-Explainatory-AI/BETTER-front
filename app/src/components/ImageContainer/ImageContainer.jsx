import React from 'react';
import {ImageContainerStyle, ImageStyle} from './ImageContainer.style';

const ImageContainer = ({ imageUrl, altText, maxHeight = "600px" }) => {
    const base64Prefix = imageUrl.startsWith("data:image") ? "" : "data:image/png;base64,";

    return (
        <ImageContainerStyle>
            <ImageStyle src={`${base64Prefix}${imageUrl}`} alt={altText} maxHeight={maxHeight}/>
        </ImageContainerStyle>
    );
}

export default ImageContainer;