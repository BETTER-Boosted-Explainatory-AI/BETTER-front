import React from "react";
import manImg from "../../../assets/man.png";
import Subtitle from "../../Subtitle/Subtitle";
import PredictionTable from "../../PredictionTable/PredictionTable";

import {
  SloganParagraph,
  ImageContainerStyle,
  ImageStyle,
  ParagraphContainer
} from "../BetterExplanation.style";

const ModalTestingDemo = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3em",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
          alignItems: "center",
        }}
      >
        <Subtitle title="White-Box Tesing" fontSize={"24px"} />
        <SloganParagraph>
          Identify images responsible for unexpected connections
        </SloganParagraph>
        <div style={{ display: "flex", gap: "3em", alignItems: "center", marginTop: "2em" }}>
          <ImageContainerStyle>
            <ImageStyle src={manImg} alt={"manCifar100"} maxHeight={"400px"} />
            <Subtitle title={"label: man"} />
          </ImageContainerStyle>
          <div
            style={{ display: "flex", flexDirection: "row", gap: "20px" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Subtitle title={"original model"} />
              <ParagraphContainer><b>F1-score:</b> 76.46%</ParagraphContainer>
              <PredictionTable
                data={[
                  ["bicycle", 0.2835],
                  ["flatfish", 0.2783],
                  ["man", 0.2658],
                ]}
                width={"250px"}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Subtitle title={"optimized model"} />
              <ParagraphContainer><b>F1-score:</b> 84.58%</ParagraphContainer>
              <PredictionTable
                data={[
                  ["man", 0.8194],
                  ["flatfish", 0.0441],
                  ["forest", 0.0181],
                ]}
                width={"250px"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTestingDemo;
