import { Modal, useModalContext } from '@pega/cosmos-react-core';
import UploadFlightPath from './upload-flight-path';

interface Props {
  onUpload: (graphics: __esri.Graphic[]) => void;
  onClose: () => void;
}

export const UploadModal = (props: Props) => {
  const { dismiss } = useModalContext();

  const handleUpload = (graphics: __esri.Graphic[]) => {
    props.onClose();
    dismiss();
    props.onUpload(graphics);
  };

  return (
    <Modal
      dismissible
      heading='Upload KML or GeoJSON file'
      onAfterClose={props.onClose}
      title='Upload KML or GeoJSON file'
    >
      <UploadFlightPath onUpload={handleUpload} />
    </Modal>
  );
};

export default UploadModal;
