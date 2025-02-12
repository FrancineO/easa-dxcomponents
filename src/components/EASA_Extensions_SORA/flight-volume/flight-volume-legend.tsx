import { Card, CardContent } from '@pega/cosmos-react-core';
import {
  adjacentAreaColor,
  groundRiskVolumeColor,
  contingencyVolumeColor,
  flightGeographyColor,
  flightPathColor
} from './flight-volume-symbols';
import type { FlightVolume } from '../types';

const FlightVolumeLegend = ({ flightVolume }: { flightVolume: FlightVolume | null }) => {
  const legendItems = [
    {
      label: 'Flight Path',
      color: flightPathColor
    },
    {
      label: 'Flight Geography',
      color: flightGeographyColor
    },
    {
      label: 'Ground Risk Volume',
      color: groundRiskVolumeColor
    },
    {
      label: 'Contingency Volume',
      color: contingencyVolumeColor
    },
    {
      label: 'Adjacent Area',
      color: adjacentAreaColor
    }
  ];

  return (
    flightVolume && (
      <Card>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ fontWeight: 'bold' }}>Flight Volume</div>
            {legendItems.map(item => (
              <div
                key={item.label}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <div
                  style={{
                    width: '1rem',
                    height: '1rem',
                    backgroundColor: `rgb(${item.color.join(',')})`,
                    border: `1px solid rgb(${item.color.join(',')})`
                  }}
                />
                <div>{item.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default FlightVolumeLegend;
