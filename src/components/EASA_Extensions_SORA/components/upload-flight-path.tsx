import { Button, FileInput } from '@pega/cosmos-react-core';

import { useState } from 'react';
import { kml } from '@tmcw/togeojson';
import { geojsonToArcGIS } from '@terraformer/arcgis';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import * as projection from '@arcgis/core/geometry/projection';

interface Props {
  onUpload: (flightPath: __esri.Graphic) => void;
}

export const UploadFlightPath = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (files: File[]) => {
    if (files && files.length > 0 && files[0] !== file) {
      setFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const flightPathContent = e.target?.result as string;

      let geojson = null;
      // TODO: Process flight path content
      if (file.name.endsWith('.kml')) {
        const xml = new DOMParser().parseFromString(
          flightPathContent,
          'text/xml',
        );
        geojson = kml(xml, { skipNullGeometry: true });
      } else if (file.name.endsWith('.geojson')) {
        geojson = JSON.parse(flightPathContent);
      }

      if (geojson) {
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
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '8px' }}>
      <FileInput
        onFilesAdded={handleFileChange}
        multiple={false}
        label='Choose KML or GeoJSON file'
        accept='.kml .geojson'
      />

      <Button
        variant='primary'
        onClick={handleUpload}
        disabled={!file}
        style={{ marginTop: '8px' }}
      >
        Upload
      </Button>
    </div>
  );
};

export default UploadFlightPath;
