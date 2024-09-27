import {
  Progress,
  Card,
  CardHeader,
  CardContent,
  Text,
  useTheme,
  Button,
  Icon,
  registerIcon
} from '@pega/cosmos-react-core';
import { StyledCardContent } from './styles';
import * as ChatTyping from '@pega/cosmos-react-core/lib/components/Icon/icons/chat-typing.icon';

registerIcon(ChatTyping);

export type TaskProps = {
  title: string;
  classname: string;
  details?: any;
  getPConnect: any;
};

export const Task = (props: TaskProps) => {
  const { title, classname, details, getPConnect } = props;
  const theme = useTheme();

  const createCase = () => {
    const options = {
      openCaseViewAfterCreate: true,
      startingFields: {
        pyAddCaseContextPage: {
          pyGUID: details.props.pyGUID
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
              <Icon name='chat-typing' size='s' />
            </Button>
          }
        >
          <Text variant='h3'>{title}</Text>
        </CardHeader>
        <CardContent>
          {details || <Progress placement='inline' message='Loading content...' />}
        </CardContent>
      </Card>
    </StyledCardContent>
  );
};
