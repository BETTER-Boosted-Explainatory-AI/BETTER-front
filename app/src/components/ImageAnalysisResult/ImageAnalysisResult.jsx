import React from "react";
import QueryResult from "../QueryResult/QueryResult";
import TitleComponent from '../TitleComponent/TitleComponent';
import { AnalysisContainer } from "./ImageAnalysisResult.style.js";

const ImageAnalysisResult = ({ analyzedImage }) => {

  return (
    <>
    <AnalysisContainer>
    <TitleComponent title="before" />
    <QueryResult verbalExplanation={analyzedImage.original_verbal_explaination}
      topPredictions={analyzedImage.original_predicition}
      imageUrl={analyzedImage.original_image}
    />
    </AnalysisContainer>
    <AnalysisContainer>
    <TitleComponent title="after" />
    <QueryResult verbalExplanation={analyzedImage.adversarial_verbal_explaination}
      topPredictions={analyzedImage.adversarial_prediction}
      imageUrl={analyzedImage.adversarial_image}
    />
    </AnalysisContainer>
    </>
  );
};

export default ImageAnalysisResult;