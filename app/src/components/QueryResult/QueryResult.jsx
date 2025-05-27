import React from "react";
import ImageContainer from "../ImageContainer/ImageContainer";
import VerbalExplanation from "../VerbalExplanation/VerbalExplanation";
import PredictionTable from "../PredictionTable/PredictionTable";
import Subtitle from "../Subtitle/Subtitle.jsx";
import {
  PaginationContainer,
  QueryResultContainer,
  QueryResultInfoContainer,
  QueryResultInfo,
  QueryResultImageContainer,
} from "./QueryResult.style.js";
import PaginationComponent from "../Pagination/Pagination.jsx";
import Dendrogram from "../Dendrogram/Dendrogram.jsx";

const QueryResult = ({ verbalExplanation, topPredictions, imageUrl }) => {
  const [page, setPage] = React.useState(1);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
    console.log(`Page changed to: ${pageNumber}`);
  };

  return (
    <PaginationContainer>
      {page === 1 && (
        <QueryResultContainer dendrogram={false}>
          <QueryResultImageContainer>
            <ImageContainer imageUrl={imageUrl} />
          </QueryResultImageContainer>
          <QueryResultInfoContainer analyze={true}>
            <QueryResultInfo>
              <Subtitle title="Top Predictions" />
              <PredictionTable data={topPredictions} />
            </QueryResultInfo>
            <QueryResultInfo>
              <Subtitle title="Verbal Explanation" />
              <VerbalExplanation explanation={verbalExplanation} />
            </QueryResultInfo>
          </QueryResultInfoContainer>
        </QueryResultContainer>
      )}
      {page === 2 && (
        <QueryResultContainer dendrogram={true}>
          <Dendrogram />
        </QueryResultContainer>
      )}

      <PaginationComponent
        totalPages={2}
        activePage={page}
        onPageChange={onPageChange}
      />
    </PaginationContainer>
  );
};

export default QueryResult;
