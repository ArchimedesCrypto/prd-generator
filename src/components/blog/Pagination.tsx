import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  basePath: string;
  pageNumber: number;
  lastPage: number;
}

export default function Pagination({ basePath, pageNumber, lastPage }: PaginationProps) {
  const currentPage = pageNumber + 1;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < lastPage;

  return (
    <div className="flex justify-center items-center gap-4 my-12">
      {hasPrev ? (
        <Link
          to={`${basePath}?page=${currentPage - 1}`}
          className="px-6 py-3 bg-fantasy-gold text-stone-gray font-bold rounded-lg hover:bg-fantasy-gold-hover transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Link>
      ) : (
        <button
          disabled
          className="px-6 py-3 bg-stone-gray/30 text-gray-600 font-bold rounded-lg opacity-50 cursor-not-allowed flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
      )}
      
      <span className="px-4 py-2 text-white font-medieval text-lg">
        Page {currentPage} of {lastPage}
      </span>

      {hasNext ? (
        <Link
          to={`${basePath}?page=${currentPage + 1}`}
          className="px-6 py-3 bg-fantasy-gold text-stone-gray font-bold rounded-lg hover:bg-fantasy-gold-hover transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <button
          disabled
          className="px-6 py-3 bg-stone-gray/30 text-gray-600 font-bold rounded-lg opacity-50 cursor-not-allowed flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
