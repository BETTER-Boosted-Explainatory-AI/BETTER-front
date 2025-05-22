import React from "react";
import QueryResultColumn from "../QueryResultColumn/QueryResultColumn";
import TitleComponent from '../TitleComponent/TitleComponent';
import { AnalysisContainer, AnalysisResultContainer } from "./ImageAnalysisResult.style.js";

const ImageAnalysisResult = ({ analyzedImage }) => {

  return (
    <>
    <AnalysisContainer>
    <AnalysisResultContainer>
    <TitleComponent title="before" flexStart="flex-start" />
    <QueryResultColumn verbalExplanation={analyzedImage.original_verbal_explaination}
      topPredictions={analyzedImage.original_predicition}
      imageUrl={analyzedImage.original_image}
        analyze={2}
    />
    </AnalysisResultContainer>
    <AnalysisResultContainer>
    <TitleComponent title="after"  flexStart="flex-start" />
    <QueryResultColumn verbalExplanation={analyzedImage.adversarial_verbal_explaination}
      topPredictions={analyzedImage.adversarial_prediction}
      imageUrl={analyzedImage.adversarial_image}
      analyze={2}
    />
    </AnalysisResultContainer>
    </AnalysisContainer>
    </>
  );
};

export default ImageAnalysisResult;