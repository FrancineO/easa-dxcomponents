import { Alert, Card, CardContent, Text } from '@pega/cosmos-react-core';
import { populationDensityClassbreaks } from '../renderers';

const PopDensityLegend = () => {
  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Alert
            style={{
              visibility: 'hidden'
            }}
            variant='urgent'
          />
          <Text variant='h3'>Population Density</Text>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '0.5rem'
          }}
        >
          {populationDensityClassbreaks
            .filter(breakInfo => breakInfo.value > 0.01)
            .map(breakInfo => (
              <div
                key={breakInfo.value}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center'
                }}
              >
                <Alert
                  style={{
                    visibility: 'hidden'
                  }}
                  variant='urgent'
                />

                <div
                  style={{
                    width: '1rem',
                    height: '1rem',
                    backgroundColor: `rgba(${breakInfo.color.join(',')})`,
                    border: `1px solid rgba(${breakInfo.color.join(',')})`
                  }}
                />
                <Text
                  style={{
                    width: '10rem',
                    textAlign: 'left'
                  }}
                >
                  {breakInfo.label} ppl/km²
                </Text>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopDensityLegend;
