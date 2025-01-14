import { Icon, useTheme } from '@pega/cosmos-react-core';
import { Button } from '@pega/cosmos-react-core';
import { CardContent } from '@pega/cosmos-react-core';
import { Card } from '@pega/cosmos-react-core';
import { useEffect, useState } from 'react';
import { View } from '.';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import type GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import type Graphic from '@arcgis/core/Graphic';
import { createGraphic } from './utils';

interface Props {
  style?: React.CSSProperties;
  graphicsLayer: GraphicsLayer;
}

export const DrawToolbar = (props: Props) => {
  const [selectedTool, setSelectedTool] = useState<string>();
  const [handleCreate, setHandleCreate] = useState<any>();
  const [sketchViewModel, setSketchViewModel] = useState<SketchViewModel | null>(null);
  const [graphic, setGraphic] = useState<Graphic | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (handleCreate) return;
    View.when(() => {
      const vm = new SketchViewModel({
        view: View,
        layer: props.graphicsLayer,
        updateOnGraphicClick: true
      });
      const hc = vm.on('create', event => {
        if (event.state === 'start') {
          setGraphic(null);
          props.graphicsLayer.removeAll();
        }
        if (event.state === 'complete') {
          setGraphic(event.graphic);
          vm.create(
            selectedTool as
              | 'circle'
              | 'point'
              | 'multipoint'
              | 'polyline'
              | 'polygon'
              | 'mesh'
              | 'rectangle'
          );
        }
      });
      setHandleCreate(hc);
      setSketchViewModel(vm);
    });
  }, [selectedTool, props.graphicsLayer, handleCreate]);

  useEffect(() => {
    if (!graphic) {
      props.graphicsLayer.removeAll();
      return;
    }
    createGraphic(props.graphicsLayer, View, graphic.geometry, true, theme);
  }, [graphic, props.graphicsLayer, theme]);

  const handleToolClick = (tool: 'circle' | 'polyline' | 'polygon') => {
    if (!sketchViewModel) return;
    setSelectedTool(tool);
    sketchViewModel.create(
      tool as 'circle' | 'point' | 'multipoint' | 'polyline' | 'polygon' | 'mesh' | 'rectangle'
    );
  };

  return (
    <Card style={{ ...props.style }}>
      <CardContent style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
        <Button
          variant={selectedTool === 'circle' ? 'primary' : 'secondary'}
          label='Draw path with circle'
          onClick={() => handleToolClick('circle')}
        >
          <Icon name='circle' />
        </Button>
        <Button
          variant={selectedTool === 'polyline' ? 'primary' : 'secondary'}
          label='Draw path with line'
          onClick={() => handleToolClick('polyline')}
        >
          <Icon name='share-point-up' />
        </Button>
        <Button
          variant={selectedTool === 'polygon' ? 'primary' : 'secondary'}
          label='Draw path with polygon'
          onClick={() => handleToolClick('polygon')}
        >
          <Icon name='rectangle' />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DrawToolbar;
