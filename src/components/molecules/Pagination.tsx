import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../atoms/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxPagesToShow / 2);
        endPage = currentPage + Math.floor(maxPagesToShow / 2);
      }
    }

    if (startPage > 1) {
      pageNumbers.push(<button key={1} onClick={() => onPageChange(1)} className="px-4 py-2 rounded-lg hover:bg-gray-100">1</button>);
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis" className="px-4 py-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 rounded-lg ${currentPage === i ? 'bg-primary-black text-white' : 'hover:bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis" className="px-4 py-2">...</span>);
      }
      pageNumbers.push(<button key={totalPages} onClick={() => onPageChange(totalPages)} className="px-4 py-2 rounded-lg hover:bg-gray-100">{totalPages}</button>);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentPage === 1}>
        <ChevronLeft size={16} />
        Previous
      </Button>
      <div className="hidden md:flex items-center gap-2 font-poppins">
        {renderPageNumbers()}
      </div>
      <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};
