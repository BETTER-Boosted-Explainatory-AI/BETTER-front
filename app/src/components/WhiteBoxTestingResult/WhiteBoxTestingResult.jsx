import React, { useState, useMemo } from "react";
import PredictionTable from "../PredictionTable/PredictionTable";
import ImageContainer from "../ImageContainer/ImageContainer";
import Pagination from "@mui/material/Pagination";
import TitleComponent from "../TitleComponent/TitleComponent";
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

  const sortedResults = useMemo(() => {
    return [...wbtResult].sort((a, b) => {
      const maxPredA = Math.max(
        ...a.matches
          .filter(
            ([, target]) =>
              correctedLabels.sourceLabels.includes(target) ||
              correctedLabels.targetLabels.includes(target)
          )
          .map(([, , pred]) => pred)
      );

      const maxPredB = Math.max(
        ...b.matches
          .filter(
            ([, target]) =>
              correctedLabels.sourceLabels.includes(target) ||
              correctedLabels.targetLabels.includes(target)
          )
          .map(([, , pred]) => pred)
      );

      return maxPredB - maxPredA;
    });
  }, [wbtResult, correctedLabels]);

  const startIdx = (page - 1) * MATCHES_PER_PAGE;
  const pageResults = sortedResults.slice(
    startIdx,
    startIdx + MATCHES_PER_PAGE
  );
  const instructions =
    "Retrain the model without the images presented below and come back to see the changes";

  const totalPages = Math.ceil(sortedResults.length / MATCHES_PER_PAGE);
  return (
    <PaginationContainer>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.3em",
        }}
      >
        <TitleComponent title="Images Behind Misconnections" />
        <ParagraphContainer>
          <strong>Source Labels: </strong>{" "}
          {correctedLabels.sourceLabels.join(" | ")}
        </ParagraphContainer>
        <ParagraphContainer>
          <strong>Target Labels: </strong>{" "}
          {correctedLabels.targetLabels.join(" | ")}
        </ParagraphContainer>
        <ParagraphContainer>
          <strong>Instructions: </strong> {instructions}
        </ParagraphContainer>
      </div>
      {sortedResults.length === 0 && (
        <ParagraphContainer>
          No results found for the selected labels.
        </ParagraphContainer>
      )}
      {sortedResults.length > 0 && (
        <>
          <WhiteBoxTestingResultContainer>
            {pageResults.map((result, idx) => {
              const targetArray = result.matches.map(
                ([, target, prediction]) => {
                  const isSourceOrTarget =
                    correctedLabels.sourceLabels.includes(target) ||
                    correctedLabels.targetLabels.includes(target);
                  const formattedTarget =
                    target.charAt(0).toUpperCase() + target.slice(1);
                  const formattedPrediction =
                    (prediction * 100).toFixed(2) + "%";
                  return [
                    isSourceOrTarget ? (
                      <strong>{formattedTarget}</strong>
                    ) : (
                      formattedTarget
                    ),
                    isSourceOrTarget ? (
                      <strong>{formattedPrediction}</strong>
                    ) : (
                      formattedPrediction
                    ),
                  ];
                }
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
                    headers={["Label", "Prediction"]}
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
