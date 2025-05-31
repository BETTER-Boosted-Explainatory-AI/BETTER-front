import React, { useState } from "react";
import PredictionTable from "../PredictionTable/PredictionTable";
import ImageContainer from "../ImageContainer/ImageContainer";
import Pagination from "@mui/material/Pagination";
import {
  PaginationContainer,
  WhiteBoxTestingResultContainer,
  ItemContainer,
  ParagraphContainer,
} from "./WhiteBoxTestingResult.style";

const MATCHES_PER_PAGE = 2;

const WhiteBoxTestingResult = ({ wbtResult, correctedLabels }) => {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIdx = (page - 1) * MATCHES_PER_PAGE;
  const pageResults = wbtResult.slice(startIdx, startIdx + MATCHES_PER_PAGE);

  const totalPages = Math.ceil(wbtResult.length / MATCHES_PER_PAGE);
  return (
    <PaginationContainer>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5em",
        }}
      >
        {wbtResult.length === 0 && (
          <ParagraphContainer>
            No results found for the selected labels.
          </ParagraphContainer>
        )}
        <ParagraphContainer>
          <strong>Source Labels: </strong>{" "}
          {correctedLabels.sourceLabels.join(" | ")}
        </ParagraphContainer>
        <ParagraphContainer>
          <strong>Target Labels: </strong>{" "}
          {correctedLabels.targetLabels.join(" | ")}
        </ParagraphContainer>
      </div>
      {wbtResult.length > 0 && (
        <>
          <WhiteBoxTestingResultContainer>
            {pageResults.map((result, idx) => {
              const targetArray = result.matches.map(
                ([source, target, prediction]) => [target, prediction]
              );
              return (
                <ItemContainer key={result.image_id || idx}>
                  <ImageContainer
                    imageUrl={result.image}
                    altText={`Image ${result.image_id}`}
                  />
                  <ParagraphContainer>
                    <strong>Image ID:</strong> {result.image_id}
                  </ParagraphContainer>
                  <ParagraphContainer>
                    <strong>True Label:</strong> {result.matches[0][0]}
                  </ParagraphContainer>
                  <ParagraphContainer>
                    <strong>Top Predictions</strong>
                  </ParagraphContainer>
                  <PredictionTable
                    headers={["Target", "Prediction"]}
                    data={targetArray}
                  />
                </ItemContainer>
              );
            })}
          </WhiteBoxTestingResultContainer>
          <div style={{ marginTop: "auto" }}>
            <Pagination
              count={totalPages}
              color="primary"
              page={page}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </PaginationContainer>
  );
};

export default WhiteBoxTestingResult;
