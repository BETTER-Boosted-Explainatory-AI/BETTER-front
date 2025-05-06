import * as React from "react";
import { PaginationContainer, PaginationDot } from "./Pagination.style";

const PaginationComponent = ({ 
  totalPages = 4,
  activePage = 1,
  onPageChange
}) => {
  const handleDotClick = (pageNumber) => {
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };

  return (
    <PaginationContainer>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationDot 
          key={index} 
          selected={activePage === index + 1}
          onClick={() => handleDotClick(index + 1)}
        />
      ))}
    </PaginationContainer>
  );
};

export default PaginationComponent;