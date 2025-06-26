import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

// Sample data: 50 items
const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
// array from backend : cards array

export default function Pagination() {
  const itemsPerPage = 2;// no of cards per page to be displayed 
  
  const [currentItems, setCurrentItems] = useState(items.slice(0, itemsPerPage));
  const [pageCount] = useState(Math.ceil(items.length / itemsPerPage));

  // Triggered when user selects a page
  const handlePageClick = ({ selected }) => {
    const offset = selected * itemsPerPage;
    setCurrentItems(items.slice(offset, offset + itemsPerPage));
  };

  return (
    <div className="max-w-md mx-auto font-sans p-4">
      <ul className="divide-y divide-gray-200">
        {currentItems.map((item) => (
          <li key={item} className="py-2">
            {item}
          </li>
        ))}
      </ul>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        className=""
        containerClassName="flex justify-center mt-4 space-x-2"
        pageClassName=""
        pageLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        previousLabel="←"
        nextLabel="→"
        previousClassName=""
        nextClassName=""
        previousLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        nextLinkClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
        breakLabel="..."
        breakLinkClassName="px-3 py-1 border border-gray-300 rounded cursor-default"
        activeClassName=""
        activeLinkClassName="bg-blue-500 hover:!bg-blue-600 text-white !border-blue-500"
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
      />
    </div>
  );
}
