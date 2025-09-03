import {
  Icon,
  Input,
  useModalManager,
  useTheme,
} from '@pega/cosmos-react-core';
import { Button } from '@pega/cosmos-react-core';
import { CardContent } from '@pega/cosmos-react-core';
import { Card } from '@pega/cosmos-react-core';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

import { getView } from '../../map/view';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import { getFillSymbol, getFlightGeography, getSymbol } from './draw-utils';
import type SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import type SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import type SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { registerIcon } from '@pega/cosmos-react-core';
import * as CircleIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/circle.icon';
import * as SharePointUp from '@pega/cosmos-react-core/lib/components/Icon/icons/share-point-up.icon';
import * as Rectangle from '@pega/cosmos-react-core/lib/components/Icon/icons/rectangle.icon';
import * as Trash from '@pega/cosmos-react-core/lib/components/Icon/icons/trash.icon';
import * as Waypoint from '@pega/cosmos-react-core/lib/components/Icon/icons/waypoint.icon';
import * as Upload from '@pega/cosmos-react-core/lib/components/Icon/icons/upload.icon';
import * as Download from '@pega/cosmos-react-core/lib/components/Icon/icons/download.icon';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import Circle from '@arcgis/core/geometry/Circle';
import VertexInfo from './vertex-info';

import UploadModal from '../../components/upload-modal';
import DownloadModal from '../../components/download-modal';

import { merge } from '@storybook/manager-api';

registerIcon(
  CircleIcon,
  SharePointUp,
  Rectangle,
  Trash,
  Waypoint,
  Upload,
  Download,
);

export type Tool = 'circle' | 'polyline' | 'polygon' | 'geozone';

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
  isAddMode?: boolean; // New prop to indicate if we're adding to existing paths
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
    isAddMode = false, // Default to false for backward compatibility
  } = props;

  let PCore: any;
  const defaultTheme = useTheme();
  const theme = PCore
    ? merge(defaultTheme, PCore.getEnvironmentInfo().getTheme())
    : defaultTheme;

  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [handleCreate, setHandleCreate] = useState<any>();
  const [handleUpdate, setHandleUpdate] = useState<any>();
  const [graphic, setGraphic] = useState<Graphic | null>(null);
  const hasGraphic = useMemo(() => {
    return graphic !== null;
  }, [graphic]);

  const [geozoneClickHandle, setGeozoneClickHandle] = useState<any>();
  const [uploadFileModalVisible, setUploadFileModalVisible] = useState(false);
  const [downloadFileModalVisible, setDownloadFileModalVisible] =
    useState(false);
  const [autoZoomToFlightPath, setAutoZoomToFlightPath] = useState(false);
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);
  const [pendingRadius, setPendingRadius] = useState(500);
  const pendingRadiusRef = useRef(500);
  const radiusRef = useRef(500);
  const sketchViewModelRef = useRef<SketchViewModel | null>(null);
  const lastProcessedGraphicRef = useRef<__esri.Graphic | null>(null);
  const previousIsAddModeRef = useRef<boolean>(false);
  const selectedToolRef = useRef<Tool | null>(null);

  // Keep the ref in sync with the state
  useEffect(() => {
    selectedToolRef.current = selectedTool;
  }, [selectedTool]);

  const getPreservationLayer = useCallback(() => {
    let l = getView().map?.findLayerById(
      'easa-sora-preserved-graphics',
    ) as GraphicsLayer;
    if (!l) {
      l = new GraphicsLayer({ id: 'easa-sora-preserved-graphics' });
      getView().map?.add(l);
    }
    return l;
  }, []);

  const enterCreateMode = useCallback(() => {
    const currentSelectedTool = selectedToolRef.current;
    if (sketchViewModelRef.current && currentSelectedTool) {
      // Start create mode with the currently selected tool
      sketchViewModelRef.current.create(
        currentSelectedTool as
          | 'circle'
          | 'point'
          | 'multipoint'
          | 'polyline'
          | 'polygon'
          | 'mesh'
          | 'rectangle',
      );
    }
  }, []);

  useEffect(() => {
    pendingRadiusRef.current = pendingRadius;
  }, [pendingRadius]);

  // Initialize pending radius when circle tool is selected
  useEffect(() => {
    if (selectedTool === 'circle') {
      setPendingRadius(radiusRef.current);
    }
  }, [selectedTool]);

  // Function to update circle radius
  const updateCircleRadius = useCallback(
    (newRadius: number) => {
      if (selectedTool !== 'circle' || !graphic) {
        return;
      }

      const newCircle = new Circle({
        center: graphic.geometry.extent.center,
        radius: newRadius,
        radiusUnit: 'meters',
      });

      const updatedGraphic = new Graphic({
        geometry: newCircle,
        symbol: graphic.symbol,
        attributes: graphic.attributes,
      });

      setGraphic(updatedGraphic);

      // Update the graphic in the sketch view model
      if (sketchViewModelRef.current?.layer) {
        // Check if we're currently updating a graphic
        const isUpdating = sketchViewModelRef.current.updateGraphics.length > 0;

        // Remove all graphics and add the updated one
        sketchViewModelRef.current.layer.removeAll();
        sketchViewModelRef.current.layer.add(updatedGraphic);

        // Restore edit mode if we were editing
        if (isUpdating) {
          sketchViewModelRef.current.update([updatedGraphic]);
        }
      }
    },
    [selectedTool, graphic, sketchViewModelRef],
  );

  // Function to apply radius changes
  const applyRadiusChange = useCallback(() => {
    if (pendingRadius !== radiusRef.current) {
      radiusRef.current = pendingRadius;
      setIsLiveUpdating(false);
      // Update the current circle on the map with the new radius
      updateCircleRadius(pendingRadius);
    }
  }, [pendingRadius, updateCircleRadius]);

  // Watch for changes in isAddMode and notify parent when entering create mode
  useEffect(() => {
    // Lock existing graphics by moving them to a separate layer
    // and prepare SketchViewModel for new drawing
    if (isAddMode && sketchViewModelRef.current) {
      // Cancel any current editing
      sketchViewModelRef.current.cancel();

      // Move existing graphics to a separate layer to preserve them
      const existingGraphics =
        sketchViewModelRef.current.layer.graphics.toArray();
      if (existingGraphics.length > 0) {
        // Create a preservation layer if it doesn't exist
        const preservationLayer = getPreservationLayer();

        // Move existing graphics to preservation layer
        existingGraphics.forEach((existingGraphic) => {
          sketchViewModelRef.current?.layer.remove(existingGraphic);
          preservationLayer.add(existingGraphic);
        });
      }

      getView()
        .when(() => getView().ready && sketchViewModelRef.current)
        .then(() => {
          enterCreateMode();
        });
    }

    // Update the previous isAddMode ref
    previousIsAddModeRef.current = isAddMode;
  }, [isAddMode, selectedTool, getPreservationLayer, enterCreateMode]);

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
        // Clear the last processed graphic ref when starting a new drawing
        lastProcessedGraphicRef.current = null;
        // Only clear graphics if not in add mode
        if (!isAddMode) {
          sketchViewModelRef.current?.layer.removeAll();
          const l = getBufferLayer();
          l?.removeAll();
        }
      }
      if (
        event.state === 'active' &&
        (event.tool === 'circle' || event.tool === 'polygon') &&
        event.graphic?.geometry
      ) {
        // Update radius in real-time as user drags
        const geometry = event.graphic.geometry;
        if (geometry.type === 'polygon') {
          // For polygon circles, calculate radius from the bounding extent
          const extent = geometry.extent;
          const width = extent.width;
          const height = extent.height;
          if (width > 0 && height > 0) {
            // Calculate radius from extent (assuming it's roughly circular)
            const calculatedRadius = Math.min(width, height) / 2;
            setPendingRadius(Math.round(calculatedRadius));
            setIsLiveUpdating(true);
          }
        } else if (geometry.type === 'circle') {
          // Fallback for actual circle geometry
          const circle = geometry as __esri.Circle;
          const currentRadius = circle.radius;
          if (currentRadius && currentRadius > 0) {
            setPendingRadius(Math.round(currentRadius));
            setIsLiveUpdating(true);
          }
        }
      }
      if (event.state === 'complete') {
        setIsLiveUpdating(false);
        if (event.tool === 'circle') {
          // The circle tool creates a polygon, so we need to convert it to a proper circle
          // We'll use the current radius value for consistency
          const polygon = event.graphic.geometry as __esri.Polygon;
          const center = polygon.centroid;
          const finalRadius = pendingRadiusRef.current ?? radiusRef.current;
          radiusRef.current = finalRadius;

          event.graphic.geometry = new Circle({
            center,
            radius: finalRadius,
            radiusUnit: 'meters',
          });

          sketchViewModelRef.current?.complete();
          sketchViewModelRef.current?.create('circle');
        } else if (isAddMode) {
          // Only call onFlightGeographyChange if we have a valid graphic and haven't processed it already
          if (
            event.graphic &&
            event.graphic.geometry &&
            event.graphic !== lastProcessedGraphicRef.current
          ) {
            lastProcessedGraphicRef.current = event.graphic;
            onFlightGeographyChange(event.graphic, autoZoomToFlightPath);
          }
          // Clear the graphic state since we're in add mode
          setGraphic(null);
        } else {
          // Normal mode - update the SketchViewModel and set the graphic
          sketchViewModelRef.current?.update([event.graphic]);
          setGraphic(event.graphic);
        }
        // keep the create mode active so user can continue adding more paths
        enterCreateMode();
      }
    },
    [
      getBufferLayer,
      sketchViewModelRef,
      isAddMode,
      onFlightGeographyChange,
      autoZoomToFlightPath,
      enterCreateMode,
    ],
  );

  const onUpdate = useCallback(
    (event: __esri.SketchUpdateEvent) => {
      // Update radius in real-time during circle scaling
      if (
        event.state === 'active' &&
        event.toolEventInfo.type === 'scale' &&
        event.graphics[0]?.geometry
      ) {
        const geometry = event.graphics[0].geometry;
        if (geometry.type === 'extent') {
          // For circles, the geometry type is 'extent' but we can calculate radius from theextent
          const extent = geometry as __esri.Extent;
          const width = extent.width;
          const height = extent.height;
          if (width > 0 && height > 0) {
            // Calculate radius from extent (assuming it's roughly circular)
            const calculatedRadius = Math.min(width, height) / 2;
            setPendingRadius(Math.round(calculatedRadius));
            setIsLiveUpdating(true);
          }
        }
      }

      if (
        event.state === 'complete' ||
        (event.state === 'active' &&
          event.toolEventInfo.type === 'vertex-remove')
      ) {
        if (event.aborted) return;

        // TODO: nasty hack to remove old graphics. maybe figure out a better approach
        const graphicsToRemove =
          sketchViewModelRef.current?.layer?.graphics?.filter(
            (g) => g !== event.graphics[0],
          );
        if (graphicsToRemove) {
          graphicsToRemove.forEach((g) =>
            sketchViewModelRef.current?.layer.remove(g),
          );
        }

        const g = new Graphic({
          geometry: event.graphics[0].geometry.clone(),
          symbol: event.graphics[0].symbol,
        });
        setGraphic(g);

        // Update the graphic in the sketch view model
        sketchViewModelRef.current?.update([g]);

        // Restore edit mode to keep the graphic editable
        if (
          sketchViewModelRef.current &&
          (g.geometry.type === 'polyline' || g.geometry.type === 'polygon')
        ) {
          // For polylines and polygons, we need to restore edit mode after vertex updates
          setTimeout(() => {
            if (sketchViewModelRef.current && g) {
              // Ensure the graphic is in the layer and put it back in edit mode
              if (!sketchViewModelRef.current.layer.graphics.includes(g)) {
                sketchViewModelRef.current.layer.add(g);
              }
              sketchViewModelRef.current.update([g]);
            }
          }, 100);
        }
      }
      if (
        event.state === 'active' &&
        event.toolEventInfo.type === 'reshape-stop'
      ) {
        sketchViewModelRef.current?.complete();
      }
      if (
        event.state === 'active' &&
        event.toolEventInfo.type === 'move-start'
      ) {
        // console.log('move-start', event.graphics[0].geometry.centroid.x);
      }
      if (
        event.state === 'active' &&
        event.toolEventInfo.type === 'move-stop'
      ) {
        // console.log('move-stop', event.graphics[0].geometry.centroid.x);
        sketchViewModelRef.current?.complete();
      }
      if (
        event.state === 'active' &&
        event.toolEventInfo.type === 'scale-stop'
      ) {
        setIsLiveUpdating(false);
        sketchViewModelRef.current?.complete();
      }
    },
    [sketchViewModelRef],
  );

  useEffect(() => {
    if (handleCreate || handleUpdate) {
      return;
    }
    if (!selectedTool) {
      sketchViewModelRef.current?.cancel();
    }
  }, [selectedTool, handleCreate, handleUpdate, sketchViewModelRef]);

  useEffect(() => {
    if (flightPathJSON) {
      reactiveUtils
        .whenOnce(() => getView().ready)
        .then(() => {
          const fg = getFlightGeography(flightPathJSON);
          if (!fg) return;

          setSelectedTool(fg.geometry.type as Tool);
          setGraphic(fg);
        });
    }
  }, [flightPathJSON, onUpdate, onCreate]);

  useEffect(() => {
    if (!graphic) {
      // Only clear graphics if not in add mode
      if (!isAddMode) {
        const l = getBufferLayer();
        l?.removeAll();
        onFlightGeographyChange(null);
        // onFlightPathChange(null);
      }
      return;
    }

    // ensure the graphic is added to the sketchViewModel layer
    if (
      !sketchViewModelRef.current?.layer.graphics.find((g) => g === graphic)
    ) {
      sketchViewModelRef.current?.layer.add(graphic);
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
    setAutoZoomToFlightPath(false);

    // onFlightPathChange(graphic.geometry);
    // moved this to the onCreate function so it does not appear when loading a stored flight path
    // sketchViewModel?.update([graphic]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    graphic,
    selectedTool,
    cd,
    getBufferLayer,
    sketchViewModelRef,
    autoZoomToFlightPath,
    isAddMode,
  ]);

  useEffect(() => {
    return () => {
      geozoneClickHandle?.remove();
    };
  }, [geozoneClickHandle]);

  const clearCurrentDrawing = useCallback(() => {
    // Only clear everything if not in add mode
    if (!isAddMode) {
      sketchViewModelRef.current?.layer.removeAll();
      const l = getView().map?.findLayerById(
        bufferGraphicsLayerId,
      ) as GraphicsLayer;
      l?.removeAll();
      setGraphic(null);
      setIsLiveUpdating(false);
      sketchViewModelRef.current?.cancel();
      onFlightGeographyChange(null);
    } else {
      sketchViewModelRef.current?.cancel();
      setGraphic(null);
      setIsLiveUpdating(false);

      const l = getPreservationLayer();
      l?.removeAll();
    }
  }, [isAddMode, onFlightGeographyChange, getPreservationLayer]);

  const getToolFromGeometry = (geometry: __esri.Geometry): Tool | null => {
    if (geometry.type === 'polyline') return 'polyline';
    if (geometry.type === 'polygon') return 'polygon';
    return null;
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
    clearCurrentDrawing();
    if (tool === selectedTool) {
      if (tool === 'geozone') {
        geozoneClickHandle?.remove();
        if (!isAddMode) {
          getView().graphics.removeAll();
        }
        onGeozoneInfoChange(null);
      }
      // Don't clear selected tool when in add mode - we want to keep the tool active
      if (!isAddMode) {
        setSelectedTool(null);
      }
    } else {
      setSelectedTool(tool);
      if (tool === 'geozone') {
        geozoneClickHandle?.remove();
        setGeozoneClickHandle(getView().on('click', handleMapClick));
        return;
      }
      if (sketchViewModelRef.current) {
        if (tool === 'circle') {
          sketchViewModelRef.current.defaultUpdateOptions = {
            tool: 'move',
            highlightOptions: {
              enabled: true,
            },
            enableRotation: false,
            enableScaling: true,
          };
        } else {
          sketchViewModelRef.current.defaultUpdateOptions = {
            tool: 'reshape',
            highlightOptions: {
              enabled: false,
            },
            enableRotation: false,
            enableScaling: true,
          };
        }
      }
      // Only clear graphics if not in add mode
      if (!isAddMode) {
        getView().graphics.removeAll();
      }
      onGeozoneInfoChange(null);

      // Ensure the sketch view model is ready before creating
      if (sketchViewModelRef.current && sketchViewModelRef.current.layer) {
        // Make sure the layer is in the map
        if (
          getView().map &&
          !getView().map.findLayerById(sketchViewModelRef.current.layer.id)
        ) {
          getView().map.add(sketchViewModelRef.current.layer);
        }

        // For circle tool, ensure the radius is properly set
        if (tool === 'circle') {
          setPendingRadius(radiusRef.current);
        }

        // Create the drawing mode immediately if the view is ready
        if (getView().ready) {
          try {
            sketchViewModelRef.current.create(
              tool as
                | 'circle'
                | 'point'
                | 'multipoint'
                | 'polyline'
                | 'polygon'
                | 'mesh'
                | 'rectangle',
            );
          } catch (error) {
            // If immediate creation fails, wait for the view to be ready
            reactiveUtils
              .whenOnce(() => getView().ready)
              .then(() => {
                if (sketchViewModelRef.current) {
                  sketchViewModelRef.current.create(
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
              });
          }
        } else {
          // Wait for the view to be ready before creating
          reactiveUtils
            .whenOnce(() => getView().ready)
            .then(() => {
              if (sketchViewModelRef.current) {
                sketchViewModelRef.current.create(
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
            });
        }
      }
    }
  };

  useEffect(() => {
    if (sketchViewModelRef.current) return;

    // Wait for the view to be ready before creating the sketch view model
    reactiveUtils
      .whenOnce(() => getView().ready)
      .then(() => {
        if (sketchViewModelRef.current) return; // Check again in case it was created while waiting

        // Also wait for the map to be available
        reactiveUtils
          .whenOnce(() => getView().map)
          .then(() => {
            if (sketchViewModelRef.current) return; // Check again in case it was created while waiting

            const skvm = new SketchViewModel({
              view: getView(),
              layer: new GraphicsLayer({ id: 'easa-sora-sketch-layer' }),
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

            sketchViewModelRef.current = skvm;

            // Set up event handlers
            const hc = sketchViewModelRef.current?.on('create', onCreate);
            setHandleCreate(hc);
            const hu = sketchViewModelRef.current?.on('update', onUpdate);
            setHandleUpdate(hu);

            getBufferLayer();

            // const existingLayer = getView().map.findLayerById(
            //   sketchViewModelRef.current?.layer?.id,
            // );
            // if (!existingLayer) {
            //   getView().map.add(sketchViewModelRef.current.layer);
            // }

            // Add the sketch view model's layer to the map
            if (skvm.layer && getView().map) {
              getView().map.add(skvm.layer);
            }
          });
      });
    // setSketchViewModel(skvm);
  }, [getBufferLayer, onCreate, onUpdate]);

  // Set up the sketch view model

  const { create } = useModalManager();

  // Handle trash button click
  const handleTrashClick = useCallback(() => {
    clearCurrentDrawing();
    if (
      selectedTool &&
      sketchViewModelRef.current &&
      sketchViewModelRef.current.layer
    ) {
      // For circle tool, ensure the radius is properly set
      if (selectedTool === 'circle') {
        setPendingRadius(radiusRef.current);
      }
      enterCreateMode();
    }
  }, [selectedTool, clearCurrentDrawing, enterCreateMode]);

  const uploadModal = useCallback(() => {
    return (
      <UploadModal
        onUpload={(g: __esri.Graphic) => {
          setSelectedTool(getToolFromGeometry(g.geometry));
          setAutoZoomToFlightPath(true);
          setGraphic(g);
          if (sketchViewModelRef.current && sketchViewModelRef.current.layer) {
            // Update immediately if the view is ready
            if (getView().ready) {
              try {
                sketchViewModelRef.current.update(g);
              } catch (error) {
                // If immediate update fails, wait for the view to be ready
                reactiveUtils
                  .whenOnce(() => getView().ready)
                  .then(() => {
                    if (sketchViewModelRef.current) {
                      sketchViewModelRef.current.update(g);
                    }
                  });
              }
            } else {
              // Wait for the view to be ready before updating
              reactiveUtils
                .whenOnce(() => getView().ready)
                .then(() => {
                  if (sketchViewModelRef.current) {
                    sketchViewModelRef.current.update(g);
                  }
                });
            }
          }
        }}
        onClose={() => setUploadFileModalVisible(false)}
      />
    );
  }, [sketchViewModelRef]);

  const downloadModal = useCallback(() => {
    return (
      <DownloadModal
        graphic={graphic}
        onClose={() => setDownloadFileModalVisible(false)}
      />
    );
  }, [graphic]);

  useEffect(() => {
    if (uploadFileModalVisible) {
      create(uploadModal);
    }
  }, [uploadFileModalVisible, create, uploadModal]);

  useEffect(() => {
    if (downloadFileModalVisible) {
      create(downloadModal);
    }
  }, [downloadFileModalVisible, create, downloadModal]);

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
            label='Download KML or GeoJSON file'
            onClick={() => setDownloadFileModalVisible(true)}
            compact
            disabled={!enabled || !graphic}
          >
            <Icon
              name='download'
              role='img'
              aria-label='download icon'
              className='icon'
            />
          </Button>
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
              onClick={handleTrashClick}
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

      {selectedTool === 'circle' && (
        <div
          style={{
            position: 'absolute',
            top: '4rem',
            right: '1.25rem',
            maxWidth: '50%',
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: `1px solid ${theme.base.palette['brand-primary']}`,
            minWidth: '14rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Input
            type='number'
            label={
              isLiveUpdating
                ? `Radius (m) - Live (Current: ${radiusRef.current}m)`
                : 'Radius (m)'
            }
            value={`${pendingRadius}`}
            min={10}
            max={10000}
            onChange={(e: any) => setPendingRadius(Number(e.target.value))}
          />
          <Button
            variant='primary'
            onClick={applyRadiusChange}
            compact
            disabled={pendingRadius === radiusRef.current}
          >
            OK
          </Button>
        </div>
      )}
    </>
  );
};

export default Toolbar;
