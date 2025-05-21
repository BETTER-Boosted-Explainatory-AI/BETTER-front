import React from "react";
import { ExplanationContainer } from "./BetterExplanation.style";
import PaginationComponent from "../Pagination/Pagination";
import VisualExplanationDemo from "./VisualExplanationDemo/VisualExplanationDemo";

const BetterExplanation = () => {
  const [page, setPage] = React.useState(1);
  
  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
    console.log(`Page changed to: ${pageNumber}`);
  };

  return (
    <ExplanationContainer>
      {page === 1 && <VisualExplanationDemo />}
      {page === 2 && <div>Content for page 2</div>}
      {page === 3 && <div>Content for page 3</div>}
      
      <PaginationComponent 
        totalPages={3}
        activePage={page}
        onPageChange={onPageChange}
      />
    </ExplanationContainer>
  );
};

export default BetterExplanation;