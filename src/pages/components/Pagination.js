import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({
  setCardsLimit,
  setPageNumber,
  cardsLimit,
  paginationInfo,
}) {
  const { currentPage, hasNext, totalPages, hasPrev, totalCount } =
    paginationInfo;

  // Triggered when user selects a page in pagination
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected + 1);
  };

  return (
    <div className="max-w-4xl mx-auto font-sans p-4 ">
      {/* Items per page selector */}
      <div className="flex justify-center items-center bg-white rounded-xl ">
        <label className="flex items-center gap-3 text-gray-700 font-medium">
          <span className="text-sm whitespace-nowrap">Items per page:</span>
          <select
            value={cardsLimit}
            onChange={(e) =>
              setPageNumber(1) || setCardsLimit(Number(e.target.value))
            }
            className="
              bg-white
              border-2 border-gray-300
              rounded-lg
              px-3 py-2
              text-sm
              font-medium
              text-gray-700
              shadow-sm
              hover:bg-gray-50
              hover:border-blue-400
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
              focus:outline-none
              transition-all
              duration-200
              cursor-pointer
            "
          >
            {[5, 10, 20, 50].map((limit) => (
              <option key={limit} value={limit} className="py-1">
                {limit}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center items-center bg-white p-4 rounded-xl shadow-sm space-x-1"
        pageClassName=""
        pageLinkClassName="
          min-w-[40px] h-10
          flex items-center justify-center
          px-3 py-2
          text-sm font-medium
          text-gray-700
          bg-white
          border-2 border-gray-300
          rounded-lg
          hover:bg-gray-50
          hover:border-blue-400
          hover:text-gray-900
          transition-all duration-200
          cursor-pointer
          select-none
        "
        previousLabel={
          <span className="flex items-center gap-1">
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </span>
        }
        nextLabel={
          <span className="flex items-center gap-1">
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </span>
        }
        previousClassName=""
        nextClassName=""
        previousLinkClassName="
          flex items-center justify-center
          px-4 py-2
          text-sm font-medium
          text-gray-700
          bg-white
          border-2 border-gray-300
          rounded-lg
          hover:bg-gray-50
          hover:border-blue-400
          hover:text-gray-900
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition-all duration-200
          cursor-pointer
          select-none
        "
        nextLinkClassName="
          flex items-center justify-center
          px-4 py-2
          text-sm font-medium
          text-gray-700
          bg-white
          border-2 border-gray-300
          rounded-lg
          hover:bg-gray-50
          hover:border-blue-400
          hover:text-gray-900
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition-all duration-200
          cursor-pointer
          select-none"
        breakLabel={<span className=" text-gray-400">•••</span>}
        breakLinkClassName="
          min-w-9 h-9
          flex items-center justify-center
          px-3 py-2
          text-sm font-medium
          text-gray-700
          bg-white
          outline-2 outline-gray-300
          rounded-lg
          hover:bg-gray-50
          hover:border-blue-400
          hover:text-gray-900
          transition-all duration-200
          cursor-pointer
          select-none
        "
        activeClassName=""
        activeLinkClassName="
          !bg-blue-600
          !border-blue-600
          !text-white
          hover:!bg-blue-700
          hover:!border-blue-700
          shadow-md
        "
        disabledClassName=""
        disabledLinkClassName="
          !opacity-40
          !cursor-not-allowed
          hover:!bg-white
          hover:!border-gray-300
          hover:!text-gray-700
        "
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
      />

      <div className="flex justify-center">
        <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 ">
          Showing {(currentPage - 1) * cardsLimit + 1} to{" "}
          {Math.min(currentPage * cardsLimit, totalCount)} of {totalCount} items
        </span>
      </div>
    </div>
  );
}
