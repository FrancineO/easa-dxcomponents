import { Card, CardContent, Text } from '@pega/cosmos-react-core';
import { populationDensityClassbreaks } from './renderers';

const PopDensityLegend = () => {
  return (
    <Card>
      <CardContent>
        <Text variant='h3'>Population Density</Text>
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
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: `rgba(${breakInfo.color.join(',')})`,
                    border: `1px solid rgba(${breakInfo.color.join(',')})`,
                    marginRight: '0.5rem'
                  }}
                />
                <Text>{breakInfo.label} people/km²</Text>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopDensityLegend;
