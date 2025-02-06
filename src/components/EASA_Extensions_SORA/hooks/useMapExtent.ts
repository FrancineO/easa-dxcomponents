import { useEffect, useRef } from 'react';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import View from '../View';
import debounce from 'lodash/debounce';

const useMapExtent = (onExtentChange: () => void) => {
  const debouncedCallback = useRef(
    debounce((callback: () => void) => {
      callback();
    }, 1500)
  ).current;

  useEffect(() => {
    let mounted = true;

    reactiveUtils
      .whenOnce(() => View.ready)
      .then(() => {
        if (!mounted) return;

        const handle = reactiveUtils.watch(
          () => View.extent,
          () => {
            if (!mounted || !View?.extent) return;
            debouncedCallback(onExtentChange);
          }
        );

        return () => {
          mounted = false;
          handle?.remove();
          debouncedCallback.cancel();
        };
      });

    return () => {
      mounted = false;
      debouncedCallback.cancel();
    };
  }, [onExtentChange, debouncedCallback]);
};

export default useMapExtent;
