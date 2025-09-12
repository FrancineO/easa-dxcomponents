import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Text,
  useTheme,
  Card,
  CardContent,
} from '@pega/cosmos-react-core';
import Graphic from '@arcgis/core/Graphic';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import { getView } from '../map/view';
import { SimpleLineSymbol } from '@arcgis/core/symbols';
import type { FlightPath } from '../types';

interface FlightPathsProps {
  flightPaths: FlightPath[];
  onRemoveFlightPath: (id: string) => void;
  onClearAllFlightPaths: () => void;
  onMultiModeToggleClick: () => void;
  isMultiMode: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const FlightPaths: React.FC<FlightPathsProps> = ({
  flightPaths,
  onRemoveFlightPath,
  onClearAllFlightPaths,
  onMultiModeToggleClick,
  isMultiMode,
  disabled = false,
  children,
}) => {
  const theme = useTheme();
  const [selectedFlightPathIndex, setSelectedFlightPathIndex] = useState<
    number | null
  >(null);

  // Function to highlight a flight path on the map
  const handleHighlightFlightPath = useCallback(
    (flightPath: __esri.Graphic | null) => {
      const view = getView();

      // Clear existing highlights from view graphics
      view.graphics.removeAll();

      if (flightPath && flightPath.geometry) {
        const highlightRgb = [251, 247, 25]; // Yellow
        // Create a highlighted version of the flight path
        let highlightSymbol: __esri.Symbol = new SimpleLineSymbol({
          color: [...highlightRgb, 0.8],
          width: 3,
          style: 'solid',
          cap: 'round',
          join: 'round',
        });
        if (flightPath.geometry.type === 'polygon') {
          highlightSymbol = new SimpleFillSymbol({
            color: [...highlightRgb, 0.4],
            outline: {
              color: [...highlightRgb, 0.8],
              width: 3,
              style: 'solid',
            },
          });
        }

        const highlightGraphic = new Graphic({
          geometry: flightPath.geometry,
          symbol: highlightSymbol,
        });

        view.graphics.add(highlightGraphic);
      }
    },
    [],
  );

  // Function to handle hover highlighting (only if no item is selected)
  const handleHoverHighlight = useCallback(
    (flightPath: __esri.Graphic | null) => {
      if (selectedFlightPathIndex === null) {
        handleHighlightFlightPath(flightPath);
      }
    },
    [selectedFlightPathIndex, handleHighlightFlightPath],
  );

  // Function to handle flight path selection/deselection
  const handleFlightPathClick = useCallback(
    (index: number) => {
      if (selectedFlightPathIndex === index) {
        // Deselect if clicking the same item
        setSelectedFlightPathIndex(null);
        handleHighlightFlightPath(null);
      } else {
        // Select new item
        setSelectedFlightPathIndex(index);
        handleHighlightFlightPath(flightPaths[index]);
      }
    },
    [selectedFlightPathIndex, flightPaths, handleHighlightFlightPath],
  );

  // Clear highlighting and selection when flight paths change
  useEffect(() => {
    setSelectedFlightPathIndex(null);
    handleHighlightFlightPath(null);
  }, [flightPaths, handleHighlightFlightPath]);

  // Maintain highlighting for selected item
  useEffect(() => {
    if (
      selectedFlightPathIndex !== null &&
      flightPaths[selectedFlightPathIndex]
    ) {
      handleHighlightFlightPath(flightPaths[selectedFlightPathIndex]);
    }
  }, [selectedFlightPathIndex, flightPaths, handleHighlightFlightPath]);

  // Cleanup view graphics on unmount
  useEffect(() => {
    return () => {
      getView().graphics.removeAll();
    };
  }, []);

  return (
    <Card
      style={{
        position: 'absolute',
        top: '10px', // Position at the top right corner
        right: '10px',
        zIndex: 1000,
        padding: '12px',
        minWidth: '200px',
        maxWidth: '300px',
        border: `1px solid ${theme.base.palette['brand-primary']}`,
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <CardContent>
        <div style={{ marginBottom: '0.5rem' }}>{children}</div>
        {/* Flight Paths List Header - show when there are one or more paths */}
        {flightPaths.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <Text variant='h4' style={{ margin: 0 }}>
              Flight Paths ({flightPaths.length})
            </Text>
            {flightPaths.length > 1 && (
              <Button
                variant='secondary'
                size='small'
                onClick={() => {
                  setSelectedFlightPathIndex(null); // Clear selection
                  handleHighlightFlightPath(null); // Clear highlighting
                  onClearAllFlightPaths();
                }}
                disabled={disabled}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                }}
                title='Remove all flight paths from the map'
              >
                Clear All
              </Button>
            )}
          </div>
        )}

        {/* Flight Paths List - show when there are one or more paths */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {flightPaths.map((flightPath, index) => {
            const isSelected = selectedFlightPathIndex === index;
            const flightPathId = flightPath.attributes.id;
            return (
              <div
                key={flightPathId}
                role='button'
                tabIndex={0}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 8px',
                  backgroundColor: isSelected
                    ? theme.base.palette['brand-primary']
                    : theme.base.palette['secondary-background'],
                  borderRadius: '4px',
                  border: `2px solid ${theme.base.palette['brand-primary']}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected
                    ? `0 0 8px ${theme.base.palette['brand-primary']}40`
                    : 'none',
                }}
                onClick={() => handleFlightPathClick(index)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFlightPathClick(index);
                  }
                }}
                onMouseEnter={() => handleHoverHighlight(flightPath)}
                onMouseLeave={() => handleHoverHighlight(null)}
              >
                <Text
                  variant='secondary'
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: isSelected ? 'white' : undefined,
                    fontWeight: isSelected ? 'bold' : 'normal',
                  }}
                >
                  Path {index + 1}
                </Text>
                <Button
                  variant='secondary'
                  size='small'
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation(); // Prevent triggering the parent click
                    setSelectedFlightPathIndex(null); // Clear selection
                    handleHighlightFlightPath(null); // Clear highlighting
                    onRemoveFlightPath(flightPathId);
                  }}
                  disabled={disabled}
                  style={{
                    padding: '2px 6px',
                    fontSize: '12px',
                    color: theme.base.palette.urgent,
                    minWidth: 'auto',
                  }}
                  title={`Remove flight path ${index + 1} from the map`}
                >
                  Remove
                </Button>
              </div>
            );
          })}
        </div>

        {/* Multi Path Mode Button - moved to bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '12px',
          }}
        >
          <Button
            variant='primary'
            onClick={onMultiModeToggleClick}
            disabled={disabled}
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              border: '1px solid #e0e0e0',
            }}
            label={
              isMultiMode
                ? 'Exit multi path mode and return to single path editing'
                : 'Enter multi path mode to add multiple flight paths'
            }
          >
            {isMultiMode ? 'Exit Multi Path Mode' : 'Multi Path Mode'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightPaths;
