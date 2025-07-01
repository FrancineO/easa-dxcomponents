import { Card, CardContent, Text, Alert, Icon } from '@pega/cosmos-react-core';
import {
  landusePopDensityLookup,
  landUseLabels,
  landuseColors,
} from '../renderers';
import TooltipElement from '../components/tooltip-element';
import * as Information from '@pega/cosmos-react-core/lib/components/Icon/icons/information.icon';
import { registerIcon } from '@pega/cosmos-react-core';

registerIcon(Information);

const infoText = [
  'The  static population density map is based on census data.',
  'Census data registers people where they are resident therefore In some area the population density information is not accurate enough (e.g a commercial area or a sport facility or a beach are always showed as empty however in some hours of day or in some days of a year there may even be assembly of people).',
  'The system arbitrary assigns a fictious high populaiton density value and the information that an assembly of people may be present.',
  ' The UAS operator might then in the SORA step#3 (ground mitigation)  justify a lower population density.',
];

const LandusePopDensityLegend = ({
  intersectingLanduseClasses,
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
          maxDensity: 0,
        };
      }
      acc[colorKey].landuses.push({
        label: landUseLabels[landuse as unknown as number],
        density,
        landuse: Number(landuse),
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
    >,
  );

  const getIntersectingLanduse = (group: {
    landuses: { label: string; density: number; landuse: number }[];
  }) => {
    return group.landuses.filter((l) =>
      intersectingLanduseClasses?.includes(l.landuse),
    );
  };

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
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Text variant='h3'>Population Density by Land Use</Text>
            <TooltipElement tooltipContent={infoText}>
              <Icon
                name='information'
                role='img'
                aria-label='information circle icon'
                className='icon'
              />
            </TooltipElement>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '0.5rem',
            flexWrap: 'wrap',
            maxHeight: '200px',
            columnGap: '2rem',
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
                  alignItems: 'center',
                }}
              >
                <TooltipElement
                  tooltipContent={`The Flight Path Intersects with ${getIntersectingLanduse(
                    group,
                  )
                    .map((l) => l.label)
                    .join(', ')}`}
                >
                  <Alert
                    style={{
                      visibility:
                        getIntersectingLanduse(group).length > 0
                          ? 'visible'
                          : 'hidden',
                    }}
                    variant='urgent'
                  />
                </TooltipElement>
                <TooltipElement
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    minWidth: '250px',
                    alignItems: 'center',
                  }}
                  tooltipContent={group.landuses
                    // filter duplicate labels
                    .filter(
                      (l, index, self) =>
                        index === self.findIndex((t) => t.label === l.label),
                    )
                    .map((l) => l.label)
                    .sort((a, b) => a.localeCompare(b))}
                >
                  <div
                    style={{
                      width: '1rem',
                      height: '1rem',
                      minWidth: '1rem',
                      minHeight: '1rem',
                      backgroundColor: `rgba(${group.color.join(',')})`,
                      border: `1px solid rgba(${group.color.join(',')})`,
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      justifyContent: 'space-between',
                      flexGrow: 1,
                    }}
                  >
                    <Text
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '15rem',
                      }}
                    >{`${group.landuses
                      // filter duplicate labels
                      .filter(
                        (l, index, self) =>
                          index === self.findIndex((t) => t.label === l.label),
                      )
                      .map((l) => l.label)
                      .sort((a, b) => a.localeCompare(b))
                      .join(' / ')}`}</Text>
                    <Text
                      style={{
                        width: '6rem',
                        textAlign: 'right',
                      }}
                    >{`${group.maxDensity >= 1000 ? `${group.maxDensity / 1000}K` : group.maxDensity} per km²`}</Text>
                  </div>
                </TooltipElement>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LandusePopDensityLegend;
