import { FieldValueList, Text } from '@pega/cosmos-react-core';
import type { PConnProps } from './PConnProps';

interface ImageContainerProps extends PConnProps {
  field?: any;
  children?: never;
}

const ImageContainer = (props: ImageContainerProps) => {
  const { getPConnect, field } = props;

  field.config.displayMode = 'DISPLAY_ONLY';

  const configProps = getPConnect().resolveConfigProps(field.config);

  // @ts-ignore
  const reactField = getPConnect().createComponent(field);

  return (
    <FieldValueList
      style={{ width: '20rem' }}
      variant='stacked'
      data-testid={field.testId}
      fields={[
        {
          id: '2',
          name: configProps.hideLabel ? '' : configProps.label,
          value: (
            <Text variant='h1' as='span'>
              {reactField}
            </Text>
          )
        }
      ]}
    />
  );
};

export default ImageContainer;
