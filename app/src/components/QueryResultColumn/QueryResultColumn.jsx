import { useState } from "react";
import ImageContainer from "../ImageContainer/ImageContainer.jsx";
import VerbalExplanation from "../VerbalExplanation/VerbalExplanation.jsx";
import PredictionTable from "../PredictionTable/PredictionTable.jsx";
import Subtitle from "../Subtitle/Subtitle.jsx";
import RiskMeter from "../RiskMeter/RiskMeter.jsx";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CSSTransition } from "react-transition-group"; // Add this import
import {
  QueryResultContainer,
  QueryResultInfo,
  ClickableTitle,
  CollapseWrapper,
} from "./QueryResultColumn.style.js";

const QueryResultColumn = ({
  verbalExplanation,
  topPredictions,
  imageUrl,
  probability,
  detectionResult,
}) => {
  const [showPredictions, setShowPredictions] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  console.log("QueryResultColumn rendered");
  
  return (
    <QueryResultContainer>
      <ImageContainer imageUrl={imageUrl} maxHeight="400px" />
      <QueryResultInfo>
        <RiskMeter probability={probability} />
      </QueryResultInfo>
      <QueryResultInfo>
        <ClickableTitle onClick={() => setShowPredictions(!showPredictions)}>
          <Subtitle title="Top Predictions" />
          {showPredictions ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </ClickableTitle>
        <CSSTransition
          in={showPredictions}
          timeout={300}
          classNames="collapse"
          unmountOnExit
        >
          <CollapseWrapper>
            <PredictionTable data={topPredictions} />
          </CollapseWrapper>
        </CSSTransition>
      </QueryResultInfo>
      <QueryResultInfo>
        <ClickableTitle onClick={() => setShowExplanation(!showExplanation)}>
          <Subtitle title="Detection Result" />
          {showExplanation ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </ClickableTitle>
        <CSSTransition
          in={showExplanation}
          timeout={300}
          classNames="collapse"
          unmountOnExit
        >
          <CollapseWrapper>
            <VerbalExplanation explanation={verbalExplanation} />
          </CollapseWrapper>
        </CSSTransition>
      </QueryResultInfo>
    </QueryResultContainer>
  );
};

export default QueryResultColumn;
