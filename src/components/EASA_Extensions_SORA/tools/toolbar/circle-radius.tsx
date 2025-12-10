import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@pega/cosmos-react-core';
import useDebouncedEffect from '../../hooks/useDebouncedEffect';

interface CircleRadiusProps {
  onCircleRadiusChange: (newRadius: number) => void;
  circleRadius?: number; // For live updates during drawing
}

export const CircleRadius: React.FC<CircleRadiusProps> = ({
  onCircleRadiusChange,
  circleRadius,
}) => {
  const [pendingRadius, setPendingRadius] = useState(500);
  const radiusRef = useRef(500);

  // Handle live radius updates from parent (when user is dragging to create circle)
  useEffect(() => {
    if (circleRadius !== undefined) {
      const roundedRadius = Math.round(circleRadius);
      setPendingRadius(roundedRadius);
      // Also update the ref so we don't trigger unnecessary updates
      radiusRef.current = roundedRadius;
    }
  }, [circleRadius]);

  // Debounced update - automatically apply radius changes after user stops typing
  useDebouncedEffect(
    () => {
      if (pendingRadius !== radiusRef.current) {
        radiusRef.current = pendingRadius;
        onCircleRadiusChange(pendingRadius);
      }
    },
    500, // 500ms delay - adjust if needed
    [pendingRadius]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <Input
        type='number'
        label='Radius (m)'
        value={`${pendingRadius}`}
        min={10}
        max={10000}
        onChange={(e: any) => {
          const newValue = Number(e.target.value);
          setPendingRadius(newValue);
        }}
      />
    </div>
  );
};

export default CircleRadius;
