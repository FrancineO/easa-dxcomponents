import {
  Progress,
  Card,
  CardHeader,
  CardContent,
  useTheme,
  Button,
  Icon,
  registerIcon
} from '@pega/cosmos-react-core';
import { StyledCardContent } from './styles';
import * as More from '@pega/cosmos-react-core/lib/components/Icon/icons/more.icon';

registerIcon(More);

export type TaskProps = {
  propertyToForward: string;
  properties: any;
  classname: string;
  details?: any;
  getPConnect: any;
};

export const Task = (props: TaskProps) => {
  const { propertyToForward, classname, details, properties, getPConnect } = props;
  const theme = useTheme();

  // const addProps = (obj: any, arr: Array<string> | string, val: any) => {
  //   if (typeof arr === 'string') arr = arr.split('.');

  //   obj[arr[0]] = obj[arr[0]] || {};

  //   const tmpObj = obj[arr[0]];

  //   if (arr.length > 1) {
  //     arr.shift();
  //     addProps(tmpObj, arr, val);
  //   } else obj[arr[0]] = val;

  //   return obj;
  // };

  // const startingFields = addProps({}, propertyToForward, details.props.pyGUID);

  const createCase = () => {
    const options = {
      openCaseViewAfterCreate: true,
      startingFields: {
        pyAddCaseContextPage: {
          pyGUID: properties[propertyToForward]
        }
      }
    };
    getPConnect().getActionsApi().createWork(classname, options);
  };

  const onClick = () => {
    createCase();
  };

  return (
    <StyledCardContent theme={theme}>
      <Card>
        <CardHeader
          actions={
            <Button variant='simple' label='Request a change' icon compact onClick={onClick}>
              <Icon name='more' size='s' />
            </Button>
          }
        >
          {' '}
        </CardHeader>
        <CardContent>
          {details || <Progress placement='inline' message='Loading content...' />}
        </CardContent>
      </Card>
    </StyledCardContent>
  );
};
