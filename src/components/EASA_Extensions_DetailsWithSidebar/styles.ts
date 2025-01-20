// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';
import { defaultThemeProp } from '@pega/cosmos-react-core';

export default styled.div(() => {
  return css`
    margin: 0px 0;
  `;
});

export const StyledDetailsGridContainer = styled.div(() => {
  return css`
    // margin-line-start: 1;
  `;
});

export const StyledHighlightedFieldsHrLine = styled.hr(() => {
  return css`
    line: {
      margin: '0.75rem 0';
      opacity: '50%';
    }
  `;
});

export const StyledGridContainer = styled.div(() => {
  return css``;
});
StyledGridContainer.defaultProps = defaultThemeProp;

export const StyledGridItem = styled.div(() => {
  return css`
    span {
    }
  `;
});
StyledGridItem.defaultProps = defaultThemeProp;
