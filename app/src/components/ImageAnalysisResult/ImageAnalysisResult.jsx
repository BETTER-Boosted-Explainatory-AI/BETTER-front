import React from "react";
import QueryResultColumn from "../QueryResultColumn/QueryResultColumn";
import TitleComponent from "../TitleComponent/TitleComponent";
import {
  AnalysisContainer,
  AnalysisResultContainer,
} from "./ImageAnalysisResult.style.js";

const ImageAnalysisResult = ({ analyzedImage, attackName }) => {
  return (
    <>
      <AnalysisContainer>
        <AnalysisResultContainer>
          <TitleComponent
            title={`before ${attackName}`}
            flexStart="flex-start"
          />
          <QueryResultColumn
            verbalExplanation={analyzedImage.original_verbal_explaination}
            topPredictions={analyzedImage.original_predicition}
            imageUrl={analyzedImage.original_image}
            probability={analyzedImage.original_probability}
            detectionResult={analyzedImage.original_detection_result}
            analyze={2}
          />
        </AnalysisResultContainer>
        <AnalysisResultContainer>
          <TitleComponent
            title={`after ${attackName}`}
            flexStart="flex-start"
          />
          <QueryResultColumn
            verbalExplanation={analyzedImage.adversarial_verbal_explaination}
            topPredictions={analyzedImage.adversarial_prediction}
            imageUrl={analyzedImage.adversarial_image}
            probability={analyzedImage.adversarial_probability}
            detectionResult={analyzedImage.adversarial_detection_result}
            analyze={2}
          />
        </AnalysisResultContainer>
      </AnalysisContainer>
    </>
  );
};

export default ImageAnalysisResult;
