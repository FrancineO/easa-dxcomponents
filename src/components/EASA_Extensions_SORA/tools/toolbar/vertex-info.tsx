import { useCallback, useEffect, useRef, useState } from 'react';
import { Popover, Text, throttle } from '@pega/cosmos-react-core';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import { getView } from '../../map/view';

/**
 * VertexInfo component
 * Shows information about vertex interactions
 */
const VertexInfo = () => {
  const tooltipElement = useRef<HTMLDivElement | null>(null);

  const [mousePoint, setMousePoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [infoTextElement, setInfoTextElement] = useState<JSX.Element | null>(
    null,
  );

  const setMouseOverVertex = (mp: { x: number; y: number } | null) => {
    if (tooltipElement.current) {
      if (mp) {
        tooltipElement.current.style.left = `${mp.x}px`;
        tooltipElement.current.style.top = `${mp.y}px`;
        tooltipElement.current.style.position = 'absolute';
        tooltipElement.current.style.display = 'block';
        tooltipElement.current.style.pointerEvents = 'none';
      } else {
        tooltipElement.current.style.display = 'none';
      }
    }
  };

  const handleMouseMove = useCallback(
    async (mp: { x: number; y: number } | null) => {
      if (!mp) return;

      const vertexLv = getView().allLayerViews.find(
        (lv) => lv.layer.title === 'SVM Internal',
      );

      if (!vertexLv) {
        setMousePoint(null);
        return;
      }

      if ((vertexLv?.layer as __esri.GraphicsLayer)?.graphics?.length > 3) {
        setInfoTextElement(
          <>
            <Text style={{ fontSize: '10px' }}>
              Right click to remove vertex
            </Text>
            <Text style={{ fontSize: '10px' }}>or</Text>
            <Text style={{ fontSize: '10px' }}>Drag to move vertex</Text>
          </>,
        );
      } else {
        setInfoTextElement(
          <Text style={{ fontSize: '10px' }}>Drag to move vertex</Text>,
        );
      }

      const result = await getView().hitTest(mp, { include: [vertexLv.layer] });
      if (result.results.length > 0) {
        const graphicHit = result.results[0] as __esri.GraphicHit;
        const g = graphicHit.graphic;
        if (g && (g.symbol as __esri.SimpleMarkerSymbol).size === 10) {
          setMousePoint({ x: mp.x, y: mp.y });
        }
      } else {
        setMousePoint(null);
      }
    },
    [],
  );

  useEffect(() => {
    let mounted = true;

    reactiveUtils
      .whenOnce(() => getView().ready)
      .then(() => {
        if (!mounted) return;

        const throttledSetMouseMove = throttle(
          (event: __esri.ViewPointerMoveEvent) => {
            if (!mounted || !getView().ready) return;
            handleMouseMove({ x: event.x, y: event.y });
          },
          100,
        );

        const handle = reactiveUtils.on(
          () => getView(),
          'pointer-move',
          throttledSetMouseMove,
        );

        return () => {
          mounted = false;
          handle?.remove();
          (throttledSetMouseMove as any).cancel?.();
        };
      });

    return () => {
      mounted = false;
    };
  }, [handleMouseMove]);

  useEffect(() => {
    if (mousePoint) {
      setMouseOverVertex(mousePoint);
    }
  }, [mousePoint]);

  return (
    <div>
      {mousePoint && (
        <div>
          <div ref={tooltipElement} />
          <Popover
            style={{
              pointerEvents: 'none',
              borderRadius: '4px',
              padding: '4px',
            }}
            target={tooltipElement.current}
            strategy='fixed'
          >
            <div
              style={{
                gap: '0.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {infoTextElement}
            </div>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default VertexInfo;
