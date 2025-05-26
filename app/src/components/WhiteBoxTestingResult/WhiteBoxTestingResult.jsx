import React from "react";
import PredictionTable from "../PredictionTable/PredictionTable";
import ImageContainer from "../ImageContainer/ImageContainer";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import { WhiteBoxTestingResultContainer, ItemContainer } from "./WhiteBoxTestingResult.style";

const WhiteBoxTestingResult = ({ wbtResult }) => {
    console.log("Rendering result with:", wbtResult);

    if (!wbtResult || wbtResult.length === 0) {
        return <div>No results available.</div>;
    }

    return (
        <WhiteBoxTestingResultContainer>
            {wbtResult.map((result, idx) => {
                console.log("Rendering result item:", result);
                return (
                    <ItemContainer key={idx}>
                        <ImageContainer
                            imageUrl={result.image}
                            altText={`Image ${idx}`}
                        />
                        <FormLabelComponent label={`Image Id: ${result.image_id}`} />
                        <PredictionTable
                            headers={["Source", "Target", "Prediction"]}
                            data={result.matches}
                        />
                    </ItemContainer>
                );
            })}
        </WhiteBoxTestingResultContainer>
    );
}

export default WhiteBoxTestingResult;