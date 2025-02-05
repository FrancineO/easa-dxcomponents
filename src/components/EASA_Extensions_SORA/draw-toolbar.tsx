import { Icon } from '@pega/cosmos-react-core';
import { Button } from '@pega/cosmos-react-core';
import { CardContent } from '@pega/cosmos-react-core';
import { Card } from '@pega/cosmos-react-core';
import { useEffect, useState, useCallback } from 'react';
import View from './View';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import { getFillSymbol, getSymbol } from './utils';
import type SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import type SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import type SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { registerIcon } from '@pega/cosmos-react-core';
import * as Circle from '@pega/cosmos-react-core/lib/components/Icon/icons/circle.icon';
import * as SharePointUp from '@pega/cosmos-react-core/lib/components/Icon/icons/share-point-up.icon';
import * as Rectangle from '@pega/cosmos-react-core/lib/components/Icon/icons/rectangle.icon';
import * as Trash from '@pega/cosmos-react-core/lib/components/Icon/icons/trash.icon';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import VertexInfo from './vertex-info';

registerIcon(Circle, SharePointUp, Rectangle, Trash);

/**
 * Props for the DrawToolbar component
 * @type {Props}
 * @property {React.CSSProperties} style - The style of the toolbar
 * @property {number} cd - The diameter of the drone in meters
 * @property {(graphic: Graphic | null) => void} onFlightGeographyChange - The function to call when the flight geography changes
 */
type Props = {
  style?: React.CSSProperties;
  cd: number;
  onFlightGeographyChange: (graphic: Graphic | null) => void;
};

const bufferGraphicsLayerId = 'easa-sora-tool-buffer-graphics';

const sketchViewModel = new SketchViewModel({
  view: View,
  layer: new GraphicsLayer(),
  updateOnGraphicClick: true,
  polylineSymbol: getSymbol('polyline') as SimpleLineSymbol,
  polygonSymbol: getSymbol('polygon') as SimpleFillSymbol,
  pointSymbol: getSymbol('point') as SimpleMarkerSymbol,
  activeFillSymbol: getSymbol('polygon') as SimpleFillSymbol,

  defaultUpdateOptions: {
    tool: 'reshape',
    reshapeOptions: {
      vertexOperation: 'move',
      shapeOperation: 'none'
    },
    highlightOptions: {
      enabled: false
    },
    enableRotation: false,
    enableScaling: false
  }
});

/**
 * DrawToolbar component
 * @param props - The props for the component
 * @returns The DrawToolbar component
 */
export const DrawToolbar = (props: Props) => {
  const { onFlightGeographyChange, cd } = props;

  const [selectedTool, setSelectedTool] = useState<'circle' | 'polyline' | 'polygon'>();
  const [handleCreate, setHandleCreate] = useState<any>();
  const [handleUpdate, setHandleUpdate] = useState<any>();
  const [graphic, setGraphic] = useState<Graphic | null>(null);
  const [hasGraphic, setHasGraphic] = useState(false);

  const onCreate = useCallback((event: any) => {
    if (event.state === 'start') {
      setGraphic(null);
      sketchViewModel.layer.removeAll();
      const l = View.map?.findLayerById(bufferGraphicsLayerId) as GraphicsLayer;
      l?.removeAll();
    }
    if (event.state === 'complete') {
      setGraphic(event.graphic);
      setHasGraphic(true);
    }
  }, []);

  const onUpdate = useCallback((event: __esri.SketchUpdateEvent) => {
    if (
      event.state === 'complete' ||
      (event.state === 'active' && event.toolEventInfo.type === 'vertex-remove')
    ) {
      if (event.aborted) return;

      const g = new Graphic({
        geometry: event.graphics[0].geometry,
        symbol: event.graphics[0].symbol
      });
      setGraphic(g);
      setHasGraphic(true);
      sketchViewModel.update([event.graphics[0]]);
    }
    if (event.state === 'active' && event.toolEventInfo.type === 'reshape-stop') {
      sketchViewModel.complete();
    }
  }, []);

  useEffect(() => {
    if (handleCreate || handleUpdate) {
      return;
    }
    if (!selectedTool) {
      sketchViewModel?.cancel();
      return;
    }

    reactiveUtils
      .whenOnce(() => View.ready)
      .then(() => {
        const l = new GraphicsLayer({ id: bufferGraphicsLayerId });
        View.map?.add(l);

        const hc = sketchViewModel.on('create', onCreate);
        setHandleCreate(hc);
        const hu = sketchViewModel.on('update', onUpdate);
        setHandleUpdate(hu);

        View.map?.add(sketchViewModel.layer);
      });
  }, [selectedTool, handleCreate, onCreate, handleUpdate, onUpdate]);

  useEffect(() => {
    if (!graphic) {
      sketchViewModel.layer.removeAll();
      const l = View.map?.findLayerById(bufferGraphicsLayerId) as GraphicsLayer;
      l?.removeAll();
      onFlightGeographyChange(null);
      return;
    }

    if (graphic?.geometry.type === 'polyline') {
      const l = View.map?.findLayerById(bufferGraphicsLayerId) as GraphicsLayer;
      l?.removeAll();

      const buffer = geometryEngine.buffer(
        graphic.geometry as __esri.Polyline,
        cd * 3 // minimum is 3 times the drone width as per annex
      ) as __esri.Polygon;
      const g = new Graphic({
        geometry: buffer,
        symbol: getFillSymbol(false)
      });
      l?.add(g);
      onFlightGeographyChange(g);
    } else {
      onFlightGeographyChange(graphic);
    }
    sketchViewModel.update([graphic]);
  }, [graphic, selectedTool, onFlightGeographyChange, cd]);

  const handleClear = () => {
    sketchViewModel.layer.removeAll();
    const l = View.map?.findLayerById(bufferGraphicsLayerId) as GraphicsLayer;
    l?.removeAll();
    setGraphic(null);
    setHasGraphic(false);
    sketchViewModel.cancel();
  };

  const handleToolClick = (tool: 'circle' | 'polyline' | 'polygon') => {
    handleClear();
    if (tool === selectedTool) {
      setSelectedTool(undefined);
    } else {
      setSelectedTool(tool);
      sketchViewModel.create(
        tool as 'circle' | 'point' | 'multipoint' | 'polyline' | 'polygon' | 'mesh' | 'rectangle'
      );
    }
  };

  // green/yellow/red -> maximum pop dens in polygons -> send back to pega
  // blue -> adjacent area - average pop dens -> send back to pega
  // also need to know if the polygons are within restricted/dangerous (geozone) zones
  //   - i just have to tell them that they are within a geozone
  // if a crowded area, then pop density set to 50000

  return (
    <Card style={{ ...props.style, backgroundColor: 'white', padding: '6px' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
        <Button
          variant={selectedTool === 'circle' ? 'primary' : 'secondary'}
          label='Draw path with circle'
          onClick={() => handleToolClick('circle')}
        >
          <Icon name='circle' role='img' aria-label='circle icon' className='icon' />
        </Button>
        <Button
          variant={selectedTool === 'polyline' ? 'primary' : 'secondary'}
          label='Draw path with line'
          onClick={() => handleToolClick('polyline')}
        >
          <Icon
            name='share-point-up'
            role='img'
            aria-label='share point up icon'
            className='icon'
          />
        </Button>
        <Button
          variant={selectedTool === 'polygon' ? 'primary' : 'secondary'}
          label='Draw path with polygon'
          onClick={() => handleToolClick('polygon')}
        >
          <Icon name='rectangle' role='img' aria-label='rectangle icon' className='icon' />
        </Button>
        {hasGraphic && (
          <Button
            variant='secondary'
            label='Clear'
            onClick={() => {
              handleClear();
              if (selectedTool) {
                sketchViewModel.create(selectedTool as 'circle' | 'polyline' | 'polygon');
              }
            }}
          >
            <Icon name='trash' role='img' aria-label='trash icon' className='icon' />
          </Button>
        )}
        <VertexInfo />
      </CardContent>
    </Card>
  );
};

export default DrawToolbar;
