import React from 'react';

const VennDiagram = ({ joinType, table1, table2 }: { joinType: string; table1: string; table2: string }) => {
  const leftColor = '#3b82f6';
  const rightColor = '#ef4444';
  const overlapColor = '#8b5cf6';
  const strokeWidth = 3;

  // Determine fill based on join type
  const getLeftFill = () => {
    if (joinType === 'INNER JOIN') return 'none';
    if (joinType === 'RIGHT JOIN') return 'none';
    return leftColor;
  };

  const getLeftFillOpacity = () => {
    if (joinType === 'LEFT JOIN') return '0.3';
    return '0.15';
  };

  const getRightFill = () => {
    if (joinType === 'INNER JOIN') return 'none';
    if (joinType === 'LEFT JOIN') return 'none';
    return rightColor;
  };

  const getRightFillOpacity = () => {
    if (joinType === 'RIGHT JOIN') return '0.3';
    return '0.15';
  };

  return (
    <svg width="300" height="200" viewBox="0 0 300 200">
      {/* Background */}
      <rect width="300" height="200" fill="#0a0a0a" />

      {/* Labels */}
      <text x="80" y="30" fill={leftColor} fontSize="14" fontWeight="bold" textAnchor="middle">
        {table1}
      </text>
      <text x="220" y="30" fill={rightColor} fontSize="14" fontWeight="bold" textAnchor="middle">
        {table2}
      </text>

      {/* Left Circle */}
      <circle
        cx="100"
        cy="110"
        r="60"
        fill={getLeftFill()}
        fillOpacity={getLeftFillOpacity()}
        stroke={leftColor}
        strokeWidth={strokeWidth}
      />

      {/* Right Circle */}
      <circle
        cx="200"
        cy="110"
        r="60"
        fill={getRightFill()}
        fillOpacity={getRightFillOpacity()}
        stroke={rightColor}
        strokeWidth={strokeWidth}
      />

      {/* Overlap highlight for INNER JOIN */}
      {joinType === 'INNER JOIN' && (
        <path
          d="M 140 70 A 60 60 0 0 1 140 150 A 60 60 0 0 1 140 70"
          fill={overlapColor}
          fillOpacity="0.3"
          stroke={overlapColor}
          strokeWidth={strokeWidth}
        />
      )}

      {/* FULL OUTER JOIN highlight */}
      {joinType === 'FULL OUTER JOIN' && (
        <ellipse
          cx="150"
          cy="110"
          rx="110"
          ry="60"
          fill={overlapColor}
          fillOpacity="0.1"
          stroke="none"
        />
      )}

      {/* Join type label */}
      <text x="150" y="190" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
        {joinType}
      </text>
    </svg>
  );
};

export default VennDiagram;
