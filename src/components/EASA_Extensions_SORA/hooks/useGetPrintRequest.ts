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
        urls: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute',
        before: params => {
          setPrintRequest(params);
          // return params;
        }
      });
    }

    const pvm = new PrintViewModel({
      printServiceUrl:
        'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute',
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
