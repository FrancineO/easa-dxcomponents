import {
  TbHome,
  TbBuilding,
  TbBuildingFactory,
  TbTree,
  TbTrees,
  TbWheat,
  TbDroplet,
  TbRoad,
  TbParking,
  TbSchool,
  TbBuildingHospital,
  TbShoppingCart,
  TbBuildingWarehouse,
  TbMountain,
  TbBeach,
  TbFlag,
  TbShovel,
  TbTruck,
  TbTank,
  TbBolt,
  TbBallBasketball,
  TbPlane,
  TbShip,
  TbTrain,
  TbBuildings,
} from 'react-icons/tb';

// Helper function to check if label contains a full word
const containsWord = (label: string, word: string): boolean => {
  const regex = new RegExp(`\\b${word}\\b`, 'i');
  return regex.test(label);
};

// Function to get appropriate icon for landuse type
const getLanduseIcon = (landuseLabel: string) => {
  const label = landuseLabel.toLowerCase();

  if (
    containsWord(label, 'green') ||
    containsWord(label, 'vegetation') ||
    containsWord(label, 'garden') ||
    containsWord(label, 'park')
  ) {
    return TbTrees({ size: 16 });
  }
  if (
    containsWord(label, 'urban fabric') ||
    containsWord(label, 'urban') ||
    containsWord(label, 'city')
  ) {
    return TbBuildings({ size: 16 });
  }
  if (
    containsWord(label, 'residential') ||
    containsWord(label, 'house') ||
    containsWord(label, 'dwelling')
  ) {
    return TbHome({ size: 16 });
  }
  if (
    containsWord(label, 'commercial') ||
    containsWord(label, 'office') ||
    containsWord(label, 'business')
  ) {
    return TbBuilding({ size: 16 });
  }
  if (
    containsWord(label, 'industrial') ||
    containsWord(label, 'factory') ||
    containsWord(label, 'manufacturing')
  ) {
    return TbBuildingFactory({ size: 16 });
  }
  if (
    containsWord(label, 'sport') ||
    containsWord(label, 'stadium') ||
    containsWord(label, 'athletic') ||
    containsWord(label, 'fitness')
  ) {
    return TbBallBasketball({ size: 16 });
  }
  if (
    containsWord(label, 'forest') ||
    containsWord(label, 'woodland') ||
    containsWord(label, 'tree')
  ) {
    return TbTree({ size: 16 });
  }
  if (
    containsWord(label, 'agricultural') ||
    containsWord(label, 'farm') ||
    containsWord(label, 'crop')
  ) {
    return TbWheat({ size: 16 });
  }
  if (
    containsWord(label, 'water') ||
    containsWord(label, 'river') ||
    containsWord(label, 'lake') ||
    containsWord(label, 'sea')
  ) {
    return TbDroplet({ size: 16 });
  }
  if (
    containsWord(label, 'road') ||
    containsWord(label, 'highway') ||
    containsWord(label, 'street')
  ) {
    return TbRoad({ size: 16 });
  }
  if (containsWord(label, 'parking') || containsWord(label, 'car park')) {
    return TbParking({ size: 16 });
  }
  if (containsWord(label, 'school') || containsWord(label, 'education')) {
    return TbSchool({ size: 16 });
  }
  if (containsWord(label, 'hospital') || containsWord(label, 'medical')) {
    return TbBuildingHospital({ size: 16 });
  }
  if (
    containsWord(label, 'retail') ||
    containsWord(label, 'shop') ||
    containsWord(label, 'mall')
  ) {
    return TbShoppingCart({ size: 16 });
  }
  if (containsWord(label, 'warehouse') || containsWord(label, 'storage')) {
    return TbBuildingWarehouse({ size: 16 });
  }
  if (
    containsWord(label, 'airport') ||
    containsWord(label, 'aerodrome') ||
    containsWord(label, 'airfield')
  ) {
    return TbPlane({ size: 16 });
  }
  if (
    containsWord(label, 'port') ||
    containsWord(label, 'harbor') ||
    containsWord(label, 'marina')
  ) {
    return TbShip({ size: 16 });
  }
  if (containsWord(label, 'station') || containsWord(label, 'terminal')) {
    return TbTrain({ size: 16 });
  }
  if (containsWord(label, 'transport')) {
    return TbTruck({ size: 16 });
  }
  if (containsWord(label, 'mountain') || containsWord(label, 'hill')) {
    return TbMountain({ size: 16 });
  }
  if (containsWord(label, 'beach') || containsWord(label, 'coast')) {
    return TbBeach({ size: 16 });
  }
  if (
    containsWord(label, 'recreation') ||
    containsWord(label, 'park') ||
    containsWord(label, 'golf')
  ) {
    return TbFlag({ size: 16 });
  }
  if (containsWord(label, 'construction') || containsWord(label, 'building')) {
    return TbShovel({ size: 16 });
  }
  if (containsWord(label, 'mining') || containsWord(label, 'quarry')) {
    return TbTruck({ size: 16 });
  }
  if (containsWord(label, 'infrastructure') || containsWord(label, 'utility')) {
    return TbTank({ size: 16 });
  }
  if (containsWord(label, 'energy') || containsWord(label, 'power')) {
    return TbBolt({ size: 16 });
  }

  // Default icon for unknown landuse types
  return TbHome({ size: 16 });
};

export default getLanduseIcon;
