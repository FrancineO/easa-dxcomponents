import { Alert, Card, CardContent, Text } from '@pega/cosmos-react-core';
import { geozoneRenderer, geozones } from '../renderers';
import TooltipElement from '../components/tooltip-element';

const GeozonesLegend = ({ intersectingGeozones }: { intersectingGeozones: __esri.Graphic[] }) => {
  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Alert style={{ visibility: 'hidden' }} variant='urgent' />
          <Text variant='h3'>GeoZones</Text>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '0.5rem'
          }}
        >
          {geozones.map(zone => (
            <div key={zone.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TooltipElement
                tooltipContent={`The Flight Path Intersects with ${zone.label} GeoZone`}
              >
                <Alert
                  style={{
                    visibility: intersectingGeozones.some(
                      gz => gz.attributes[geozoneRenderer.field1] === zone.value
                    )
                      ? 'visible'
                      : 'hidden'
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
                  backgroundColor: `rgba(${zone.color[0]},${zone.color[1]},${zone.color[2]},${zone.color[3] / 255})`,
                  border: `1px solid rgba(${zone.color[0]},${zone.color[1]},${zone.color[2]},${zone.color[3] / 255})`
                }}
              />
              <Text>{zone.label}</Text>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeozonesLegend;
