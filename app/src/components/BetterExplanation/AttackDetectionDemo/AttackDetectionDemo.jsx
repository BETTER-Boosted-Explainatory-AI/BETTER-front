import React from "react";
import {
  SloganParagraph,
  ImageContainerStyle,
  ImageStyle,
} from "../BetterExplanation.style";
import Subtitle from "../../Subtitle/Subtitle";
import PredictionTable from "../../PredictionTable/PredictionTable";
import RiskMeter from "../../RiskMeter/RiskMeter.jsx";
import catImg from "../../../assets/cat.png";

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
          <ImageStyle src={catImg} alt={"catPGD"} maxHeight={"400px"} />
        </ImageContainerStyle>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <RiskMeter detectionResult={"Adversarial"} probability={0.658} />
          {/* <Subtitle title={"top predictions"} />
          <PredictionTable
            data={[
              ["Screen", 0.5734],
              ["Tigar_cat", 0.2434],
              ["Egyptian_cat", 0.1132],
            ]}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ModalTestingDemo;
