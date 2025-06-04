import React from "react";
import {
  SloganParagraph,
  ImageContainerStyle,
  ImageStyle,
} from "../BetterExplanation.style";
import Subtitle from "../../Subtitle/Subtitle";
import PredictionTable from "../../PredictionTable/PredictionTable";
import RiskMeter from "../../RiskMeter/RiskMeter.jsx";
import samoyedImg from "../../../assets/samoyed.png";

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
        <Subtitle title="Adversarial Attacks Detection" fontSize={"24px"} />
        <SloganParagraph>
          Tiny changes, big impact — watch how an attack shifts the prediction
        </SloganParagraph>
      </div>
      <div style={{ display: "flex", gap: "3em", alignItems: "center" }}>
        <ImageContainerStyle>
          <ImageStyle src={samoyedImg} alt={"SamoyedPGD"} maxHeight={"400px"} />
        </ImageContainerStyle>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <RiskMeter probability={0.752} />
          <Subtitle title={"top predictions"} />
          <PredictionTable
            data={[
              ["Reel", 0.7888],
              ["Great Pyrenees", 0.0467],
              ["Caldron", 0.0315],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalTestingDemo;
