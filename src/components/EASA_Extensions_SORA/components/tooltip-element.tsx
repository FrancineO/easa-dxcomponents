import { Tooltip, useElement } from '@pega/cosmos-react-core';

interface TooltipElementProps {
  tooltipContent?: string | string[];
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
        {Array.isArray(tooltipContent) ? tooltipContent.join('\n\n') : tooltipContent}
      </Tooltip>
    </>
  );
};

export default TooltipElement;
