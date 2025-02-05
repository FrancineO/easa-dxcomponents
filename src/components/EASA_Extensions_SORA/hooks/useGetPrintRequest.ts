import { useCallback, useState } from 'react';
import esriConfig from '@arcgis/core/config';
import View from '../View';
import PrintTemplate from '@arcgis/core/rest/support/PrintTemplate';
import PrintViewModel from '@arcgis/core/widgets/Print/PrintViewModel';

const useGetPrintRequest = () => {
  const [printRequest, setPrintRequest] = useState<any>(null);

  const getPrintRequest = useCallback(() => {
    if (esriConfig.request?.interceptors) {
      esriConfig.request.interceptors = [];
      esriConfig.request?.interceptors?.push({
        urls: 'https://www.arcgis.com/sharing/rest/portals/self/printService',
        before: params => {
          setPrintRequest(params);
          // return params;
        }
      });
    }

    const pvm = new PrintViewModel({
      printServiceUrl: 'https://www.arcgis.com/sharing/rest/portals/self/printService',
      view: View
    });

    pvm.load().then(() => {
      pvm.print(new PrintTemplate({ format: 'jpg', layout: 'map-only' }));
    });
  }, []);

  return {
    printRequest,
    getPrintRequest
  };
};

export default useGetPrintRequest;
