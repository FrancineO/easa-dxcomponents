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
        {Array.isArray(tooltipContent) ? (
          <div>
            {tooltipContent.map((content, index) => (
              <div
                key={content}
                style={{ paddingBottom: index === tooltipContent.length - 1 ? 0 : '0.5rem' }}
              >
                {content}
              </div>
            ))}
          </div>
        ) : (
          tooltipContent
        )}
      </Tooltip>
    </>
  );
};

export default TooltipElement;
