import { Button, FileInput, Text, useTheme } from '@pega/cosmos-react-core';

import { useState } from 'react';
import { kml } from '@tmcw/togeojson';
import { geojsonToArcGIS } from '@terraformer/arcgis';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import * as projection from '@arcgis/core/geometry/projection';
import { merge } from '@storybook/manager-api';

interface Props {
  onUpload: (flightPath: __esri.Graphic) => void;
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
          const feature = geojson.features[0];
          feature.geometry.coordinates = feature.geometry.coordinates.map(
            (point: number[]) => [point[0], point[1]],
          );
          const esriGraphic = geojsonToArcGIS(feature) as __esri.Graphic;
          // esriGraphic.geometry.hasZ = false;
          // esriGraphic.geometry.type = 'polyline';
          const polyline = esriGraphic.geometry as __esri.Polyline;
          polyline.paths = polyline.paths.map((path) =>
            path.map((point) => {
              return [point[0], point[1]];
            }),
          );
          esriGraphic.geometry = polyline;

          const newGeometry = new Polyline({
            paths: polyline.paths,
            spatialReference: new SpatialReference({
              wkid: esriGraphic.geometry.spatialReference.wkid,
            }),
          });
          const prjGeometry = projection.project(
            newGeometry,
            new SpatialReference({ wkid: 102100 }),
          );

          const graphic = new Graphic({
            geometry: prjGeometry as __esri.Geometry,
            attributes: esriGraphic.attributes,
          });

          props.onUpload(graphic);
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
