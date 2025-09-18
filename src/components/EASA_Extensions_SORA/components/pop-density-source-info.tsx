import type { ImpactedLandUse, PopulationDensitySource } from '../types';
import { landusePopDensityLookup, landUseLabels } from '../renderers';
import getLanduseIcon from '../legends/landuse-icons';
import TooltipElement from './tooltip-element';
import { Icon } from '@pega/cosmos-react-core';
import { TbLayoutGrid, TbChartHistogram, TbPencil } from 'react-icons/tb';

interface PopDensitySourceInfoProps {
  populationDensity: any;
  overriddenLandUse: ImpactedLandUse[] | null;
  intersectingLanduseClasses: number[] | null;
  onRemoveOverride: (landuseClass: string) => void;
}

export const PopDensitySourceInfo = (props: PopDensitySourceInfoProps) => {
  const {
    populationDensity,
    overriddenLandUse,
    intersectingLanduseClasses,
    onRemoveOverride,
  } = props;

  // Function to get override information for display
  const getOverrideInfo = (
    overriddenLandUseData: ImpactedLandUse[] | null,
    intersectingLanduseClassesData: number[] | null,
    populationDensityData: any,
  ) => {
    if (
      !overriddenLandUseData ||
      !intersectingLanduseClassesData ||
      !populationDensityData
    )
      return null;

    // Check if the population density is coming from an overridden landuse value
    if (populationDensityData.maxPopDensitySource === 'overridden-landuse') {
      // Find all overrides that have the same maximum value
      const maxValue = populationDensityData.maxPopDensityOperationalGroundRisk;

      // Find all overrides that have this maximum value
      const foundOverrides = overriddenLandUseData.filter(
        (override) => override.OverridePopulationDensity === maxValue,
      );

      if (foundOverrides.length > 0) {
        return foundOverrides.map((override) => ({
          landuseClass: override.pyLabel || 'Unknown',
          overrideValue: override.OverridePopulationDensity || 0,
          overrideReason: override.OverrideReason || '',
        }));
      }
    }
    return null;
  };

  // Helper function to get the original landuse density
  const getOriginalLanduseDensity = (landuseClass: number): number => {
    return landusePopDensityLookup[landuseClass] || 0;
  };

  // Helper function to get the landuse label
  const getLanduseLabel = (landuseClass: number): string => {
    return landUseLabels[landuseClass] || 'Unknown';
  };

  // Helper function to find all landuse classes with the highest default density
  const findAllHighestLanduseClasses = (
    landuseClasses: number[] | null,
    overriddenLandUseData: ImpactedLandUse[] | null = null,
  ) => {
    if (!landuseClasses || landuseClasses.length === 0) return null;

    // Filter out overridden landuse classes if overrides exist
    let filteredLanduseClasses = landuseClasses;
    if (overriddenLandUseData && overriddenLandUseData.length > 0) {
      // Get the codes of landuse classes that have actual override values (not null)
      const overriddenCodes = overriddenLandUseData
        .filter((override) => override.OverridePopulationDensity !== null)
        .map((override) => parseInt(override.Code, 10));
      // Filter out the overridden classes
      filteredLanduseClasses = landuseClasses.filter(
        (code) => !overriddenCodes.includes(code),
      );
    }

    // If all classes are overridden, return null
    if (filteredLanduseClasses.length === 0) return null;

    let maxDensity = 0;
    let maxLanduseClasses: { code: number; label: string }[] = [];

    filteredLanduseClasses.forEach((landuseCode) => {
      const density = getOriginalLanduseDensity(landuseCode);
      if (density > maxDensity) {
        maxDensity = density;
        maxLanduseClasses = [
          {
            code: landuseCode,
            label: getLanduseLabel(landuseCode),
          },
        ];
      } else if (density === maxDensity && maxDensity > 0) {
        // Add to the list if it has the same maximum density
        maxLanduseClasses.push({
          code: landuseCode,
          label: getLanduseLabel(landuseCode),
        });
      }
    });

    return maxLanduseClasses.length > 0 ? maxLanduseClasses : null;
  };

  const source = populationDensity.maxPopDensitySource;
  const value = populationDensity.maxPopDensityOperationalGroundRisk;

  // Get source-specific styling
  const getSourceStyling = (sourceType: PopulationDensitySource) => {
    switch (sourceType) {
      case 'pop-density':
        return {
          backgroundColor: '#e3f2fd',
          border: '1px solid #1976d2',
          color: '#1976d2',
        };
      case 'landuse':
        return {
          backgroundColor: '#f3e5f5',
          border: '1px solid #7b1fa2',
          color: '#7b1fa2',
        };
      case 'overridden-landuse':
        return {
          backgroundColor: '#fff3e0',
          border: '1px solid #f57c00',
          color: '#f57c00',
        };
      default:
        return {
          backgroundColor: '#f5f5f5',
          border: '1px solid #9e9e9e',
          color: '#9e9e9e',
        };
    }
  };

  // Get source-specific content
  const getSourceContent = (
    sourceType: PopulationDensitySource,
  ): {
    title: string;
    icon: any;
    landuseClass?: { code: number; label: string }[] | null;
    description: string;
    infoLink?: string;
    overrideInfo?:
      | {
          landuseClass: string;
          overrideValue: number;
          overrideReason: string;
        }[]
      | null;
    tooltipContent?: string;
  } => {
    switch (sourceType) {
      case 'pop-density':
        return {
          title: 'Population Density Layer',
          icon: TbChartHistogram,
          description: 'Data from JRC Global Human Settlement Layer (GHS-POP)',
          infoLink:
            'https://data.jrc.ec.europa.eu/dataset/98336641-fd1c-4992-8c7b-c470dd5eb81e',
        };
      case 'landuse': {
        // Find which landuse class has the highest default density
        // Exclude overridden classes when there are overrides
        const highestLanduseClasses = findAllHighestLanduseClasses(
          intersectingLanduseClasses,
          overriddenLandUse,
        );
        return {
          title: 'Landuse Classification',
          icon: TbLayoutGrid,
          landuseClass: highestLanduseClasses,
          description:
            'Assumed population density value based on landuse classification',
          infoLink: 'https://data.jrc.ec.europa.eu/dataset?collection=LUISA',
          tooltipContent:
            'This is an assumed population density value based on landuse classification. You can override this value by clicking the "Correct errors in population density values" button at the top of the map.',
        };
      }
      case 'overridden-landuse': {
        const overrideInfo = getOverrideInfo(
          overriddenLandUse,
          intersectingLanduseClasses,
          populationDensity,
        );
        if (overrideInfo) {
          return {
            title: 'Overridden Landuse',
            icon: TbPencil,
            overrideInfo,
            description: 'Manually adjusted population density value',
          };
        }
        return {
          title: 'Overridden Landuse',
          icon: TbPencil,
          description: 'Manually adjusted population density value',
        };
      }
      default:
        return {
          title: 'Unknown Source',
          icon: TbChartHistogram,
          description: 'Source of population density value unknown',
        };
    }
  };

  const content = getSourceContent(source);
  const styling = getSourceStyling(source);

  if (!content) return null;

  return (
    <div
      style={{
        marginTop: '8px',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '12px',
        ...styling,
      }}
    >
      {/* Header with value and remove button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 'bold',
          }}
        >
          <span style={{ fontSize: '16px' }}>
            <content.icon size={16} />
          </span>
          <span>{content.title}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontWeight: 'bold' }}>
            {value?.toLocaleString()} ppl/km²
          </div>
        </div>
      </div>

      {/* Landuse details if applicable */}
      {content.landuseClass && content.landuseClass.length > 0 && (
        <div
          style={{
            padding: '6px 8px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {content.landuseClass.map((landuse, index) => (
            <div
              key={landuse.code}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: index > 0 ? '2px 0' : '0',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {source === 'landuse' && getLanduseIcon(landuse.label)}
                {source === 'landuse' && landuse.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Override details if applicable */}
      {content.overrideInfo && content.overrideInfo.length > 0 && (
        <div
          style={{
            padding: '6px 8px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* Remove all overrides button - small and compact */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '4px',
            }}
          >
            <TooltipElement tooltipContent='Remove all overrides'>
              <div
                style={{
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(245, 124, 0, 0.1)',
                  color: '#f57c00',
                  transition: 'background-color 0.2s',
                  lineHeight: '1',
                  border: '1px solid rgba(245, 124, 0, 0.3)',
                }}
                onClick={() => {
                  // Remove all overrides by calling onRemoveOverride for each one
                  content.overrideInfo?.forEach((override) => {
                    onRemoveOverride(override.landuseClass);
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    content.overrideInfo?.forEach((override) => {
                      onRemoveOverride(override.landuseClass);
                    });
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'rgba(245, 124, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'rgba(245, 124, 0, 0.1)';
                }}
                role='button'
                tabIndex={0}
                aria-label='Remove all overrides'
              >
                Remove all
              </div>
            </TooltipElement>
          </div>

          {content.overrideInfo.map((override, index) => (
            <div
              key={override.landuseClass}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '8px',
                padding: index > 0 ? '8px 0 0 0' : '0',
                borderTop: index > 0 ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '4px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {getLanduseIcon(override.landuseClass)}
                    {override.landuseClass}
                  </span>
                </div>

                <div style={{ marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>Override:</span>{' '}
                  {override.overrideValue.toLocaleString()} ppl/km²
                </div>

                {override.overrideReason && (
                  <div style={{ marginBottom: '4px' }}>
                    <span style={{ fontWeight: 'bold' }}>Reason:</span>{' '}
                    {override.overrideReason}
                  </div>
                )}
              </div>

              {/* Individual remove button for each override */}
              <TooltipElement tooltipContent='Remove override'>
                <div
                  style={{
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(245, 124, 0, 0.1)',
                    color: '#f57c00',
                    transition: 'background-color 0.2s',
                    lineHeight: '1',
                    flexShrink: 0,
                  }}
                  onClick={() => onRemoveOverride(override.landuseClass)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onRemoveOverride(override.landuseClass);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'rgba(245, 124, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      'rgba(245, 124, 0, 0.1)';
                  }}
                  role='button'
                  tabIndex={0}
                  aria-label='Remove override'
                >
                  ×
                </div>
              </TooltipElement>
            </div>
          ))}
        </div>
      )}

      {/* Description with info link - moved to bottom */}
      {content.description && (
        <div style={{ marginTop: '8px', fontSize: '11px', opacity: 0.8 }}>
          {content.tooltipContent ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <TooltipElement tooltipContent={content.tooltipContent}>
                <Icon name='information' size='s' />
              </TooltipElement>
              <span>{content.description}</span>
            </div>
          ) : (
            <span>{content.description}</span>
          )}
        </div>
      )}

      {/* Data source link - separate line, right-aligned */}
      {content.infoLink && (
        <div
          style={{
            marginTop: '4px',
            fontSize: '11px',
            opacity: 0.8,
            textAlign: 'right',
          }}
        >
          (
          <a
            href={content.infoLink}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            Data source
          </a>
          )
        </div>
      )}
    </div>
  );
};

export default PopDensitySourceInfo;
