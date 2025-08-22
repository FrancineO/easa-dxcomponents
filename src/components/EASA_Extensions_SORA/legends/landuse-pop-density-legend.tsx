import {
  Card,
  CardContent,
  Text,
  Alert,
  Icon,
  Button,
} from '@pega/cosmos-react-core';
import {
  landusePopDensityLookup,
  landUseLabels,
  landuseColors,
} from '../renderers';
import TooltipElement from '../components/tooltip-element';
import * as Information from '@pega/cosmos-react-core/lib/components/Icon/icons/information.icon';
import * as CaretDown from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-down.icon';
import * as CaretUp from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-up.icon';
import { registerIcon } from '@pega/cosmos-react-core';
import { useState } from 'react';
import getLanduseIcon from './landuse-icons';

registerIcon(Information);
registerIcon(CaretDown);
registerIcon(CaretUp);

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
  // State to track which groups are expanded
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Toggle expanded state for a group
  const toggleGroup = (colorKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(colorKey)) {
      newExpanded.delete(colorKey);
    } else {
      newExpanded.add(colorKey);
    }
    setExpandedGroups(newExpanded);
  };

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

  const isGroupExpanded = (colorKey: string) => expandedGroups.has(colorKey);

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
          }}
        >
          {Object.entries(groupedEntries)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .sort(([_, group1], [__, group2]) => {
              const color1Sum = group1.color.reduce((a, b) => a + b, 0);
              const color2Sum = group2.color.reduce((a, b) => a + b, 0);
              return color1Sum - color2Sum;
            })
            .map(([colorKey, group]) => {
              const isExpanded = isGroupExpanded(colorKey);
              const intersectingLanduses = getIntersectingLanduse(group);

              return (
                <div key={colorKey}>
                  {/* Group Header */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      minWidth: '250px',
                      alignItems: 'center',
                    }}
                  >
                    <TooltipElement
                      tooltipContent={`The Flight Path Intersects with ${intersectingLanduses
                        .map((l) => l.label)
                        .join(', ')}`}
                    >
                      <Alert
                        style={{
                          visibility:
                            intersectingLanduses.length > 0
                              ? 'visible'
                              : 'hidden',
                        }}
                        variant='urgent'
                      />
                    </TooltipElement>

                    {/* Expandable Button with Caret Icon */}
                    <Button
                      variant='text'
                      compact
                      onClick={() => toggleGroup(colorKey)}
                      style={{
                        padding: '0.25rem',
                        minWidth: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon
                        name={isExpanded ? 'caret-up' : 'caret-down'}
                        role='img'
                        aria-label={
                          isExpanded ? 'collapse section' : 'expand section'
                        }
                        className='icon'
                        style={{ fontSize: '0.875rem' }}
                      />
                    </Button>

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
                            index ===
                            self.findIndex((t) => t.label === l.label),
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
                              index ===
                              self.findIndex((t) => t.label === l.label),
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

                  {/* Expanded Individual Landuse Classes */}
                  {isExpanded && (
                    <div
                      style={{
                        marginLeft: '2rem',
                        marginTop: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                      }}
                    >
                      {group.landuses
                        .filter(
                          (l, index, self) =>
                            index ===
                            self.findIndex((t) => t.label === l.label),
                        )
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .map((landuse) => {
                          const isIntersecting =
                            intersectingLanduseClasses?.includes(
                              landuse.landuse,
                            );

                          return (
                            <div
                              key={landuse.landuse}
                              style={{
                                display: 'flex',
                                gap: '0.5rem',
                                alignItems: 'center',
                                padding: '0.25rem 0',
                              }}
                            >
                              {/* Alert for intersecting individual landuse */}
                              <Alert
                                style={{
                                  visibility: isIntersecting
                                    ? 'visible'
                                    : 'hidden',
                                }}
                                variant='urgent'
                              />

                              {/* Individual landuse info */}
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '0.5rem',
                                  flexGrow: 1,
                                  alignItems: 'center',
                                }}
                              >
                                {/* Landuse Icon */}
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    minWidth: '20px',
                                  }}
                                >
                                  {getLanduseIcon(landuse.label)}
                                </div>

                                <Text
                                  style={{
                                    fontSize: '0.875rem',
                                    color: isIntersecting
                                      ? '#d32f2f'
                                      : 'inherit',
                                    fontWeight: isIntersecting
                                      ? '600'
                                      : 'normal',
                                  }}
                                >
                                  {landuse.label}
                                </Text>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LandusePopDensityLegend;
