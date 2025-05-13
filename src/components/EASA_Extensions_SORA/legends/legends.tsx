import FlightVolumeLegend from './flight-volume-legend';
import PopDensityLegend from './pop-density-legend';
import LandusePopDensityLegend from './landuse-pop-density-legend';
import GeozonesLegend from './geozones-legend';

interface LegendsProps {
  flightVolume: any;
  intersectingLanduseClasses: any[];
  intersectingGeozones: any[];
  geozonesRenderer: __esri.Renderer | null;
  style: React.CSSProperties;
}

const Legends = ({
  flightVolume,
  intersectingLanduseClasses,
  intersectingGeozones,
  geozonesRenderer,
  style
}: LegendsProps) => {
  return (
    <div style={style}>
      <FlightVolumeLegend flightVolume={flightVolume} />
      <PopDensityLegend />
      <LandusePopDensityLegend intersectingLanduseClasses={intersectingLanduseClasses} />
      <GeozonesLegend
        intersectingGeozones={intersectingGeozones}
        geozonesRenderer={geozonesRenderer as __esri.UniqueValueRenderer}
      />
    </div>
  );
};

export default Legends;
