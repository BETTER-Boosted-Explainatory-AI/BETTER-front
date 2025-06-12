import React from "react";
import ImageContainer from "../ImageContainer/ImageContainer";
import PredictionTable from "../PredictionTable/PredictionTable";
import Subtitle from "../Subtitle/Subtitle.jsx";
import RiskMeter from "../RiskMeter/RiskMeter.jsx";
import {
  QueryResultContainer,
  QueryResultInfoContainer,
  QueryResultInfo,
  QueryResultImageContainer,
} from "../QueryResult/QueryResult.style.js";

const DetectionResult = ({ detectionResult, topPredictions, imageUrl, probability }) => {


  return (
    <QueryResultContainer>
      <QueryResultImageContainer>
        <ImageContainer imageUrl={imageUrl}/>
      </QueryResultImageContainer>
      <QueryResultInfoContainer>
        <QueryResultInfo>
          <RiskMeter detectionResult={detectionResult} probability={probability} />
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
