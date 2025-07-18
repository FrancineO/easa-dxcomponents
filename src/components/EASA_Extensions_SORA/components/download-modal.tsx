import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import { Modal, useModalContext, Button } from '@pega/cosmos-react-core';
import * as projection from '@arcgis/core/geometry/projection';
import { arcgisToGeoJSON } from '@terraformer/arcgis';
import { toKML } from '@placemarkio/tokml';
import type { FeatureCollection } from 'geojson';

interface Props {
  graphic: __esri.Graphic | null;
  onClose: () => void;
}

export const DownloadModal = (props: Props) => {
  const { dismiss } = useModalContext();

  const handleDownload = (format: 'kml' | 'geojson') => {
    if (!props.graphic) return;

    const wgs84 = new SpatialReference({ wkid: 4326 });
    const wgs84Geometry = projection.project(props.graphic.geometry, wgs84);
    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: arcgisToGeoJSON(wgs84Geometry as __esri.Geometry),
        },
      ],
    };

    if (format === 'kml') {
      const kmlString = toKML(geojson as FeatureCollection);

      const kmlBlob = new Blob([kmlString], {
        type: 'application/vnd.google-earth.kml+xml',
      });
      const kmlUrl = URL.createObjectURL(kmlBlob);
      const a = document.createElement('a');
      a.href = kmlUrl;
      a.download = 'flight_path.kml';
      a.click();
    }
    if (format === 'geojson') {
      const geojsonBlob = new Blob([JSON.stringify(geojson)], {
        type: 'application/json',
      });
      const geojsonUrl = URL.createObjectURL(geojsonBlob);
      const a = document.createElement('a');
      a.href = geojsonUrl;
      a.download = 'flight_path.geojson';
      a.click();
    }
    props.onClose();
    dismiss();
  };

  const handleClose = () => {
    props.onClose();
    dismiss();
  };

  return (
    <Modal
      dismissible
      heading='Download Flight Path as GeoJSON or KML'
      onAfterClose={props.onClose}
      title='Download Flight Path as GeoJSON or KML'
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Button
          variant='primary'
          onClick={() => handleDownload('geojson')}
          style={{ margin: '0' }}
          disabled={!props.graphic}
        >
          Download as GeoJSON
        </Button>
        <Button
          variant='primary'
          onClick={() => handleDownload('kml')}
          style={{ margin: '0' }}
          disabled={!props.graphic}
        >
          Download as KML
        </Button>
        <Button
          variant='secondary'
          onClick={handleClose}
          style={{ margin: '0' }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DownloadModal;
