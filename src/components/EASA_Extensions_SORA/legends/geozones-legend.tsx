import { Alert, Card, CardContent, Text } from '@pega/cosmos-react-core';
import TooltipElement from '../components/tooltip-element';
import * as symbolUtils from '@arcgis/core/symbols/support/symbolUtils.js';
import geozonesDefintions from '../geozone-definitions';
import { useRef, useEffect } from 'react';

const GeozonesLegend = ({
  intersectingGeozones,
  geozonesRenderer,
}: {
  intersectingGeozones: __esri.Graphic[];
  geozonesRenderer: __esri.UniqueValueRenderer | null;
}) => {
  const symbolRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (geozonesRenderer?.uniqueValueInfos) {
      geozonesRenderer.uniqueValueInfos.forEach((zone) => {
        const container = symbolRefs.current[zone.value];
        if (container && zone.symbol) {
          // Clear any existing content
          container.innerHTML = '';
          // Render the symbol preview
          symbolUtils.renderPreviewHTML(zone.symbol, {
            node: container,
            size: 14,
            symbolConfig: {
              isTall: true,
              isSquareFill: true,
            },
          });
        }
      });
    }
  }, [geozonesRenderer]);

  return (
    <Card>
      <CardContent>
        {geozonesRenderer && (
          <>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Alert style={{ visibility: 'hidden' }} variant='urgent' />
              <Text variant='h3'>GeoZones</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginTop: '0.5rem',
              }}
            >
              {geozonesRenderer.uniqueValueInfos?.map((zone) => (
                <div
                  key={zone.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <TooltipElement
                    tooltipContent={`The Flight Path Intersects with ${zone.label} GeoZone`}
                  >
                    <Alert
                      style={{
                        visibility: intersectingGeozones.some(
                          (gz) =>
                            gz.attributes[geozonesRenderer?.field] ===
                            zone.value,
                        )
                          ? 'visible'
                          : 'hidden',
                      }}
                      variant='urgent'
                    />
                  </TooltipElement>
                  <div
                    ref={(el) => {
                      symbolRefs.current[zone.value] = el;
                    }}
                    style={{
                      width: '1rem',
                      height: '1rem',
                      minWidth: '1rem',
                      minHeight: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                  <Text>
                    {geozonesDefintions.find((g) => g.value === zone.value)
                      ?.label ?? zone.label}
                  </Text>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GeozonesLegend;
