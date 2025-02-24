/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useEffect, useMemo, useState } from 'react';
import Basemap from '@arcgis/core/Basemap';
import { getView } from '../../map/view';
import BasemapChooserStyle from './basemap-chooser-style';
import type { MapState } from '../../types';

const BasemapChooser = (props: { basemapPortalItemIds: string[]; mapState: MapState | null }) => {
  const { basemapPortalItemIds, mapState } = props;
  const [choicesOpen, setChoicesOpen] = useState(false);

  const [basemaps, setBasemaps] = useState<Basemap[]>([]);
  const [currentBasemapItemId, setCurrentBasemapItemId] = useState<string>(
    mapState?.basemap ?? basemapPortalItemIds[0]
  );

  const currentBaseMap = useMemo(() => {
    return basemaps.find(b => b?.portalItem?.id === currentBasemapItemId);
  }, [basemaps, currentBasemapItemId]);

  const basemapsLoaded = useMemo(() => {
    return basemaps.length === basemapPortalItemIds.length;
  }, [basemaps, basemapPortalItemIds]);

  useEffect(() => {
    if (basemapsLoaded) return;
    const bMaps = basemapPortalItemIds.map(
      id =>
        new Basemap({
          portalItem: {
            id
          }
        })
    );

    bMaps.forEach(basemap => {
      basemap.load().then(() => {
        setBasemaps(prev => [...prev, basemap]);
      });
    });
  }, [basemapPortalItemIds, basemapsLoaded]);

  useEffect(() => {
    if (!getView()?.map && currentBaseMap === undefined) return;

    getView().map.basemap = currentBaseMap as Basemap;
  }, [currentBaseMap]);

  return (
    <BasemapChooserStyle>
      <div className='basemap-chooser' style={{ display: 'flex' }}>
        {basemaps &&
          basemaps.map((basemap, i) => (
            <div
              key={basemap.id}
              style={{
                transform: choicesOpen
                  ? `translate3d(0, ${`${(i + 1) * -3.25}rem`}, 0)`
                  : 'translate3d(0, 0, 0)',
                visibility: choicesOpen ? 'visible' : 'hidden',
                bottom: '0rem'
              }}
              className='basemap-choice'
              role='button'
              tabIndex={0}
              onClick={() => {
                setCurrentBasemapItemId(basemap.portalItem.id);
                setChoicesOpen(false);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setCurrentBasemapItemId(basemap.portalItem.id);
                  setChoicesOpen(false);
                }
              }}
            >
              <div title={basemap.title} className='img-box'>
                <img src={basemap?.thumbnailUrl} alt={basemap.title} />
              </div>
            </div>
          ))}
        <div
          className='basemap-choice'
          style={{ bottom: '0rem' }}
          onClick={() => setChoicesOpen(!choicesOpen)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              setChoicesOpen(!choicesOpen);
            }
          }}
        >
          <div
            title='Change Basemap'
            className='img-box'
            style={{ border: '0.2rem solid #076bc9' }} // TODO: use palette
          >
            <img src={currentBaseMap?.thumbnailUrl} alt={currentBaseMap?.title} />
          </div>
        </div>
      </div>
    </BasemapChooserStyle>
  );
};

export default BasemapChooser;
