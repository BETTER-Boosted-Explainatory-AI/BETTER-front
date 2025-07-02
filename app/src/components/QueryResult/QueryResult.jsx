import React from "react";
import ImageContainer from "../ImageContainer/ImageContainer";
import VerbalExplanation from "../VerbalExplanation/VerbalExplanation";
import PredictionTable from "../PredictionTable/PredictionTable";
import Pagination from "@mui/material/Pagination";
import TitleComponent from "../TitleComponent/TitleComponent.jsx";
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

  const onPageChange = (event, pageNumber) => {
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
              <TitleComponent title="Top Predictions" flexStart="flex-start" />
              <PredictionTable data={topPredictions} />
            </QueryResultInfo>
            <QueryResultInfo>
              <TitleComponent
                title="Verbal Explanation"
                flexStart="flex-start"
              />
              <VerbalExplanation explanation={verbalExplanation} />
            </QueryResultInfo>
          </QueryResultInfoContainer>
        </QueryResultContainer>
      )}
      {page === 2 && (
          <Dendrogram  queryMode={true}/>
      )}

      <Pagination
        count={2}
        color="primary"
        page={page}
        onChange={onPageChange}
      />
    </PaginationContainer>
  );
};

export default QueryResult;
