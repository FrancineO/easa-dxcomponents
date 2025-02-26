import { Tooltip, useElement } from '@pega/cosmos-react-core';

interface TooltipElementProps {
  tooltipContent?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const TooltipElement = ({ tooltipContent, children, style }: TooltipElementProps) => {
  const [el, setEl] = useElement();

  if (!tooltipContent) {
    return <div style={style}>{children}</div>;
  }

  return (
    <>
      <div ref={setEl} style={style}>
        {children}
      </div>
      <Tooltip content={tooltipContent} target={el}>
        {tooltipContent}
      </Tooltip>
    </>
  );
};

export default TooltipElement;
