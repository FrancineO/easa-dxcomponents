/**
 * Generates a unique ID for flight paths
 * @returns A unique string ID in the format: flight-path-{timestamp}-{random}
 */
const generateId = (): string => {
  return `flight-path-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default generateId;
