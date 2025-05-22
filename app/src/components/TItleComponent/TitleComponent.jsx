import React from "react";
import {TitleWrapper,Title} from "./TitleComponent.style";

const TitleComponent = ({ title, flexStart="center" }) => {

    return (
        <TitleWrapper flexStart={flexStart}>
        <Title>
            {title}
        </Title>
        </TitleWrapper>
    );
    }
export default TitleComponent;
