import { Alert, Card, CardContent, Text } from '@pega/cosmos-react-core';
import {
  adjacentAreaColor,
  groundRiskVolumeColor,
  contingencyVolumeColor,
  flightGeographyColor,
  // flightPathColor
} from '../flight-volume/flight-volume-symbols';
import type { FlightVolume } from '../types';

const FlightVolumeLegend = ({
  flightVolumes,
}: {
  flightVolumes: FlightVolume[];
}): JSX.Element | null => {
  const legendItems = [
    // {
    //   label: 'Flight Path',
    //   color: flightPathColor
    // },
    {
      label: 'Flight Geography',
      color: flightGeographyColor,
    },
    {
      label: 'Contingency Volume',
      color: contingencyVolumeColor,
    },
    {
      label: 'Ground Risk Buffer',
      color: groundRiskVolumeColor,
    },
    {
      label: 'Adjacent Area',
      color: adjacentAreaColor,
    },
  ];

  if (flightVolumes.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Alert
            style={{
              visibility: 'hidden',
            }}
            variant='urgent'
          />
          <Text variant='h3'>Flight Volume</Text>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '0.5rem',
          }}
        >
          {legendItems.map((item) => (
            <div
              key={item.label}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Alert
                style={{
                  visibility: 'hidden',
                }}
                variant='urgent'
              />

              <div
                style={{
                  width: '1rem',
                  height: '1rem',
                  backgroundColor: `rgb(${item.color.join(',')})`,
                  border: `1px solid rgb(${item.color.join(',')})`,
                }}
              />
              <div style={{ width: '9rem' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightVolumeLegend;
