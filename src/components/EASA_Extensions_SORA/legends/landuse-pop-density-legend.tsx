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
  getLanduseColor,
} from '../renderers';
import TooltipElement from '../components/tooltip-element';
import * as Information from '@pega/cosmos-react-core/lib/components/Icon/icons/information.icon';
import * as CaretDown from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-down.icon';
import * as CaretUp from '@pega/cosmos-react-core/lib/components/Icon/icons/caret-up.icon';
import * as ArrowUpDown from '@pega/cosmos-react-core/lib/components/Icon/icons/arrow-up-down.icon';
import { registerIcon } from '@pega/cosmos-react-core';
import { useState } from 'react';
import getLanduseIcon from './landuse-icons';

registerIcon(Information);
registerIcon(CaretDown);
registerIcon(CaretUp);
registerIcon(ArrowUpDown);

const infoText = [
  'The  static population density map is based on census data.',
  'Census data registers people where they are resident therefore In some area the population density information is not accurate enough (e.g a commercial area or a sport facility or a beach are always showed as empty however in some hours of day or in some days of a year there may even be assembly of people).',
  'The system arbitrary assigns a fictious high populaiton density value and the information that an assembly of people may be present.',
  ' The UAS operator might then in the SORA step#3 (ground mitigation)  justify a lower population density.',
];

type SortOption = 'alphabetical' | 'density';

const LandusePopDensityLegend = ({
  intersectingLanduseClasses,
}: {
  intersectingLanduseClasses: number[];
}) => {
  // State to track which groups are expanded
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  // State to track sorting option
  const [sortOption, setSortOption] = useState<SortOption>('density');

  // Toggle expanded state for a group
  const toggleGroup = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  // Group entries by population density thresholds
  const groupedEntries = Object.entries(landusePopDensityLookup).reduce(
    (acc, [landuse, density]) => {
      const landuseNumber = Number(landuse);
      const color = getLanduseColor(landuseNumber);

      // Handle null density values - place in separate "Other" group
      if (density === null) {
        const groupKey = 'noData';
        const groupLabel = 'Other';

        if (!acc[groupKey]) {
          acc[groupKey] = {
            label: groupLabel,
            color,
            landuses: [],
            maxDensity: 0,
          };
        }
        acc[groupKey].landuses.push({
          label: landUseLabels[landuseNumber],
          density: null,
          landuse: landuseNumber,
          color,
        });
        return acc;
      }

      // Determine which group this landuse belongs to based on density
      const groupKey = density < 5000 ? 'low' : 'high';
      const groupLabel = density < 5000 ? '< 5000 per km²' : '< 50000 per km²';

      if (!acc[groupKey]) {
        acc[groupKey] = {
          label: groupLabel,
          color,
          landuses: [],
          maxDensity: 0,
        };
      }
      acc[groupKey].landuses.push({
        label: landUseLabels[landuseNumber],
        density,
        landuse: landuseNumber,
        color,
      });
      acc[groupKey].maxDensity = Math.max(acc[groupKey].maxDensity, density);
      return acc;
    },
    {} as Record<
      string,
      {
        label: string;
        color: number[];
        landuses: {
          label: string;
          landuse: number;
          density: number | null;
          color: number[];
        }[];
        maxDensity: number;
      }
    >,
  );

  const getIntersectingLanduse = (group: {
    landuses: { label: string; density: number | null; landuse: number }[];
  }) => {
    return group.landuses.filter((l) =>
      intersectingLanduseClasses?.includes(l.landuse),
    );
  };

  const isGroupExpanded = (groupKey: string) => expandedGroups.has(groupKey);

  // Toggle between sorting options
  const toggleSortOption = () => {
    setSortOption((prev) =>
      prev === 'alphabetical' ? 'density' : 'alphabetical',
    );
  };

  // Function to sort landuses based on selected option
  const sortLanduses = (
    landuses: Array<{
      label: string;
      landuse: number;
      density: number | null;
      color: number[];
    }>,
  ) => {
    return [...landuses].sort((a, b) => {
      if (sortOption === 'alphabetical') {
        return a.label.localeCompare(b.label);
      }
      // Sort by density (descending - highest first)
      // Handle null values by placing them at the end
      if (a.density === null && b.density === null) return 0;
      if (a.density === null) return 1;
      if (b.density === null) return -1;
      return b.density - a.density;
    });
  };

  return (
    <Card>
      <CardContent>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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

          {/* Sorting controls */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <TooltipElement
              tooltipContent={[
                `Sorting: ${sortOption === 'alphabetical' ? 'Alphabetical' : 'Population Density'}`,
                `Click to sort by ${sortOption !== 'alphabetical' ? 'Alphabetical' : 'Population Density'}`,
              ]}
            >
              <Button
                variant='text'
                compact
                onClick={toggleSortOption}
                style={{
                  padding: '0.25rem',
                  minWidth: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  name='arrow-up-down'
                  role='img'
                  aria-label='toggle sort options'
                  className='icon'
                  style={{ fontSize: '1rem' }}
                />
              </Button>
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
            // Sort groups: low density first, then high density, then no data at the end
            .sort(([key1]) => {
              if (key1 === 'low') return -1;
              if (key1 === 'high') return 0;
              if (key1 === 'noData') return 1;
              return 0;
            })
            .map(([groupKey, group]) => {
              const isExpanded = isGroupExpanded(groupKey);
              const intersectingLanduses = getIntersectingLanduse(group);

              // Deduplicate landuses by label for accurate counting
              const uniqueLanduses = group.landuses.filter(
                (l, index, self) =>
                  index === self.findIndex((t) => t.label === l.label),
              );

              return (
                <div key={groupKey}>
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
                      onClick={() => toggleGroup(groupKey)}
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

                    <div
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        minWidth: '250px',
                        alignItems: 'center',
                      }}
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
                        >
                          {group.label}
                        </Text>
                        <Text
                          style={{
                            width: '6rem',
                            textAlign: 'right',
                          }}
                        >
                          {uniqueLanduses.length} landuse
                          {uniqueLanduses.length !== 1 ? 's' : ''}
                        </Text>
                      </div>
                    </div>
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
                      {sortLanduses(uniqueLanduses).map((landuse) => {
                        const isIntersecting =
                          intersectingLanduseClasses?.includes(landuse.landuse);

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
                                justifyContent: 'space-between',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '0.5rem',
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

                              {/* Population density value */}
                              {landuse.density !== null && (
                                <Text
                                  style={{
                                    fontSize: '0.875rem',
                                    color: isIntersecting
                                      ? '#d32f2f'
                                      : 'inherit',
                                    fontWeight: isIntersecting
                                      ? '600'
                                      : 'normal',
                                    minWidth: '6rem',
                                    textAlign: 'right',
                                  }}
                                >
                                  {landuse.density.toLocaleString()} per km²
                                </Text>
                              )}
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
