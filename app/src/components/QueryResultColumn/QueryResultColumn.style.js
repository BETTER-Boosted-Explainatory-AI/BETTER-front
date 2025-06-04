// import { styled } from "@mui/material";
import { styled } from "@mui/material/styles";

export const QueryResultContainer = styled("div")`
    display: flex;
    flex-direction: column;    
    align-items: flex-start;      
    justify-content: flex-start;
    gap: 1.5em;
`;

export const QueryResultInfo = styled("div")`
    display: flex;
    flex-flow: column;
    gap: 0.5em;
    width: 80%;
`;

export const ClickableTitle = styled("div")`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    font-weight: 500;
    flex-direction: row;
`;

export const CollapseWrapper = styled("div")`
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
  max-height: 0;
  opacity: 0;

  &.collapse-enter {
    max-height: 0;
    opacity: 0;
  }
  &.collapse-enter-active {
    max-height: 300px; /* or large enough for your content */
    opacity: 1;
  }
  &.collapse-enter-done {
    max-height: 300px;
    opacity: 1;
  }

  &.collapse-exit {
    max-height: 300px;
    opacity: 1;
  }
  &.collapse-exit-active {
    max-height: 0;
    opacity: 0;
  }
`;