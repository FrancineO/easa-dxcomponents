import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Icon,
  Popover,
  Text,
  registerIcon,
} from '@pega/cosmos-react-core';
import * as KnobsAltSolid from '@pega/cosmos-react-core/lib/components/Icon/icons/knobs-alt-solid.icon';
import { getView } from '../map/view';
import { LayerId, type MapState } from '../types';

registerIcon(KnobsAltSolid);

type Props = {
  mapState: MapState | null;
};

const LayerSettings = ({ mapState }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [landuseOpacity, setLanduseOpacity] = useState(
    mapState?.landuseOpacity ?? 1,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const path = e.composedPath();
      const inWrapper = wrapperRef.current && path.includes(wrapperRef.current);
      const inPopover = popoverRef.current && path.includes(popoverRef.current);
      if (!inWrapper && !inPopover) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [isOpen]);

  const handleOpacityChange = (value: number) => {
    setLanduseOpacity(value);
    const layer = getView().map?.findLayerById(LayerId.landuse);
    if (layer) {
      (layer as any).opacity = value;
    }
  };

  return (
    <div ref={wrapperRef}>
      <Button
        variant='text'
        label='Settings'
        onClick={() => setIsOpen((prev) => !prev)}
        compact
      >
        <Icon
          name='knobs-alt-solid'
          role='img'
          aria-label='settings icon'
          className='icon'
        />
      </Button>
      {isOpen && (
        <Popover target={wrapperRef.current} strategy='fixed'>
          <div ref={popoverRef}>
            <Card>
              <CardContent style={{ padding: '0.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type='range'
                      min={0}
                      max={1}
                      step={0.01}
                      value={landuseOpacity}
                      onChange={(e) =>
                        handleOpacityChange(parseFloat(e.target.value))
                      }
                      style={{ width: '120px' }}
                    />
                    <Text style={{ fontSize: '12px', minWidth: '32px' }}>
                      {Math.round(landuseOpacity * 100)}%
                    </Text>
                  </div>
                  <Text style={{ fontSize: '11px' }}>Land-use class opacity</Text>
                </div>
              </CardContent>
            </Card>
          </div>
        </Popover>
      )}
    </div>
  );
};

export default LayerSettings;
