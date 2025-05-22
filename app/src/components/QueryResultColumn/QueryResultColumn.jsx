import React from "react";
import ImageContainer from "../ImageContainer/ImageContainer.jsx";
import VerbalExplanation from "../VerbalExplanation/VerbalExplanation.jsx";
import PredictionTable from "../PredictionTable/PredictionTable.jsx";
import Subtitle from "../Subtitle/Subtitle.jsx";
import {
  QueryResultContainer,
  QueryResultInfo,
} from "./QueryResultColumn.style.js";

const QueryResultColumn = ({ verbalExplanation, topPredictions, imageUrl }) => {

  return (
    <QueryResultContainer>
        <ImageContainer imageUrl={imageUrl} />
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
    </QueryResultContainer>
  );
};

export default QueryResultColumn;