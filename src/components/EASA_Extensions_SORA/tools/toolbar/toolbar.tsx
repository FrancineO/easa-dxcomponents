import { Icon } from '@pega/cosmos-react-core';
import { Button } from '@pega/cosmos-react-core';
import { CardContent } from '@pega/cosmos-react-core';
import { Card } from '@pega/cosmos-react-core';
import { useEffect, useState, useCallback } from 'react';
import { getView } from '../../map/view';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import { getFillSymbol, getFlightGeography, getSymbol } from './draw-utils';
import type SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import type SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import type SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { registerIcon } from '@pega/cosmos-react-core';
import * as Circle from '@pega/cosmos-react-core/lib/components/Icon/icons/circle.icon';
import * as SharePointUp from '@pega/cosmos-react-core/lib/components/Icon/icons/share-point-up.icon';
import * as Rectangle from '@pega/cosmos-react-core/lib/components/Icon/icons/rectangle.icon';
import * as Trash from '@pega/cosmos-react-core/lib/components/Icon/icons/trash.icon';
import * as Waypoint from '@pega/cosmos-react-core/lib/components/Icon/icons/waypoint.icon';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import VertexInfo from './vertex-info';

registerIcon(Circle, SharePointUp, Rectangle, Trash, Waypoint);

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
  flightPathJSON: string | null;
  onFlightPathChange: (path: __esri.Geometry | null) => void;
  onGeozoneInfoChange: (info: string | null) => void;
  enabled: boolean;
};

const bufferGraphicsLayerId = 'easa-sora-tool-buffer-graphics';

/**
 * DrawToolbar component
 * @param props - The props for the component
 * @returns The DrawToolbar component
 */
export const Toolbar = (props: Props) => {
  const {
    onFlightGeographyChange,
    cd,
    flightPathJSON,
    onFlightPathChange,
    onGeozoneInfoChange,
    enabled
  } = props;

  const [selectedTool, setSelectedTool] = useState<'circle' | 'polyline' | 'polygon' | 'geozone'>();
  const [handleCreate, setHandleCreate] = useState<any>();
  const [handleUpdate, setHandleUpdate] = useState<any>();
  const [graphic, setGraphic] = useState<Graphic | null>(null);
  const [hasGraphic, setHasGraphic] = useState(false);
  const [sketchViewModel, setSketchViewModel] = useState<SketchViewModel | null>(null);
  const [geozoneClickHandle, setGeozoneClickHandle] = useState<any>();

  const getBufferLayer = useCallback(() => {
    let l = getView().map?.findLayerById(bufferGraphicsLayerId) as GraphicsLayer;
    if (!l) {
      l = new GraphicsLayer({ id: bufferGraphicsLayerId });
      getView().map?.add(l);
    }
    return l;
  }, []);

  const onCreate = useCallback(
    (event: any) => {
      if (event.state === 'start') {
        setGraphic(null);
        sketchViewModel?.layer.removeAll();
        const l = getBufferLayer();
        l?.removeAll();
      }
      if (event.state === 'complete') {
        setGraphic(event.graphic);
        setHasGraphic(true);
        sketchViewModel?.update([event.graphic]);
      }
    },
    [getBufferLayer, sketchViewModel]
  );

  const onUpdate = useCallback(
    (event: __esri.SketchUpdateEvent) => {
      if (
        event.state === 'complete' ||
        (event.state === 'active' && event.toolEventInfo.type === 'vertex-remove')
      ) {
        if (event.aborted) return;

        // TODO: nasty hack to remove old graphics. maybe figure out a better approach
        const graphicsToRemove = sketchViewModel?.layer?.graphics?.filter(
          g => g !== event.graphics[0]
        );
        if (graphicsToRemove) {
          graphicsToRemove.forEach(g => sketchViewModel?.layer.remove(g));
        }

        const g = new Graphic({
          geometry: event.graphics[0].geometry,
          symbol: event.graphics[0].symbol
        });
        setGraphic(g);
        setHasGraphic(true);
        sketchViewModel?.update([event.graphics[0]]);
      }
      if (event.state === 'active' && event.toolEventInfo.type === 'reshape-stop') {
        sketchViewModel?.complete();
      }
      if (event.state === 'active' && event.toolEventInfo.type === 'move-stop') {
        sketchViewModel?.complete();
      }
      if (event.state === 'active' && event.toolEventInfo.type === 'scale-stop') {
        sketchViewModel?.complete();
      }
    },
    [sketchViewModel]
  );

  useEffect(() => {
    if (handleCreate || handleUpdate) {
      return;
    }
    if (!selectedTool) {
      sketchViewModel?.cancel();
      return;
    }

    reactiveUtils
      .whenOnce(() => getView().ready)
      .then(() => {
        // make sure the buffer layer is created
        getBufferLayer();

        const hc = sketchViewModel?.on('create', onCreate);
        setHandleCreate(hc);
        const hu = sketchViewModel?.on('update', onUpdate);
        setHandleUpdate(hu);
        if (sketchViewModel?.layer) {
          getView().map?.add(sketchViewModel.layer);
        }
      });
  }, [
    selectedTool,
    handleCreate,
    onCreate,
    handleUpdate,
    onUpdate,
    getBufferLayer,
    sketchViewModel
  ]);

  useEffect(() => {
    if (flightPathJSON) {
      reactiveUtils
        .whenOnce(() => getView().ready)
        .then(() => {
          const fg = getFlightGeography(flightPathJSON);
          if (!fg) return;

          setSelectedTool(fg.geometry.type as 'circle' | 'polyline' | 'polygon');

          // onCreate({
          //   state: 'complete',
          //   graphic: fg,
          //   aborted: false,
          //   tool: 'reshape',
          //   toolEventInfo: { type: 'reshape-stop' }
          // });
          setGraphic(fg);
          setHasGraphic(true);
        });
    }
  }, [flightPathJSON, onUpdate, onCreate]);

  useEffect(() => {
    if (!graphic) {
      sketchViewModel?.layer.removeAll();
      const l = getView().map?.findLayerById(bufferGraphicsLayerId) as GraphicsLayer;
      l?.removeAll();
      onFlightGeographyChange(null);
      onFlightPathChange(null);
      return;
    }

    // ensure the graphic is added to the sketchViewModel layer
    if (!sketchViewModel?.layer.graphics.find(g => g === graphic)) {
      sketchViewModel?.layer.add(graphic);
    }

    if (graphic?.geometry.type === 'polyline') {
      const l = getBufferLayer();
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
    onFlightPathChange(graphic.geometry);
    // moved this to the onCreate function so it does not appear when loading a stored flight path
    // sketchViewModel?.update([graphic]);
  }, [
    graphic,
    selectedTool,
    onFlightGeographyChange,
    cd,
    onFlightPathChange,
    getBufferLayer,
    sketchViewModel
  ]);

  useEffect(() => {
    return () => {
      geozoneClickHandle?.remove();
    };
  }, [geozoneClickHandle]);

  const handleClear = () => {
    sketchViewModel?.layer.removeAll();
    const l = getView().map?.findLayerById(bufferGraphicsLayerId) as GraphicsLayer;
    l?.removeAll();
    setGraphic(null);
    setHasGraphic(false);
    sketchViewModel?.cancel();
    onFlightGeographyChange(null);
    onFlightPathChange(null);
  };

  const handleMapClick = (event: any) => {
    getView()
      .hitTest(event)
      .then(result => {
        getView().graphics.removeAll();
        if (result.results.length > 0 && result.results[0].type === 'graphic') {
          const hitGraphic = result.results[0].graphic as Graphic;
          const attributes = hitGraphic.attributes;
          const g = new Graphic({
            geometry: hitGraphic.geometry,
            symbol: getSymbol('polygon') as SimpleFillSymbol
          });
          getView().graphics.add(g);
          onGeozoneInfoChange(attributes.PopupInfo);
        } else {
          onGeozoneInfoChange(null);
        }
      });
  };

  const handleToolClick = (tool: 'circle' | 'polyline' | 'polygon' | 'geozone') => {
    handleClear();
    if (tool === selectedTool) {
      if (tool === 'geozone') {
        geozoneClickHandle?.remove();
        getView().graphics.removeAll();
        onGeozoneInfoChange(null);
      }
      setSelectedTool(undefined);
    } else {
      setSelectedTool(tool);
      if (tool === 'geozone') {
        geozoneClickHandle?.remove();
        setGeozoneClickHandle(getView().on('click', handleMapClick));
        return;
      }
      getView().graphics.removeAll();
      onGeozoneInfoChange(null);
      sketchViewModel?.create(
        tool as 'circle' | 'point' | 'multipoint' | 'polyline' | 'polygon' | 'mesh' | 'rectangle'
      );
    }
  };

  useEffect(() => {
    if (sketchViewModel) return;

    const skvm = new SketchViewModel({
      view: getView(),
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
          shapeOperation: 'move'
        },
        highlightOptions: {
          enabled: false
        },
        enableRotation: false,
        enableScaling: true
      }
    });

    setSketchViewModel(skvm);
  }, [sketchViewModel]);

  // green/yellow/red -> maximum pop dens in polygons -> send back to pega
  // blue -> adjacent area - average pop dens -> send back to pega
  // also need to know if the polygons are within restricted/dangerous (geozone) zones
  //   - i just have to tell them that they are within a geozone
  // if a crowded area, then pop density set to 50000

  return (
    <Card style={{ ...props.style, backgroundColor: 'white', padding: '6px' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
        <Button
          variant={selectedTool === 'circle' ? 'link' : 'text'}
          label='Draw path with circle'
          onClick={() => handleToolClick('circle')}
          compact
          disabled={!enabled}
        >
          <Icon name='circle' role='img' aria-label='circle icon' className='icon' />
        </Button>
        <Button
          variant={selectedTool === 'polyline' ? 'link' : 'text'}
          label='Draw path with line'
          onClick={() => handleToolClick('polyline')}
          compact
          disabled={!enabled}
        >
          <Icon
            name='share-point-up'
            role='img'
            aria-label='share point up icon'
            className='icon'
          />
        </Button>
        <Button
          variant={selectedTool === 'polygon' ? 'link' : 'text'}
          label='Draw path with polygon'
          onClick={() => handleToolClick('polygon')}
          compact
          disabled={!enabled}
        >
          <Icon name='rectangle' role='img' aria-label='rectangle icon' className='icon' />
        </Button>
        <Button
          variant={selectedTool === 'geozone' ? 'link' : 'text'}
          label='Get geozone info'
          onClick={() => {
            handleToolClick('geozone');
          }}
          compact
          disabled={!enabled}
        >
          <Icon name='waypoint' role='img' aria-label='waypoint icon' className='icon' />
        </Button>

        {hasGraphic && (
          <Button
            variant='link'
            label='Clear'
            onClick={() => {
              handleClear();
              if (selectedTool) {
                sketchViewModel?.create(selectedTool as 'circle' | 'polyline' | 'polygon');
              }
            }}
            compact
            disabled={!enabled}
          >
            <Icon name='trash' role='img' aria-label='trash icon' className='icon' />
          </Button>
        )}
        <VertexInfo />
      </CardContent>
    </Card>
  );
};

export default Toolbar;
