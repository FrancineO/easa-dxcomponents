import { Card, CardContent, Text, Alert } from '@pega/cosmos-react-core';
import { landusePopDensityLookup, landUseLabels, landuseColors } from './renderers';

const LandusePopDensity = ({
  intersectingLanduseClasses
}: {
  intersectingLanduseClasses: number[];
}) => {
  // Group entries by color
  const groupedEntries = Object.entries(landusePopDensityLookup).reduce(
    (acc, [landuse, density]) => {
      const colorKey = landuseColors[landuse as unknown as number].join(',');
      if (!acc[colorKey]) {
        acc[colorKey] = {
          color: landuseColors[landuse as unknown as number],
          landuses: [],
          maxDensity: 0
        };
      }
      acc[colorKey].landuses.push({
        label: landUseLabels[landuse as unknown as number],
        density,
        landuse: Number(landuse)
      });
      acc[colorKey].maxDensity = Math.max(acc[colorKey].maxDensity, density);
      return acc;
    },
    {} as Record<
      string,
      {
        color: number[];
        landuses: {
          label: string;
          landuse: number;
          density: number;
        }[];
        maxDensity: number;
      }
    >
  );

  const hasIntersectingLanduse = (group: {
    landuses: { label: string; density: number; landuse: number }[];
  }) => {
    return group.landuses.some(l => intersectingLanduseClasses?.includes(l.landuse));
  };

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
          <Text variant='h3'>Population Density by Landuse</Text>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '0.5rem',
            flexWrap: 'wrap',
            maxHeight: '200px',
            columnGap: '2rem'
          }}
        >
          {Object.entries(groupedEntries)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .sort(([_, group1], [__, group2]) => {
              const color1Sum = group1.color.reduce((a, b) => a + b, 0);
              const color2Sum = group2.color.reduce((a, b) => a + b, 0);
              return color1Sum - color2Sum;
            })
            .map(([colorKey, group]) => (
              <div
                key={colorKey}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  minWidth: '250px',
                  alignItems: 'center'
                }}
              >
                <Alert
                  title='The Flight Path Intersects with one of these land uses'
                  style={{
                    visibility: hasIntersectingLanduse(group) ? 'visible' : 'hidden'
                  }}
                  variant='urgent'
                />
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    minWidth: '20px',
                    minHeight: '20px',
                    backgroundColor: `rgba(${group.color.join(',')})`,
                    border: `1px solid rgba(${group.color.join(',')})`,
                    marginRight: '0.5rem'
                  }}
                />
                {
                  // TODO: ask francine how the tooltip works
                }
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'space-between',
                    flexGrow: 1
                  }}
                >
                  <Text
                    title={`${group.landuses
                      .map(l => l.label)
                      .sort((a, b) => a.localeCompare(b))
                      .join(' / ')}`}
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '15rem'
                    }}
                  >{`${group.landuses
                    .map(l => l.label)
                    .sort((a, b) => a.localeCompare(b))
                    .join(' / ')}`}</Text>
                  <Text>{`${group.maxDensity >= 1000 ? `${group.maxDensity / 1000}K` : group.maxDensity} per km²`}</Text>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LandusePopDensity;
