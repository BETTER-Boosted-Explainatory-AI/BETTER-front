import React from "react";
import { ExplanationContainer, FadeDiv } from "./BetterExplanation.style";
import PaginationComponent from "../Pagination/Pagination";
import VisualExplanationDemo from "./VisualExplanationDemo/VisualExplanationDemo";
import AttackDetectionDemo from "./AttackDetectionDemo/AttackDetectionDemo";
import ModelTestingDemo from "./ModelTestingDemo/ModelTestingDemo";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const BetterExplanation = ({ height = "90vh" }) => {
  const [page, setPage] = React.useState(1);
  const totalPages = 3;

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
    console.log(`Page changed to: ${pageNumber}`);
  };

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPage((prev) => (prev === totalPages ? 1 : prev + 1));
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);

  let DemoComponent;
  if (page === 1) DemoComponent = <VisualExplanationDemo />;
  else if (page === 2) DemoComponent = <ModelTestingDemo />;
  else DemoComponent = <AttackDetectionDemo />;

  return (
    // <ExplanationContainer height={height}>
    //   {page === 1 && <VisualExplanationDemo />}
    //   {page === 2 && <ModelTestingDemo />}
    //   {page === 3 && <AttackDetectionDemo />}

    //   <PaginationComponent
    //     totalPages={totalPages}
    //     activePage={page}
    //     onPageChange={onPageChange}
    //   />
    // </ExplanationContainer>
    <ExplanationContainer height={height}>
      <SwitchTransition>
        <CSSTransition key={page} timeout={400} classNames="fade">
          <FadeDiv>{DemoComponent}</FadeDiv>
        </CSSTransition>
      </SwitchTransition>
      <PaginationComponent
        totalPages={totalPages}
        activePage={page}
        onPageChange={onPageChange}
      />
    </ExplanationContainer>
  );
};

export default BetterExplanation;
