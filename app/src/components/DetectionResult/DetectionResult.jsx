import React from "react";
import ImageContainer from "../ImageContainer/ImageContainer";
import PredictionTable from "../PredictionTable/PredictionTable";
import Subtitle from "../Subtitle/Subtitle.jsx";
import {
  QueryResultContainer,
  QueryResultInfoContainer,
  QueryResultInfo,
  QueryResultImageContainer,
} from "../QueryResult/QueryResult.style.js";

const DetectionResult = ({ detectionResult, topPredictions, imageUrl }) => {
  const detectionResultText =
    detectionResult === "adversarial"
      ? "The image is suspected for an"
      : "The Image is an";
  const detectionResultCurrect =
    detectionResult === "adversarial" ? "attack" : "authentic image";
  const color = detectionResult === "adversarial" ? "red" : "green";

  return (
    <QueryResultContainer>
      <QueryResultImageContainer>
        <ImageContainer imageUrl={imageUrl} />
      </QueryResultImageContainer>
      <QueryResultInfoContainer>
        <QueryResultInfo>
          <Subtitle
            title={
              <>
                {detectionResultText}{" "}
                <span style={{ color, fontWeight: 700 }}>
                  {detectionResultCurrect}
                </span>
              </>
            }
          />
        </QueryResultInfo>
        <QueryResultInfo>
          <Subtitle title="Top Predictions" />
          <PredictionTable data={topPredictions} />
        </QueryResultInfo>
      </QueryResultInfoContainer>
    </QueryResultContainer>
  );
};

export default DetectionResult;
