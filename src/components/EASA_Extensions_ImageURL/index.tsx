import { withConfiguration, Image, Flex } from '@pega/cosmos-react-core';
import StyledExtensionsImageUrlWrapper from './styles';

enum Alignment {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

// interface for props
interface ExtensionsImageUrlProps {
  value: string;
  source?: string;
  altText: string;
  width: number;
  alignment: Alignment;
}

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function ExtensionsImageUrl(props: ExtensionsImageUrlProps) {
  const { value, source, altText, width, alignment } = props;
  if (!value) return null;

  let justifyValue = 'left';
  switch (alignment) {
    case Alignment.RIGHT:
      justifyValue = 'end';
      break;
    case Alignment.CENTER:
      justifyValue = 'center';
      break;
    case Alignment.LEFT:
    default:
      justifyValue = 'start';
      break;
  }

  return (
    <StyledExtensionsImageUrlWrapper>
      <Flex
        container={{
          justify: justifyValue as
            | 'start'
            | 'end'
            | 'center'
            | 'between'
            | 'around'
            | 'evenly'
            | 'stretch'
        }}
      >
        <Image src={value || source} alt={altText} width={width} />
      </Flex>
    </StyledExtensionsImageUrlWrapper>
  );
}

export default withConfiguration(ExtensionsImageUrl);
