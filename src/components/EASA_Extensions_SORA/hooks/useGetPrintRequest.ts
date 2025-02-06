import { useCallback, useState } from 'react';
import esriConfig from '@arcgis/core/config';
import View from '../View';
import PrintTemplate from '@arcgis/core/rest/support/PrintTemplate';
import PrintViewModel from '@arcgis/core/widgets/Print/PrintViewModel';

const useGetPrintRequest = () => {
  const [printRequest, setPrintRequest] = useState<any>(null);

  // TODO: put url, width, height, and format as params to the component

  const getPrintRequest = useCallback(() => {
    if (esriConfig.request?.interceptors) {
      esriConfig.request.interceptors = [];
      esriConfig.request?.interceptors?.push({
        urls: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
        before: params => {
          setPrintRequest(params);

          // for testing
          // const url = params.url;
          // const query = params.requestOptions.query;
          // fetch(url, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded'
          //   },
          //   body: new URLSearchParams(query).toString()
          // }).then(response => {
          //   response.json().then(json => {
          //     // Open the print result URL in a new tab
          //     if (json.results?.[0]?.value?.url) {
          //       window.open(json.results[0].value.url, '_blank');
          //     }
          //   });
          // });

          return params; // This prevents the request from being sent
        }
      });
    }

    const pvm = new PrintViewModel({
      printServiceUrl:
        'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
      view: View
    });

    // pvm.load().then(() => {
    const width = View.width;
    const height = View.height;
    const ratio = width / height;
    pvm.print(
      new PrintTemplate({
        format: 'jpg',
        layout: 'map-only',
        exportOptions: { width: 300 * ratio, height: 300 }
      })
    );
    // });
  }, []);

  return {
    printRequest,
    getPrintRequest
  };
};

export default useGetPrintRequest;
