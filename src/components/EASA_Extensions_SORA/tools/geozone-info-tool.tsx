import { Button, Icon } from '@pega/cosmos-react-core';
import * as Waypoint from '@pega/cosmos-react-core/lib/components/Icon/icons/waypoint.icon';
import { registerIcon } from '@pega/cosmos-react-core';

registerIcon(Waypoint);

const GeozoneInfoTool = () => {
  return (
    <Button
      variant='simple'
      onClick={() => {
        // TODO: Implement geozone info display
      }}
    >
      <Icon name='waypoint' role='img' aria-label='waypoint icon' className='icon' />
    </Button>
  );
};

export default GeozoneInfoTool;
