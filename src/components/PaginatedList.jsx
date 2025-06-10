import React, { useState, useMemo } from 'react';
import LimitSelector from './LimitSelector';

function PaginatedList({ data }) {
  const [displayLimit, setDisplayLimit] = useState('All'); // Default to All

  const paginatedData = useMemo(() => {
    if (displayLimit === 'All') {
      return data;
    } else {
      return data.slice(0, displayLimit);
    }
  }, [data, displayLimit]);

  const paginationControls = (
    <div className="flex justify-center mt-6">
      <LimitSelector limit={displayLimit} onChange={setDisplayLimit} />
    </div>
  );

  return { paginatedData, paginationControls };
}

export default PaginatedList; 