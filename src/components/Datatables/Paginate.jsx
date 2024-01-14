import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "components/Input/Input";

const Paginate = ({ countedResults, currentPage, totalPages, onPageChange, rowCountOptions, selectedRowCount, onRowCountChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handleRowCountChange = (e) => {
    const newRowcount = parseInt(e.target.value, 10);
    onRowCountChange(newRowcount);
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={` hover:bg-slate-200 rounded-xl p-1 text-gray-500 ${currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
          <p className="max-md:hidden inline-block">Previous</p>
        </button>
        <span className="mx-4 text-gray-700 text-center max-md:font-thin">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={` hover:bg-slate-200 rounded-xl p-1 text-gray-500 ${currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={currentPage === totalPages}
        >
          <p className="max-md:hidden inline-block">Next</p>
          <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
        </button>
        <span className="mx-10 text-gray-400 text-center">
          counted results {countedResults}
        </span>
      </div>
      <div className="flex items-center">
        <span className="mr-2 text-gray-600 max-md:hidden">Rows per page:</span>
        <Input 
          type="select"
          options={rowCountOptions}
          value={selectedRowCount}
          onChange={handleRowCountChange}
        />
        {/* <select
          value={selectedRowCount}
          onChange={handleRowCountChange}
          className="border rounded-md px-2 py-1 w-12 text-gray-700"
        >
          {rowCountOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  );
};

export default Paginate;
