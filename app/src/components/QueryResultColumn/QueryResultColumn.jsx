import React from "react";
import ImageContainer from "../ImageContainer/ImageContainer.jsx";
import VerbalExplanation from "../VerbalExplanation/VerbalExplanation.jsx";
import PredictionTable from "../PredictionTable/PredictionTable.jsx";
import Subtitle from "../Subtitle/Subtitle.jsx";
import RiskMeter from "../RiskMeter/RiskMeter.jsx";
import {
  QueryResultContainer,
  QueryResultInfo,
} from "./QueryResultColumn.style.js";
import QueryResult from "../QueryResult/QueryResult.jsx";

const QueryResultColumn = ({ verbalExplanation, topPredictions, imageUrl, probability, detectionResult }) => {

  return (
    <QueryResultContainer>
      <ImageContainer imageUrl={imageUrl} maxHeight="400px"/>
      <QueryResultInfo>
        <RiskMeter probability={probability} />
      </QueryResultInfo>
      <QueryResultInfo>
        <Subtitle title="Top Predictions" />
        <PredictionTable
          data={topPredictions}
        />
      </QueryResultInfo>
      <QueryResultInfo>
        <Subtitle title="Verbal Explanation" />
        <VerbalExplanation explanation={verbalExplanation} />
      </QueryResultInfo>
    </QueryResultContainer>
  );
};

export default QueryResultColumn;