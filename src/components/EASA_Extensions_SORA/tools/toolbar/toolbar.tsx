import { Icon, useModalManager } from '@pega/cosmos-react-core';
import { Button } from '@pega/cosmos-react-core';
import { CardContent } from '@pega/cosmos-react-core';
import { Card } from '@pega/cosmos-react-core';
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';

import { getView } from '../../map/view';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Circle from '@arcgis/core/geometry/Circle';
import { getFlightPaths, getSymbol } from './draw-utils';
import generateId from '../../utils/id-utils';
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
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import VertexInfo from './vertex-info';

import UploadModal from '../../components/upload-modal';
import DownloadModal from '../../components/download-modal';
import type { FlightPath } from '../../types';

// Utility function to add ID and tool type to a graphic
const addIdToGraphic = (graphic: __esri.Graphic, tool?: Tool): FlightPath => {
  if (!graphic.attributes) {
    graphic.attributes = {};
  }
  if (!graphic.attributes.id) {
    graphic.attributes.id = generateId();
  }
  // Set isCircle property based on the tool used to create the graphic
  if (tool === 'circle') {
    graphic.attributes.isCircle = true;
  }
  return graphic as FlightPath;
};

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

type Props = {
  style?: React.CSSProperties;
  cd: number;
  flightPaths: FlightPath[];
  onNewFlightPaths: (
    graphics: FlightPath[] | null,
    autoZoomToFlightPath?: boolean,
  ) => void;
  flightPathJSON: string | null;
  // onFlightPathChange: (path: __esri.Geometry | null) => void;
  onGeozoneInfoChange: (
    info: { attributes: any; portalItemId?: string } | null,
  ) => void;
  onSelectedToolChange: (tool: Tool | null) => void;
  enabled: boolean;
  isMultiMode?: boolean; // New prop to indicate if we're adding to existing paths
  forceClear?: boolean; // New prop to force clear the toolbar state
  circleRadius?: number;
  onCircleRadiusChange?: (radius: number) => void;
  selectedFlightPath: FlightPath | null;
  onEnterCreateModeRef?: React.MutableRefObject<(() => void) | null>; // New prop to expose enterCreateMode function
  geozonePortalItemIds?: string; // New prop for geozone portal item IDs
};

// const bufferGraphicsLayerId = 'easa-sora-tool-buffer-graphics';

/**
 * DrawToolbar component
 * @param props - The props for the component
 * @returns The DrawToolbar component
 */
export const Toolbar = (props: Props) => {
  const {
    flightPaths,
    onNewFlightPaths,
    cd,
    flightPathJSON,
    // onFlightPathChange,
    onGeozoneInfoChange,
    onSelectedToolChange,
    enabled,
    isMultiMode = false,
    forceClear = false, // Default to false for backward compatibility
    circleRadius,
    onCircleRadiusChange,
    selectedFlightPath,
    onEnterCreateModeRef,
    geozonePortalItemIds,
  } = props;

  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [handleCreate, setHandleCreate] = useState<any>();
  const [handleUpdate, setHandleUpdate] = useState<any>();
  const [graphic, setGraphic] = useState<Graphic | null>(null);

  const [geozoneClickHandle, setGeozoneClickHandle] = useState<any>();
  const [uploadFileModalVisible, setUploadFileModalVisible] = useState(false);
  const [downloadFileModalVisible, setDownloadFileModalVisible] =
    useState(false);
  const [autoZoomToFlightPath, setAutoZoomToFlightPath] = useState(false);

  // Create array of geozone portal item IDs
  const geozonePortalItemIdsArray = useMemo(() => {
    if (!geozonePortalItemIds) {
      return [
        '961089b2b5934678966938195a745029',
        'eebdb68dbdb44859925d868399cecdf3',
        '2375bb13147443fe9e42c629ff87d821',
      ];
    }
    return geozonePortalItemIds.split(',').map((id) => id.trim());
  }, [geozonePortalItemIds]);
  const radiusRef = useRef(500);
  const sketchViewModelRef = useRef<SketchViewModel | null>(null);
  const lastProcessedGraphicRef = useRef<__esri.Graphic | null>(null);
  const previousIsMultiModeRef = useRef<boolean>(false);
  const selectedToolRef = useRef<Tool | null>(null);
  const isMultiModeRef = useRef<boolean>(false);
  const lastProcessedGraphicIdRef = useRef<string | null>(null);

  // Keep the ref in sync with the state
  useEffect(() => {
    selectedToolRef.current = selectedTool;
    if (!onSelectedToolChange) return;
    onSelectedToolChange(selectedTool);
  }, [selectedTool, onSelectedToolChange]);

  // Keep the isMultiMode ref in sync with the prop
  useEffect(() => {
    isMultiModeRef.current = isMultiMode;
  }, [isMultiMode]);

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

  // Expose enterCreateMode function to parent component
  useEffect(() => {
    if (onEnterCreateModeRef) {
      onEnterCreateModeRef.current = enterCreateMode;
    }
  }, [enterCreateMode, onEnterCreateModeRef]);

  const enterUpdateMode = useCallback((flightPath: FlightPath) => {
    if (sketchViewModelRef.current) {
      // clear the layer
      sketchViewModelRef.current.layer.removeAll();
      // add the graphic to the layer
      sketchViewModelRef.current.layer.add(flightPath);
      // update the graphic
      const tool = flightPath.attributes?.isCircle
        ? ('move' as const)
        : ('reshape' as const);
      // const tool = 'reshape' as const;
      const opts = {
        tool,
        highlightOptions: {
          enabled: false,
        },
        enableRotation: false,
        enableScaling: true,
      };
      sketchViewModelRef.current.update([flightPath], opts);
    }
  }, []);

  // Watch for changes in isMultiMode and notify parent when entering create mode
  useEffect(() => {
    // Lock existing graphics by moving them to a separate layer
    // and prepare SketchViewModel for new drawing
    if (isMultiMode && sketchViewModelRef.current) {
      // Cancel any current editing
      sketchViewModelRef.current.cancel();

      getView()
        .when(() => getView().ready && sketchViewModelRef.current)
        .then(() => {
          enterCreateMode();
        });
    }

    // Update the previous isMultiMode ref
    previousIsMultiModeRef.current = isMultiMode;
  }, [isMultiMode, selectedTool, enterCreateMode]);

  const onCreate = useCallback(
    (event: any) => {
      if (event.state === 'start') {
        // setGraphic(null);
        // Clear the last processed graphic ref when starting a new drawing
        lastProcessedGraphicRef.current = null;
        // Only clear graphics if not in add mode
        if (!isMultiModeRef.current) {
          sketchViewModelRef.current?.layer.removeAll();
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
            onCircleRadiusChange?.(calculatedRadius);
          }
        } else if (geometry.type === 'circle') {
          // Fallback for actual circle geometry
          const circle = geometry as __esri.Circle;
          const currentRadius = circle.radius;
          if (currentRadius && currentRadius > 0) {
            onCircleRadiusChange?.(currentRadius);
          }
        }
      }
      if (event.state === 'cancel') {
        return;
      }

      if (event.state === 'complete') {
        // For circle tool, convert the polygon to a proper circle with the correct radius
        if (event.tool === 'circle' && event.graphic?.geometry) {
          const geometry = event.graphic.geometry;
          if (geometry.type === 'polygon') {
            const polygon = geometry as __esri.Polygon;
            const center = polygon.centroid;
            const finalRadius = radiusRef.current;

            event.graphic.geometry = new Circle({
              center,
              radius: finalRadius,
              radiusUnit: 'meters',
            });
          } else if (geometry.type === 'circle') {
            const circle = geometry as __esri.Circle;
            // Update existing circle radius if needed
            if (radiusRef.current && circle.radius !== radiusRef.current) {
              event.graphic.geometry = new Circle({
                center: circle.center,
                radius: radiusRef.current,
                radiusUnit: 'meters',
              });
            }
          }
        }
        // if (event.tool === 'circle') {
        //   // The circle tool creates a polygon, so we need to convert it to a proper circle
        //   // We'll use the current radius value for consistency
        //   const polygon = event.graphic.geometry as __esri.Polygon;
        //   const center = polygon.centroid;
        //   const finalRadius = radiusRef.current;

        //   event.graphic.geometry = new Circle({
        //     center,
        //     radius: finalRadius,
        //     radiusUnit: 'meters',
        //   });

        //   sketchViewModelRef.current?.complete();
        //   // } else if (isMultiModeRef.current) {
        //   //   // Only call onFlightGeographyChange if we have a valid graphic and haven't processed it already
        //   //   if (
        //   //     event.graphic &&
        //   //     event.graphic.geometry &&
        //   //     event.graphic !== lastProcessedGraphicRef.current
        //   //   ) {
        //   //     lastProcessedGraphicRef.current = event.graphic;
        //   //     onFlightGeographyChange(event.graphic, autoZoomToFlightPath);
        //   //   }
        //   //   // Clear the graphic state since we're in add mode
        //   //   setGraphic(null);
        // }
        //  else {
        // Normal mode - update the SketchViewModel and set the graphic
        // sketchViewModelRef.current?.update([event.graphic]);
        // setGraphic(event.graphic);
        // }
        // Add ID to the graphic and set it
        const graphicWithId = addIdToGraphic(
          event.graphic,
          selectedTool || undefined,
        );
        setGraphic(graphicWithId);
        // clear the svm layer only if not in multipath mode
        if (!isMultiModeRef.current) {
          sketchViewModelRef.current?.layer.removeAll();
        }
        // keep the create mode active so user can continue adding more paths
        enterCreateMode();
      }
    },
    [sketchViewModelRef, enterCreateMode, onCircleRadiusChange, selectedTool],
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
            onCircleRadiusChange?.(calculatedRadius);
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

        // The graphic being edited by the SketchViewModel should already have the ID
        const originalGraphicInSketch = event.graphics[0];
        const graphicIdToPreserve = originalGraphicInSketch.attributes?.id;
        const tool = originalGraphicInSketch.attributes?.isCircle;

        const g = new Graphic({
          geometry: originalGraphicInSketch.geometry.clone(),
          symbol: originalGraphicInSketch.symbol,
          attributes: graphicIdToPreserve
            ? { id: graphicIdToPreserve, isCircle: tool }
            : {},
        });

        setGraphic(g);

        // Ensure the graphic is in the layer before updating
        if (
          sketchViewModelRef.current &&
          !sketchViewModelRef.current.layer.graphics.includes(g)
        ) {
          sketchViewModelRef.current.layer.add(g);
        }

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
              sketchViewModelRef.current.update([g], {
                tool: g.attributes?.isCircle ? 'move' : 'reshape',
              });
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
        event.toolEventInfo.type === 'move-stop'
      ) {
        sketchViewModelRef.current?.complete();
      }
      if (
        event.state === 'active' &&
        event.toolEventInfo.type === 'scale-stop'
      ) {
        sketchViewModelRef.current?.complete();
      }
    },
    [sketchViewModelRef, onCircleRadiusChange],
  );

  useEffect(() => {
    if (selectedFlightPath) {
      sketchViewModelRef.current?.layer.removeAll();
      enterUpdateMode(selectedFlightPath);
    }
  }, [selectedFlightPath, enterUpdateMode]);

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
          const fg = getFlightPaths(flightPathJSON);
          if (!fg || !fg.length) return;

          // setSelectedTool(fg[0].geometry.type as Tool);
          setGraphic(fg[0]);
        });
    }
  }, [flightPathJSON, onUpdate, onCreate]);

  useEffect(() => {
    if (!graphic) {
      // Only clear graphics if not in add mode
      if (!isMultiModeRef.current) {
        onNewFlightPaths(null);
      }
      return;
    }

    // Check if this is just a tool switch - if the graphic hasn't changed, don't call onNewFlightPaths
    const currentGraphicId = graphic.attributes?.id;

    if (currentGraphicId === lastProcessedGraphicIdRef.current) {
      return;
    }

    lastProcessedGraphicIdRef.current = currentGraphicId;

    // ensure the graphic is added to the sketchViewModel layer
    if (
      !sketchViewModelRef.current?.layer.graphics.find((g) => g === graphic)
    ) {
      sketchViewModelRef.current?.layer.add(graphic);
    }

    //  TODO: this buffer needs to be done outside here.
    // should only be dealing with flight paths here.
    // const buffer = geometryEngine.buffer(
    //   graphic.geometry as __esri.Polyline,
    //   cd * 3, // minimum is 3 times the drone width as per annex
    // ) as __esri.Polygon;
    // const g = new Graphic({
    //   geometry: buffer,
    //   symbol: getFillSymbol(false),
    // });

    // If we're in update mode (selectedFlightPath exists), preserve the original ID
    const graphicToSend = selectedFlightPath
      ? (graphic as FlightPath)
      : addIdToGraphic(graphic, selectedTool || undefined);

    onNewFlightPaths([graphicToSend], autoZoomToFlightPath);
    setAutoZoomToFlightPath(false);

    // onFlightPathChange(graphic.geometry);
    // moved this to the onCreate function so it does not appear when loading a stored flight path
    // sketchViewModel?.update([graphic]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphic, selectedTool, cd, sketchViewModelRef, autoZoomToFlightPath]);

  useEffect(() => {
    return () => {
      geozoneClickHandle?.remove();
    };
  }, [geozoneClickHandle]);

  const clearCurrentDrawing = useCallback(() => {
    // Only clear everything if not in add mode
    if (!isMultiModeRef.current) {
      sketchViewModelRef.current?.layer.removeAll();
      // const l = getView().map?.findLayerById(
      //   bufferGraphicsLayerId,
      // ) as GraphicsLayer;
      // l?.removeAll();
      setGraphic(null);
      // setIsLiveUpdating(false);
      // sketchViewModelRef.current?.cancel();
      // Don't clear flight paths when changing tools - only clear when explicitly requested
      // onFlightGeographyChange(null);
    } else {
      // In multipath mode, only cancel current sketch operation but don't clear the layer
      sketchViewModelRef.current?.cancel();
      setGraphic(null);
      // setIsLiveUpdating(false);

      // const l = getPreservationLayer();
      // l?.removeAll();
    }
  }, []);

  // Function to clear flight paths (used by clear button)
  const clearFlightPaths = useCallback(() => {
    onNewFlightPaths(null);
  }, [onNewFlightPaths]);

  // Handle force clear prop
  useEffect(() => {
    if (forceClear) {
      clearCurrentDrawing();
    }
  }, [forceClear, clearCurrentDrawing]);

  // const getToolFromGeometry = (geometry: __esri.Geometry): Tool | null => {
  //   if (geometry.type === 'polyline') return 'polyline';
  //   if (geometry.type === 'polygon') return 'polygon';
  //   return null;
  // };

  const handleMapClick = (event: any) => {
    getView()
      .hitTest(event)
      .then((result) => {
        getView().graphics.removeAll();
        if (result.results.length > 0 && result.results[0].type === 'graphic') {
          const hitGraphic = result.results[0].graphic as Graphic;
          const layer = result.results[0].layer;

          // Check if the clicked graphic is from a geozone layer
          const isGeozoneLayer =
            layer &&
            (layer as any).portalItem &&
            geozonePortalItemIdsArray.includes((layer as any).portalItem.id);

          if (isGeozoneLayer) {
            const attributes = hitGraphic.attributes;
            const portalItemId = (layer as any).portalItem.id;
            const g = new Graphic({
              geometry: hitGraphic.geometry,
              symbol: getSymbol('polygon') as SimpleFillSymbol,
            });
            getView().graphics.add(g);
            onGeozoneInfoChange({ attributes, portalItemId });
          } else {
            // Not a geozone layer, clear the geozone info
            onGeozoneInfoChange(null);
          }
        } else {
          onGeozoneInfoChange(null);
        }
      });
  };

  const handleToolClick = (tool: Tool) => {
    setAutoZoomToFlightPath(false);
    // Only clear current drawing if not in multipath mode
    if (!isMultiModeRef.current) {
      clearCurrentDrawing();
    }
    if (tool === selectedTool) {
      if (tool === 'geozone') {
        geozoneClickHandle?.remove();
        setGeozoneClickHandle(undefined);
        if (!isMultiModeRef.current) {
          getView().graphics.removeAll();
        }
        onGeozoneInfoChange(null);
      }
      // Toggle off the tool - always allow toggling off drawing tools
      setSelectedTool(null);
    } else {
      setSelectedTool(tool);
      if (tool === 'geozone') {
        geozoneClickHandle?.remove();
        // Cancel any active sketch operations that might interfere with click events
        sketchViewModelRef.current?.cancel();
        const handle = getView().on('immediate-click', handleMapClick);
        setGeozoneClickHandle(handle);
        // Don't return here - let the function continue to set the selected tool
      }
      if (sketchViewModelRef.current && tool !== 'geozone') {
        const toolToUse = tool === 'circle' ? 'move' : 'reshape';
        // const toolToUse = 'reshape';
        sketchViewModelRef.current.defaultUpdateOptions = {
          tool: toolToUse,
          highlightOptions: {
            enabled: true,
          },
          enableRotation: false,
          enableScaling: true,
        };
      }
      // Only clear graphics if not in add mode
      if (!isMultiModeRef.current) {
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
          // Radius update handled by CircleRadius component
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
                  enabled: true,
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

            // Add the sketch view model's layer to the map
            if (skvm.layer && getView().map) {
              getView().map.add(skvm.layer);
            }
          });
      });
  }, [onCreate, onUpdate]);

  // Set up the sketch view model

  const { create } = useModalManager();

  // Handle trash button click
  const handleTrashClick = useCallback(() => {
    sketchViewModelRef.current?.layer.removeAll();
    clearCurrentDrawing();
    clearFlightPaths(); // Clear flight paths when clear button is clicked
    if (
      selectedTool &&
      sketchViewModelRef.current &&
      sketchViewModelRef.current.layer
    ) {
      // For circle tool, ensure the radius is properly set
      if (selectedTool === 'circle') {
        // Radius update handled by CircleRadius component
      }
      enterCreateMode();
    }
  }, [selectedTool, clearCurrentDrawing, clearFlightPaths, enterCreateMode]);

  const uploadModal = useCallback(() => {
    return (
      <UploadModal
        onUpload={(graphics: __esri.Graphic[]) => {
          // Add IDs to uploaded graphics
          const graphicsWithIds = graphics.map((g) =>
            addIdToGraphic(g, undefined),
          );
          // setSelectedTool(getToolFromGeometry(graphicsWithIds[0].geometry));
          setAutoZoomToFlightPath(true);
          onNewFlightPaths(graphicsWithIds, false);
        }}
        onClose={() => setUploadFileModalVisible(false)}
      />
    );
  }, [onNewFlightPaths]);

  const downloadModal = useCallback(() => {
    return (
      <DownloadModal
        flightPaths={flightPaths}
        onClose={() => setDownloadFileModalVisible(false)}
      />
    );
  }, [flightPaths]);

  useEffect(() => {
    if (circleRadius) {
      radiusRef.current = circleRadius;
    }
  }, [circleRadius]);

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
    <Card style={{ ...props.style, backgroundColor: 'white', padding: '6px' }}>
      <CardContent
        style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}
      >
        <Button
          variant='text'
          label='Download KML or GeoJSON file'
          onClick={() => setDownloadFileModalVisible(true)}
          compact
          disabled={!enabled || !flightPaths.length}
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

        {flightPaths.length > 0 && (
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
  );
};

export default Toolbar;
