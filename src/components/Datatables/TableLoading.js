import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const TableLoading = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <FontAwesomeIcon icon={faSpinner} spin className="mr-2 text-gray-500" />
      <span className="text-gray-500">Loading...</span>
    </div>
  );
};

export default TableLoading;
