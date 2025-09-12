import { Button, FileInput, Text, useTheme } from '@pega/cosmos-react-core';

import { useState } from 'react';
import { kml } from '@tmcw/togeojson';
import { geojsonToArcGIS } from '@terraformer/arcgis';
import Graphic from '@arcgis/core/Graphic';
import Polygon from '@arcgis/core/geometry/Polygon';
import Polyline from '@arcgis/core/geometry/Polyline';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import * as projection from '@arcgis/core/geometry/projection';
import { merge } from '@storybook/manager-api';
import { SimpleFillSymbol } from '@arcgis/core/symbols';
import { getSymbol } from '../tools/toolbar/draw-utils';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';

interface Props {
  onUpload: (flightPath: __esri.Graphic[]) => void;
}

export const UploadFlightPath = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);

  let PCore: any;
  const defaultTheme = useTheme();
  const theme = PCore
    ? merge(defaultTheme, PCore.getEnvironmentInfo().getTheme())
    : defaultTheme;

  const handleFileChange = (files: File[]) => {
    setError(null);
    if (files && files.length > 0 && files[0] !== file) {
      setFile(files[0]);
    }
  };

  const reproject = (inGeometry: __esri.Geometry): __esri.Geometry => {
    const isPolygon = (inGeometry as any).rings !== undefined;

    if (isPolygon) {
      const polygon = inGeometry as __esri.Polygon;
      // make sure we ignore any z-coordinates
      polygon.rings = polygon.rings.map((path) =>
        path.map((point) => {
          return [point[0], point[1]];
        }),
      );
      inGeometry = polygon;
    } else {
      const polyline = inGeometry as __esri.Polyline;
      // make sure we ignore any z-coordinates
      polyline.paths = polyline.paths.map((path) =>
        path.map((point) => {
          return [point[0], point[1]];
        }),
      );
      inGeometry = polyline;
    }

    const newGeometry = isPolygon
      ? new Polygon({
          rings: (inGeometry as __esri.Polygon).rings,
          spatialReference: new SpatialReference({
            wkid: inGeometry.spatialReference.wkid,
          }),
        })
      : new Polyline({
          paths: (inGeometry as __esri.Polyline).paths,
          spatialReference: new SpatialReference({
            wkid: inGeometry.spatialReference.wkid,
          }),
        });

    const prjGeometry = projection.project(
      newGeometry,
      new SpatialReference({ wkid: 102100 }),
    );

    if (Array.isArray(prjGeometry)) {
      return geometryEngine.union(prjGeometry);
    }

    return prjGeometry;
  };
  const handleUpload = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const flightPathContent = e.target?.result as string;

      try {
        let geojson = null;
        if (file.name.endsWith('.kml')) {
          const xml = new DOMParser().parseFromString(
            flightPathContent,
            'text/xml',
          );
          geojson = kml(xml, { skipNullGeometry: true });
        } else if (file.name.endsWith('.geojson')) {
          geojson = JSON.parse(flightPathContent);
        }

        if (geojson?.features?.length > 0) {
          const graphics = geojson.features.map((feature: any) => {
            const esriGraphic = geojsonToArcGIS(feature) as __esri.Graphic;

            const geometry = reproject(esriGraphic.geometry);
            return new Graphic({
              geometry,
              attributes: esriGraphic.attributes,
              symbol:
                geometry.type === 'polygon'
                  ? (getSymbol('polygon') as SimpleFillSymbol)
                  : undefined,
            });
          });

          props.onUpload(graphics);
        } else {
          setError(
            'No geometry found in the file. Please try a different file.',
          );
        }
      } catch (err: any) {
        setError(`Error parsing file: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '8px' }}>
      <FileInput
        onFilesAdded={handleFileChange}
        multiple={false}
        // label='Choose KML or GeoJSON file'
        files={file ? [file] : []}
        accept='.kml, .geojson'
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <Button
            variant='primary'
            onClick={handleUpload}
            disabled={!file}
            style={{ marginTop: '8px' }}
          >
            Upload
          </Button>
        </div>
        {error && (
          <Text
            variant='secondary'
            style={{
              color: theme.base.palette.urgent,
            }}
          >
            {error}
          </Text>
        )}
      </div>
    </div>
  );
};

export default UploadFlightPath;
