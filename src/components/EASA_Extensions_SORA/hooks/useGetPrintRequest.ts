import { useCallback, useState } from 'react';
import esriConfig from '@arcgis/core/config';
import { getView } from '../View';
import PrintTemplate from '@arcgis/core/rest/support/PrintTemplate';
import PrintViewModel from '@arcgis/core/widgets/Print/PrintViewModel';

const useGetPrintRequest = (
  printServiceUrl: string,
  printWidth: number,
  printHeight: number,
  printFormat: string,
  printDpi: number
) => {
  const [printRequest, setPrintRequest] = useState<any>(null);

  const getPrintRequest = useCallback(() => {
    if (esriConfig.request?.interceptors) {
      esriConfig.request.interceptors = [];
      esriConfig.request?.interceptors?.push({
        urls: printServiceUrl,
        before: params => {
          // hide SVM Internal layer
          const webMap = JSON.parse(params.requestOptions.query.Web_Map_as_JSON);
          const svmInternal = webMap?.operationalLayers?.find(
            (ol: { title: string }) => ol.title === 'SVM Internal'
          );
          if (svmInternal) {
            svmInternal.visibility = false;
            svmInternal.opacity = 0;
          }
          params.requestOptions.query.Web_Map_as_JSON = JSON.stringify(webMap);

          setPrintRequest({ ...params });

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
      printServiceUrl,
      view: getView()
    });

    pvm.print(
      new PrintTemplate({
        format: printFormat as
          | 'png8'
          | 'png32'
          | 'jpg'
          | 'tiff'
          | 'pdf'
          | 'gif'
          | 'svg'
          | 'svgz'
          | 'aix'
          | 'eps',
        layout: 'map-only',
        exportOptions: { width: getView().width, height: getView().height, dpi: printDpi },
        scalePreserved: false,
        attributionVisible: false
        // outScale: View.scale
      })
    );
  }, []);

  return {
    printRequest,
    getPrintRequest
  };
};

export default useGetPrintRequest;
