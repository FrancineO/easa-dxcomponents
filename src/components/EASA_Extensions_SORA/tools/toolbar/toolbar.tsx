import { Icon, useModalManager } from '@pega/cosmos-react-core';
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

import UploadModal from '../../components/upload-modal';

registerIcon(Circle, SharePointUp, Rectangle, Trash, Waypoint);

type Tool = 'circle' | 'polyline' | 'polygon' | 'geozone';

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
  onFlightGeographyChange: (
    graphic: Graphic | null,
    autoZoomToFlightPath?: boolean,
  ) => void;
  flightPathJSON: string | null;
  // onFlightPathChange: (path: __esri.Geometry | null) => void;
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
    // onFlightPathChange,
    onGeozoneInfoChange,
    enabled,
  } = props;

  const [selectedTool, setSelectedTool] = useState<Tool>();
  const [handleCreate, setHandleCreate] = useState<any>();
  const [handleUpdate, setHandleUpdate] = useState<any>();
  const [graphic, setGraphic] = useState<Graphic | null>(null);
  const [hasGraphic, setHasGraphic] = useState(false);
  const [sketchViewModel, setSketchViewModel] =
    useState<SketchViewModel | null>(null);
  const [geozoneClickHandle, setGeozoneClickHandle] = useState<any>();
  const [uploadFileModalVisible, setUploadFileModalVisible] = useState(false);
  const [autoZoomToFlightPath, setAutoZoomToFlightPath] = useState(false);

  const getBufferLayer = useCallback(() => {
    let l = getView().map?.findLayerById(
      bufferGraphicsLayerId,
    ) as GraphicsLayer;
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
    [getBufferLayer, sketchViewModel],
  );

  const onUpdate = useCallback(
    (event: __esri.SketchUpdateEvent) => {
      if (
        event.state === 'complete' ||
        (event.state === 'active' &&
          event.toolEventInfo.type === 'vertex-remove')
      ) {
        if (event.aborted) return;

        // TODO: nasty hack to remove old graphics. maybe figure out a better approach
        const graphicsToRemove = sketchViewModel?.layer?.graphics?.filter(
          (g) => g !== event.graphics[0],
        );
        if (graphicsToRemove) {
          graphicsToRemove.forEach((g) => sketchViewModel?.layer.remove(g));
        }

        const g = new Graphic({
          geometry: event.graphics[0].geometry,
          symbol: event.graphics[0].symbol,
        });
        setGraphic(g);
        setHasGraphic(true);
        sketchViewModel?.update([event.graphics[0]]);
      }
      if (
        event.state === 'active' &&
        event.toolEventInfo.type === 'reshape-stop'
      ) {
        sketchViewModel?.complete();
      }
      if (
        event.state === 'active' &&
        event.toolEventInfo.type === 'move-stop'
      ) {
        sketchViewModel?.complete();
      }
      if (
        event.state === 'active' &&
        event.toolEventInfo.type === 'scale-stop'
      ) {
        sketchViewModel?.complete();
      }
    },
    [sketchViewModel],
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
    sketchViewModel,
  ]);

  useEffect(() => {
    if (flightPathJSON) {
      reactiveUtils
        .whenOnce(() => getView().ready)
        .then(() => {
          const fg = getFlightGeography(flightPathJSON);
          if (!fg) return;

          setSelectedTool(fg.geometry.type as Tool);

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
      const l = getView().map?.findLayerById(
        bufferGraphicsLayerId,
      ) as GraphicsLayer;
      l?.removeAll();
      onFlightGeographyChange(null);
      // onFlightPathChange(null);
      return;
    }

    // ensure the graphic is added to the sketchViewModel layer
    if (!sketchViewModel?.layer.graphics.find((g) => g === graphic)) {
      sketchViewModel?.layer.add(graphic);
    }

    if (
      graphic?.geometry.type === 'polyline' ||
      graphic?.geometry.type === 'polygon'
    ) {
      const l = getBufferLayer();
      l?.removeAll();

      const buffer = geometryEngine.buffer(
        graphic.geometry as __esri.Polyline,
        cd * 3, // minimum is 3 times the drone width as per annex
      ) as __esri.Polygon;
      const g = new Graphic({
        geometry: buffer,
        symbol: getFillSymbol(false),
      });
      l?.add(g);
      onFlightGeographyChange(g, autoZoomToFlightPath);
    } else {
      onFlightGeographyChange(graphic, autoZoomToFlightPath);
    }
    onFlightGeographyChange(graphic, autoZoomToFlightPath);

    // onFlightPathChange(graphic.geometry);
    // moved this to the onCreate function so it does not appear when loading a stored flight path
    // sketchViewModel?.update([graphic]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    graphic,
    selectedTool,
    cd,
    getBufferLayer,
    sketchViewModel,
    autoZoomToFlightPath,
  ]);

  useEffect(() => {
    return () => {
      geozoneClickHandle?.remove();
    };
  }, [geozoneClickHandle]);

  const handleClear = () => {
    sketchViewModel?.layer.removeAll();
    const l = getView().map?.findLayerById(
      bufferGraphicsLayerId,
    ) as GraphicsLayer;
    l?.removeAll();
    setGraphic(null);
    setHasGraphic(false);
    sketchViewModel?.cancel();
    onFlightGeographyChange(null);
    // onFlightPathChange(null);
  };

  const rowStyle =
    'display: flex; flex-direction: row; justify-content: space-between;';
  const labelStyle = 'padding-right: 8px;';
  const handleMapClick = (event: any) => {
    getView()
      .hitTest(event)
      .then((result) => {
        getView().graphics.removeAll();
        if (result.results.length > 0 && result.results[0].type === 'graphic') {
          const hitGraphic = result.results[0].graphic as Graphic;
          const attributes = hitGraphic.attributes;
          const g = new Graphic({
            geometry: hitGraphic.geometry,
            symbol: getSymbol('polygon') as SimpleFillSymbol,
          });
          getView().graphics.add(g);
          onGeozoneInfoChange(
            `<div style="font-size: 12px; line-height: 1.5; display: flex; flex-direction: column; gap: 4px; flex-grow: 1;">
              ${attributes.Name ? `<div style="${rowStyle}"><div style="${labelStyle}">Name:</div><div>${attributes.Name ?? '-'}</div></div>` : ''}
              ${attributes.Type ? `<div style="${rowStyle}"><div style="${labelStyle}">Type:</div><div>${attributes.Type}</div></div>` : ''}
              ${attributes.NOTAMS_url ? `<div style="${rowStyle}"><div style="${labelStyle}">NOTAMS:</div><div><a href="${attributes.NOTAMS_url}" target="_blank">Link</a></div></div>` : ''}
              ${attributes.Unit ? `<div style="${rowStyle}"><div style="${labelStyle}">Unit:</div><div>${attributes.Unit}</div></div>` : ''}
              ${attributes.Requirements ? `<div style="${rowStyle}"><div style="${labelStyle}">Requirements:</div><div>${attributes.Requirements}</div></div>` : ''}
              ${attributes.Category ? `<div style="${rowStyle}"><div style="${labelStyle}">Category:</div><div>${attributes.Category}</div></div>` : ''}
              ${attributes.Area_Type ? `<div style="${rowStyle}"><div style="${labelStyle}">Area Type:</div><div>${attributes.Area_Type}</div></div>` : ''}
              ${attributes.Bufferzone ? `<div style="${rowStyle}"><div style="${labelStyle}">Bufferzone:</div><div>${attributes.Bufferzone}</div></div>` : ''}
              ${attributes.Restricted ? `<div style="${rowStyle}"><div style="${labelStyle}">Restricted:</div><div>${attributes.Restricted}</div></div>` : ''}
            </div>`,
          );
        } else {
          onGeozoneInfoChange(null);
        }
      });
  };

  const handleToolClick = (tool: Tool) => {
    setAutoZoomToFlightPath(false);
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
        tool as
          | 'circle'
          | 'point'
          | 'multipoint'
          | 'polyline'
          | 'polygon'
          | 'mesh'
          | 'rectangle',
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
          shapeOperation: 'move',
        },
        highlightOptions: {
          enabled: false,
        },
        enableRotation: false,
        enableScaling: true,
      },
    });

    setSketchViewModel(skvm);
  }, [sketchViewModel]);

  const fileUploadModal = useCallback(() => {
    return (
      <UploadModal
        onUpload={(g: __esri.Graphic) => {
          setSelectedTool(getToolFromGeometry(g.geometry));
          setGraphic(g);
          setAutoZoomToFlightPath(true);
          setHasGraphic(true);
          sketchViewModel?.update(g);
        }}
        onClose={() => setUploadFileModalVisible(false)}
      />
    );
  }, [
    setGraphic,
    setAutoZoomToFlightPath,
    setUploadFileModalVisible,
    setHasGraphic,
    sketchViewModel,
  ]);

  const { create } = useModalManager();

  useEffect(() => {
    if (uploadFileModalVisible) {
      create(fileUploadModal);
    }
  }, [uploadFileModalVisible, create, fileUploadModal]);

  const getToolFromGeometry = (geometry: __esri.Geometry): Tool | null => {
    if (geometry.type === 'polyline') return 'polyline';
    if (geometry.type === 'polygon') return 'polygon';
    return null;
  };

  // green/yellow/red -> maximum pop dens in polygons -> send back to pega
  // blue -> adjacent area - average pop dens -> send back to pega
  // also need to know if the polygons are within restricted/dangerous (geozone) zones
  //   - i just have to tell them that they are within a geozone
  // if a crowded area, then pop density set to 50000

  return (
    <>
      <Card
        style={{ ...props.style, backgroundColor: 'white', padding: '6px' }}
      >
        <CardContent
          style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}
        >
          <Button
            variant='text'
            label='Upload KML or GeoJSON file'
            onClick={() => setUploadFileModalVisible(true)}
            compact
            disabled={!enabled}
          >
            <Icon
              name='upload'
              role='img'
              aria-label='upload icon'
              className='icon'
            />
          </Button>
          <Button
            variant={selectedTool === 'circle' ? 'link' : 'text'}
            label='Draw path with circle'
            onClick={() => handleToolClick('circle')}
            compact
            disabled={!enabled}
          >
            <Icon
              name='circle'
              role='img'
              aria-label='circle icon'
              className='icon'
            />
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
            <Icon
              name='rectangle'
              role='img'
              aria-label='rectangle icon'
              className='icon'
            />
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
            <Icon
              name='waypoint'
              role='img'
              aria-label='waypoint icon'
              className='icon'
            />
          </Button>

          {hasGraphic && (
            <Button
              variant='link'
              label='Clear'
              onClick={() => {
                handleClear();
                if (selectedTool) {
                  sketchViewModel?.create(selectedTool as any);
                }
              }}
              compact
              disabled={!enabled}
            >
              <Icon
                name='trash'
                role='img'
                aria-label='trash icon'
                className='icon'
              />
            </Button>
          )}
          <VertexInfo />
        </CardContent>
      </Card>
      {fileUploadModal}
    </>
  );
};

export default Toolbar;
