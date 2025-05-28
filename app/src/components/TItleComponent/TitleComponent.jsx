import React from "react";
import {TitleWrapper,Title} from "./TitleComponent.style";

const TitleComponent = ({ title, fontSize="1.2em", flexStart="center" }) => {

    return (
        <TitleWrapper flexStart={flexStart}>
        <Title fontSize={fontSize}>
            {title}
        </Title>
        </TitleWrapper>
    );
    }
export default TitleComponent;
