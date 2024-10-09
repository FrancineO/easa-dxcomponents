// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';
import { themeDefinition } from '@pega/cosmos-react-core';

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

export const StyledCard = styled.article(({ theme }: { theme: typeof themeDefinition }) => {
  return css`
    background-color: ${theme.base.colors.white};
    border-radius: 0.25rem;
    width: 100%;
    border-style: 1px;
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
      margin: '0.75rem 0';
      opacity: '50%';
    }
  `;
});
