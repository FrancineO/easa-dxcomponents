import FlightVolumeLegend from './flight-volume-legend';
import PopDensityLegend from './pop-density-legend';
import LandusePopDensityLegend from './landuse-pop-density-legend';
import GeozonesLegend from './geozones-legend';
import OtherOperatorFlightPathsLegend from './other-operator-flight-paths-legend';

interface LegendsProps {
  flightVolumes: any[];
  intersectingLanduseClasses: any[];
  intersectingGeozones: any[];
  geozonesRenderer: __esri.Renderer | null;
  hasOtherOperatorFlightPaths: boolean;
  style: React.CSSProperties;
}

const Legends = ({
  flightVolumes,
  intersectingLanduseClasses,
  intersectingGeozones,
  geozonesRenderer,
  hasOtherOperatorFlightPaths,
  style,
}: LegendsProps) => {
  return (
    <div style={style}>
      <FlightVolumeLegend flightVolumes={flightVolumes} />
      <PopDensityLegend />
      <LandusePopDensityLegend
        intersectingLanduseClasses={intersectingLanduseClasses}
      />
      <GeozonesLegend
        intersectingGeozones={intersectingGeozones}
        geozonesRenderer={geozonesRenderer as __esri.UniqueValueRenderer}
      />
      <OtherOperatorFlightPathsLegend
        hasOtherOperatorFlightPaths={hasOtherOperatorFlightPaths}
      />
    </div>
  );
};

export default Legends;
