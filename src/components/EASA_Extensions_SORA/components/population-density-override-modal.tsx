import {
  Modal,
  useModalContext,
  Button,
  Select,
  TextArea,
  Text,
} from '@pega/cosmos-react-core';
import { useState, useEffect, useMemo } from 'react';
import type { ImpactedLandUse } from '../types';
import { landusePopDensityLookup } from '../renderers';
import getLanduseIcon from '../legends/landuse-icons';
import TooltipElement from './tooltip-element';

interface Props {
  impactedLandUse: ImpactedLandUse[] | null;
  onClose: () => void;
  onSave: (overriddenLandUse: ImpactedLandUse[]) => void;
}

// Available population density options
const populationDensityOptions = [
  { value: 5, label: '5 ppl/km²' },
  { value: 50, label: '50 ppl/km²' },
  { value: 500, label: '500 ppl/km²' },
  { value: 5000, label: '5,000 ppl/km²' },
  { value: 50000, label: '50,000 ppl/km²' },
];

// Function to get population density options including the current value if not in predefined list
const getPopulationDensityOptions = (
  currentValue: number,
  overrideValue?: number | null,
) => {
  let options = [...populationDensityOptions];

  // Add override value if it exists and is different from current value
  if (
    overrideValue !== null &&
    overrideValue !== undefined &&
    overrideValue !== currentValue
  ) {
    const overrideExists = options.some(
      (option) => option.value === overrideValue,
    );
    if (!overrideExists) {
      options = [
        ...options,
        {
          value: overrideValue,
          label: `${overrideValue.toLocaleString()} ppl/km²`,
        },
      ];
    }
  }

  // Add current value if it's not already in the list
  const currentExists = options.some((option) => option.value === currentValue);
  if (!currentExists) {
    options = [
      ...options,
      {
        value: currentValue,
        label: `${currentValue.toLocaleString()} ppl/km²`,
      },
    ];
  }

  // Sort options by value
  return options.sort((a, b) => a.value - b.value);
};

export const PopulationDensityOverrideModal = (props: Props) => {
  const { dismiss } = useModalContext();
  const [overriddenLandUse, setOverriddenLandUse] = useState<ImpactedLandUse[]>(
    [],
  );

  useEffect(() => {
    if (props.impactedLandUse) {
      setOverriddenLandUse([...props.impactedLandUse]);
    }
  }, [props.impactedLandUse]);

  const getOriginalPopulationDensity = (landUseCode: string) => {
    const code = parseInt(landUseCode, 10);
    return landusePopDensityLookup[code] || 0;
  };

  // Check if any changes have been made from the original values
  const isDirty = useMemo(() => {
    if (!props.impactedLandUse) return false;

    return overriddenLandUse.some((landUse) => {
      const originalDensity = getOriginalPopulationDensity(landUse.Code);
      return (
        (landUse.OverridePopulationDensity !== null &&
          landUse.OverridePopulationDensity !== originalDensity) ||
        landUse.OverrideReason !== null
      );
    });
  }, [overriddenLandUse, props.impactedLandUse]);

  // Check if all required fields are filled for overrides
  const isFormValid = useMemo(() => {
    if (!props.impactedLandUse) return false;

    return overriddenLandUse.every((landUse) => {
      const originalDensity = getOriginalPopulationDensity(landUse.Code);
      const hasOverride =
        landUse.OverridePopulationDensity !== null &&
        landUse.OverridePopulationDensity !== originalDensity;

      // If there's an override, justification is required
      if (hasOverride) {
        return landUse.OverrideReason && landUse.OverrideReason.trim() !== '';
      }

      return true;
    });
  }, [overriddenLandUse, props.impactedLandUse]);

  const handlePopulationDensityChange = (
    landUseCode: string,
    newDensity: number,
  ) => {
    const originalDensity = getOriginalPopulationDensity(landUseCode);

    setOverriddenLandUse((prev) =>
      prev.map((landUse) =>
        landUse.Code === landUseCode
          ? {
              ...landUse,
              // If the new density equals the original, clear the override
              OverridePopulationDensity:
                newDensity === originalDensity ? null : newDensity,
              OverrideReason:
                newDensity === originalDensity
                  ? null
                  : landUse.OverrideReason ||
                    'Population density corrected by operator',
            }
          : landUse,
      ),
    );
  };

  const handleJustificationChange = (
    landUseCode: string,
    newJustification: string,
  ) => {
    setOverriddenLandUse((prev) =>
      prev.map((landUse) =>
        landUse.Code === landUseCode
          ? {
              ...landUse,
              OverrideReason: newJustification || null,
            }
          : landUse,
      ),
    );
  };

  const handleRemoveOverride = (landUseCode: string) => {
    setOverriddenLandUse((prev) =>
      prev.map((landUse) =>
        landUse.Code === landUseCode
          ? {
              ...landUse,
              OverridePopulationDensity: null,
              OverrideReason: null,
            }
          : landUse,
      ),
    );
  };

  const handleSave = () => {
    if (overriddenLandUse.length > 0) {
      props.onSave(overriddenLandUse);
    }
    props.onClose();
    dismiss();
  };

  const handleClose = () => {
    props.onClose();
    dismiss();
  };

  // Calculate the current maximum population density considering overrides
  const currentMaxPopulationDensity = useMemo((): {
    value: number;
    landuse: ImpactedLandUse | null;
  } => {
    if (!overriddenLandUse || overriddenLandUse.length === 0)
      return { value: 0, landuse: null };

    let maxValue = 0;
    let maxLanduse: ImpactedLandUse | null = null;

    overriddenLandUse.forEach((landUse: ImpactedLandUse) => {
      // Use override value if available, otherwise use original value
      const currentValue =
        landUse.OverridePopulationDensity !== null
          ? landUse.OverridePopulationDensity
          : getOriginalPopulationDensity(landUse.Code);

      if (currentValue > maxValue) {
        maxValue = currentValue;
        maxLanduse = landUse;
      }
    });

    return { value: maxValue, landuse: maxLanduse };
  }, [overriddenLandUse]);

  // Type guard to check if we have a valid landuse object
  const hasMaxLanduse = currentMaxPopulationDensity.landuse !== null;

  return (
    <Modal
      dismissible
      heading='Override Landuse Population Density'
      onAfterClose={props.onClose}
      title='Override Landuse Population Density'
      size='large'
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minWidth: '500px',
          padding: '16px',
          maxHeight: '70vh',
        }}
      >
        {/* Current Maximum Population Density Display */}
        <div
          style={{
            backgroundColor: '#e3f2fd',
            border: '1px solid #1976d2',
            borderRadius: '6px',
            padding: '12px',
            marginBottom: '6px',
          }}
        >
          <Text variant='h5' style={{ marginBottom: '6px', color: '#495057' }}>
            Current Maximum Landuse Population Density
          </Text>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Text
              variant='h3'
              style={{
                color: '#0d6efd',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {currentMaxPopulationDensity.value.toLocaleString()} ppl/km²
            </Text>
            <Text
              variant='secondary'
              style={{ color: '#6c757d', fontSize: '12px' }}
            >
              (considering all overrides)
            </Text>
          </div>

          {/* Show which landuse class contributes to the maximum */}
          {hasMaxLanduse && currentMaxPopulationDensity.landuse && (
            <div
              style={{
                marginTop: '8px',
                padding: '8px',
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Text
                variant='secondary'
                style={{ color: '#6c757d', fontSize: '12px' }}
              >
                From:
              </Text>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 6px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '3px',
                  border: '1px solid #bbdefb',
                }}
              >
                {getLanduseIcon(currentMaxPopulationDensity.landuse!.pyLabel)}
                <Text
                  variant='secondary'
                  style={{
                    color: '#1976d2',
                    fontWeight: '500',
                    fontSize: '12px',
                  }}
                >
                  {currentMaxPopulationDensity.landuse!.pyLabel}
                </Text>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable content area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: '8px',
            marginRight: '-8px',
          }}
        >
          {overriddenLandUse.map((landUse) => {
            const hasOverride =
              landUse.OverridePopulationDensity !== null ||
              landUse.OverrideReason !== null;

            const isIncomplete =
              hasOverride &&
              (!landUse.OverrideReason || landUse.OverrideReason.trim() === '');

            // Determine styling based on state
            const getSectionStyle = () => {
              if (isIncomplete) {
                return {
                  border: '2px solid #d32f2f',
                  backgroundColor: '#ffebee',
                };
              }
              if (hasOverride) {
                return {
                  border: '2px solid #f57c00',
                  backgroundColor: '#fff3e0',
                };
              }
              return {
                border: '1px solid #e0e0e0',
                backgroundColor: '#f9f9f9',
              };
            };

            const sectionStyle = getSectionStyle();

            return (
              <div
                key={landUse.Code}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  marginBottom: '16px',
                  padding: '16px',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease-in-out',
                  ...sectionStyle,
                }}
              >
                {/* Top row with landuse info and remove button */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          minWidth: '20px',
                        }}
                      >
                        {getLanduseIcon(landUse.pyLabel)}
                      </div>
                      <Text variant='h4' style={{ fontWeight: 'bold' }}>
                        {landUse.pyLabel}
                      </Text>
                      {hasOverride && (
                        <div
                          style={{
                            backgroundColor: '#f57c00',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginLeft: '8px',
                          }}
                        >
                          OVERRIDE
                        </div>
                      )}
                    </div>
                    <Text
                      variant='secondary'
                      style={{
                        color: '#666',
                        fontSize: '14px',
                      }}
                    >
                      {getOriginalPopulationDensity(landUse.Code)} ppl/km²
                    </Text>
                  </div>

                  {/* Remove Override Button - positioned using flexbox */}
                  {hasOverride && (
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
                          marginLeft: '16px',
                        }}
                        onClick={() => handleRemoveOverride(landUse.Code)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleRemoveOverride(landUse.Code);
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
                  )}
                </div>

                {/* Population density dropdown row */}
                <div style={{ width: '100%' }}>
                  <Select
                    label='Corrected Population Density'
                    value={
                      landUse.OverridePopulationDensity?.toString() ||
                      getOriginalPopulationDensity(landUse.Code).toString()
                    }
                    onChange={(e) =>
                      handlePopulationDensityChange(
                        landUse.Code,
                        parseInt(e.target.value, 10),
                      )
                    }
                  >
                    {getPopulationDensityOptions(
                      getOriginalPopulationDensity(landUse.Code),
                      landUse.OverridePopulationDensity,
                    ).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Bottom row: Justification takes full width */}
                <div style={{ width: '100%' }}>
                  <TextArea
                    label='Justification *'
                    placeholder='Please provide a reason for this correction...'
                    value={landUse.OverrideReason || ''}
                    onChange={(e) =>
                      handleJustificationChange(landUse.Code, e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'flex-end',
            paddingTop: '16px',
            borderTop: '1px solid #e0e0e0',
            flexShrink: 0,
          }}
        >
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={handleSave}
            disabled={!isDirty || !isFormValid}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PopulationDensityOverrideModal;
