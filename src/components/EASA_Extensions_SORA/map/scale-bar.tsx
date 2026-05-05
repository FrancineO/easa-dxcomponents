import { useEffect, useRef } from 'react';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import ScaleBarWidget from '@arcgis/core/widgets/ScaleBar';
import { getView } from './view';

const ScaleBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let scaleBar: ScaleBarWidget | null = null;

    reactiveUtils.whenOnce(() => getView().ready).then(() => {
      if (!containerRef.current) return;
      scaleBar = new ScaleBarWidget({
        view: getView(),
        unit: 'metric',
        style: 'line',
        container: containerRef.current,
      });
    });

    return () => {
      scaleBar?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        bottom: '0.5rem',
        right: '4rem',
        zIndex: 10,
      }}
    />
  );
};

export default ScaleBar;
