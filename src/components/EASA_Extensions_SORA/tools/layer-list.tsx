import { useEffect, useState } from 'react';
import { Card, CardContent, Switch, Text } from '@pega/cosmos-react-core';
import { getView } from '../map/view';
import { LayerGroupType, type MapState, layerGroups } from '../types';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

type Props = {
  style?: React.CSSProperties;
  mapState: MapState | null;
};

const LayerList = (props: Props) => {
  const { style, mapState } = props;

  const hasPopDensity =
    mapState?.layerVisibility && 'PopulationDensity' in mapState.layerVisibility;
  const hasGeozones = mapState?.layerVisibility && 'Geozones' in mapState.layerVisibility;

  const popDensityVisible = hasPopDensity
    ? (mapState?.layerVisibility?.PopulationDensity ?? true)
    : true;
  const geozonesVisible = hasGeozones ? (mapState?.layerVisibility?.Geozones ?? true) : true;

  const [visibilityState, setVisibilityState] = useState({
    [LayerGroupType.populationDensity]: popDensityVisible,
    [LayerGroupType.geozones]: geozonesVisible
  });

  // Initialize layer visibility
  useEffect(() => {
    let mounted = true;

    reactiveUtils
      .whenOnce(() => getView().ready && getView().map)
      .then(() => {
        if (!mounted) return;

        layerGroups.forEach(layerGroup => {
          layerGroup.ids.forEach(id => {
            const layer = getView().map?.findLayerById(id);
            if (layer) {
              layer.visible = visibilityState[layerGroup.type];
            }
          });
        });
      });

    return () => {
      mounted = false;
    };
  }, [visibilityState]);

  const toggleLayer = (layerGroupType: LayerGroupType) => {
    const layerGroup = layerGroups.find(lg => lg.type === layerGroupType);
    if (!layerGroup) return;

    const newVisibility = !visibilityState[layerGroupType];
    setVisibilityState(prev => ({ ...prev, [layerGroupType]: newVisibility }));

    layerGroup.ids.forEach(id => {
      const layer = getView().map?.findLayerById(id);
      if (layer) {
        layer.visible = newVisibility;
      }
    });
  };

  return (
    <Card style={style}>
      <CardContent style={{ margin: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
          {layerGroups.map(lg => (
            <div key={lg.type}>
              <Switch
                id={lg.type}
                size='sm'
                disabled={false}
                on={visibilityState[lg.type]}
                onChange={() => toggleLayer(lg.type)}
                label={<Text>{lg.label}</Text>}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LayerList;
