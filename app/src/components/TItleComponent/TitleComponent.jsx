import React from "react";
import {TitleWrapper,Title} from "./TitleComponent.style";

const TitleComponent = ({ title }) => {

    return (
        <TitleWrapper>
        <Title>
            {title}
        </Title>
        </TitleWrapper>
    );
    }
export default TitleComponent;
