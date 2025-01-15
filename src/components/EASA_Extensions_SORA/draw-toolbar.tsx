import { Icon, useTheme } from '@pega/cosmos-react-core';
import { Button } from '@pega/cosmos-react-core';
import { CardContent } from '@pega/cosmos-react-core';
import { Card } from '@pega/cosmos-react-core';
import { useEffect, useState, useCallback } from 'react';
import View from './View';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import { createGraphic, getPolylineSymbol, getSymbol } from './utils';
import type SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import type SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';

interface Props {
  style?: React.CSSProperties;
}

const sketchViewModel = new SketchViewModel({
  view: View,
  layer: new GraphicsLayer(),
  updateOnGraphicClick: true
});

export const DrawToolbar = (props: Props) => {
  const [selectedTool, setSelectedTool] = useState<string>();
  const [handleCreate, setHandleCreate] = useState<any>();
  const [handleUpdate, setHandleUpdate] = useState<any>();
  const [graphic, setGraphic] = useState<Graphic | null>(null);
  const [hasGraphic, setHasGraphic] = useState(false);
  const theme = useTheme();

  const onCreate = useCallback((event: any) => {
    if (event.state === 'start') {
      setGraphic(null);
      sketchViewModel.layer.removeAll();
    }
    if (event.state === 'complete') {
      setGraphic(event.graphic);
      setHasGraphic(true);
    }
  }, []);

  const onUpdate = useCallback((event: any) => {
    setGraphic(event.graphics[0]);
  }, []);

  useEffect(() => {
    if (handleCreate || handleUpdate) {
      return;
    }
    if (!selectedTool) {
      sketchViewModel?.cancel();
      return;
    }
    View.when(() => {
      const hc = sketchViewModel.on('create', onCreate);
      setHandleCreate(hc);
      View.map.add(sketchViewModel.layer);

      const hu = sketchViewModel.on('update', onUpdate);
      setHandleUpdate(hu);
    });
  }, [selectedTool, handleCreate, onCreate, handleUpdate, onUpdate]);

  useEffect(() => {
    if (!graphic) {
      sketchViewModel.layer.removeAll();
      return;
    }
    createGraphic(sketchViewModel.layer, graphic.geometry, theme);
    sketchViewModel.layer.graphics.forEach((g, i) => {
      if (i !== 0) {
        sketchViewModel.layer.graphics.remove(g);
      }
    });
  }, [graphic, theme]);

  useEffect(() => {
    sketchViewModel.polylineSymbol = getSymbol(theme, 'polyline') as SimpleLineSymbol;
    sketchViewModel.polygonSymbol = getSymbol(theme, 'polygon') as SimpleFillSymbol;
  }, [theme]);

  const handleToolClick = (tool: 'circle' | 'polyline' | 'polygon') => {
    if (tool === selectedTool) {
      setSelectedTool(undefined);
    } else {
      setSelectedTool(tool);
      sketchViewModel.create(
        tool as 'circle' | 'point' | 'multipoint' | 'polyline' | 'polygon' | 'mesh' | 'rectangle'
      );
    }
  };

  return (
    <Card style={{ ...props.style }}>
      <CardContent style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
        <Button
          variant={selectedTool === 'circle' ? 'primary' : 'secondary'}
          label='Draw path with circle'
          onClick={() => handleToolClick('circle')}
        >
          <Icon name='circle' size='s' />
        </Button>
        <Button
          variant={selectedTool === 'polyline' ? 'primary' : 'secondary'}
          label='Draw path with line'
          onClick={() => handleToolClick('polyline')}
        >
          <Icon name='share-point-up' size='s' />
        </Button>
        <Button
          variant={selectedTool === 'polygon' ? 'primary' : 'secondary'}
          label='Draw path with polygon'
          onClick={() => handleToolClick('polygon')}
        >
          <Icon name='rectangle' size='s' />
        </Button>
        {hasGraphic && (
          <Button
            variant='secondary'
            label='Clear'
            onClick={() => {
              sketchViewModel.layer.removeAll();
              setHasGraphic(false);
              if (selectedTool) {
                sketchViewModel.create(selectedTool as 'circle' | 'polyline' | 'polygon');
              }
            }}
          >
            <Icon name='trash' size='s' />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DrawToolbar;
