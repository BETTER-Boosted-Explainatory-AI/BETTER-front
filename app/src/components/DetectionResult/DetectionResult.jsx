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

  return (
    <QueryResultContainer>
      <QueryResultImageContainer>
        <ImageContainer imageUrl={imageUrl} />
      </QueryResultImageContainer>
      <QueryResultInfoContainer>
        <QueryResultInfo>
            <Subtitle title={`The Image is ${detectionResult}`} />
        </QueryResultInfo>
        <QueryResultInfo>
            <Subtitle title="Top Predictions" />
          <PredictionTable
            data={topPredictions}
          />
        </QueryResultInfo>
      </QueryResultInfoContainer>
    </QueryResultContainer>
  );
};

export default DetectionResult;