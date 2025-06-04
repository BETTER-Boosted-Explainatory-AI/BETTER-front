import React from "react";
import Subtitle from "../../Subtitle/Subtitle";
import DemoDendrogram from "../../Dendrogram/DemoDendrogram/DemoDendrogram";
import { SloganParagraph } from "../BetterExplanation.style";

const VisualExplanation = () => {
  return (
    <>
      <Subtitle title="AI Model Visual Explanation"  fontSize={"24px"}/>
      <SloganParagraph>
        Explore the decision path behind the model's misclassifications
      </SloganParagraph>
      <DemoDendrogram />
    </>
  );
};

export default VisualExplanation;
