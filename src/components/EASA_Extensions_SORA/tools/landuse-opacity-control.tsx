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

const LanduseOpacityControl = ({ mapState }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [landuseOpacity, setLanduseOpacity] = useState(
    mapState?.landuseOpacity ?? 1,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const inWrapper = wrapperRef.current?.contains(e.target as Node);
      const inPopover = popoverRef.current?.contains(e.target as Node);
      if (!inWrapper && !inPopover) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        label='Land-use class opacity'
        onClick={() => setIsOpen((prev) => !prev)}
        compact
      >
        <Icon
          name='knobs-alt-solid'
          role='img'
          aria-label='land-use class opacity icon'
          className='icon'
        />
      </Button>
      {isOpen && (
        <Popover target={wrapperRef.current} strategy='fixed'>
          <div ref={popoverRef}>
          <Card>
            <CardContent style={{ padding: '0.75rem' }}>
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
            </CardContent>
          </Card>
          </div>
        </Popover>
      )}
    </div>
  );
};

export default LanduseOpacityControl;
