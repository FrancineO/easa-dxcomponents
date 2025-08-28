import type { ImpactedLandUse, PopulationDensitySource } from '../types';
import { landusePopDensityLookup, landUseLabels } from '../renderers';
import getLanduseIcon from '../legends/landuse-icons';
import TooltipElement from './tooltip-element';
import { Icon } from '@pega/cosmos-react-core';

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
      // Find the override that contributed to this value
      const contributingLanduseClass =
        populationDensityData.maxPopDensityLanduseClass;
      const foundOverride = overriddenLandUseData.find(
        (override) => override.pyLabel === contributingLanduseClass,
      );

      if (foundOverride && foundOverride.OverridePopulationDensity !== null) {
        return {
          landuseClass: foundOverride.pyLabel || 'Unknown',
          overrideValue: foundOverride.OverridePopulationDensity,
          overrideReason: foundOverride.OverrideReason || '',
        };
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

  // Helper function to find the landuse class with highest default density
  const findHighestLanduseClass = (landuseClasses: number[] | null) => {
    if (!landuseClasses || landuseClasses.length === 0) return null;

    let maxDensity = 0;
    let maxLanduseClass: { code: number; label: string } | null = null;

    landuseClasses.forEach((landuseCode) => {
      const density = getOriginalLanduseDensity(landuseCode);
      if (density > maxDensity) {
        maxDensity = density;
        maxLanduseClass = {
          code: landuseCode,
          label: getLanduseLabel(landuseCode),
        };
      }
    });

    return maxLanduseClass;
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
    icon: string;
    landuseClass?: { code: number; label: string } | null;
    description: string;
    infoLink?: string;
    overrideInfo?: {
      landuseClass: string;
      overrideValue: number;
      overrideReason: string;
    } | null;
    tooltipContent?: string;
  } => {
    switch (sourceType) {
      case 'pop-density':
        return {
          title: 'Population Density Layer',
          icon: '📊',
          description: 'Data from JRC Global Human Settlement Layer (GHS-POP)',
          infoLink:
            'https://data.jrc.ec.europa.eu/dataset/98336641-fd1c-4992-8c7b-c470dd5eb81e',
        };
      case 'landuse': {
        // Find which landuse class has the highest default density
        const highestLanduseClass = findHighestLanduseClass(
          intersectingLanduseClasses,
        );
        return {
          title: 'Landuse Classification',
          icon: '🏗️',
          landuseClass: highestLanduseClass,
          description:
            'Assumed population density value based on landuse classification',
          infoLink: 'https://data.jrc.ec.europa.eu/dataset?collection=LUISA',
          tooltipContent:
            'This is an assumed population density value based on landuse classification. You can override this value by clicking the "Override Landuse Population Density" button at the top of the map.',
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
            icon: '✏️',
            overrideInfo,
            description: 'Manually corrected population density value',
          };
        }
        return {
          title: 'Overridden Landuse',
          icon: '✏️',
          description: 'Manually corrected population density value',
        };
      }
      default:
        return {
          title: 'Unknown Source',
          icon: '❓',
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
          <span style={{ fontSize: '16px' }}>{content.icon}</span>
          <span>{content.title}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontWeight: 'bold' }}>
            {value?.toLocaleString()} ppl/km²
          </div>

          {/* Remove override button - positioned using flexbox */}
          {content.overrideInfo && (
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
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.2s',
                  lineHeight: '1',
                }}
                onClick={() =>
                  onRemoveOverride(content.overrideInfo!.landuseClass)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onRemoveOverride(content.overrideInfo!.landuseClass);
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                }}
                role='button'
                tabIndex={0}
                aria-label='Remove override'
              >
                ×
              </div>
            </TooltipElement>
          )}
        </div>
      </div>

      {/* Landuse details if applicable */}
      {content.landuseClass && (
        <div
          style={{
            padding: '6px 8px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>Class:</span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {source === 'landuse' && getLanduseIcon(content.landuseClass.label)}
            {source === 'landuse' && content.landuseClass.label}
          </span>
        </div>
      )}

      {/* Override details if applicable */}
      {content.overrideInfo && (
        <div
          style={{
            padding: '6px 8px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ marginBottom: '4px' }}>
            <span style={{ fontWeight: 'bold' }}>Class:</span>{' '}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {getLanduseIcon(content.overrideInfo.landuseClass)}
              {content.overrideInfo.landuseClass}
            </span>
          </div>

          <div style={{ marginBottom: '4px' }}>
            <span style={{ fontWeight: 'bold' }}>Override:</span>{' '}
            {content.overrideInfo.overrideValue.toLocaleString()} ppl/km²
          </div>

          {content.overrideInfo.overrideReason && (
            <div style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 'bold' }}>Reason:</span>{' '}
              {content.overrideInfo.overrideReason}
            </div>
          )}
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
