import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Input } from '@pega/cosmos-react-core';

interface CircleRadiusProps {
  onCircleRadiusChange: (newRadius: number) => void;
  circleRadius?: number; // For live updates during drawing
}

export const CircleRadius: React.FC<CircleRadiusProps> = ({
  onCircleRadiusChange,
  circleRadius,
}) => {
  const [pendingRadius, setPendingRadius] = useState(500);
  const pendingRadiusRef = useRef(500);
  const radiusRef = useRef(500);

  // Keep pending radius ref in sync
  useEffect(() => {
    pendingRadiusRef.current = pendingRadius;
  }, [pendingRadius]);

  // Handle live radius updates from parent
  useEffect(() => {
    if (circleRadius !== undefined) {
      setPendingRadius(Math.round(circleRadius));
    }
  }, [circleRadius]);

  // Function to apply radius changes
  const applyRadiusChange = useCallback(() => {
    if (pendingRadius !== radiusRef.current) {
      radiusRef.current = pendingRadius;
      // Update the current circle on the map with the new radius
      onCircleRadiusChange(pendingRadius);
    }
  }, [pendingRadius, onCircleRadiusChange]);

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
        onChange={(e: any) => setPendingRadius(Number(e.target.value))}
      />
      <Button
        variant='primary'
        onClick={applyRadiusChange}
        compact
        disabled={pendingRadius === radiusRef.current}
      >
        OK
      </Button>
    </div>
  );
};

export default CircleRadius;
