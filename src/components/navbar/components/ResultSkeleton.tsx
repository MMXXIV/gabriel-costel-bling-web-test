// components/Skeleton.tsx
import React from 'react';

const ResultSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

export default ResultSkeleton;

