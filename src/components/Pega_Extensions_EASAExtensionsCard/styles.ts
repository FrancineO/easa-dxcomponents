// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';
import { themeDefinition, defaultThemeProp } from '@pega/cosmos-react-core';

// export default styled.div(() => {
//   return css`
//    margin: 0px 0;
//  `;
// });
// const StyledCard = styled.article(({ theme }: { theme: typeof themeDefinition }) => {
//  return css`
//    background-color: ${theme.base.colors.white};
//    border-radius: 0.25rem;
//    width: 100%;
//  `;
// });
// export default StyledCard;
// interface for props

export const StyledCard = styled.article(({ theme }: { theme: typeof themeDefinition }) => {
  return css`
    background-color: ${theme.base.colors.white};
    width: 100%;
    border: 0.0625rem solid ${theme.base.palette['border-line']};
    border-radius: 0.25rem;
  `;
});

export const StyledDetailsGridContainer = styled.div(() => {
  return css`
    // margin-line-start: 1;
  `;
});

export const StyledPegaExtensionsEasaExtensionsCardWrapper = styled.div(() => {
  return css`
    // margin-line-start: 1;
  `;
});

export const StyledHighlightedFieldsHrLine = styled.hr(() => {
  return css`
    line: {
      margin: '5rem';
      opacity: '100%';
      border-color: 11T20;
    }
  `;
});

export const StyledImageContainer = styled.div(() => {
  return css`
    // margin-line-start: 1;
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
