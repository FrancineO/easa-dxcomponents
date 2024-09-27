import { createGlobalStyle } from 'styled-components';
import { type themeDefinition } from '@pega/cosmos-react-core';

const GlobalStyles = createGlobalStyle<{ theme: typeof themeDefinition }>`
:root{
 div[data-testid=':field-value-item:']:has(.image-url-container) {
      width: 100%;
    }
  }`;

export default GlobalStyles;
