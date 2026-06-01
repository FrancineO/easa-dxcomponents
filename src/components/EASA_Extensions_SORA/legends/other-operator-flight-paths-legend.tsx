import { Alert, Card, CardContent, Text } from '@pega/cosmos-react-core';
import { otherOperatorColor } from '../flight-volume/flight-volume-symbols';

const OtherOperatorFlightPathsLegend = ({
  hasOtherOperatorFlightPaths,
}: {
  hasOtherOperatorFlightPaths: boolean;
}): JSX.Element | null => {
  if (!hasOtherOperatorFlightPaths) return null;

  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Alert style={{ visibility: 'hidden' }} variant='urgent' />
          <Text variant='h3'>Other Operators</Text>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Alert style={{ visibility: 'hidden' }} variant='urgent' />
            <div
              style={{
                width: '1rem',
                height: '2px',
                backgroundColor: `rgb(${otherOperatorColor.join(',')})`,
              }}
            />
            <div>Flight Path</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherOperatorFlightPathsLegend;
