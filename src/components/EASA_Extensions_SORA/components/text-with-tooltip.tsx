import { Text, Tooltip, useElement } from '@pega/cosmos-react-core';
import type { TextProps } from '@pega/cosmos-react-core';

interface TextWithTooltipProps extends TextProps {
  style?: React.CSSProperties;
  tooltipContent?: string;
}

const TextWithTooltip = ({ tooltipContent, style, ...textProps }: TextWithTooltipProps) => {
  const [el, setEl] = useElement();
  if (!tooltipContent) {
    return <Text {...textProps} />;
  }

  return (
    <>
      <Text style={style ? { ...style } : {}} ref={setEl} {...textProps} />
      <Tooltip content={tooltipContent} target={el}>
        {tooltipContent}
      </Tooltip>
    </>
  );
};

export default TextWithTooltip;
