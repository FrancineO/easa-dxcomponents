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

interface Props {
  impactedLandUse: ImpactedLandUse[] | null;
  onClose: () => void;
  onSave: (correctedLandUse: ImpactedLandUse[]) => void;
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
const getPopulationDensityOptions = (currentValue: number) => {
  const currentExists = populationDensityOptions.some(
    (option) => option.value === currentValue,
  );

  if (currentExists) {
    return populationDensityOptions;
  }

  // Add current value to options and sort them
  return [
    ...populationDensityOptions,
    { value: currentValue, label: `${currentValue.toLocaleString()} ppl/km²` },
  ].sort((a, b) => a.value - b.value);
};

export const PopulationDensityCorrectionModal = (props: Props) => {
  const { dismiss } = useModalContext();
  const [correctedLandUse, setCorrectedLandUse] = useState<ImpactedLandUse[]>(
    [],
  );

  useEffect(() => {
    if (props.impactedLandUse) {
      setCorrectedLandUse([...props.impactedLandUse]);
    }
  }, [props.impactedLandUse]);

  const getOriginalPopulationDensity = (landUseCode: string) => {
    const code = parseInt(landUseCode, 10);
    return landusePopDensityLookup[code] || 0;
  };

  // Check if any changes have been made from the original values
  const isDirty = useMemo(() => {
    if (!props.impactedLandUse) return false;

    return correctedLandUse.some((landUse) => {
      const originalDensity = getOriginalPopulationDensity(landUse.Code);
      return (
        (landUse.OverridePopulationDensity !== null &&
          landUse.OverridePopulationDensity !== originalDensity) ||
        landUse.OverrideReason !== null
      );
    });
  }, [correctedLandUse, props.impactedLandUse]);

  // Check if all required fields are filled for overrides
  const isFormValid = useMemo(() => {
    if (!props.impactedLandUse) return false;

    return correctedLandUse.every((landUse) => {
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
  }, [correctedLandUse, props.impactedLandUse]);

  const handlePopulationDensityChange = (
    landUseCode: string,
    newDensity: number,
  ) => {
    const originalDensity = getOriginalPopulationDensity(landUseCode);

    setCorrectedLandUse((prev) =>
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
    setCorrectedLandUse((prev) =>
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

  const handleSave = () => {
    if (correctedLandUse.length > 0) {
      props.onSave(correctedLandUse);
    }
    props.onClose();
    dismiss();
  };

  const handleClose = () => {
    props.onClose();
    dismiss();
  };

  return (
    <Modal
      dismissible
      heading='Override Population Density'
      onAfterClose={props.onClose}
      title='Override Population Density'
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
        {/* Scrollable content area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: '8px',
            marginRight: '-8px',
          }}
        >
          {correctedLandUse.map((landUse) => {
            const hasOverride =
              landUse.OverridePopulationDensity !== null &&
              landUse.OverridePopulationDensity !==
                getOriginalPopulationDensity(landUse.Code);

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
                  border: '2px solid #1976d2',
                  backgroundColor: '#e3f2fd',
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
                {/* Top row: Land use info on left, corrected dropdown on right */}
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

                  <div style={{ minWidth: '200px' }}>
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
                      ).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </div>
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

export default PopulationDensityCorrectionModal;
