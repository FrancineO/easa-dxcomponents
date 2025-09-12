export interface FieldConfig {
  name: string;
  label: string;
  isLink?: boolean;
}

// Default geozone fields for most layers
const defaultGeozoneFields: FieldConfig[] = [
  { name: 'name', label: 'Name' },
  { name: 'identifier', label: 'Identifier' },
  { name: 'country', label: 'Country' },
  { name: 'type', label: 'Type' },
  { name: 'variant', label: 'Variant' },
  { name: 'reason', label: 'Reason' },
];

// Specific field configurations for different geozone layers
const geozoneLayerFields: Record<string, FieldConfig[]> = {
  // Example: Different fields for specific portal item IDs
  '961089b2b5934678966938195a745029': [...defaultGeozoneFields],
  eebdb68dbdb44859925d868399cecdf3: [
    ...defaultGeozoneFields,
    { name: 'otherReasonInfo', label: 'Other Reason Info' },
    { name: 'message', label: 'Message' },
  ],
  '2375bb13147443fe9e42c629ff87d821': [
    ...defaultGeozoneFields,
    { name: 'limitedApplicability', label: 'Limited Applicability' },
    { name: 'Message', label: 'Message' },
  ],
  ecf23963356e4c1d8e821c129fa341e5: [
    ...defaultGeozoneFields,
    { name: 'limitedApplicability', label: 'Limited Applicability' },
    { name: 'Message', label: 'Message' },
  ],
  '659c2403b764481b93470e644936fc8c': [
    ...defaultGeozoneFields,
    { name: 'siteUrl', label: 'Site Url', isLink: true },
  ],
};

/**
 * Returns the appropriate field configuration for a given geozone layer portal item ID
 * @param portalItemId - The portal item ID of the geozone layer
 * @returns Array of field configurations for the specific layer, or default fields if not found
 */
export const getGeozoneFields = (portalItemId: string): FieldConfig[] => {
  return geozoneLayerFields[portalItemId] || defaultGeozoneFields;
};

// Export the default fields for backward compatibility
export const geozoneFields = defaultGeozoneFields;
