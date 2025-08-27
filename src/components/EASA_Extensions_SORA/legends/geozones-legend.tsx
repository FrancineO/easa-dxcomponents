import { Alert, Card, CardContent, Text } from '@pega/cosmos-react-core';
import TooltipElement from '../components/tooltip-element';
import * as cimSymbolUtils from '@arcgis/core/symbols/support/cimSymbolUtils.js';
import geozonesDefintions from '../geozone-definitions';

const GeozonesLegend = ({
  intersectingGeozones,
  geozonesRenderer,
}: {
  intersectingGeozones: __esri.Graphic[];
  geozonesRenderer: __esri.UniqueValueRenderer | null;
}) => {
  const getRgba = (symbol: __esri.CIMSymbol) => {
    const color = cimSymbolUtils.getCIMSymbolColor(symbol);
    return `${color.r},${color.g},${color.b},${color.a}`;
  };

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
                    style={{
                      width: '1rem',
                      height: '1rem',
                      minWidth: '1rem',
                      minHeight: '1rem',
                      backgroundColor: `rgba(${getRgba(zone.symbol as __esri.CIMSymbol)})`,
                      border: `1px solid rgba(${getRgba(zone.symbol as __esri.CIMSymbol)})`,
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
