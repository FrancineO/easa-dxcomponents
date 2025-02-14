/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useEffect, useMemo, useState } from 'react';
import './basemap-chooser.css';
import Basemap from '@arcgis/core/Basemap';
import { getView } from '../map/view';

const BasemapChooser = () => {
  const [choicesOpen, setChoicesOpen] = useState(false);

  const [basemaps, setBasemaps] = useState<Basemap[]>([]);
  const [currentBasemapItemId, setCurrentBasemapItemId] = useState<string>('');
  const currentBaseMap = useMemo(
    () => basemaps.find(b => b?.id === currentBasemapItemId),
    [basemaps, currentBasemapItemId]
  );

  useEffect(() => {
    const basemapItemIds = [
      '979c6cc89af9449cbeb5342a439c6a76',
      '86265e5a4bbb4187a59719cf134e0018',
      '67372ff42cd145319639a99152b15bc3'
    ];

    const bMaps = basemapItemIds.map(
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
    setCurrentBasemapItemId(bMaps[0].id);
  }, []);

  useEffect(() => {
    if (!getView()?.map && currentBaseMap === undefined) return;

    getView().map.basemap = currentBaseMap as Basemap;
  }, [currentBaseMap]);

  return (
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
              setCurrentBasemapItemId(basemap.id);
              setChoicesOpen(false);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                setCurrentBasemapItemId(basemap.id);
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
  );
};

export default BasemapChooser;
