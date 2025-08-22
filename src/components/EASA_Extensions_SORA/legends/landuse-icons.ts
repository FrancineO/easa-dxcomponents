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

// Function to get appropriate icon for landuse type
const getLanduseIcon = (landuseLabel: string) => {
  const label = landuseLabel.toLowerCase();

  if (
    label.includes('green') ||
    label.includes('vegetation') ||
    label.includes('garden') ||
    label.includes('park')
  ) {
    return TbTrees({ size: 16 });
  }
  if (
    label.includes('urban fabric') ||
    label.includes('urban') ||
    label.includes('city')
  ) {
    return TbBuildings({ size: 16 });
  }
  if (
    label.includes('residential') ||
    label.includes('house') ||
    label.includes('dwelling')
  ) {
    return TbHome({ size: 16 });
  }
  if (
    label.includes('commercial') ||
    label.includes('office') ||
    label.includes('business')
  ) {
    return TbBuilding({ size: 16 });
  }
  if (
    label.includes('industrial') ||
    label.includes('factory') ||
    label.includes('manufacturing')
  ) {
    return TbBuildingFactory({ size: 16 });
  }
  if (
    label.includes('sport') ||
    label.includes('stadium') ||
    label.includes('athletic') ||
    label.includes('fitness')
  ) {
    return TbBallBasketball({ size: 16 });
  }
  if (
    label.includes('forest') ||
    label.includes('woodland') ||
    label.includes('tree')
  ) {
    return TbTree({ size: 16 });
  }
  if (
    label.includes('agricultural') ||
    label.includes('farm') ||
    label.includes('crop')
  ) {
    return TbWheat({ size: 16 });
  }
  if (
    label.includes('water') ||
    label.includes('river') ||
    label.includes('lake') ||
    label.includes('sea')
  ) {
    return TbDroplet({ size: 16 });
  }
  if (
    label.includes('road') ||
    label.includes('highway') ||
    label.includes('street')
  ) {
    return TbRoad({ size: 16 });
  }
  if (label.includes('parking') || label.includes('car park')) {
    return TbParking({ size: 16 });
  }
  if (label.includes('school') || label.includes('education')) {
    return TbSchool({ size: 16 });
  }
  if (label.includes('hospital') || label.includes('medical')) {
    return TbBuildingHospital({ size: 16 });
  }
  if (
    label.includes('retail') ||
    label.includes('shop') ||
    label.includes('mall')
  ) {
    return TbShoppingCart({ size: 16 });
  }
  if (label.includes('warehouse') || label.includes('storage')) {
    return TbBuildingWarehouse({ size: 16 });
  }
  if (
    label.includes('airport') ||
    label.includes('aerodrome') ||
    label.includes('airfield')
  ) {
    return TbPlane({ size: 16 });
  }
  if (
    label.includes('port') ||
    label.includes('harbor') ||
    label.includes('marina')
  ) {
    return TbShip({ size: 16 });
  }
  if (label.includes('station') || label.includes('terminal')) {
    return TbTrain({ size: 16 });
  }
  if (label.includes('transport')) {
    return TbTruck({ size: 16 });
  }
  if (label.includes('mountain') || label.includes('hill')) {
    return TbMountain({ size: 16 });
  }
  if (label.includes('beach') || label.includes('coast')) {
    return TbBeach({ size: 16 });
  }
  if (
    label.includes('recreation') ||
    label.includes('park') ||
    label.includes('golf')
  ) {
    return TbFlag({ size: 16 });
  }
  if (label.includes('construction') || label.includes('building')) {
    return TbShovel({ size: 16 });
  }
  if (label.includes('mining') || label.includes('quarry')) {
    return TbTruck({ size: 16 });
  }
  if (label.includes('infrastructure') || label.includes('utility')) {
    return TbTank({ size: 16 });
  }
  if (label.includes('energy') || label.includes('power')) {
    return TbBolt({ size: 16 });
  }

  // Default icon for unknown landuse types
  return TbHome({ size: 16 });
};

export default getLanduseIcon;
