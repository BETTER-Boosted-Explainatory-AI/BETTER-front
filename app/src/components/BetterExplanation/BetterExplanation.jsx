import React from "react";
import { ExplanationContainer } from "./BetterExplanation.style";
import PaginationComponent from "../Pagination/Pagination";
import VisualExplanationDemo from "./VisualExplanationDemo/VisualExplanationDemo";
import AttackDetectionDemo from "./AttackDetectionDemo/AttackDetectionDemo";
import ModelTestingDemo from "./ModelTestingDemo/ModelTestingDemo";

const BetterExplanation = ({height="90vh"}) => {
  const [page, setPage] = React.useState(1);
  const totalPages = 3;

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
    console.log(`Page changed to: ${pageNumber}`);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPage(prev => prev === totalPages ? 1 : prev + 1);
    }, 10000); 

    return () => clearInterval(interval);
  }, []);
  
  return (
    <ExplanationContainer height={height}>
      {page === 1 && <VisualExplanationDemo />}
      {page === 2 && <ModelTestingDemo />}
      {page === 3 && <AttackDetectionDemo />}
      
      <PaginationComponent 
        totalPages={totalPages}
        activePage={page}
        onPageChange={onPageChange}
      />
    </ExplanationContainer>
  );
};

export default BetterExplanation;