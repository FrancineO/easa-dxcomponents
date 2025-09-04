import React, { useCallback, useEffect } from 'react';
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

interface FlightPathsProps {
  flightGeographies: __esri.Graphic[];
  onRemoveFlightPath: (index: number) => void;
  onClearAllFlightPaths: () => void;
  onMultiModeToggleClick: () => void;
  isMultiMode: boolean;
  disabled?: boolean;
}

export const FlightPaths: React.FC<FlightPathsProps> = ({
  flightGeographies,
  onRemoveFlightPath,
  onClearAllFlightPaths,
  onMultiModeToggleClick,
  isMultiMode,
  disabled = false,
}) => {
  const theme = useTheme();

  // Function to highlight a flight path on the map
  const handleHighlightFlightPath = useCallback(
    (flightPath: __esri.Graphic | null) => {
      const view = getView();

      // Clear existing highlights from view graphics
      view.graphics.removeAll();

      if (flightPath && flightPath.geometry) {
        // Create a highlighted version of the flight path
        const highlightSymbol = new SimpleFillSymbol({
          color: [0, 150, 255, 0.4], // Light blue with transparency for fill
          outline: {
            color: [0, 100, 200, 1.0], // Blue outline
            width: 3,
            style: 'solid',
          },
        });

        const highlightGraphic = new Graphic({
          geometry: flightPath.geometry,
          symbol: highlightSymbol,
        });

        view.graphics.add(highlightGraphic);
      }
    },
    [],
  );

  // Clear highlighting when flight paths change
  useEffect(() => {
    handleHighlightFlightPath(null);
  }, [flightGeographies, handleHighlightFlightPath]);

  // Cleanup view graphics on unmount
  useEffect(() => {
    return () => {
      getView().graphics.removeAll();
    };
  }, []);

  // Only show the component when there is at least one flight path
  if (flightGeographies.length === 0) {
    return null;
  }

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
        {/* Flight Paths List Header - show when there are one or more paths */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <Text variant='h4' style={{ margin: 0 }}>
            Flight Paths ({flightGeographies.length})
          </Text>
          {flightGeographies.length > 1 && (
            <Button
              variant='secondary'
              size='small'
              onClick={() => {
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
          {flightGeographies.map((flightPath, index) => (
            <div
              key={`flight-path-${flightPath.geometry?.type || 'unknown'}-${flightPath.geometry?.toJSON ? JSON.stringify(flightPath.geometry.toJSON()).slice(0, 20) : index}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 8px',
                backgroundColor: theme.base.palette['secondary-background'],
                borderRadius: '4px',
                border: `1px solid ${theme.base.palette['brand-primary']}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={() => handleHighlightFlightPath(flightPath)}
              onMouseLeave={() => handleHighlightFlightPath(null)}
            >
              <Text variant='secondary' style={{ margin: 0, fontSize: '14px' }}>
                Path {index + 1}
              </Text>
              <Button
                variant='secondary'
                size='small'
                onClick={() => {
                  handleHighlightFlightPath(null); // Clear highlighting
                  onRemoveFlightPath(index);
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
          ))}
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
