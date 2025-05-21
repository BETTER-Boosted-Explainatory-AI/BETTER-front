import React from "react";
import ImageContainer from "../ImageContainer/ImageContainer";
import VerbalExplanation from "../VerbalExplanation/VerbalExplanation";
import PredictionTable from "../PredictionTable/PredictionTable";
import Subtitle from "../Subtitle/Subtitle.jsx";
import {
  QueryResultContainer,
  QueryResultInfoContainer,
  QueryResultInfo,
  QueryResultImageContainer,
} from "./QueryResult.style.js";

const QueryResult = ({ verbalExplanation, topPredictions, imageUrl }) => {

  return (
    <QueryResultContainer>
      <QueryResultImageContainer>
        <ImageContainer imageUrl={imageUrl} />
      </QueryResultImageContainer>
      <QueryResultInfoContainer>
        <QueryResultInfo>
            <Subtitle title="Verbal Explanation" />
          <VerbalExplanation explanation={verbalExplanation} />
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

export default QueryResult;
