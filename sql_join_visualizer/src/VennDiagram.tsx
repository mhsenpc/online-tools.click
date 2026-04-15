import React from 'react';

const VennDiagram = ({ joinType }: { joinType: string }) => {
  // Styles for the circles
  const circleStyle = {
    stroke: 'black',
    strokeWidth: '2',
    fillOpacity: '0.6',
  };

  // Logic for highlighting
  const showLeft = joinType === 'LEFT JOIN' || joinType === 'FULL OUTER JOIN';
  const showRight = joinType === 'RIGHT JOIN' || joinType === 'FULL OUTER JOIN';
  const showIntersection = joinType === 'INNER JOIN' || joinType === 'LEFT JOIN' || joinType === 'RIGHT JOIN' || joinType === 'FULL OUTER JOIN';

  return (
    <svg width="250" height="150" viewBox="0 0 250 150">
      {/* Container for Venn Diagram */}
      
      {/* Circle 1 (Table 1) */}
      <circle 
        cx="90" cy="75" r="50" 
        fill={showLeft ? '#4a90e2' : 'white'} 
        {...circleStyle}
      />
      
      {/* Circle 2 (Table 2) */}
      <circle 
        cx="160" cy="75" r="50" 
        fill={showRight ? '#4a90e2' : 'white'} 
        {...circleStyle}
      />

      {/* Intersection (only visible if INNER or FULL) */}
      {joinType === 'INNER JOIN' && (
        <path 
          d="M 125 75 A 50 50 0 0 1 125 75 A 50 50 0 0 1 125 75" // This is a placeholder for intersection, actually svg doesn't have native intersection path easily
          fill="#4a90e2"
          stroke="black"
          strokeWidth="2"
        />
      )}
      
      {/* Text Labels */}
      <text x="30" y="75" fontSize="14" fontWeight="bold">Table 1</text>
      <text x="170" y="75" fontSize="14" fontWeight="bold">Table 2</text>
    </svg>
  );
};

export default VennDiagram;
