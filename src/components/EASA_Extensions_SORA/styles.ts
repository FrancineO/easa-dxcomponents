import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    /* stylelint-disable unit-allowed-list, no-duplicate-selectors, selector-type-no-unknown, font-family-no-missing-generic-family-keyword */
    width: 100%;
    height: 100%;

    body {
      --esri-calcite-theme-name: 'light';
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/77156710-6a58-4606-b189-b4185e75967b.woff2')
        format('woff2');
      font-weight: 300;
      font-style: normal;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/77caabd3-1877-4634-85c8-8e398a093b99.woff2')
        format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/014f2daa-c310-4a36-b9fd-79a8e0c48d44.woff2')
        format('woff2');
      font-weight: 400;
      font-style: italic;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/b0b84e4d-2164-45c7-a674-1662f19f3ba6-basic.woff2')
        format('woff2');
      font-weight: 500;
      font-style: normal;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/e78b17bb-11fb-4860-8d66-4ee0d0c1e117.woff2')
        format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/77156710-6a58-4606-b189-b4185e75967b-ext.woff2')
        format('woff2');
      font-weight: 300;
      font-style: normal;
      unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF, U+02B0-02FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/77caabd3-1877-4634-85c8-8e398a093b99-ext.woff2')
        format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF, U+02B0-02FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/014f2daa-c310-4a36-b9fd-79a8e0c48d44-ext.woff2')
        format('woff2');
      font-weight: 400;
      font-style: italic;
      unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF, U+02B0-02FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/b0b84e4d-2164-45c7-a674-1662f19f3ba6-ext.woff2')
        format('woff2');
      font-weight: 500;
      font-style: normal;
      unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF, U+02B0-02FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/e78b17bb-11fb-4860-8d66-4ee0d0c1e117-ext.woff2')
        format('woff2');
      font-weight: 700;
      font-style: normal;
      unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF, U+02B0-02FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/77156710-6a58-4606-b189-b4185e75967b-greek.woff2')
        format('woff2');
      font-weight: 300;
      font-style: normal;
      unicode-range: U+0370-03FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/77caabd3-1877-4634-85c8-8e398a093b99-greek.woff2')
        format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+0370-03FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/014f2daa-c310-4a36-b9fd-79a8e0c48d44-greek.woff2')
        format('woff2');
      font-weight: 400;
      font-style: italic;
      unicode-range: U+0370-03FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/a1049d00-54ad-4589-95b8-d353f7ab52f0-greek.woff2')
        format('woff2');
      font-weight: 500;
      font-style: normal;
      unicode-range: U+0370-03FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/e78b17bb-11fb-4860-8d66-4ee0d0c1e117-greek.woff2')
        format('woff2');
      font-weight: 700;
      font-style: normal;
      unicode-range: U+0370-03FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/174d458a-81e0-4174-9473-35e3bf0a613c.woff2')
        format('woff2');
      font-weight: 300;
      font-style: normal;
      unicode-range: U+0400-04FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/7db1f672-3a8f-4d19-9c49-7f61aed450b5.woff2')
        format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+0400-04FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/b17468ea-cf53-4635-984b-4d930a68ed4d.woff2')
        format('woff2');
      font-weight: 400;
      font-style: italic;
      unicode-range: U+0400-04FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/b0b84e4d-2164-45c7-a674-1662f19f3ba6.woff2')
        format('woff2');
      font-weight: 500;
      font-style: normal;
      unicode-range: U+0400-04FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/40d36b4a-60c6-460a-bf43-4c948c23563e.woff2')
        format('woff2');
      font-weight: 700;
      font-style: normal;
      unicode-range: U+0400-04FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/281f890c-8412-4ee3-84ed-8b5d062d2ab8.woff2')
        format('woff2');
      font-weight: 300;
      font-style: normal;
      unicode-range: U+10A0-10FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/281f890c-8412-4ee3-84ed-8b5d062d2ab8.woff2')
        format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+10A0-10FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/1fed34fa-250a-4d32-9f1d-42f978a2e0b2.woff2')
        format('woff2');
      font-weight: 500;
      font-style: normal;
      unicode-range: U+10A0-10FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/2200dfff-da50-40b0-bc12-5e4b872a1998.woff2')
        format('woff2');
      font-weight: 700;
      font-style: normal;
      unicode-range: U+10A0-10FF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/2a1ae9a5-b6b5-405c-b660-bbdf1b356952.woff2')
        format('woff2');
      font-weight: 300;
      font-style: normal;
      unicode-range: U+0600-06FF, U+FB50-FDFF, U+FE70-FEFF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/6ea5fa46-5311-450b-8744-288a30c55348.woff2')
        format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+0600-06FF, U+FB50-FDFF, U+FE70-FEFF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/97694c53-4e94-4f9e-969b-a148adfcdcfd.woff2')
        format('woff2');
      font-weight: 500;
      font-style: normal;
      unicode-range: U+0600-06FF, U+FB50-FDFF, U+FE70-FEFF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/97694c53-4e94-4f9e-969b-a148adfcdcfd.woff2')
        format('woff2');
      font-weight: 700;
      font-style: normal;
      unicode-range: U+0600-06FF, U+FB50-FDFF, U+FE70-FEFF;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/31da4b04-f98a-4b5f-b545-a31d26da99e5.woff2')
        format('woff2');
      font-weight: 300;
      font-style: normal;
      unicode-range: U+0590-05FF, U+FB00-FB4F;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/31da4b04-f98a-4b5f-b545-a31d26da99e5.woff2')
        format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+0590-05FF, U+FB00-FB4F;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/32a2c5cf-6736-44a6-a276-49ba7e030944.woff2')
        format('woff2');
      font-weight: 400;
      font-style: italic;
      unicode-range: U+0590-05FF, U+FB00-FB4F;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/a9eaf4d3-6427-42df-9306-3ea1270f7b1a.woff2')
        format('woff2');
      font-weight: 500;
      font-style: normal;
      unicode-range: U+0590-05FF, U+FB00-FB4F;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/a9eaf4d3-6427-42df-9306-3ea1270f7b1a.woff2')
        format('woff2');
      font-weight: 700;
      font-style: normal;
      unicode-range: U+0590-05FF, U+FB00-FB4F;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/94aa531e-7746-4df0-bb6e-349891f2eda5.woff2')
        format('woff2');
      font-weight: 300;
      font-style: normal;
      unicode-range: U+0900-097F;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/3ae1e25e-3aa6-4061-a016-a079159f9d65.woff2')
        format('woff2');
      font-weight: 400;
      font-style: normal;
      unicode-range: U+0900-097F;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/41331c3c-3759-4462-8695-33c9a21b6a5b.woff2')
        format('woff2');
      font-weight: 500;
      font-style: normal;
      unicode-range: U+0900-097F;
      font-display: auto;
    }

    @font-face {
      font-family: 'Avenir Next';
      src: url('https://js.arcgis.com/4.19/esri/themes/base/fonts/fonts/41331c3c-3759-4462-8695-33c9a21b6a5b.woff2')
        format('woff2');
      font-weight: 700;
      font-style: normal;
      unicode-range: U+0900-097F;
      font-display: auto;
    }

    @font-face {
      font-family: 'CalciteWebCoreIcons';
      src:
        url('https://js.arcgis.com/4.19/esri/themes/base/icons/fonts/CalciteWebCoreIcons.ttf?qt9ftt')
          format('truetype'),
        url('https://js.arcgis.com/4.19/esri/themes/base/icons/fonts/CalciteWebCoreIcons.woff?qt9ftt')
          format('woff'),
        url('https://js.arcgis.com/4.19/esri/themes/base/icons/fonts/CalciteWebCoreIcons.svg?qt9ftt#CalciteWebCoreIcons')
          format('svg');
      font-weight: normal;
      font-style: normal;
    }

    [class^='esri-icon-'],
    .esri-building-phase-picker__arrow-left,
    .esri-building-phase-picker__arrow-right,
    .esri-building-level-picker__arrow-up,
    .esri-building-level-picker__arrow-down,
    [class*=' esri-icon-'] {
      font-family: 'CalciteWebCoreIcons' !important;
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .esri-icon-close::before {
      content: '';
      color: inherit;
    }

    .esri-icon-drag-horizontal::before {
      content: '';
      color: inherit;
    }

    .esri-icon-drag-vertical::before {
      content: '';
      color: inherit;
    }

    .esri-icon-handle-horizontal::before {
      content: '';
      color: inherit;
    }

    .esri-icon-handle-vertical::before {
      content: '';
      color: inherit;
    }

    .esri-icon-check-mark::before {
      content: '';
      color: inherit;
    }

    .esri-icon-left-triangle-arrow::before {
      content: '';
      color: inherit;
    }

    .esri-icon-right-triangle-arrow::before {
      content: '';
      color: inherit;
    }

    .esri-icon-down-arrow::before {
      content: '';
      color: inherit;
    }

    .esri-icon-up-arrow::before {
      content: '';
      color: inherit;
    }

    .esri-icon-overview-arrow-bottom-left::before {
      content: '';
      color: inherit;
    }

    .esri-icon-overview-arrow-bottom-right::before {
      content: '';
      color: inherit;
    }

    .esri-icon-overview-arrow-top-left::before {
      content: '';
      color: inherit;
    }

    .esri-icon-overview-arrow-top-right::before {
      content: '';
      color: inherit;
    }

    .esri-icon-maximize::before {
      content: '';
      color: inherit;
    }

    .esri-icon-minimize::before {
      content: '';
      color: inherit;
    }

    .esri-icon-checkbox-unchecked::before {
      content: '';
      color: inherit;
    }

    .esri-icon-checkbox-checked::before {
      content: '';
      color: inherit;
    }

    .esri-icon-radio-unchecked::before {
      content: '';
      color: inherit;
    }

    .esri-icon-radio-checked::before {
      content: '';
      color: inherit;
    }

    .esri-icon-up-arrow-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-down-arrow-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-left-arrow-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-right-arrow-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-zoom-out-fixed::before {
      content: '';
      color: inherit;
    }

    .esri-icon-zoom-in-fixed::before {
      content: '';
      color: inherit;
    }

    .esri-icon-refresh::before {
      content: '';
      color: inherit;
    }

    .esri-icon-edit::before {
      content: '';
      color: inherit;
    }

    .esri-icon-authorize::before {
      content: '';
      color: inherit;
    }

    .esri-icon-map-pin::before {
      content: '';
      color: inherit;
    }

    .esri-icon-blank-map-pin::before {
      content: '';
      color: inherit;
    }

    .esri-icon-table::before {
      content: '';
      color: inherit;
    }

    .esri-icon-plus::before {
      content: '';
      color: inherit;
    }

    .esri-icon-minus::before {
      content: '';
      color: inherit;
    }

    .esri-icon-beginning::before {
      content: '';
      color: inherit;
    }

    .esri-icon-reverse::before {
      content: '';
      color: inherit;
    }

    .esri-icon-pause::before {
      content: '';
      color: inherit;
    }

    .esri-icon-play::before {
      content: '';
      color: inherit;
    }

    .esri-icon-forward::before {
      content: '';
      color: inherit;
    }

    .esri-icon-end::before {
      content: '';
      color: inherit;
    }

    .esri-icon-erase::before {
      content: '';
      color: inherit;
    }

    .esri-icon-up-down-arrows::before {
      content: '';
      color: inherit;
    }

    .esri-icon-left::before,
    .esri-building-phase-picker__arrow-left::before,
    .esri-building-phase-picker__arrow-right::before,
    .esri-building-level-picker__arrow-up::before,
    .esri-building-level-picker__arrow-down::before {
      content: '';
      color: inherit;
    }

    .esri-icon-right::before {
      content: '';
      color: inherit;
    }

    .esri-icon-announcement::before {
      content: '';
      color: inherit;
    }

    .esri-icon-notice-round::before {
      content: '';
      color: inherit;
    }

    .esri-icon-notice-triangle::before {
      content: '';
      color: inherit;
    }

    .esri-icon-home::before {
      content: '';
      color: inherit;
    }

    .esri-icon-locate::before {
      content: '';
      color: inherit;
    }

    .esri-icon-expand::before {
      content: '';
      color: inherit;
    }

    .esri-icon-collapse::before {
      content: '';
      color: inherit;
    }

    .esri-icon-layer-list::before {
      content: '';
      color: inherit;
    }

    .esri-icon-basemap::before {
      content: '';
      color: inherit;
    }

    .esri-icon-globe::before {
      content: '';
      color: inherit;
    }

    .esri-icon-applications::before {
      content: '';
      color: inherit;
    }

    .esri-icon-arrow-up-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-arrow-down-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-arrow-left-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-arrow-right-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-minus-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-plus-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-add-attachment::before {
      content: '';
      color: inherit;
    }

    .esri-icon-attachment::before {
      content: '';
      color: inherit;
    }

    .esri-icon-calendar::before {
      content: '';
      color: inherit;
    }

    .esri-icon-close-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-browser::before {
      content: '';
      color: inherit;
    }

    .esri-icon-collection::before {
      content: '';
      color: inherit;
    }

    .esri-icon-comment::before {
      content: '';
      color: inherit;
    }

    .esri-icon-configure-popup::before {
      content: '';
      color: inherit;
    }

    .esri-icon-contact::before {
      content: '';
      color: inherit;
    }

    .esri-icon-dashboard::before {
      content: '';
      color: inherit;
    }

    .esri-icon-deny::before {
      content: '';
      color: inherit;
    }

    .esri-icon-description::before {
      content: '';
      color: inherit;
    }

    .esri-icon-directions::before {
      content: '';
      color: inherit;
    }

    .esri-icon-directions2::before {
      content: '';
      color: inherit;
    }

    .esri-icon-documentation::before {
      content: '';
      color: inherit;
    }

    .esri-icon-duplicate::before {
      content: '';
      color: inherit;
    }

    .esri-icon-review::before {
      content: '';
      color: inherit;
    }

    .esri-icon-environment-settings::before {
      content: '';
      color: inherit;
    }

    .esri-icon-error::before {
      content: '';
      color: inherit;
    }

    .esri-icon-error2::before {
      content: '';
      color: inherit;
    }

    .esri-icon-experimental::before {
      content: '';
      color: inherit;
    }

    .esri-icon-feature-layer::before {
      content: '';
      color: inherit;
    }

    .esri-icon-filter::before {
      content: '';
      color: inherit;
    }

    .esri-icon-grant::before {
      content: '';
      color: inherit;
    }

    .esri-icon-group::before {
      content: '';
      color: inherit;
    }

    .esri-icon-key::before {
      content: '';
      color: inherit;
    }

    .esri-icon-labels::before {
      content: '';
      color: inherit;
    }

    .esri-icon-tag::before {
      content: '';
      color: inherit;
    }

    .esri-icon-layers::before {
      content: '';
      color: inherit;
    }

    .esri-icon-left-arrow::before {
      content: '';
      color: inherit;
    }

    .esri-icon-right-arrow::before {
      content: '';
      color: inherit;
    }

    .esri-icon-link-external::before {
      content: '';
      color: inherit;
    }

    .esri-icon-link::before {
      content: '';
      color: inherit;
    }

    .esri-icon-loading-indicator::before {
      content: '';
      color: inherit;
    }

    .esri-icon-maps::before {
      content: '';
      color: inherit;
    }

    .esri-icon-marketplace::before {
      content: '';
      color: inherit;
    }

    .esri-icon-media::before {
      content: '';
      color: inherit;
    }

    .esri-icon-media2::before {
      content: '';
      color: inherit;
    }

    .esri-icon-menu::before {
      content: '';
      color: inherit;
    }

    .esri-icon-mobile::before {
      content: '';
      color: inherit;
    }

    .esri-icon-phone::before {
      content: '';
      color: inherit;
    }

    .esri-icon-navigation::before {
      content: '';
      color: inherit;
    }

    .esri-icon-pan::before {
      content: '';
      color: inherit;
    }

    .esri-icon-printer::before {
      content: '';
      color: inherit;
    }

    .esri-icon-pie-chart::before {
      content: '';
      color: inherit;
    }

    .esri-icon-chart::before {
      content: '';
      color: inherit;
    }

    .esri-icon-line-chart::before {
      content: '';
      color: inherit;
    }

    .esri-icon-question::before {
      content: '';
      color: inherit;
    }

    .esri-icon-resend-invitation::before {
      content: '';
      color: inherit;
    }

    .esri-icon-rotate::before {
      content: '';
      color: inherit;
    }

    .esri-icon-save::before {
      content: '';
      color: inherit;
    }

    .esri-icon-settings::before {
      content: '';
      color: inherit;
    }

    .esri-icon-settings2::before {
      content: '';
      color: inherit;
    }

    .esri-icon-share::before {
      content: '';
      color: inherit;
    }

    .esri-icon-sign-out::before {
      content: '';
      color: inherit;
    }

    .esri-icon-support::before {
      content: '';
      color: inherit;
    }

    .esri-icon-user::before {
      content: '';
      color: inherit;
    }

    .esri-icon-time-clock::before {
      content: '';
      color: inherit;
    }

    .esri-icon-trash::before {
      content: '';
      color: inherit;
    }

    .esri-icon-upload::before {
      content: '';
      color: inherit;
    }

    .esri-icon-download::before {
      content: '';
      color: inherit;
    }

    .esri-icon-zoom-in-magnifying-glass::before {
      content: '';
      color: inherit;
    }

    .esri-icon-search::before {
      content: '';
      color: inherit;
    }

    .esri-icon-zoom-out-magnifying-glass::before {
      content: '';
      color: inherit;
    }

    .esri-icon-locked::before {
      content: '';
      color: inherit;
    }

    .esri-icon-unlocked::before {
      content: '';
      color: inherit;
    }

    .esri-icon-favorites::before {
      content: '';
      color: inherit;
    }

    .esri-icon-compass::before {
      content: '';
      color: inherit;
    }

    .esri-icon-down::before {
      content: '';
      color: inherit;
    }

    .esri-icon-up::before {
      content: '';
      color: inherit;
    }

    .esri-icon-chat::before {
      content: '';
      color: inherit;
    }

    .esri-icon-dock-bottom::before {
      content: '';
      color: inherit;
    }

    .esri-icon-dock-left::before {
      content: '';
      color: inherit;
    }

    .esri-icon-dock-right::before {
      content: '';
      color: inherit;
    }

    .esri-icon-organization::before {
      content: '';
      color: inherit;
    }

    .esri-icon-north-navigation::before {
      content: '';
      color: inherit;
    }

    .esri-icon-locate-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-dial::before {
      content: '';
      color: inherit;
    }

    .esri-icon-polygon::before {
      content: '';
      color: inherit;
    }

    .esri-icon-polyline::before {
      content: '';
      color: inherit;
    }

    .esri-icon-visible::before {
      content: '';
      color: inherit;
    }

    .esri-icon-non-visible::before {
      content: '';
      color: inherit;
    }

    .esri-icon-link-vertical::before {
      content: '';
      color: inherit;
    }

    .esri-icon-unlocked-link-vertical::before {
      content: '';
      color: inherit;
    }

    .esri-icon-link-horizontal::before {
      content: '';
      color: inherit;
    }

    .esri-icon-unlocked-link-horizontal::before {
      content: '';
      color: inherit;
    }

    .esri-icon-swap::before {
      content: '';
      color: inherit;
    }

    .esri-icon-cta-link-external::before {
      content: '';
      color: inherit;
    }

    .esri-icon-reply::before {
      content: '';
      color: inherit;
    }

    .esri-icon-public::before {
      content: '';
      color: inherit;
    }

    .esri-icon-share2::before {
      content: '';
      color: inherit;
    }

    .esri-icon-launch-link-external::before {
      content: '';
      color: inherit;
    }

    .esri-icon-rotate-back::before {
      content: '';
      color: inherit;
    }

    .esri-icon-pan2::before {
      content: '';
      color: inherit;
    }

    .esri-icon-tracking::before {
      content: '';
      color: inherit;
    }

    .esri-icon-expand2::before {
      content: '';
      color: inherit;
    }

    .esri-icon-arrow-down::before {
      content: '';
      color: inherit;
    }

    .esri-icon-arrow-up::before {
      content: '';
      color: inherit;
    }

    .esri-icon-hollow-eye::before {
      content: '';
      color: inherit;
    }

    .esri-icon-play-circled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-volume-off::before {
      content: '';
      color: inherit;
    }

    .esri-icon-volume-on::before {
      content: '';
      color: inherit;
    }

    .esri-icon-bookmark::before {
      content: '';
      color: inherit;
    }

    .esri-icon-lightbulb::before {
      content: '';
      color: inherit;
    }

    .esri-icon-sketch-rectangle::before {
      content: '';
      color: inherit;
    }

    .esri-icon-north-navigation-filled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-default-action::before {
      content: '';
      color: inherit;
    }

    .esri-icon-undo::before {
      content: '';
      color: inherit;
    }

    .esri-icon-redo::before {
      content: '';
      color: inherit;
    }

    .esri-icon-cursor::before {
      content: '';
      color: inherit;
    }

    .esri-icon-cursor-filled::before {
      content: '';
      color: inherit;
    }

    .esri-icon-measure::before {
      content: '';
      color: inherit;
    }

    .esri-icon-measure-line::before {
      content: '';
      color: inherit;
    }

    .esri-icon-measure-area::before {
      content: '';
      color: inherit;
    }

    .esri-icon-legend::before {
      content: '';
      color: inherit;
    }

    .esri-icon-sliders::before {
      content: '';
      color: inherit;
    }

    .esri-icon-sliders-horizontal::before {
      content: '';
      color: inherit;
    }

    .esri-icon-cursor-marquee::before {
      content: '';
      color: inherit;
    }

    .esri-icon-lasso::before {
      content: '';
      color: inherit;
    }

    .esri-icon-elevation-profile::before {
      content: '';
      color: inherit;
    }

    .esri-icon-slice::before {
      content: '';
      color: inherit;
    }

    .esri-icon-line-of-sight::before {
      content: '';
      color: inherit;
    }

    .esri-icon-zoom-to-object::before {
      content: '';
      color: inherit;
    }

    .esri-icon-urban-model::before {
      content: '';
      color: inherit;
    }

    .esri-view {
      display: flex;
      margin: 0;
      padding: 0;
    }

    .esri-view .esri-view-user-storage {
      overflow: hidden;
    }

    .esri-view .esri-view-root {
      position: relative;
      flex: 1 1 100%;
      border: none;
      padding: 0;
      margin: 0;
      -webkit-tap-highlight-color: transparent;
    }

    .esri-view .esri-view-surface {
      position: absolute;
      border: none;
      padding: 0;
      margin: 0;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      -webkit-user-select: none;
      user-select: none;
      direction: ltr;
    }

    .esri-view .esri-view-surface--touch-none {
      touch-action: none;
    }

    .esri-view .esri-view-surface--touch-pan {
      touch-action: pan-x pan-y;
    }

    .esri-view .esri-view-surface--inset-outline {
      outline: 0;
    }

    .esri-view .esri-view-surface--inset-outline:focus::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      outline: auto 5px -webkit-focus-ring-color;
      outline-offset: -3px;
      pointer-events: none;
      overflow: hidden;
    }

    .esri-view .esri-view-surface[data-interacting='true'] {
      cursor: -webkit-grabbing;
    }

    .esri-view .esri-view-surface[data-cursor='copy'] {
      cursor: copy;
    }

    .esri-view .esri-view-surface[data-cursor='crosshair'] {
      cursor: crosshair;
    }

    .esri-view .esri-view-surface[data-cursor='help'] {
      cursor: help;
    }

    .esri-view .esri-view-surface[data-cursor='move'] {
      cursor: move;
    }

    .esri-view .esri-view-surface[data-cursor='pointer'] {
      cursor: pointer;
    }

    .esri-view .esri-view-surface[data-cursor='progress'] {
      cursor: progress;
    }

    .esri-view .esri-view-surface[data-cursor='grab'] {
      cursor: -webkit-grab;
    }

    .esri-view .esri-view-surface[data-cursor='grabbing'] {
      cursor: -webkit-grabbing;
    }

    .esri-view .esri-view-surface[data-cursor='n-resize'] {
      cursor: n-resize;
    }

    .esri-view .esri-view-surface[data-cursor='e-resize'] {
      cursor: e-resize;
    }

    .esri-view .esri-view-surface[data-cursor='s-resize'] {
      cursor: s-resize;
    }

    .esri-view .esri-view-surface[data-cursor='w-resize'] {
      cursor: w-resize;
    }

    .esri-view .esri-view-surface[data-cursor='ne-resize'] {
      cursor: ne-resize;
    }

    .esri-view .esri-view-surface[data-cursor='nw-resize'] {
      cursor: nw-resize;
    }

    .esri-view .esri-view-surface[data-cursor='se-resize'] {
      cursor: se-resize;
    }

    .esri-view .esri-view-surface[data-cursor='sw-resize'] {
      cursor: sw-resize;
    }

    .esri-view .esri-view-surface[data-cursor='ew-resize'] {
      cursor: ew-resize;
    }

    .esri-view .esri-view-surface[data-cursor='ns-resize'] {
      cursor: ns-resize;
    }

    .esri-view .esri-view-surface[data-cursor='nesw-resize'] {
      cursor: nesw-resize;
    }

    .esri-view .esri-view-surface[data-cursor='nwse-resize'] {
      cursor: nwse-resize;
    }

    .esri-view .esri-display-object,
    .esri-view .esri-bitmap {
      position: absolute;
      border: none;
      margin: 0;
      padding: 0;
      -webkit-user-drag: none;
      -webkit-user-select: none;
    }

    .esri-view .esri-bitmap {
      max-width: none;
      transform-origin: top left;
    }

    .esri-ui {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      box-sizing: border-box;
      pointer-events: none;
      overflow: hidden;
      font-size: 14px;
      z-index: 0;
    }

    .esri-ui .esri-component {
      pointer-events: auto;
    }

    .esri-ui .esri-attribution {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .esri-ui-corner {
      position: absolute;
      display: flex;
    }

    .esri-ui-inner-container {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }

    .esri-ui-manual-container > .esri-component {
      position: absolute;
    }

    .esri-ui-manual-container .esri-swipe {
      z-index: -1;
    }

    .esri-ui-top-left,
    .esri-ui-top-right {
      flex-flow: column;
    }

    .esri-ui-top-left {
      align-items: flex-start;
    }

    .esri-ui-top-right {
      align-items: flex-end;
    }

    .esri-ui-bottom-left,
    .esri-ui-bottom-right {
      flex-flow: row;
      align-items: flex-end;
    }

    .esri-ui-bottom-right {
      flex-flow: row-reverse;
    }

    .esri-ui-top-left {
      top: 0;
      left: 0;
    }

    .esri-ui-top-right {
      top: 0;
      right: 0;
    }

    .esri-ui-top-right .esri-component,
    .esri-ui-top-left .esri-component {
      margin-bottom: 10px;
    }

    .esri-ui-bottom-left {
      bottom: 0;
      left: 0;
    }

    .esri-ui-bottom-left .esri-component {
      margin-right: 10px;
    }

    .esri-ui-bottom-right {
      bottom: 0;
      right: 0;
    }

    .esri-ui-bottom-right .esri-component {
      margin-left: 10px;
    }

    html[dir='rtl'] .esri-ui-top-left {
      align-items: flex-end;
    }

    html[dir='rtl'] .esri-ui-top-right {
      align-items: flex-start;
    }

    html[dir='rtl'] .esri-ui-bottom-left {
      flex-direction: row-reverse;
    }

    html[dir='rtl'] .esri-ui-bottom-right {
      flex-direction: row;
    }

    .esri-zoom-box__container {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .esri-zoom-box__overlay {
      cursor: crosshair;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .esri-zoom-box__overlay-background {
      fill: rgba(0, 0, 0, 0.1);
    }

    .esri-zoom-box__outline {
      fill: transparent;
      stroke: #1e90ff;
      stroke-dasharray: 1, 1;
      stroke-width: 2px;
    }

    .esri-overlay-surface {
      position: absolute;
      border: none;
      padding: 0;
      margin: 0;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 0;
      pointer-events: none;
      -webkit-user-select: none;
      user-select: none;
    }

    .esri-text-overlay-item {
      display: block;
      position: absolute;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.3em;
    }

    .esri-text-overlay-item-anchor-bottom {
      transform: translate(-50%, -100%);
    }

    .esri-text-overlay-item-anchor-bottom-right {
      transform: translate(-100%, -100%);
    }

    .esri-text-overlay-item-anchor-bottom-left {
      transform: translate(0, -100%);
    }

    .esri-text-overlay-item-anchor-top {
      transform: translate(-50%, 0);
    }

    .esri-text-overlay-item-anchor-top-right {
      transform: translate(-100%, 0);
    }

    .esri-text-overlay-item-anchor-top-left {
      transform: translate(0, 0);
    }

    .esri-text-overlay-item-anchor-center {
      transform: translate(-50%, -50%);
    }

    .esri-text-overlay-item-anchor-right {
      transform: translate(-100%, -50%);
    }

    .esri-text-overlay-item-anchor-left {
      transform: translate(0, -50%);
    }

    .esri-line-overlay-item {
      display: block;
      position: absolute;
      overflow: hidden;
      white-space: nowrap;
    }

    .esri-widget {
      box-sizing: border-box;
      color: #323232;
      font-size: 14px;
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.3em;
      background-color: #ffffff;
    }

    .esri-widget *,
    .esri-widget *::before,
    .esri-widget *::after {
      box-sizing: inherit;
    }

    .esri-widget.esri-widget--disabled > * {
      pointer-events: none;
      opacity: 0.4;
    }

    .esri-widget__anchor {
      text-decoration: none;
      color: #0079c1;
    }

    .esri-widget__anchor:hover {
      color: #00598e;
    }

    .esri-widget__anchor--disabled {
      pointer-events: none;
      opacity: 0.4;
    }

    .esri-widget__anchor:hover,
    .esri-widget__anchor:focus {
      text-decoration: underline;
    }

    .esri-widget__header {
      align-items: center;
      background-color: #ffffff;
      display: flex;
      flex: 1 0 100%;
      padding: 12px 0 12px 15px;
      justify-content: space-between;
      min-height: 48px;
      width: 100%;
    }

    .esri-widget__header .esri-widget__heading {
      align-items: center;
      color: #6e6e6e;
      display: flex;
      margin: 0;
      padding: 0;
      text-align: initial;
      width: calc(100% - 48px);
    }

    .esri-widget__header-button {
      -webkit-appearance: none;
      align-items: center;
      align-self: stretch;
      background-color: transparent;
      border: none;
      color: #6e6e6e;
      cursor: pointer;
      display: flex;
      flex: 0 0 48px;
      justify-content: center;
      padding: 0;
      width: 48px;
    }

    .esri-widget__heading {
      color: #323232;
      font-weight: 600;
      margin: 0 0 0.5rem;
    }

    h1.esri-widget__heading {
      font-size: 20px;
    }

    h2.esri-widget__heading {
      font-size: 16px;
    }

    h3.esri-widget__heading,
    h4.esri-widget__heading,
    h5.esri-widget__heading,
    h6.esri-widget__heading {
      font-size: 14px;
    }

    .esri-widget__footer {
      align-items: center;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      min-height: 48px;
      width: 100%;
    }

    .esri-widget__footer-pagination {
      align-items: center;
      color: #6e6e6e;
      display: flex;
      justify-content: space-between;
    }

    .esri-widget__footer-pagination-previous-button,
    .esri-widget__footer-pagination-next-button {
      background-color: transparent;
      border: 0;
      margin: 0 7px;
      padding: 12px 15px;
      cursor: pointer;
      transition: background-color 125ms ease-in-out;
    }

    .esri-widget__footer-pagination-previous-button:hover,
    .esri-widget__footer-pagination-previous-button:focus,
    .esri-widget__footer-pagination-next-button:hover,
    .esri-widget__footer-pagination-next-button:focus {
      background-color: #f3f3f3;
      color: #2e2e2e;
    }

    .esri-menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
      background-color: #ffffff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      padding: 0;
      margin: 2px 0 0;
      font-size: 14px;
      line-height: 16px;
      -moz-background-clip: padding;
      background-clip: padding-box;
      overflow: hidden;
      width: 100%;
      visibility: hidden;
      max-height: 0;
    }

    .esri-menu .esri-menu__header {
      padding: 6px 12px;
      background-color: #4c4c4c;
      color: #ffffff;
    }

    .esri-menu__list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .esri-menu__list-item {
      padding: 0.8em 1em;
      cursor: pointer;
      border-top: solid 1px rgba(110, 110, 110, 0.3);
      border-left: 3px solid transparent;
    }

    .esri-menu__list-item:first-child {
      border-top: none;
    }

    .esri-menu__list-item--focus,
    .esri-menu__list-item:hover,
    .esri-menu__list-item:focus {
      background-color: #f3f3f3;
    }

    .esri-menu__list-item:active {
      background-color: #e2f1fb;
    }

    .esri-menu__list-item--active,
    .esri-menu__list-item--active:hover,
    .esri-menu__list-item--active:focus {
      background-color: #e2f1fb;
      border-left-color: #0079c1;
    }

    .esri-menu__list-item [class^='esri-icon'] {
      padding-right: 2.8px;
    }

    .esri-widget__table {
      color: #323232;
      border: none;
      border-collapse: collapse;
      width: 100%;
    }

    .esri-widget__table tr:nth-child(odd) {
      background-color: rgba(76, 76, 76, 0.1);
    }

    .esri-widget__table tr:nth-child(even) {
      background-color: rgba(76, 76, 76, 0.02);
    }

    .esri-widget__table tr a {
      color: #6e6e6e;
    }

    .esri-widget__table tr a:hover,
    .esri-widget__table tr a:focus {
      color: #2e2e2e;
    }

    .esri-widget__table tr td,
    .esri-widget__table tr th {
      padding: 0.5em 0.7em;
      word-break: break-word;
      vertical-align: top;
      font-size: 12px;
      font-weight: 400;
    }

    .esri-widget__table tr th {
      width: 50%;
      text-align: left;
      border-right: 3px solid rgba(0, 0, 0, 0.05);
    }

    .esri-widget__table tr td {
      width: 50%;
    }

    .esri-input {
      background-color: #ffffff;
      border: 1px solid rgba(110, 110, 110, 0.3);
      color: #323232;
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
    }

    .esri-input[type='text'],
    .esri-input[type='password'],
    .esri-input[type='number'] {
      height: 32px;
      padding: 0 0.5em;
    }

    .esri-input::-ms-clear {
      display: none;
    }

    .esri-input::-moz-placeholder {
      color: rgba(50, 50, 50, 0.4);
      opacity: 1;
    }

    .esri-input:-ms-input-placeholder {
      color: rgba(50, 50, 50, 0.4);
    }

    .esri-input::-webkit-input-placeholder {
      color: rgba(50, 50, 50, 0.4);
    }

    .esri-button,
    .esri-elevation-profile__header button {
      align-items: center;
      background-color: #0079c1;
      border: 1px solid #0079c1;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      font-family: inherit;
      font-size: 14px;
      min-height: 32px;
      justify-content: center;
      word-break: normal;
      white-space: normal;
      overflow: hidden;
      padding: 6px 7px;
      width: 100%;
      transition:
        background-color 125ms ease-in-out,
        border 125ms ease-in-out;
    }

    .esri-button:hover,
    .esri-elevation-profile__header button:hover {
      background-color: #00598e;
      border: 1px solid #00598e;
      color: #ffffff;
    }

    .esri-button.esri-button--small,
    .esri-elevation-profile__header button.esri-button--small {
      font-size: 12px;
      min-height: 16px;
    }

    .esri-button.esri-button--half,
    .esri-elevation-profile__header button.esri-button--half {
      display: inline-block;
      width: 50%;
    }

    .esri-button.esri-button--third,
    .esri-elevation-profile__header button.esri-button--third {
      display: inline-block;
      width: 33%;
    }

    .esri-button--secondary {
      background-color: transparent;
      color: #0079c1;
    }

    .esri-button--tertiary,
    .esri-elevation-profile__header button {
      background-color: transparent;
      border-color: transparent;
      color: #0079c1;
    }

    .esri-button--tertiary:hover,
    .esri-elevation-profile__header button:hover {
      background-color: #f3f3f3;
      border-color: transparent;
      color: #00598e;
    }

    .esri-button--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    .esri-button--drill-in {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #ffffff;
      cursor: pointer;
      border: none;
      border-radius: 2px;
      text-align: unset;
      text-decoration: none;
      padding: 12px 7px;
      margin: 12px 7px;
      outline-offset: -4px;
      transition: background-color 125ms ease-in-out;
      box-shadow: 0 0 0 1px rgba(110, 110, 110, 0.3);
    }

    .esri-button--drill-in:hover,
    .esri-button--drill-in:focus {
      background-color: #f3f3f3;
    }

    .esri-button--drill-in__title {
      font-size: 14px;
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .esri-button--drill-in [class*='esri-icon'] {
      padding: 0 7px;
    }

    [class*='esri-icon'] {
      font-size: 16px;
      display: inline-block;
    }

    .esri-widget__content--empty {
      align-items: center;
      color: #6e6e6e;
      display: flex;
      flex-flow: column wrap;
      padding: 18px 22px;
      text-align: center;
    }

    .esri-widget__content--empty h1.esri-widget__heading,
    .esri-widget__content--empty h2.esri-widget__heading,
    .esri-widget__content--empty h3.esri-widget__heading,
    .esri-widget__content--empty h4.esri-widget__heading,
    .esri-widget__content--empty h5.esri-widget__heading {
      font-weight: 400;
    }

    .esri-widget__content-illustration--empty {
      padding: 1rem 0;
      width: 128px;
    }

    .esri-widget__content-icon--empty {
      padding: 0.5rem 0;
      width: 32px;
    }

    .esri-select {
      cursor: pointer;
      display: block;
      font-family: inherit;
      font-size: 0.85em;
      width: 100%;
      height: 32px;
      color: #323232;
      border: 1px solid rgba(110, 110, 110, 0.3);
      margin: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      border-radius: 0;
      padding: 0 0.5em;
      background: url('data:image/svg+xml,%3Csvg width%3D%2732%27%20height%3D%2732%27%20viewBox%3D%270%200%2032%2032%27%20xmlns%3D%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d%3D%27M11%2013l5%205.833L21%2013z%27%20fill%3D%27%236e6e6e%27%20fill-rule%3D%27nonzero%27/%3E%3C/svg%3E')
        no-repeat right center #ffffff;
    }

    .esri-select::-ms-expand {
      display: none;
    }

    .esri-disabled a,
    .esri-disabled [class*='esri-icon'],
    .esri-disabled [role='menu'],
    .esri-disabled [role='checkbox'] {
      color: rgba(110, 110, 110, 0.4);
    }

    .keynav-mode .esri-widget:focus {
      outline: 2px solid #6e6e6e;
      outline-offset: 2px;
      z-index: 1;
    }

    .keynav-mode .esri-widget *:focus {
      outline: 2px solid #6e6e6e;
      outline-offset: 2px;
      z-index: 1;
    }

    .esri-widget__loader-animation {
      animation: esri-rotate 1250ms infinite linear;
      transform: translateZ(0);
      border: 0.15em solid transparent;
      border-color: rgba(50, 50, 50, 0.8) rgba(110, 110, 110, 0.3) rgba(110, 110, 110, 0.3);
      border-radius: 100%;
      display: block;
      font-size: 16px;
      height: 1em;
      width: 1em;
    }

    .esri-widget--button {
      font-size: 14px;
      background-color: #ffffff;
      color: #6e6e6e;
      width: 32px;
      height: 32px;
      padding: 0;
      margin: 0;
      overflow: hidden;
      cursor: pointer;
      text-align: center;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      transition: background-color 125ms ease-in-out;
    }

    .esri-widget--button:hover {
      background-color: #f3f3f3;
      color: #2e2e2e;
    }

    .esri-widget--button:active {
      background-color: #e2f1fb;
    }

    .esri-ui-corner .esri-component {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .esri-ui-corner .esri-expand .esri-widget--panel,
    .esri-ui-corner .esri-expand .esri-widget--panel-height-only,
    .esri-ui-corner .esri-component.esri-widget--panel,
    .esri-ui-corner .esri-component.esri-widget--panel-height-only {
      min-height: 32px;
      transition: max-height 250ms ease-in-out;
      overflow-y: auto;
    }

    .esri-ui-corner .esri-expand .esri-widget--panel,
    .esri-ui-corner .esri-expand .esri-widget--panel-height-only,
    .esri-ui-corner .esri-component > .esri-widget--panel,
    .esri-ui-corner .esri-component.esri-widget--panel {
      width: 300px;
    }

    .esri-ui-corner .esri-expand .esri-widget--panel .esri-widget--panel,
    .esri-ui-corner .esri-expand .esri-widget--panel-height-only .esri-widget--panel,
    .esri-ui-corner .esri-component > .esri-widget--panel .esri-widget--panel,
    .esri-ui-corner .esri-component.esri-widget--panel .esri-widget--panel {
      width: auto;
    }

    .esri-view-height-greater-than-medium .esri-expand .esri-widget--panel,
    .esri-view-height-greater-than-medium .esri-expand .esri-widget--panel-height-only,
    .esri-view-height-greater-than-medium .esri-ui-corner .esri-component.esri-widget--panel,
    .esri-view-height-greater-than-medium
      .esri-ui-corner
      .esri-component.esri-widget--panel-height-only {
      max-height: 680px;
    }

    .esri-view-height-medium .esri-expand .esri-widget--panel,
    .esri-view-height-medium .esri-expand .esri-widget--panel-height-only,
    .esri-view-height-medium .esri-ui-corner .esri-component.esri-widget--panel,
    .esri-view-height-medium .esri-ui-corner .esri-component.esri-widget--panel-height-only {
      max-height: 540px;
    }

    .esri-view-height-small .esri-expand .esri-widget--panel,
    .esri-view-height-small .esri-expand .esri-widget--panel-height-only,
    .esri-view-height-small .esri-ui-corner .esri-component.esri-widget--panel,
    .esri-view-height-small .esri-ui-corner .esri-component.esri-widget--panel-height-only {
      max-height: 420px;
    }

    .esri-view-height-xsmall .esri-expand .esri-widget--panel,
    .esri-view-height-xsmall .esri-expand .esri-widget--panel-height-only,
    .esri-view-height-xsmall .esri-ui-corner .esri-component.esri-widget--panel,
    .esri-view-height-xsmall .esri-ui-corner .esri-component.esri-widget--panel-height-only {
      max-height: 240px;
    }

    .esri-ui-bottom-right .esri-menu,
    .esri-ui-bottom-left .esri-menu {
      top: auto;
      bottom: 100%;
      margin-top: 0;
      margin-bottom: 2px;
    }

    html[dir='rtl'] .esri-widget__table th {
      text-align: right;
      border-right: none;
      border-left: 3px solid rgba(0, 0, 0, 0.05);
    }

    html[dir='rtl'] .esri-select {
      background-position: left 50%;
    }

    html[dir='rtl'] .esri-menu__list-item [class^='esri-icon'] {
      padding-right: 0;
      padding-left: 2px;
    }

    html[dir='rtl'] .esri-menu__list-item {
      border-left: none;
      border-right: 3px solid transparent;
    }

    html[dir='rtl'] .esri-menu__list-item--active {
      border-right-color: #0079c1;
    }

    .esri-icon-font-fallback-text {
      clip: rect(0 0 0 0);
      overflow: hidden;
      position: absolute;
      height: 1px;
      width: 1px;
    }

    [class^='esri-icon'] {
      animation: none;
    }

    @keyframes esri-fade-in {
      0% {
        opacity: 0;
      }

      25% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    .esri-rotating {
      animation: esri-rotate 1250ms infinite linear;
      transform: translateZ(0);
    }

    .esri-clearfix::before,
    .esri-clearfix::after {
      content: ' ';
      display: table;
    }

    .esri-clearfix::after {
      clear: both;
    }

    .esri-interactive {
      cursor: pointer;
    }

    .esri-hidden {
      display: none !important;
    }

    .esri-invisible {
      visibility: hidden !important;
    }

    .esri-offscreen {
      position: absolute;
      top: -999em;
      left: -999em;
    }

    .esri-area-measurement-2d__measurement {
      padding: 12px 15px;
      margin: 12px 0;
      background-color: #f3f3f3;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-area-measurement-2d__container {
      position: relative;
      padding: 12px 0;
      overflow-y: auto;
    }

    .esri-area-measurement-2d__container a {
      text-decoration: none;
    }

    .esri-area-measurement-2d__header {
      position: relative;
      font-size: 12px;
      align-items: flex-start;
      justify-content: space-between;
      display: flex;
      flex: 0 0 auto;
    }

    .esri-area-measurement-2d__header-title,
    h1 .esri-area-measurement-2d__header-title {
      font-size: 16px;
      font-weight: 600;
      padding: 8px 0;
      margin: 0;
      display: block;
      flex: 1;
      word-break: break-word;
      text-align: left;
    }

    .esri-area-measurement-2d__panel--error {
      color: #8c2907;
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-area-measurement-2d__hint {
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-area-measurement-2d__hint-text {
      margin: 12px 0;
      padding: 0;
    }

    .esri-area-measurement-2d__measurement {
      padding: 12px 15px;
      margin: 12px 0;
      background-color: #f3f3f3;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-area-measurement-2d__measurement-item {
      display: flex;
      padding-bottom: 12px;
      flex-flow: column;
    }

    .esri-area-measurement-2d__measurement-item--disabled {
      display: flex;
      color: rgba(50, 50, 50, 0.4);
    }

    .esri-area-measurement-2d__measurement-item-title {
      padding-bottom: 3px;
    }

    .esri-area-measurement-2d__measurement-item-value {
      font-weight: 600;
    }

    .esri-area-measurement-2d__settings {
      display: flex;
      justify-content: space-between;
      padding: 6px 15px;
    }

    .esri-area-measurement-2d__units {
      display: flex;
      flex: 0 1 48%;
      flex-flow: column;
      padding: 0;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-area-measurement-2d__units:only-child {
      flex: 1 0 100%;
    }

    .esri-area-measurement-2d__units-select {
      width: 100%;
      padding-left: 0.5em;
      padding-right: 2.7em;
    }

    .esri-area-measurement-2d__units-select-wrapper {
      width: 100%;
    }

    .esri-area-measurement-2d__actions {
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding: 0 15px;
    }

    html[dir='rtl'] .esri-area-measurement-2d__units-select {
      padding-left: 2.7em;
      padding-right: 0.5em;
    }

    .esri-area-measurement-3d__measurement {
      padding: 12px 15px;
      margin: 12px 0;
      background-color: #f3f3f3;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-area-measurement-3d__container {
      position: relative;
      padding: 12px 0;
      overflow-y: auto;
    }

    .esri-area-measurement-3d__container a {
      text-decoration: none;
    }

    .esri-area-measurement-3d__header {
      position: relative;
      font-size: 12px;
      align-items: flex-start;
      justify-content: space-between;
      display: flex;
      flex: 0 0 auto;
    }

    .esri-area-measurement-3d__header-title,
    h1 .esri-area-measurement-3d__header-title {
      font-size: 16px;
      font-weight: 600;
      padding: 8px 0;
      margin: 0;
      display: block;
      flex: 1;
      word-break: break-word;
      text-align: left;
    }

    .esri-area-measurement-3d__panel--error {
      color: #8c2907;
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-area-measurement-3d__hint {
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-area-measurement-3d__hint-text {
      margin: 12px 0;
      padding: 0;
    }

    .esri-area-measurement-3d__measurement {
      padding: 12px 15px;
      margin: 12px 0;
      background-color: #f3f3f3;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-area-measurement-3d__measurement-item {
      display: flex;
      padding-bottom: 12px;
      flex-flow: column;
    }

    .esri-area-measurement-3d__measurement-item--disabled {
      display: flex;
      color: rgba(50, 50, 50, 0.4);
    }

    .esri-area-measurement-3d__measurement-item-title {
      padding-bottom: 3px;
    }

    .esri-area-measurement-3d__measurement-item-value {
      font-weight: 600;
    }

    .esri-area-measurement-3d__settings {
      display: flex;
      justify-content: space-between;
      padding: 6px 15px;
    }

    .esri-area-measurement-3d__units {
      display: flex;
      flex: 0 1 48%;
      flex-flow: column;
      padding: 0;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-area-measurement-3d__units:only-child {
      flex: 1 0 100%;
    }

    .esri-area-measurement-3d__units-select {
      width: 100%;
      padding-left: 0.5em;
      padding-right: 2.7em;
    }

    .esri-area-measurement-3d__units-select-wrapper {
      width: 100%;
    }

    .esri-area-measurement-3d__actions {
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding: 0 15px;
    }

    html[dir='rtl'] .esri-area-measurement-3d__units-select {
      padding-left: 2.7em;
      padding-right: 0.5em;
    }

    .esri-attribution {
      font-size: 12px;
      line-height: 16px;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }

    .esri-attribution__link {
      color: currentColor;
    }

    .esri-attribution__link:hover,
    .esri-attribution__link:active,
    .esri-attribution__link:visited,
    .esri-attribution__link:focus {
      color: currentColor;
    }

    .esri-attribution__sources {
      font-weight: 300;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 5px;
      align-self: flex-start;
      flex: 1 0;
    }

    .esri-attribution__sources[role='button'] {
      font-size: 1em;
    }

    .esri-attribution__powered-by {
      font-weight: 400;
      padding: 0 5px;
      text-align: right;
      white-space: nowrap;
      align-self: flex-end;
    }

    .esri-attribution--open {
      z-index: 2;
    }

    .esri-attribution__sources--open {
      white-space: normal;
    }

    html[dir='rtl'] .esri-attribution__powered-by {
      text-align: left;
    }

    .esri-attachments {
      background-color: transparent;
      width: 100%;
    }

    .esri-attachments__loader-container {
      height: 150px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .esri-attachments__loader {
      height: 64px;
      width: 100%;
      background: url(https://js.arcgis.com/4.19/esri/themes/base/images/loading-throb.gif)
        no-repeat center center;
    }

    .esri-attachments__actions {
      display: flex;
      flex-flow: row wrap;
      padding: 6px 7px;
    }

    .esri-attachments__item-add-icon {
      padding: 0 3px;
    }

    .esri-attachments__delete-button {
      width: auto;
      color: #8c2907;
      margin-right: auto;
    }

    .esri-attachments .esri-attachments__items {
      display: flex;
      padding: 0;
      margin: 0;
      width: 100%;
    }

    .esri-attachments .esri-attachments__item {
      line-height: 1.2em;
      list-style-type: none;
      margin: 0;
    }

    .esri-attachments__item-button {
      display: flex;
      align-items: center;
      width: 100%;
      background-color: #ffffff;
      cursor: pointer;
      border: 1px solid rgba(110, 110, 110, 0.3);
      border-color: transparent;
      border-radius: 2px;
      color: #6e6e6e;
      text-align: unset;
      text-decoration: none;
      padding: 6px 7px;
      margin: 0 0 6px;
      outline-offset: -4px;
      transition: border-color 125ms ease-in-out;
      box-shadow: 0 1px 0 rgba(110, 110, 110, 0.3);
    }

    .esri-attachments__item-button:focus,
    .esri-attachments__item-button:hover {
      border-color: #000000;
    }

    .esri-attachments__item-link {
      display: block;
      position: relative;
      text-decoration: none;
    }

    .esri-attachments__item-link:hover .esri-attachments__item-link-overlay,
    .esri-attachments__item-link:focus .esri-attachments__item-link-overlay {
      opacity: 1;
    }

    .esri-attachments__item-add {
      background-color: transparent;
      padding: 6px 0;
    }

    .esri-attachments__add-attachment-button {
      border-radius: 2px;
      font-size: 12px;
      justify-content: flex-start;
      padding: 12px 3px;
      transition: background-color 250ms ease-in-out;
    }

    .esri-attachments__add-attachment-button:hover {
      background-color: #ffffff;
      text-decoration: none;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .esri-attachments__item-add-icon {
      padding: 0 7px;
    }

    .esri-attachments__item-link-overlay {
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      -webkit-user-select: none;
      user-select: none;
      transition: opacity 250ms ease-in-out;
    }

    .esri-attachments__item-link-overlay-icon {
      background-color: rgba(76, 76, 76, 0.5);
      border-radius: 100%;
      display: flex;
      padding: 18px;
      align-items: center;
      justify-content: center;
    }

    .esri-attachments__item-link-overlay-icon svg {
      fill: #ffffff;
    }

    .esri-attachments__item-mask {
      display: flex;
      overflow: hidden;
      position: relative;
      justify-content: center;
      align-items: center;
      width: 64px;
      height: 64px;
      box-shadow: 0 0 0 1px rgba(110, 110, 110, 0.15);
    }

    .esri-attachments__item-mask--icon {
      background-color: #f3f3f3;
      padding: 24px 0;
    }

    .esri-attachments__item-mask--icon .esri-attachments__image {
      width: 32px;
      height: 32px;
    }

    .esri-attachments__metadata {
      display: flex;
      justify-content: space-between;
      margin-top: 3px;
    }

    .esri-attachments__metadata .esri-attachments__metadata-fieldset {
      background-color: #ffffff;
      border: none;
      flex: 0 1 calc(50% - 1px);
      font-size: 12px;
      margin: 0;
      padding: 6px 7px;
      text-align: center;
    }

    .esri-attachments__file-name {
      display: inline-block;
      font-size: 12px;
      margin-bottom: 3px;
    }

    .esri-attachments__file-fieldset {
      border: none;
      padding: 12px 7px;
      margin: 0;
    }

    .esri-attachments__file-input {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }

    .esri-attachments__container--list .esri-attachments__items {
      flex-direction: column;
      flex-wrap: nowrap;
    }

    .esri-attachments__container--list .esri-attachments__item-mask {
      flex: 0 0 auto;
      margin-right: 7px;
      position: relative;
    }

    .esri-attachments__container--list .esri-attachments__image {
      max-width: unset;
      max-height: unset;
      left: 50%;
    }

    .esri-attachments__container--list .esri-attachments__label {
      display: flex;
      flex: 1 1 auto;
      justify-content: space-between;
    }

    .esri-attachments__container--list .esri-attachments__filename {
      flex: 1 0 0%;
      cursor: pointer;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-word;
    }

    .esri-attachments__container--list .esri-attachments__item-chevron-icon {
      cursor: pointer;
      flex: 0 0 auto;
      padding: 0 15px;
    }

    .esri-attachments__container--preview .esri-attachments__items {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }

    .esri-attachments__container--preview .esri-attachments__item {
      margin-bottom: 12px;
      width: 100%;
    }

    .esri-attachments__container--preview .esri-attachments__item-mask {
      width: 100%;
      height: auto;
    }

    .esri-attachments__container--preview .esri-attachments__item-button {
      flex-flow: column nowrap;
      box-shadow: none;
    }

    .esri-attachments__container--preview .esri-attachments__item-button .esri-attachments__label {
      margin: 12px 0;
    }

    .esri-attachments__container--preview .esri-attachments__image {
      max-width: 100%;
    }

    .esri-attachments__container--preview .esri-attachments__filename {
      margin-top: 12px;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      width: calc(100% - 15px);
    }

    .esri-attachments__container--preview .esri-attachments__item-mask--icon {
      background-color: transparent;
    }

    .esri-attachments__form-node {
      background-color: #ffffff;
      padding: 6px 7px;
      box-shadow: 0 1px 0 rgba(110, 110, 110, 0.3);
    }

    .esri-attachments__form-node .esri-attachments__item-mask {
      width: unset;
      height: unset;
      box-shadow: none;
    }

    .esri-attachments__form-node .esri-attachments__image {
      max-width: 100%;
    }

    .esri-attachments__error-message {
      padding: 12px 15px;
      margin: 6px 7px;
      background-color: #ffffff;
      border-top: 3px solid #de2900;
      animation: esri-fade-in-down 250ms ease-in-out;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .esri-attachments__progress-bar {
      position: absolute;
      width: 100%;
    }

    .esri-attachments__progress-bar::before,
    .esri-attachments__progress-bar::after {
      content: '';
      opacity: 1;
      position: absolute;
      height: 1px;
      top: 0;
      transition: opacity 500ms ease-in-out;
    }

    .esri-attachments__progress-bar::before {
      background-color: rgba(110, 110, 110, 0.3);
      width: 100%;
      z-index: 0;
    }

    .esri-attachments__progress-bar::after {
      background-color: #6e6e6e;
      width: 20%;
      z-index: 0;
      animation: looping-progresss-bar-ani 1500ms linear infinite;
    }

    [dir='rtl'] .esri-attachments__item-mask {
      margin-right: 0;
      margin-left: 7px;
    }

    .esri-basemap-gallery {
      color: #323232;
      background-color: #ffffff;
      overflow-y: auto;
      position: relative;
      width: auto;
    }

    .esri-basemap-gallery__item-container {
      display: flex;
      flex-flow: column nowrap;
      position: relative;
      transition: opacity 250ms ease-in-out;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .esri-basemap-gallery--source-refreshing .esri-basemap-gallery__item-container,
    .esri-basemap-gallery.esri-disabled .esri-basemap-gallery__item {
      opacity: 0.4;
      pointer-events: none;
      animation: none;
    }

    .esri-basemap-gallery__empty-message {
      padding: 12px 15px;
      animation: esri-fade-in 500ms ease-in-out;
    }

    .esri-basemap-gallery__item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 6px 7px;
      cursor: pointer;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      animation: esri-fade-in 500ms ease-in-out;
      transition: background-color 250ms ease-in-out;
    }

    .esri-basemap-gallery__item:first-child {
      margin-top: 6px;
    }

    .esri-basemap-gallery__loader {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      width: 100%;
      animation: esri-fade-in 500ms ease-in-out;
    }

    .esri-basemap-gallery__loader::before,
    .esri-basemap-gallery__loader::after {
      content: '';
      opacity: 1;
      position: absolute;
      height: 1px;
      top: 0;
      transition: opacity 500ms ease-in-out;
    }

    .esri-basemap-gallery__loader::before {
      background-color: rgba(110, 110, 110, 0.3);
      width: 100%;
      z-index: 0;
    }

    .esri-basemap-gallery__loader::after {
      background-color: #6e6e6e;
      width: 20%;
      z-index: 0;
      animation: looping-progresss-bar-ani 1500ms linear infinite;
    }

    .esri-basemap-gallery__item--loading {
      cursor: auto;
      background-color: #f3f3f3;
      border-color: #ffffff;
    }

    .esri-basemap-gallery__item--error {
      cursor: auto;
      opacity: 0.4;
    }

    .esri-basemap-gallery__item-thumbnail {
      height: 64px;
      width: auto;
      box-shadow: 0 0 0 1px rgba(110, 110, 110, 0.3);
    }

    @supports (object-fit: cover) {
      .esri-basemap-gallery__item-thumbnail {
        height: 64px;
        width: 64px;
        object-fit: cover;
      }
    }

    .esri-basemap-gallery__item-title {
      font-size: 12px;
      word-break: break-word;
      color: #6e6e6e;
      padding: 0 7px;
    }

    .esri-basemap-gallery__item--selected,
    .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:hover,
    .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:focus {
      cursor: auto;
      border-left-color: #0079c1;
      background-color: #e2f1fb;
    }

    .esri-basemap-gallery__item--selected .esri-basemap-gallery__item-title,
    .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:hover
      .esri-basemap-gallery__item-title,
    .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:focus
      .esri-basemap-gallery__item-title {
      color: #323232;
    }

    .esri-basemap-gallery__item:hover,
    .esri-basemap-gallery__item:focus {
      outline: none;
      background-color: #f3f3f3;
      border-left-color: #f3f3f3;
    }

    .esri-basemap-gallery__item:hover .esri-basemap-gallery__item-title,
    .esri-basemap-gallery__item:focus .esri-basemap-gallery__item-title {
      color: #6e6e6e;
    }

    .esri-basemap-gallery__item.esri-basemap-gallery__item--error:hover,
    .esri-basemap-gallery__item.esri-basemap-gallery__item--error:focus {
      background-color: #ffffff;
      border-color: transparent;
    }

    .esri-view .esri-basemap-gallery {
      min-width: 225px;
      max-width: 300px;
    }

    .esri-view-width-greater-than-large .esri-ui-corner .esri-basemap-gallery.esri-component {
      width: 450px;
      max-width: initial;
    }

    .esri-view-width-greater-than-large
      .esri-ui-corner
      .esri-basemap-gallery.esri-component
      .esri-basemap-gallery__item-container {
      flex-flow: row wrap;
      align-items: baseline;
    }

    .esri-view-width-greater-than-large
      .esri-ui-corner
      .esri-basemap-gallery.esri-component
      .esri-basemap-gallery__item {
      border: 1px solid rgba(0, 0, 0, 0);
      flex-flow: column wrap;
      width: 29.333%;
      margin: 3px 2%;
      padding: 12px 0;
      text-align: center;
    }

    .esri-view-width-greater-than-large
      .esri-ui-corner
      .esri-basemap-gallery.esri-component
      .esri-basemap-gallery__item-thumbnail {
      max-width: 100%;
      margin-bottom: 6px;
    }

    .esri-view-width-greater-than-large
      .esri-ui-corner
      .esri-basemap-gallery.esri-component
      .esri-basemap-gallery__item-title {
      margin-top: 6px;
      width: 100%;
    }

    .esri-view-width-greater-than-large
      .esri-ui-corner
      .esri-basemap-gallery.esri-component
      .esri-basemap-gallery__item--selected,
    .esri-view-width-greater-than-large
      .esri-ui-corner
      .esri-basemap-gallery.esri-component
      .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:hover,
    .esri-view-width-greater-than-large
      .esri-ui-corner
      .esri-basemap-gallery.esri-component
      .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:focus {
      border-color: #0079c1;
    }

    html[dir='rtl'] .esri-basemap-gallery__item--selected,
    html[dir='rtl'] .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:hover,
    html[dir='rtl'] .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:focus {
      border-left-color: transparent;
      border-right-color: #0079c1;
    }

    .esri-basemap-layer-list {
      color: #323232;
      background-color: #f3f3f3;
      padding: 6px 7px;
      overflow-y: auto;
      display: flex;
      flex-flow: column;
    }

    .esri-basemap-layer-list__title-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 3px 0;
    }

    .esri-widget__heading.esri-basemap-layer-list__main-heading {
      flex: 1 1;
      margin: 0;
      padding: 3px 3px 3px 0;
      font-size: 14px;
    }

    .esri-basemap-layer-list__editing-card {
      display: flex;
      flex-flow: column;
      padding: 12px 15px;
      background-color: #ffffff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      width: 100%;
      animation: esri-fade-in-down 250ms ease-in-out;
    }

    .esri-basemap-layer-list__editing-input {
      display: flex;
      flex-flow: column;
    }

    .esri-basemap-layer-list__editing-actions {
      display: flex;
      justify-content: flex-end;
      margin: 6px 0 0;
    }

    .esri-basemap-layer-list__editing-actions .esri-button,
    .esri-basemap-layer-list__editing-actions .esri-elevation-profile__header button,
    .esri-elevation-profile__header .esri-basemap-layer-list__editing-actions button {
      font-size: 12px;
      min-height: 16px;
      width: 33%;
    }

    .esri-basemap-layer-list__edit-button {
      background-color: transparent;
      border: none;
      color: #6e6e6e;
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 32px;
      border-radius: 2px;
      transition: background-color 125ms ease-in-out;
      cursor: pointer;
    }

    .esri-basemap-layer-list__edit-button:hover,
    .esri-basemap-layer-list__edit-button:focus {
      background-color: rgba(110, 110, 110, 0.3);
      color: #2e2e2e;
    }

    .esri-widget__heading.esri-basemap-layer-list__list-heading {
      font-size: 12px;
      padding: 0;
      font-weight: 400;
    }

    .esri-basemap-layer-list__list {
      list-style: none;
      margin: 0 0 0 15px;
      padding: 0;
      transition: background-color 125ms ease-in-out;
    }

    .esri-basemap-layer-list__list.esri-basemap-layer-list--chosen {
      background-color: #e2f1fb;
      opacity: 0.75;
    }

    .esri-basemap-layer-list__list.esri-basemap-layer-list--chosen .esri-basemap-layer-list__item,
    .esri-basemap-layer-list__item.esri-basemap-layer-list--chosen .esri-basemap-layer-list__item {
      background-color: transparent;
    }

    .esri-basemap-layer-list__item--has-children {
      padding-bottom: 6px;
    }

    .esri-basemap-layer-list__item--has-children .esri-basemap-layer-list__list:not([hidden]) {
      animation: esri-fade-in 375ms ease-in-out;
    }

    .esri-basemap-layer-list__list[hidden] {
      display: none;
    }

    .esri-basemap-layer-list__list--root {
      margin: 0;
    }

    .esri-basemap-layer-list__item--selectable .esri-basemap-layer-list__item-container {
      cursor: pointer;
    }

    .esri-basemap-layer-list__item--selectable .esri-basemap-layer-list__item-container:hover {
      border-left-color: rgba(110, 110, 110, 0.3);
    }

    .esri-basemap-layer-list__item[aria-selected='true']
      > .esri-basemap-layer-list__item-container {
      border-left-color: #0079c1;
    }

    .esri-basemap-layer-list__item[aria-selected='true']
      > .esri-basemap-layer-list__item-container:hover {
      border-left-color: #0079c1;
    }

    .esri-basemap-layer-list__item-container
      ~ .esri-basemap-layer-list__list
      .esri-basemap-layer-list__item {
      border-bottom-width: 0;
    }

    .esri-basemap-layer-list__item {
      background-color: #ffffff;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      position: relative;
      overflow: hidden;
      list-style: none;
      margin: 3px 0;
      padding: 0;
      transition: background-color 125ms ease-in-out;
    }

    .esri-basemap-layer-list__item.esri-basemap-layer-list--chosen {
      background-color: #e2f1fb;
      opacity: 0.75;
    }

    .esri-basemap-layer-list__item-container {
      border-left: 3px solid transparent;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 12px 7px 12px 20px;
      transition: border-color 250ms ease-in-out;
    }

    .esri-basemap-layer-list__item--invisible-at-scale .esri-basemap-layer-list__item-title {
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-basemap-layer-list__item--has-children > .esri-basemap-layer-list__item-container {
      padding-left: 5px;
    }

    .esri-basemap-layer-list__item--has-children > .esri-basemap-layer-list__list {
      font-size: 12px;
    }

    .esri-basemap-layer-list__child-toggle {
      color: #6e6e6e;
      width: 15px;
      cursor: pointer;
    }

    .esri-basemap-layer-list__child-toggle [class*='esri-icon'] {
      line-height: 1.2em;
    }

    .esri-basemap-layer-list__child-toggle .esri-basemap-layer-list__child-toggle-icon--opened,
    .esri-basemap-layer-list__child-toggle .esri-basemap-layer-list__child-toggle-icon--closed-rtl,
    .esri-basemap-layer-list__child-toggle--open
      .esri-basemap-layer-list__child-toggle-icon--closed {
      display: none;
    }

    .esri-basemap-layer-list__child-toggle--open
      .esri-basemap-layer-list__child-toggle-icon--opened {
      display: block;
    }

    .esri-basemap-layer-list__item-label {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: flex-start;
      flex: 1;
      -webkit-user-select: none;
      user-select: none;
    }

    .esri-basemap-layer-list__item-label[role='switch'],
    .esri-basemap-layer-list__item-label[role='checkbox'],
    .esri-basemap-layer-list__item-label[role='radio'] {
      cursor: pointer;
    }

    .esri-basemap-layer-list--new-ui .esri-basemap-layer-list__item-toggle-icon {
      visibility: hidden;
    }

    .esri-basemap-layer-list--new-ui
      .esri-basemap-layer-list__item--invisible
      .esri-basemap-layer-list__item-toggle-icon {
      color: inherit;
    }

    .esri-basemap-layer-list--new-ui
      .esri-basemap-layer-list__item-toggle:focus
      .esri-basemap-layer-list__item-toggle-icon,
    .esri-basemap-layer-list--new-ui
      .esri-basemap-layer-list__item-label:focus
      .esri-basemap-layer-list__item-toggle-icon,
    .esri-basemap-layer-list--new-ui
      .esri-basemap-layer-list__item-container:hover
      .esri-basemap-layer-list__item-toggle-icon,
    .esri-basemap-layer-list--new-ui
      .esri-basemap-layer-list__item--invisible
      > .esri-basemap-layer-list__item-container
      .esri-basemap-layer-list__item-toggle-icon {
      visibility: visible;
    }

    .esri-basemap-layer-list__item-title {
      flex: 1;
      padding-left: 5px;
      padding-right: 5px;
      line-height: 1.3em;
      word-break: break-word;
      overflow-wrap: break-word;
      transition: color 125ms ease-in-out;
    }

    .esri-basemap-layer-list__item-error-message {
      display: flex;
      align-items: center;
      visibility: hidden;
      height: 0;
      margin-top: -1px;
      padding: 3px 7px;
      overflow: hidden;
      background-color: rgba(140, 41, 7, 0.1);
      color: #8c2907;
      font-size: 12px;
      transition: transform 250ms ease-in-out;
      transform: scale(1, 0);
      animation: esri-fade-in-down 250ms ease-in-out;
      transform-origin: center top;
    }

    .esri-basemap-layer-list__item-error-message [class^='esri-icon-'],
    .esri-basemap-layer-list__item-error-message .esri-building-phase-picker__arrow-left,
    .esri-basemap-layer-list__item-error-message .esri-building-phase-picker__arrow-right,
    .esri-basemap-layer-list__item-error-message .esri-building-level-picker__arrow-up,
    .esri-basemap-layer-list__item-error-message .esri-building-level-picker__arrow-down,
    .esri-basemap-layer-list__item-error-message [class*='esri-icon-'] {
      margin-right: 0.3rem;
    }

    .esri-basemap-layer-list__item--error .esri-basemap-layer-list__item-error-message {
      visibility: visible;
      height: auto;
      transform: scale(1, 1);
    }

    .esri-basemap-layer-list__item-toggle {
      padding: 0 3px;
      cursor: pointer;
      color: #6e6e6e;
    }

    .esri-basemap-layer-list__item--updating::before,
    .esri-basemap-layer-list__item--updating::after {
      content: '';
      opacity: 1;
      position: absolute;
      height: 1px;
      top: 0;
      transition: opacity 500ms ease-in-out;
    }

    .esri-basemap-layer-list__item--updating::before {
      background-color: rgba(110, 110, 110, 0.3);
      width: 100%;
      z-index: 0;
    }

    .esri-basemap-layer-list__item--updating::after {
      background-color: #6e6e6e;
      width: 20%;
      z-index: 0;
      animation: looping-progresss-bar-ani 1500ms linear infinite;
    }

    .esri-basemap-layer-list__item-actions-menu {
      display: flex;
    }

    .esri-basemap-layer-list__item-actions-menu-item {
      display: flex;
      flex: 1 0 21px;
      justify-content: center;
      align-items: center;
      color: #6e6e6e;
      cursor: pointer;
      padding: 0 3px;
      transition: border-color 250ms ease-in-out;
    }

    .esri-basemap-layer-list__item-actions-menu-item:first-of-type {
      margin: 0 2px;
    }

    .esri-basemap-layer-list__item-actions-menu-item:hover {
      background-color: #f3f3f3;
    }

    .esri-basemap-layer-list__item-actions-menu-item--active,
    .esri-basemap-layer-list__item-actions-menu-item--active:hover {
      background-color: #e2f1fb;
    }

    .esri-basemap-layer-list__item-actions {
      position: relative;
      background-color: #f3f3f3;
      color: #6e6e6e;
      margin: -1px 7px 6px;
      height: auto;
    }

    .esri-basemap-layer-list__item-actions[aria-expanded='true'] {
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-basemap-layer-list__item-actions-section {
      animation: esri-fade-in 375ms ease-in-out;
    }

    .esri-basemap-layer-list__item-actions[hidden] {
      display: none;
    }

    .esri-basemap-layer-list__item-actions-close {
      color: #6e6e6e;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      padding: 5px;
      z-index: 1;
    }

    .esri-basemap-layer-list__item-actions-list {
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 6px 0;
      list-style: none;
      border-top: 2px solid #ffffff;
    }

    .esri-basemap-layer-list__item-actions-list:first-of-type {
      border-top: 0;
    }

    .esri-basemap-layer-list__item-action,
    .esri-basemap-layer-list__action-toggle {
      border: 1px solid transparent;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      cursor: pointer;
      font-size: 12px;
      width: 100%;
      margin: 0;
      padding: 6px 15px;
      opacity: 1;
      transition:
        opacity 250ms ease-in-out 250ms,
        background-color 250ms ease-in-out;
    }

    .esri-basemap-layer-list__item-action {
      justify-content: flex-start;
      flex-flow: row;
    }

    .esri-basemap-layer-list__action-toggle {
      flex-flow: row-reverse;
      justify-content: space-between;
    }

    .esri-basemap-layer-list__action-toggle .esri-basemap-layer-list__item-action-title {
      margin-left: 0;
    }

    .esri-basemap-layer-list__action-toggle .esri-basemap-layer-list__item-action-icon {
      background-color: #4c4c4c;
      border-radius: 16px;
      box-shadow: 0 0 0 1px #ffffff;
      flex: 0 0 28px;
      height: 16px;
      overflow: hidden;
      padding: 0;
      position: relative;
      transition: background-color 125ms ease-in-out;
      width: 16px;
    }

    .esri-basemap-layer-list__action-toggle .esri-basemap-layer-list__item-action-icon::before {
      background-color: #ffffff;
      border-radius: 100%;
      content: '';
      display: block;
      height: 12px;
      left: 0;
      margin: 2px;
      position: absolute;
      top: 0;
      transition:
        background-color 125ms ease-in-out,
        left 125ms ease-in-out;
      width: 12px;
    }

    .esri-basemap-layer-list__action-toggle--on .esri-basemap-layer-list__item-action-icon {
      background-color: #ffffff;
    }

    .esri-basemap-layer-list__action-toggle--on .esri-basemap-layer-list__item-action-icon::before {
      background-color: #4c4c4c;
      box-shadow: 0 0 0 1px #4c4c4c;
      left: 12px;
    }

    .esri-basemap-layer-list__item-action:hover,
    .esri-basemap-layer-list__action-toggle:hover {
      background-color: #f3f3f3;
    }

    .esri-basemap-layer-list__item-actions[hidden] .esri-basemap-layer-list__item-action {
      opacity: 0;
    }

    .esri-basemap-layer-list__item-action-icon {
      flex: 0 0 16px;
      font-size: 16px;
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-top: 0.1em;
    }

    .esri-basemap-layer-list__item-action-image {
      flex: 0 0 16px;
      width: 16px;
      height: 16px;
      font-size: 14px;
      text-align: center;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }

    .esri-basemap-layer-list__item-action-title {
      margin-left: 5px;
    }

    .esri-basemap-layer-list-panel {
      margin: 12px 15px;
    }

    .esri-basemap-layer-list__hr {
      border: none;
      height: 1px;
      width: 100%;
      background-color: rgba(110, 110, 110, 0.3);
    }

    .esri-basemap-layer-list__no-items {
      color: #6e6e6e;
      text-align: center;
      padding: 24px 15px;
    }

    .esri-basemap-layer-list-panel__content--legend .esri-legend__service {
      padding: 0 0 12px;
    }

    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__item--has-children
      > .esri-basemap-layer-list__item-container {
      padding-left: 20px;
      padding-right: 5px;
    }

    html[dir='rtl'] .esri-basemap-layer-list .esri-basemap-layer-list__list {
      margin: 0 15px 0 0;
    }

    html[dir='rtl'] .esri-basemap-layer-list .esri-basemap-layer-list__list--root {
      margin: 0;
    }

    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__child-toggle
      .esri-basemap-layer-list__child-toggle-icon--closed {
      display: none;
    }

    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__child-toggle
      .esri-basemap-layer-list__child-toggle-icon--closed-rtl {
      display: block;
    }

    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__child-toggle--open
      .esri-basemap-layer-list__child-toggle-icon--closed-rtl {
      display: none;
    }

    html[dir='rtl'] .esri-basemap-layer-list .esri-basemap-layer-list__item-action-title {
      margin-left: 0;
      margin-right: 5px;
    }

    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__action-toggle
      .esri-basemap-layer-list__action-toggle {
      margin-right: 0;
    }

    html[dir='rtl'] .esri-basemap-layer-list .esri-basemap-layer-list__item::after {
      animation: looping-progresss-bar-ani 1500ms linear infinite reverse;
    }

    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__item-error-message
      [class^='esri-icon-'],
    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__item-error-message
      .esri-building-phase-picker__arrow-left,
    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__item-error-message
      .esri-building-phase-picker__arrow-right,
    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__item-error-message
      .esri-building-level-picker__arrow-up,
    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__item-error-message
      .esri-building-level-picker__arrow-down,
    html[dir='rtl']
      .esri-basemap-layer-list
      .esri-basemap-layer-list__item-error-message
      [class*='esri-icon-'] {
      margin-right: 0;
      margin-left: 0.3rem;
    }

    @keyframes esri-basemap-slide {
      0% {
        margin-top: 0;
        margin-left: 0;
        opacity: 0;
      }

      75% {
        margin-top: 0;
        margin-left: 0;
        opacity: 0;
      }

      100% {
        margin-top: 5px;
        margin-left: 5px;
        opacity: 1;
      }
    }

    .esri-basemap-toggle {
      cursor: pointer;
      position: relative;
      overflow: visible;
      width: 69px;
      height: 69px;
      background-color: transparent;
      box-shadow: none;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }

    .esri-basemap-toggle:hover {
      background-color: transparent;
    }

    .esri-basemap-toggle__container,
    .esri-basemap-toggle__image {
      width: 64px;
      height: 64px;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
    }

    .esri-basemap-toggle__container {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .esri-basemap-toggle__image {
      background-color: #ffffff;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-image: url(https://js.arcgis.com/4.19/esri/themes/base/images/basemap-toggle-64.svg);
    }

    .esri-basemap-toggle__image--loading {
      background-image: unset;
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .esri-basemap-toggle__image--secondary {
      margin-top: 5px;
      margin-left: 5px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      animation: esri-basemap-slide 2000ms ease-in-out;
    }

    .esri-basemap-toggle__image-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      transition: background-color 125ms ease-in-out;
      background-color: rgba(255, 255, 255, 0);
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .esri-basemap-toggle__image-overlay .esri-basemap-toggle:hover {
      background-color: rgba(46, 46, 46, 0.4);
    }

    .esri-basemap-toggle__title {
      flex: 1 0 100%;
      height: auto;
      font-size: 9px;
      font-weight: 500;
      line-height: 1.3em;
      padding: 0.5em;
      background-color: rgba(255, 255, 255, 0.7);
      text-align: center;
    }

    .esri-basemap-toggle.esri-disabled .esri-basemap-toggle__image-overlay,
    .esri-basemap-toggle.esri-disabled .esri-basemap-toggle__image--secondary {
      background-color: #ffffff;
    }

    .esri-basemap-toggle.esri-disabled .esri-basemap-toggle__image-overlay::before,
    .esri-basemap-toggle.esri-disabled .esri-basemap-toggle__image--secondary::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      background-color: #ffffff;
      opacity: 0.25;
    }

    .esri-basemap-toggle.esri-disabled .esri-basemap-toggle__image-overlay {
      background-image: url(https://js.arcgis.com/4.19/esri/themes/base/images/basemap-toggle-64.svg);
    }

    .esri-basemap-toggle.esri-disabled .esri-basemap-toggle__image--secondary::before {
      opacity: 1;
    }

    .esri-basemap-toggle.esri-disabled .esri-basemap-toggle__title {
      display: none;
    }

    .esri-widget.esri-basemap-toggle .esri-widget.esri-basemap-toggle,
    .esri-ui-corner .esri-widget.esri-basemap-toggle {
      background-color: transparent;
      box-shadow: none;
    }

    .esri-bookmarks {
      background-color: transparent;
    }

    .esri-bookmarks .esri-widget__content--empty {
      background-color: #f3f3f3;
    }

    .esri-bookmarks__loader-container {
      height: 150px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .esri-bookmarks__loader {
      height: 64px;
      width: 100%;
      background: url(https://js.arcgis.com/4.19/esri/themes/base/images/loading-throb.gif)
        no-repeat center center;
    }

    .esri-bookmarks__list {
      display: block;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .esri-bookmarks__list--sortable .esri-bookmarks__bookmark-image-container {
      margin-left: 0;
    }

    .esri-bookmarks__bookmark {
      align-items: center;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      position: relative;
      display: flex;
      border-color: transparent;
      background-color: #ffffff;
      transition:
        background-color 250ms ease-in-out,
        color 250ms ease-in-out;
      overflow: hidden;
    }

    .esri-bookmarks__bookmark:hover {
      background-color: #f3f3f3;
      color: #2e2e2e;
    }

    .esri-bookmarks__bookmark:hover:active {
      background-color: #ffffff;
      color: #6e6e6e;
    }

    .esri-bookmarks__bookmark.sortable-chosen {
      background-color: #e2f1fb;
      transition: background-color 250ms ease-in-out;
    }

    .esri-bookmarks__bookmark-button {
      border: none;
      background-color: transparent;
      padding: 0;
      color: #6e6e6e;
      cursor: pointer;
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      flex: 1;
      text-align: left;
    }

    @supports (text-align: initial) {
      .esri-bookmarks__bookmark-button {
        text-align: initial;
      }
    }

    .esri-bookmarks_bookmark-drag-handle {
      align-items: center;
      align-self: stretch;
      background-color: transparent;
      border: none;
      color: rgba(50, 50, 50, 0.4);
      cursor: move;
      display: flex;
      justify-content: center;
      margin: 0 7px 0 0;
      padding: 0;
      transition: background-color 250ms ease-in-out;
      width: 16px;
    }

    .esri-bookmarks_bookmark-drag-handle:focus,
    .esri-bookmarks_bookmark-drag-handle:hover {
      color: #2e2e2e;
    }

    .esri-bookmarks_bookmark-drag-handle[aria-pressed='true'] {
      background-color: #4c4c4c;
      color: #ffffff;
    }

    .esri-bookmarks__bookmark--active::before,
    .esri-bookmarks__bookmark--active::after {
      content: '';
      opacity: 1;
      position: absolute;
      height: 1px;
      top: 0;
      transition: opacity 500ms ease-in-out;
    }

    .esri-bookmarks__bookmark--active::before {
      background-color: rgba(110, 110, 110, 0.3);
      width: 100%;
      z-index: 0;
    }

    .esri-bookmarks__bookmark--active::after {
      background-color: #6e6e6e;
      width: 20%;
      z-index: 0;
      animation: looping-progresss-bar-ani 1500ms linear infinite;
    }

    .esri-bookmarks__bookmark--active {
      color: #323232;
      background-color: #e2f1fb;
      cursor: default;
    }

    .esri-bookmarks__bookmark--active:hover,
    .esri-bookmarks__bookmark--active:focus {
      color: #323232;
      background-color: #e2f1fb;
      cursor: default;
    }

    .esri-bookmarks__bookmark-name {
      font-size: 12px;
      flex: 1;
      overflow: hidden;
      padding: 18px 0;
      overflow-wrap: break-word;
      word-break: break-word;
    }

    .esri-bookmarks__bookmark-image-container {
      align-items: center;
      display: flex;
      justify-content: center;
      overflow: hidden;
      margin: 0 7px;
      max-width: 64px;
      position: relative;
    }

    .esri-button-menu {
      position: absolute;
      bottom: 2px;
      right: 2px;
      z-index: 1;
    }

    .esri-bookmarks__image {
      width: 64px;
      background-color: #f3f3f3;
      margin: 6px 0;
    }

    .esri-bookmarks__bookmark-edit-button {
      align-items: center;
      background-color: transparent;
      border-radius: 2px;
      border: none;
      color: #6e6e6e;
      cursor: pointer;
      display: flex;
      height: 32px;
      justify-content: center;
      margin: 0 7px;
      width: 32px;
    }

    .esri-bookmarks__bookmark-edit-button:hover {
      background-color: #ffffff;
      color: #2e2e2e;
    }

    .esri-bookmarks__add-bookmark {
      background-color: #f3f3f3;
      padding: 6px 7px;
    }

    .esri-bookmarks__add-bookmark-button {
      border-radius: 2px;
      font-size: 12px;
      justify-content: flex-start;
      padding: 12px 3px;
      transition: background-color 250ms ease-in-out;
    }

    .esri-bookmarks__add-bookmark-button:hover {
      background-color: #ffffff;
      text-decoration: none;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .esri-bookmarks__add-bookmark-icon {
      font-size: 14px;
      padding-left: 3px;
      padding-right: 3px;
    }

    .esri-bookmarks__authoring-card {
      background-color: #f3f3f3;
      padding: 6px 7px;
      animation: esri-fade-in-down 250ms ease-in-out;
    }

    .esri-bookmarks__authoring-card .esri-bookmarks__bookmark-image-container {
      width: 64px;
      height: 64px;
      border: 1px solid rgba(110, 110, 110, 0.3);
      background-image: url('https://js.arcgis.com/4.19/esri/themes/base/images/transparent-bg.png');
    }

    .esri-bookmarks__authoring-card
      .esri-bookmarks__bookmark-image-container
      .esri-bookmarks__image {
      margin-bottom: 0;
      margin-top: 0;
    }

    .esri-bookmarks__authoring-form {
      display: flex;
      flex-flow: column;
      padding: 12px 15px;
      background-color: #ffffff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      border-radius: 2px;
    }

    .esri-bookmarks__authoring-container {
      display: flex;
      flex-flow: column;
    }

    .esri-bookmarks__authoring-container .esri-bookmarks__bookmark-image-container {
      margin-bottom: 6px;
    }

    .esri-bookmarks__authoring-label {
      display: flex;
      flex-flow: column;
      flex: 1 0 auto;
    }

    .esri-bookmarks__authoring-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 6px;
    }

    .esri-bookmarks__authoring-actions .esri-button,
    .esri-bookmarks__authoring-actions .esri-elevation-profile__header button,
    .esri-elevation-profile__header .esri-bookmarks__authoring-actions button {
      font-size: 12px;
      min-height: 16px;
      width: 33%;
    }

    .esri-bookmarks__authoring-actions .esri-bookmarks__authoring-delete-button {
      color: #8c2907;
      margin-right: auto;
      padding-left: 0;
      padding-right: 0;
      width: auto;
    }

    .esri-widget__no-bookmark-icon {
      font-size: 32px;
      line-height: 64px;
      width: 64px;
      height: 64px;
      display: inline-block;
      text-align: center;
    }

    .esri-bookmarks--fade-in {
      opacity: 0;
      transition: opacity 375ms ease-out;
    }

    .esri-bookmarks--fade-in-active {
      opacity: 1;
    }

    html[dir='rtl'] .esri-bookmarks .esri-bookmarks__bookmark--active::after {
      animation: looping-progresss-bar-ani 1500ms linear infinite reverse;
    }

    html[dir='rtl'] .esri-bookmarks .esri-bookmarks__bookmark-container {
      margin-right: 0;
      margin-left: 7px;
    }

    html[dir='rtl'] .esri-bookmarks .esri-bookmarks_bookmark-drag-handle {
      margin-right: 0;
      margin-left: 7px;
    }

    html[dir='rtl']
      .esri-bookmarks
      .esri-bookmarks__authoring-actions
      .esri-bookmarks__authoring-delete-button {
      margin-right: 0;
      margin-left: auto;
    }

    html[dir='rtl']
      .esri-bookmarks
      .esri-bookmarks__list--sortable
      .esri-bookmarks__bookmark-image-container {
      margin-right: 0;
      margin-left: 7px;
    }

    html[dir='rtl'] .esri-bookmarks .esri-bookmarks__bookmark-button {
      text-align: right;
    }

    @supports (text-align: initial) {
      html[dir='rtl'] .esri-bookmarks .esri-bookmarks__bookmark-button {
        text-align: initial;
      }
    }

    .esri-binary-color-size-slider {
      direction: ltr;
      min-width: 260px;
    }

    .esri-binary-color-size-slider .esri-slider {
      font-size: 12px;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__thumb {
      background-color: #6e6e6e;
      border-radius: 0;
      border: none;
      width: 6px;
      height: 12px;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__content {
      flex-direction: row;
      height: 240px;
      margin: 0 auto 0 40%;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__track {
      flex: 0 1 0px;
      width: 0;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__anchor {
      border-bottom: 1px solid #6e6e6e;
      border-top: 1px solid #ffffff;
      width: 30px;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__label,
    .esri-binary-color-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__label {
      text-decoration: underline;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb,
    .esri-binary-color-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb {
      background-color: #2e2e2e;
      border: none;
      transform: none;
    }

    .esri-binary-color-size-slider
      .esri-slider
      .esri-slider__anchor:hover
      .esri-slider__thumb::after,
    .esri-binary-color-size-slider
      .esri-slider
      .esri-slider__anchor:focus
      .esri-slider__thumb::after {
      border-left-color: #2e2e2e;
    }

    .esri-binary-color-size-slider
      .esri-slider
      .esri-slider__anchor:hover
      .esri-slider__thumb::before,
    .esri-binary-color-size-slider
      .esri-slider
      .esri-slider__anchor:focus
      .esri-slider__thumb::before {
      background-color: #49b0f2;
      transform: translate3d(-1.5px, 0, 0);
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__thumb {
      left: -12px;
      top: -6px;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__thumb::before {
      position: absolute;
      top: 0;
      left: -1.5px;
      width: 3px;
      content: '';
      height: 12px;
      background-color: #6e6e6e;
      transition:
        transform 125ms ease-in-out,
        background-color 125ms ease-in-out;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__thumb::after {
      position: absolute;
      top: 0;
      left: 6px;
      content: '';
      border-bottom: 6px solid #00000000;
      border-left: 6px solid #6e6e6e;
      border-top: 6px solid #00000000;
      height: 0;
      width: 0;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__label {
      left: auto;
      line-height: 20px;
      min-width: 50px;
      right: 50px;
      text-align: right;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__label:hover {
      background-color: #f3f3f3;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__range-input {
      margin: auto;
      text-align: center;
      width: 50%;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__label-input {
      text-align: right;
      width: 70px;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__max,
    .esri-binary-color-size-slider .esri-slider .esri-slider__min {
      flex: 0 0 40px;
      height: 40px;
      padding: 9px 0;
    }

    .esri-binary-color-size-slider .esri-slider .esri-slider__extra-content {
      height: 100%;
    }

    .esri-binary-color-size-slider .esri-slider .esri-histogram__average-line,
    .esri-binary-color-size-slider .esri-slider .esri-histogram__label {
      stroke: #6e6e6e;
    }

    .esri-binary-color-size-slider .esri-slider .zoom-cap--max {
      position: absolute;
      top: 0;
    }

    .esri-binary-color-size-slider .esri-slider .zoom-cap--min {
      position: absolute;
      bottom: 0;
    }

    .esri-binary-color-size-slider .esri-slider .zoom-cap {
      height: 11px;
      width: 30px;
      stroke-width: 0;
    }

    .esri-binary-color-size-slider .esri-slider .zoom-cap .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-binary-color-size-slider .esri-slider .zoom-cap .zoom-cap--line {
      fill: #ffffff;
    }

    .esri-binary-color-size-slider .esri-slider .zoom-cap .zoom-cap--underline {
      fill: #323232;
    }

    .esri-binary-color-size-slider .esri-slider .zoom-cap:hover {
      cursor: pointer;
    }

    .esri-binary-color-size-slider .esri-slider .zoom-cap:hover .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-binary-color-size-slider .esri-slider .zoom-cap:hover .zoom-cap--line {
      fill: #0079c1;
    }

    .esri-binary-color-size-slider .esri-slider .zoom-cap:hover .zoom-cap--underline {
      fill: #ffffff;
    }

    .esri-binary-color-size-slider__ramp {
      display: inline-block;
      height: 100%;
      width: 30px;
      position: relative;
    }

    .esri-binary-color-size-slider__ramp svg {
      height: 100%;
      width: 100%;
      position: absolute;
      stroke: #6e6e6e;
      stroke-width: 1px;
      left: 0;
    }

    .esri-binary-color-size-slider__ramp svg rect {
      height: 100%;
      width: 100%;
    }

    .esri-binary-color-size-slider__ramp svg path {
      stroke-width: 0.5px;
    }

    .esri-binary-color-size-slider__histogram-container {
      display: inline-block;
      height: 100%;
      width: 120px;
    }

    .esri-building-level-picker {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .esri-building-level-picker.esri-building-level-picker--no-level {
      display: none;
    }

    .esri-building-level-picker__levels-container {
      display: flex;
      flex-direction: column;
      width: 50%;
      padding: 20px 0;
      cursor: pointer;
      transform: rotate(180deg);
      justify-content: flex-start;
      align-items: center;
    }

    .esri-building-level-picker__inner-levels-container {
      transition: margin 0.3s;
    }

    .esri-building-level-picker__label-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
      height: 90px;
      margin-right: 12px;
      align-items: center;
    }

    .esri-building-level-picker-label {
      color: #6e6e6e;
      text-align: center;
      font-size: 40px;
      line-height: 40px;
    }

    .esri-building-level-picker-label,
    .esri-building-level-picker-label--empty {
      position: relative;
      width: 90px;
      cursor: pointer;
      transition: opacity 0.3s;
      text-align: center;
    }

    .esri-building-level-picker-label.esri-building-level-picker-label--active,
    .esri-building-level-picker-label--empty.esri-building-level-picker-label--active {
      color: #0079c1;
    }

    .esri-building-level-picker-label--empty {
      font-size: 14px;
      font-weight: 300;
      color: #323232;
      cursor: default;
    }

    .esri-building-level-picker-label__clear-button {
      font-size: 12px;
      line-height: 12px;
      position: absolute;
      top: 10px;
      display: none;
      width: 20px;
      height: 20px;
      margin-left: 3px;
      padding: 4px;
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      color: #6e6e6e;
      border: none;
      border-radius: 50%;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    .esri-building-level-picker-label__clear-button:hover {
      background: #f3f3f3;
    }

    .esri-building-level-picker-label--active .esri-building-level-picker-label__clear-button {
      display: inline-block;
    }

    .esri-building-level-picker-item {
      border: 1px solid transparent;
      will-change: height;
      touch-action: none;
    }

    .esri-building-level-picker-item__base {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      will-change: height;
    }

    .esri-building-level-picker-item__base .rect {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: 3px;
      transform: translate(-50%, -50%) rotateX(66deg) rotateZ(45deg);
      pointer-events: none;
      border: 2px solid rgba(110, 110, 110, 0.3);
      outline: solid 1px transparent;
      background-color: rgba(255, 255, 255, 0.7);
      will-change: height;
    }

    .esri-building-level-picker-item--hover .esri-building-level-picker-item__base .rect {
      border-color: #0079c1;
      background-color: rgba(255, 255, 255, 0.7);
      box-shadow: 0 0 2px 1px #0079c1;
    }

    .esri-building-level-picker-item--active .esri-building-level-picker-item__base .rect {
      border-color: #0079c1;
      background-color: #0079c1;
    }

    .esri-building-level-picker-item,
    .esri-building-level-picker-item .esri-building-level-picker-item__base,
    .esri-building-level-picker-item .rect {
      transition:
        height 0.1s ease-out,
        width 0.1s ease-out,
        background-color 0.1s ease-in-out,
        border-color 0.1s ease-in-out;
    }

    .esri-building-level-picker--animate-level .esri-building-level-picker-item,
    .esri-building-level-picker--animate-level
      .esri-building-level-picker-item
      .esri-building-level-picker-item__base,
    .esri-building-level-picker--animate-level .esri-building-level-picker-item .rect {
      transition:
        height 0.3s cubic-bezier(0.63, -0.265, 0.48, 1.64),
        width 0.3s cubic-bezier(0.63, -0.265, 0.48, 1.64),
        background-color 0.1s ease-in-out,
        border-color 0.1s ease-in-out;
    }

    .esri-building-level-picker__arrow-up,
    .esri-building-level-picker__arrow-down {
      font-size: 10px;
      line-height: 10px;
      width: 18px;
      height: 18px;
      padding: 4px;
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      text-align: center;
      border: none;
      background: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    .esri-building-level-picker__arrow-up:hover:not(:disabled),
    .esri-building-level-picker__arrow-down:hover:not(:disabled) {
      background: #f3f3f3;
    }

    .esri-building-level-picker__arrow-up:disabled,
    .esri-building-level-picker__arrow-down:disabled {
      opacity: 0.4;
      cursor: default;
    }

    .esri-building-level-picker__arrow-up.esri-arrow-down,
    .esri-building-level-picker__arrow-down.esri-arrow-down,
    .esri-building-level-picker__arrow-down {
      transform: rotate(-90deg);
    }

    .esri-building-level-picker__arrow-up.esri-arrow-up,
    .esri-building-level-picker__arrow-up,
    .esri-building-level-picker__arrow-down.esri-arrow-up {
      transform: rotate(90deg);
    }

    .esri-building-level-picker__arrow-up.esri-arrow-left,
    .esri-building-level-picker__arrow-up.esri-building-phase-picker__arrow-left,
    .esri-building-level-picker__arrow-down.esri-arrow-left,
    .esri-building-level-picker__arrow-down.esri-building-phase-picker__arrow-left {
      transform: rotate(0deg);
    }

    .esri-building-level-picker__arrow-up.esri-arrow-right,
    .esri-building-level-picker__arrow-up.esri-building-phase-picker__arrow-right,
    .esri-building-level-picker__arrow-down.esri-arrow-right,
    .esri-building-level-picker__arrow-down.esri-building-phase-picker__arrow-right {
      transform: rotate(180deg);
    }

    .esri-building-phase-picker,
    .esri-building-phase-picker__phases-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .esri-building-phase-picker__phases-container {
      flex-grow: 0;
      flex-shrink: 1;
      overflow: hidden;
      padding: 5px;
    }

    .esri-building-phase-picker__phase {
      width: 32px;
      height: 32px;
      font-weight: 400;
      cursor: pointer;
      transition: all 250ms;
      color: #323232;
      border: solid 1px rgba(110, 110, 110, 0.3);
      border-radius: 100%;
      background: #ffffff;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      flex-shrink: 0;
    }

    .esri-building-phase-picker__phase:hover {
      box-shadow: 0 0 2px 1px #0079c1;
      transform: scale(1.1);
    }

    .esri-building-phase-picker__phase.esri-building-phase-picker__phase--active {
      border-color: #0079c1;
      background-color: #e2f1fb;
    }

    .esri-building-phase-picker__phase.esri-building-phase-picker__phase--current {
      color: #ffffff;
      background-color: #0079c1;
    }

    .esri-building-phase-picker__divider {
      height: 1px;
      min-width: 15px;
      background: rgba(110, 110, 110, 0.3);
      flex-grow: 0;
    }

    .esri-building-phase-picker__divider.esri-building-phase-picker__divider--active {
      background-color: #0079c1;
    }

    .esri-building-phase-picker__arrow-left,
    .esri-building-phase-picker__arrow-right {
      font-size: 10px;
      line-height: 10px;
      width: 18px;
      height: 18px;
      padding: 4px;
      cursor: pointer;
      transition: all 0.1s ease-in-out;
      text-align: center;
      border: none;
      background: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    .esri-building-phase-picker__arrow-left:hover:not(:disabled),
    .esri-building-phase-picker__arrow-right:hover:not(:disabled) {
      background: #f3f3f3;
    }

    .esri-building-phase-picker__arrow-left:disabled,
    .esri-building-phase-picker__arrow-right:disabled {
      opacity: 0.4;
      cursor: default;
    }

    .esri-building-phase-picker__arrow-left.esri-arrow-down,
    .esri-building-phase-picker__arrow-left.esri-building-level-picker__arrow-down,
    .esri-building-phase-picker__arrow-right.esri-arrow-down,
    .esri-building-phase-picker__arrow-right.esri-building-level-picker__arrow-down {
      transform: rotate(-90deg);
    }

    .esri-building-phase-picker__arrow-left.esri-arrow-up,
    .esri-building-phase-picker__arrow-left.esri-building-level-picker__arrow-up,
    .esri-building-phase-picker__arrow-right.esri-arrow-up,
    .esri-building-phase-picker__arrow-right.esri-building-level-picker__arrow-up {
      transform: rotate(90deg);
    }

    .esri-building-phase-picker__arrow-left.esri-arrow-left,
    .esri-building-phase-picker__arrow-left,
    .esri-building-phase-picker__arrow-right.esri-arrow-left {
      transform: rotate(0deg);
    }

    .esri-building-phase-picker__arrow-left.esri-arrow-right,
    .esri-building-phase-picker__arrow-right.esri-arrow-right,
    .esri-building-phase-picker__arrow-right {
      transform: rotate(180deg);
    }

    .esri-building-disciplines-tree-node--level-1 {
      padding-left: 0;
    }

    .esri-building-disciplines-tree-node--level-1.esri-building-disciplines-tree-node--leaf {
      padding-left: 18px;
    }

    .esri-building-disciplines-tree-node--level-2 {
      padding-left: 11px;
    }

    .esri-building-disciplines-tree-node--level-2.esri-building-disciplines-tree-node--leaf {
      padding-left: 29px;
    }

    .esri-building-disciplines-tree-node--level-3 {
      padding-left: 22px;
    }

    .esri-building-disciplines-tree-node--level-3.esri-building-disciplines-tree-node--leaf {
      padding-left: 40px;
    }

    .esri-building-disciplines-tree-node--level-4 {
      padding-left: 33px;
    }

    .esri-building-disciplines-tree-node--level-4.esri-building-disciplines-tree-node--leaf {
      padding-left: 51px;
    }

    .esri-building-disciplines-tree-node--level-5 {
      padding-left: 44px;
    }

    .esri-building-disciplines-tree-node--level-5.esri-building-disciplines-tree-node--leaf {
      padding-left: 62px;
    }

    .esri-building-disciplines-tree-node__label {
      display: flex;
      flex-direction: row;
      font-size: 14px;
      font-weight: 300;
      padding-top: 3px;
      padding-bottom: 3px;
      cursor: pointer;
      align-items: center;
    }

    .esri-building-disciplines-tree-node__collapse-toggle {
      font-size: 10px;
      line-height: 10px;
      display: inline-block;
      width: 18px;
      height: 18px;
      margin: 0;
      padding: 4px;
      transition: transform 0.1s ease-in-out;
      border: none;
      background: none;
      flex-shrink: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    .esri-building-disciplines-tree-node__collapse-toggle:not(
        .esri-building-disciplines-tree-node__collapse-toggle--collapsed
      ) {
      transform: rotate(90deg);
    }

    .esri-building-disciplines-tree-node__checkbox {
      font-size: 10px;
      line-height: 10px;
      display: inline-block;
      width: 14px;
      height: 14px;
      margin: 0;
      margin-right: 7px;
      padding: 1px;
      transition: all 0.1s ease-in-out;
      border: solid 1px rgba(110, 110, 110, 0.3);
      background: none;
      flex-shrink: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    .esri-building-disciplines-tree-node__checkbox::before {
      color: #ffffff;
    }

    .esri-building-disciplines-tree-node__checkbox--indeterminate::before {
      color: #6e6e6e;
    }

    .esri-building-disciplines-tree-node__checkbox--checked {
      background: #0079c1;
      border-color: #0079c1;
    }

    .esri-building-disciplines-tree-node__checkbox--checked::before {
      color: #ffffff;
    }

    html[dir='rtl'] .esri-building-disciplines-tree-node__checkbox {
      margin-right: 0;
      margin-left: 7px;
    }

    html[dir='rtl'] .esri-building-disciplines-tree-node__collapse-toggle {
      transform: rotate(180deg);
    }

    html[dir='rtl']
      .esri-building-disciplines-tree-node__collapse-toggle:not(
        .esri-building-disciplines-tree-node__collapse-toggle--collapsed
      ) {
      transform: rotate(90deg);
    }

    html[dir='rtl'] .esri-building-disciplines-tree-node--level-1 {
      padding-left: 0;
      padding-right: 0;
    }

    html[dir='rtl']
      .esri-building-disciplines-tree-node--level-1.esri-building-disciplines-tree-node--leaf {
      padding-left: 0;
      padding-right: 18px;
    }

    html[dir='rtl'] .esri-building-disciplines-tree-node--level-2 {
      padding-left: 0;
      padding-right: 11px;
    }

    html[dir='rtl']
      .esri-building-disciplines-tree-node--level-2.esri-building-disciplines-tree-node--leaf {
      padding-left: 0;
      padding-right: 29px;
    }

    html[dir='rtl'] .esri-building-disciplines-tree-node--level-3 {
      padding-left: 0;
      padding-right: 22px;
    }

    html[dir='rtl']
      .esri-building-disciplines-tree-node--level-3.esri-building-disciplines-tree-node--leaf {
      padding-left: 0;
      padding-right: 40px;
    }

    html[dir='rtl'] .esri-building-disciplines-tree-node--level-4 {
      padding-left: 0;
      padding-right: 33px;
    }

    html[dir='rtl']
      .esri-building-disciplines-tree-node--level-4.esri-building-disciplines-tree-node--leaf {
      padding-left: 0;
      padding-right: 51px;
    }

    html[dir='rtl'] .esri-building-disciplines-tree-node--level-5 {
      padding-left: 0;
      padding-right: 44px;
    }

    html[dir='rtl']
      .esri-building-disciplines-tree-node--level-5.esri-building-disciplines-tree-node--leaf {
      padding-left: 0;
      padding-right: 62px;
    }

    .esri-building-explorer {
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      width: 300px;
      max-width: 100%;
      max-height: calc(100vh - 30px);
      padding: 15px;
    }

    .esri-building-explorer .esri-widget__heading {
      font-weight: 400;
    }

    .esri-building-explorer__loading-container {
      text-align: center;
    }

    .esri-building-explorer__loading-container calcite-loader {
      box-sizing: content-box;
    }

    .esri-building-explorer__section:not(:last-child) {
      margin-bottom: 30px;
    }

    .esri-building-explorer__panel--error {
      color: #8c2907;
      margin: 0;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-button-menu {
      width: 32px;
      height: 32px;
    }

    .esri-button-menu .esri-button-menu__button {
      align-items: center;
      background-color: transparent;
      border: none;
      color: #6e6e6e;
      display: flex;
      font-size: 16px;
      height: 32px;
      justify-content: center;
      text-align: center;
      transition: background-color 125ms ease-in-out;
      width: 32px;
    }

    .esri-button-menu .esri-button-menu__button:disabled {
      cursor: default;
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-button-menu .esri-button-menu__button:hover,
    .esri-button-menu .esri-button-menu__button:focus {
      background-color: #f3f3f3;
      color: #2e2e2e;
      cursor: pointer;
    }

    .esri-button-menu .esri-button-menu__button.esri-button-menu__button--selected,
    .esri-button-menu .esri-button-menu__button.esri-button-menu__button--selected:hover {
      background: #4c4c4c;
      color: #ffffff;
    }

    .esri-button-menu .esri-button-menu__content-wrapper {
      position: relative;
      display: inline-block;
    }

    .esri-button-menu__content {
      border-radius: 2px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.33);
      background-color: #ffffff;
      max-height: 250px;
      min-width: 200px;
      overflow: auto;
      z-index: 1;
    }

    .esri-button-menu__content .esri-button-menu__item-wrapper,
    .esri-button-menu__content .esri-button-menu__embedded-content-wrapper {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .esri-button-menu__item {
      display: block;
      padding: 0;
    }

    .esri-button-menu__item .esri-button-menu__item-label {
      align-items: center;
      color: #323232;
      cursor: pointer;
      display: flex;
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-size: 14px;
      justify-content: flex-start;
      margin: 0;
      padding: 12px 15px;
      position: relative;
      text-decoration: none;
    }

    .esri-button-menu__item .esri-button-menu__item-label .esri-button-menu__item-label-content {
      padding: 0 7px;
      width: auto;
    }

    .esri-button-menu__item .esri-button-menu__item-label:hover {
      background-color: #f3f3f3;
      color: #2e2e2e;
    }

    .esri-button-menu__item .esri-button-menu__icon {
      color: #0079c1;
    }

    .esri-button-menu__item .esri-button-menu__checkbox {
      position: absolute;
      opacity: 0;
    }

    .esri-button-menu__item
      .esri-button-menu__checkbox:checked
      ~ .esri-button-menu__embedded-content-wrapper {
      display: block;
    }

    .esri-button-menu__item .esri-button-menu__embedded-content-wrapper {
      display: none;
    }

    .esri-button-menu__item
      .esri-button-menu__embedded-content-wrapper
      .esri-button-menu__checkbox:checked
      ~ .esri-button-menu__item-label
      .esri-button-menu__icon {
      display: block;
    }

    .esri-button-menu__item--selectable .esri-button-menu__icon {
      display: none;
    }

    .esri-classed-color-slider {
      direction: ltr;
      min-width: 260px;
    }

    .esri-classed-color-slider .esri-slider {
      font-size: 12px;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__thumb {
      background-color: #6e6e6e;
      border-radius: 0;
      border: none;
      width: 6px;
      height: 12px;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__content {
      flex-direction: row;
      height: 240px;
      margin: 0 auto 0 40%;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__track {
      flex: 0 1 0px;
      width: 0;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__anchor {
      border-bottom: 1px solid #6e6e6e;
      border-top: 1px solid #ffffff;
      width: 30px;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__anchor:hover .esri-slider__label,
    .esri-classed-color-slider .esri-slider .esri-slider__anchor:focus .esri-slider__label {
      text-decoration: underline;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb,
    .esri-classed-color-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb {
      background-color: #2e2e2e;
      border: none;
      transform: none;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::after,
    .esri-classed-color-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::after {
      border-left-color: #2e2e2e;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::before,
    .esri-classed-color-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::before {
      background-color: #49b0f2;
      transform: translate3d(-1.5px, 0, 0);
    }

    .esri-classed-color-slider .esri-slider .esri-slider__thumb {
      left: -12px;
      top: -6px;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__thumb::before {
      position: absolute;
      top: 0;
      left: -1.5px;
      width: 3px;
      content: '';
      height: 12px;
      background-color: #6e6e6e;
      transition:
        transform 125ms ease-in-out,
        background-color 125ms ease-in-out;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__thumb::after {
      position: absolute;
      top: 0;
      left: 6px;
      content: '';
      border-bottom: 6px solid #00000000;
      border-left: 6px solid #6e6e6e;
      border-top: 6px solid #00000000;
      height: 0;
      width: 0;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__label {
      left: auto;
      line-height: 20px;
      min-width: 50px;
      right: 50px;
      text-align: right;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__label:hover {
      background-color: #f3f3f3;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__range-input {
      margin: auto;
      text-align: center;
      width: 50%;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__label-input {
      text-align: right;
      width: 70px;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__max,
    .esri-classed-color-slider .esri-slider .esri-slider__min {
      flex: 0 0 40px;
      height: 40px;
      padding: 9px 0;
    }

    .esri-classed-color-slider .esri-slider .esri-slider__extra-content {
      height: 100%;
    }

    .esri-classed-color-slider .esri-slider .esri-histogram__average-line,
    .esri-classed-color-slider .esri-slider .esri-histogram__label {
      stroke: #6e6e6e;
    }

    .esri-classed-color-slider .esri-slider .zoom-cap--max {
      position: absolute;
      top: 0;
    }

    .esri-classed-color-slider .esri-slider .zoom-cap--min {
      position: absolute;
      bottom: 0;
    }

    .esri-classed-color-slider .esri-slider .zoom-cap {
      height: 11px;
      width: 30px;
      stroke-width: 0;
    }

    .esri-classed-color-slider .esri-slider .zoom-cap .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-classed-color-slider .esri-slider .zoom-cap .zoom-cap--line {
      fill: #ffffff;
    }

    .esri-classed-color-slider .esri-slider .zoom-cap .zoom-cap--underline {
      fill: #323232;
    }

    .esri-classed-color-slider .esri-slider .zoom-cap:hover {
      cursor: pointer;
    }

    .esri-classed-color-slider .esri-slider .zoom-cap:hover .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-classed-color-slider .esri-slider .zoom-cap:hover .zoom-cap--line {
      fill: #0079c1;
    }

    .esri-classed-color-slider .esri-slider .zoom-cap:hover .zoom-cap--underline {
      fill: #ffffff;
    }

    .esri-classed-color-slider__ramp {
      display: inline-block;
      height: 100%;
      width: 30px;
      position: relative;
    }

    .esri-classed-color-slider__ramp svg {
      height: 100%;
      width: 100%;
      position: absolute;
      stroke: #6e6e6e;
      stroke-width: 1px;
      left: 0;
    }

    .esri-classed-color-slider__ramp svg rect {
      height: 100%;
      width: 100%;
    }

    .esri-classed-color-slider__ramp svg path {
      stroke-width: 0.5px;
    }

    .esri-classed-color-slider__histogram-container {
      display: inline-block;
      height: 100%;
      width: 120px;
    }

    .esri-classed-size-slider {
      direction: ltr;
      min-width: 260px;
    }

    .esri-classed-size-slider .esri-slider {
      font-size: 12px;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__thumb {
      background-color: #6e6e6e;
      border-radius: 0;
      border: none;
      width: 6px;
      height: 12px;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__content {
      flex-direction: row;
      height: 240px;
      margin: 0 auto 0 40%;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__track {
      flex: 0 1 0px;
      width: 0;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__anchor {
      border-bottom: 1px solid #6e6e6e;
      border-top: 1px solid #ffffff;
      width: 30px;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__label,
    .esri-classed-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__label {
      text-decoration: underline;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb,
    .esri-classed-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb {
      background-color: #2e2e2e;
      border: none;
      transform: none;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::after,
    .esri-classed-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::after {
      border-left-color: #2e2e2e;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::before,
    .esri-classed-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::before {
      background-color: #49b0f2;
      transform: translate3d(-1.5px, 0, 0);
    }

    .esri-classed-size-slider .esri-slider .esri-slider__thumb {
      left: -12px;
      top: -6px;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__thumb::before {
      position: absolute;
      top: 0;
      left: -1.5px;
      width: 3px;
      content: '';
      height: 12px;
      background-color: #6e6e6e;
      transition:
        transform 125ms ease-in-out,
        background-color 125ms ease-in-out;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__thumb::after {
      position: absolute;
      top: 0;
      left: 6px;
      content: '';
      border-bottom: 6px solid #00000000;
      border-left: 6px solid #6e6e6e;
      border-top: 6px solid #00000000;
      height: 0;
      width: 0;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__label {
      left: auto;
      line-height: 20px;
      min-width: 50px;
      right: 50px;
      text-align: right;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__label:hover {
      background-color: #f3f3f3;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__range-input {
      margin: auto;
      text-align: center;
      width: 50%;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__label-input {
      text-align: right;
      width: 70px;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__max,
    .esri-classed-size-slider .esri-slider .esri-slider__min {
      flex: 0 0 40px;
      height: 40px;
      padding: 9px 0;
    }

    .esri-classed-size-slider .esri-slider .esri-slider__extra-content {
      height: 100%;
    }

    .esri-classed-size-slider .esri-slider .esri-histogram__average-line,
    .esri-classed-size-slider .esri-slider .esri-histogram__label {
      stroke: #6e6e6e;
    }

    .esri-classed-size-slider .esri-slider .zoom-cap--max {
      position: absolute;
      top: 0;
    }

    .esri-classed-size-slider .esri-slider .zoom-cap--min {
      position: absolute;
      bottom: 0;
    }

    .esri-classed-size-slider .esri-slider .zoom-cap {
      height: 11px;
      width: 30px;
      stroke-width: 0;
    }

    .esri-classed-size-slider .esri-slider .zoom-cap .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-classed-size-slider .esri-slider .zoom-cap .zoom-cap--line {
      fill: #ffffff;
    }

    .esri-classed-size-slider .esri-slider .zoom-cap .zoom-cap--underline {
      fill: #323232;
    }

    .esri-classed-size-slider .esri-slider .zoom-cap:hover {
      cursor: pointer;
    }

    .esri-classed-size-slider .esri-slider .zoom-cap:hover .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-classed-size-slider .esri-slider .zoom-cap:hover .zoom-cap--line {
      fill: #0079c1;
    }

    .esri-classed-size-slider .esri-slider .zoom-cap:hover .zoom-cap--underline {
      fill: #ffffff;
    }

    .esri-classed-size-slider__ramp {
      display: inline-block;
      height: 100%;
      width: 30px;
      position: relative;
    }

    .esri-classed-size-slider__ramp svg {
      height: 100%;
      width: 100%;
      position: absolute;
      stroke: #6e6e6e;
      stroke-width: 1px;
      left: 0;
    }

    .esri-classed-size-slider__ramp svg rect {
      height: 100%;
      width: 100%;
    }

    .esri-classed-size-slider__ramp svg path {
      stroke-width: 0.5px;
    }

    .esri-classed-size-slider__histogram-container {
      display: inline-block;
      height: 100%;
      width: 120px;
    }

    .esri-color-size-slider {
      direction: ltr;
      min-width: 260px;
    }

    .esri-color-size-slider .esri-slider {
      font-size: 12px;
    }

    .esri-color-size-slider .esri-slider .esri-slider__thumb {
      background-color: #6e6e6e;
      border-radius: 0;
      border: none;
      width: 6px;
      height: 12px;
    }

    .esri-color-size-slider .esri-slider .esri-slider__content {
      flex-direction: row;
      height: 240px;
      margin: 0 auto 0 40%;
    }

    .esri-color-size-slider .esri-slider .esri-slider__track {
      flex: 0 1 0px;
      width: 0;
    }

    .esri-color-size-slider .esri-slider .esri-slider__anchor {
      border-bottom: 1px solid #6e6e6e;
      border-top: 1px solid #ffffff;
      width: 30px;
    }

    .esri-color-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__label,
    .esri-color-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__label {
      text-decoration: underline;
    }

    .esri-color-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb,
    .esri-color-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb {
      background-color: #2e2e2e;
      border: none;
      transform: none;
    }

    .esri-color-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::after,
    .esri-color-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::after {
      border-left-color: #2e2e2e;
    }

    .esri-color-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::before,
    .esri-color-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::before {
      background-color: #49b0f2;
      transform: translate3d(-1.5px, 0, 0);
    }

    .esri-color-size-slider .esri-slider .esri-slider__thumb {
      left: -12px;
      top: -6px;
    }

    .esri-color-size-slider .esri-slider .esri-slider__thumb::before {
      position: absolute;
      top: 0;
      left: -1.5px;
      width: 3px;
      content: '';
      height: 12px;
      background-color: #6e6e6e;
      transition:
        transform 125ms ease-in-out,
        background-color 125ms ease-in-out;
    }

    .esri-color-size-slider .esri-slider .esri-slider__thumb::after {
      position: absolute;
      top: 0;
      left: 6px;
      content: '';
      border-bottom: 6px solid #00000000;
      border-left: 6px solid #6e6e6e;
      border-top: 6px solid #00000000;
      height: 0;
      width: 0;
    }

    .esri-color-size-slider .esri-slider .esri-slider__label {
      left: auto;
      line-height: 20px;
      min-width: 50px;
      right: 50px;
      text-align: right;
    }

    .esri-color-size-slider .esri-slider .esri-slider__label:hover {
      background-color: #f3f3f3;
    }

    .esri-color-size-slider .esri-slider .esri-slider__range-input {
      margin: auto;
      text-align: center;
      width: 50%;
    }

    .esri-color-size-slider .esri-slider .esri-slider__label-input {
      text-align: right;
      width: 70px;
    }

    .esri-color-size-slider .esri-slider .esri-slider__max,
    .esri-color-size-slider .esri-slider .esri-slider__min {
      flex: 0 0 40px;
      height: 40px;
      padding: 9px 0;
    }

    .esri-color-size-slider .esri-slider .esri-slider__extra-content {
      height: 100%;
    }

    .esri-color-size-slider .esri-slider .esri-histogram__average-line,
    .esri-color-size-slider .esri-slider .esri-histogram__label {
      stroke: #6e6e6e;
    }

    .esri-color-size-slider .esri-slider .zoom-cap--max {
      position: absolute;
      top: 0;
    }

    .esri-color-size-slider .esri-slider .zoom-cap--min {
      position: absolute;
      bottom: 0;
    }

    .esri-color-size-slider .esri-slider .zoom-cap {
      height: 11px;
      width: 30px;
      stroke-width: 0;
    }

    .esri-color-size-slider .esri-slider .zoom-cap .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-color-size-slider .esri-slider .zoom-cap .zoom-cap--line {
      fill: #ffffff;
    }

    .esri-color-size-slider .esri-slider .zoom-cap .zoom-cap--underline {
      fill: #323232;
    }

    .esri-color-size-slider .esri-slider .zoom-cap:hover {
      cursor: pointer;
    }

    .esri-color-size-slider .esri-slider .zoom-cap:hover .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-color-size-slider .esri-slider .zoom-cap:hover .zoom-cap--line {
      fill: #0079c1;
    }

    .esri-color-size-slider .esri-slider .zoom-cap:hover .zoom-cap--underline {
      fill: #ffffff;
    }

    .esri-color-size-slider__ramp {
      display: inline-block;
      height: 100%;
      width: 30px;
      position: relative;
    }

    .esri-color-size-slider__ramp svg {
      height: 100%;
      width: 100%;
      position: absolute;
      stroke: #6e6e6e;
      stroke-width: 1px;
      left: 0;
    }

    .esri-color-size-slider__ramp svg rect {
      height: 100%;
      width: 100%;
    }

    .esri-color-size-slider__ramp svg path {
      stroke-width: 0.5px;
    }

    .esri-color-size-slider__histogram-container {
      display: inline-block;
      height: 100%;
      width: 120px;
    }

    .esri-color-slider {
      direction: ltr;
      min-width: 260px;
    }

    .esri-color-slider .esri-slider {
      font-size: 12px;
    }

    .esri-color-slider .esri-slider .esri-slider__thumb {
      background-color: #6e6e6e;
      border-radius: 0;
      border: none;
      width: 6px;
      height: 12px;
    }

    .esri-color-slider .esri-slider .esri-slider__content {
      flex-direction: row;
      height: 240px;
      margin: 0 auto 0 40%;
    }

    .esri-color-slider .esri-slider .esri-slider__track {
      flex: 0 1 0px;
      width: 0;
    }

    .esri-color-slider .esri-slider .esri-slider__anchor {
      border-bottom: 1px solid #6e6e6e;
      border-top: 1px solid #ffffff;
      width: 30px;
    }

    .esri-color-slider .esri-slider .esri-slider__anchor:hover .esri-slider__label,
    .esri-color-slider .esri-slider .esri-slider__anchor:focus .esri-slider__label {
      text-decoration: underline;
    }

    .esri-color-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb,
    .esri-color-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb {
      background-color: #2e2e2e;
      border: none;
      transform: none;
    }

    .esri-color-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::after,
    .esri-color-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::after {
      border-left-color: #2e2e2e;
    }

    .esri-color-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::before,
    .esri-color-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::before {
      background-color: #49b0f2;
      transform: translate3d(-1.5px, 0, 0);
    }

    .esri-color-slider .esri-slider .esri-slider__thumb {
      left: -12px;
      top: -6px;
    }

    .esri-color-slider .esri-slider .esri-slider__thumb::before {
      position: absolute;
      top: 0;
      left: -1.5px;
      width: 3px;
      content: '';
      height: 12px;
      background-color: #6e6e6e;
      transition:
        transform 125ms ease-in-out,
        background-color 125ms ease-in-out;
    }

    .esri-color-slider .esri-slider .esri-slider__thumb::after {
      position: absolute;
      top: 0;
      left: 6px;
      content: '';
      border-bottom: 6px solid #00000000;
      border-left: 6px solid #6e6e6e;
      border-top: 6px solid #00000000;
      height: 0;
      width: 0;
    }

    .esri-color-slider .esri-slider .esri-slider__label {
      left: auto;
      line-height: 20px;
      min-width: 50px;
      right: 50px;
      text-align: right;
    }

    .esri-color-slider .esri-slider .esri-slider__label:hover {
      background-color: #f3f3f3;
    }

    .esri-color-slider .esri-slider .esri-slider__range-input {
      margin: auto;
      text-align: center;
      width: 50%;
    }

    .esri-color-slider .esri-slider .esri-slider__label-input {
      text-align: right;
      width: 70px;
    }

    .esri-color-slider .esri-slider .esri-slider__max,
    .esri-color-slider .esri-slider .esri-slider__min {
      flex: 0 0 40px;
      height: 40px;
      padding: 9px 0;
    }

    .esri-color-slider .esri-slider .esri-slider__extra-content {
      height: 100%;
    }

    .esri-color-slider .esri-slider .esri-histogram__average-line,
    .esri-color-slider .esri-slider .esri-histogram__label {
      stroke: #6e6e6e;
    }

    .esri-color-slider .esri-slider .zoom-cap--max {
      position: absolute;
      top: 0;
    }

    .esri-color-slider .esri-slider .zoom-cap--min {
      position: absolute;
      bottom: 0;
    }

    .esri-color-slider .esri-slider .zoom-cap {
      height: 11px;
      width: 30px;
      stroke-width: 0;
    }

    .esri-color-slider .esri-slider .zoom-cap .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-color-slider .esri-slider .zoom-cap .zoom-cap--line {
      fill: #ffffff;
    }

    .esri-color-slider .esri-slider .zoom-cap .zoom-cap--underline {
      fill: #323232;
    }

    .esri-color-slider .esri-slider .zoom-cap:hover {
      cursor: pointer;
    }

    .esri-color-slider .esri-slider .zoom-cap:hover .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-color-slider .esri-slider .zoom-cap:hover .zoom-cap--line {
      fill: #0079c1;
    }

    .esri-color-slider .esri-slider .zoom-cap:hover .zoom-cap--underline {
      fill: #ffffff;
    }

    .esri-color-slider__ramp {
      display: inline-block;
      height: 100%;
      width: 30px;
      position: relative;
    }

    .esri-color-slider__ramp svg {
      height: 100%;
      width: 100%;
      position: absolute;
      stroke: #6e6e6e;
      stroke-width: 1px;
      left: 0;
    }

    .esri-color-slider__ramp svg rect {
      height: 100%;
      width: 100%;
    }

    .esri-color-slider__ramp svg path {
      stroke-width: 0.5px;
    }

    .esri-color-slider__histogram-container {
      display: inline-block;
      height: 100%;
      width: 120px;
    }

    .esri-compass {
      border-radius: 50%;
    }

    .esri-compass .esri-compass__icon {
      font-size: 20px;
    }

    .esri-coordinate-conversion {
      cursor: default;
      font-size: 12px;
      position: relative;
      width: 400px;
    }

    .esri-coordinate-conversion .esri-select option[disabled] {
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-coordinate-conversion.esri-disabled {
      pointer-events: none;
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-coordinate-conversion.esri-disabled [class*='esri-icon-']::before {
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-coordinate-conversion--no-basemap {
      padding: 1em;
      width: auto;
    }

    .esri-coordinate-conversion--capture-mode .esri-coordinate-conversion__mode-toggle {
      color: #6e6e6e;
      background: #f3f3f3;
    }

    .esri-coordinate-conversion__conversion-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }

    .esri-coordinate-conversion__display {
      flex: 1 1 auto;
      min-height: 2em;
      padding: 0.5em;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-word;
    }

    .esri-coordinate-conversion__display:hover,
    .esri-coordinate-conversion__select-row:hover {
      background-color: #f3f3f3;
    }

    .esri-coordinate-conversion__button {
      color: #6e6e6e;
      border-color: #6e6e6e;
      background-color: #ffffff;
      width: 30%;
    }

    .esri-coordinate-conversion__button:hover {
      color: #ffffff;
      background-color: #6e6e6e;
      border-color: #6e6e6e;
    }

    .esri-coordinate-conversion__input-group {
      align-items: center;
      display: flex;
      justify-content: space-between;
      width: 80%;
      margin: 12px auto;
    }

    .esri-coordinate-conversion__input-group label {
      display: flex;
      align-items: center;
    }

    .esri-coordinate-conversion .esri-coordinate-conversion__input-coordinate[type='text'] {
      width: 100%;
      margin: 0;
      padding: 0 0.5em;
      border: 1px solid rgba(110, 110, 110, 0.3);
      font-size: 12px;
      height: 2em;
    }

    .esri-coordinate-conversion__input-coordinate--rejected {
      -webkit-text-decoration: underline red;
      text-decoration: underline red;
    }

    .esri-coordinate__settings {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .esri-coordinate__settings .esri-select {
      font-size: inherit;
    }

    .esri-coordinate-conversion__settings-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 60%;
      margin-top: 12px;
    }

    .esri-coordinate-conversion__settings-group > * {
      margin-bottom: 0.5em;
    }

    .esri-coordinate-conversion__settings-group-horizontal {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 100%;
    }

    .esri-coordinate-conversion__settings-group:last-child {
      margin-bottom: 6px;
      text-align: center;
      width: 100%;
    }

    .esri-coordinate-conversion__preview-coordinate {
      min-height: 1.25em;
    }

    .esri-coordinate-conversion__row {
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3em;
    }

    .esri-coordinate-conversion__row .esri-coordinate-conversion__row-button {
      display: none;
    }

    .esri-coordinate-conversion__row:hover .esri-coordinate-conversion__row-button {
      display: flex;
    }

    .esri-coordinate-conversion__row:focus-within .esri-coordinate-conversion__row-button {
      display: flex;
    }

    .esri-coordinate-conversion__pattern-input {
      padding: 4px;
      width: 100%;
      height: 32px;
    }

    .esri-coordinate-conversion__tools {
      flex: 0 0 auto;
      display: flex;
      position: relative;
      padding: 0;
    }

    .esri-coordinate-conversion__select-primary {
      font-size: inherit;
      margin: 0;
      padding: 0 2.5em 0 0.5em;
      width: auto;
    }

    .esri-coordinate-conversion__select-row {
      font-size: inherit;
      background: #ffffff;
      height: 2em;
      margin: 0;
      text-align-last: center;
      flex: 0 0 75px;
      padding: 0 0.5em;
    }

    .esri-coordinate-conversion__conversions-view {
      margin: 6px 0;
    }

    .esri-ui-top-right .esri-coordinate-conversion__conversions-view,
    .esri-ui-top-left .esri-coordinate-conversion__conversions-view,
    .esri-coordinate-conversion div.esri-coordinate-conversion__conversions-view--expand-down {
      display: flex;
      flex-direction: column;
    }

    .esri-ui-top-right
      .esri-coordinate-conversion__conversions-view
      .esri-coordinate-conversion__conversion-list,
    .esri-ui-top-left
      .esri-coordinate-conversion__conversions-view
      .esri-coordinate-conversion__conversion-list,
    .esri-coordinate-conversion
      div.esri-coordinate-conversion__conversions-view--expand-down
      .esri-coordinate-conversion__conversion-list {
      flex-direction: column;
    }

    .esri-ui-bottom-right .esri-coordinate-conversion__conversions-view,
    .esri-ui-bottom-left .esri-coordinate-conversion__conversions-view,
    .esri-coordinate-conversion div.esri-coordinate-conversion__conversions-view--expand-up {
      display: flex;
      flex-direction: column-reverse;
    }

    .esri-ui-bottom-right
      .esri-coordinate-conversion__conversions-view
      .esri-coordinate-conversion__conversion-list,
    .esri-ui-bottom-left
      .esri-coordinate-conversion__conversions-view
      .esri-coordinate-conversion__conversion-list,
    .esri-coordinate-conversion
      div.esri-coordinate-conversion__conversions-view--expand-up
      .esri-coordinate-conversion__conversion-list {
      flex-direction: column-reverse;
    }

    .esri-ui-bottom-right
      .esri-coordinate-conversion__conversions-view
      .esri-widget--button
      .esri-icon-up,
    .esri-ui-bottom-right
      .esri-coordinate-conversion__conversions-view
      .esri-widget--button
      .esri-icon-down,
    .esri-ui-bottom-left
      .esri-coordinate-conversion__conversions-view
      .esri-widget--button
      .esri-icon-up,
    .esri-ui-bottom-left
      .esri-coordinate-conversion__conversions-view
      .esri-widget--button
      .esri-icon-down,
    .esri-coordinate-conversion
      div.esri-coordinate-conversion__conversions-view--expand-up
      .esri-widget--button
      .esri-icon-up,
    .esri-coordinate-conversion
      div.esri-coordinate-conversion__conversions-view--expand-up
      .esri-widget--button
      .esri-icon-down {
      transform: rotate(180deg);
    }

    .esri-coordinate-conversion__heading {
      width: 100%;
      height: 32px;
      background-color: #f3f3f3;
      display: flex;
      align-items: center;
    }

    .esri-coordinate-conversion__heading .esri-widget__heading {
      margin: 0 auto;
    }

    .esri-coordinate-conversion__heading .esri-coordinate-conversion__back-button {
      position: absolute;
      margin-left: 0;
      top: 0;
      left: 0;
      background-color: #f3f3f3;
    }

    .esri-coordinate-conversion__heading .esri-coordinate-conversion__back-button:hover {
      background-color: #ffffff;
    }

    .esri-coordinate-conversion__popup {
      animation: esri-fade-in 250ms linear;
      color: #ffffff;
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      white-space: inherit;
      text-align: center;
      transform: translate(-50%, -50%);
      background-color: #4c4c4c;
      opacity: 0.8;
      padding: 1em;
    }

    .esri-date-picker {
      display: inline-flex;
      border: 1px solid rgba(110, 110, 110, 0.3);
      background-color: #ffffff;
    }

    .esri-date-picker__calendar {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      padding: 6px;
    }

    .esri-date-picker__calendar .esri-widget--button {
      touch-action: none;
    }

    .esri-date-picker__day-picker,
    .esri-date-picker__month-picker,
    .esri-date-picker__year-picker {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .esri-date-picker__day-picker {
      flex-wrap: wrap;
      flex-direction: column;
    }

    .esri-date-picker__day-picker,
    .esri-date-picker__month-picker {
      margin-bottom: 6px;
    }

    .esri-date-picker__date {
      margin: 0 24px 0 0;
    }

    .esri-date-picker__calendar-toggle {
      border: none;
      font-size: 14px;
      width: 100%;
      margin: 0;
      padding: 0 0.5em;
      height: 32px;
      color: #323232;
    }

    .esri-date-picker .esri-date-picker__month-dropdown {
      border: none;
      font-weight: 600;
      padding-right: 2.3em;
    }

    .esri-date-picker__week-item {
      display: flex;
      justify-content: center;
    }

    .esri-date-picker__day-item--header {
      background: #f3f3f3;
      font-weight: 600;
      cursor: auto;
    }

    .esri-date-picker__day-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      border-right: 1px solid rgba(110, 110, 110, 0.3);
      cursor: pointer;
    }

    .esri-date-picker__day-item--header {
      border-top: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-date-picker__day-item:first-child {
      border-left: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-date-picker__day-item--nearby-month {
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-date-picker__day-item--today {
      color: #0079c1;
    }

    .esri-date-picker__day-item--active {
      background: rgba(110, 110, 110, 0.3);
    }

    .esri-date-picker__month-picker {
      font-weight: 600;
      justify-content: space-between;
    }

    .esri-date-picker__year-picker-item {
      color: #323232;
      padding: 6px;
      margin: 0 4px;
      cursor: pointer;
    }

    .esri-date-picker__day-item--selected,
    .esri-date-picker__year-picker-item--selected {
      color: #ffffff;
      background-color: #0079c1;
      cursor: auto;
    }

    .esri-date-picker__input {
      position: relative;
      display: flex;
      align-items: center;
    }

    .esri-date-picker__text-input.esri-input {
      margin: 0;
      padding-left: 30px;
      border: none;
    }

    .esri-date-picker__icon--leading {
      position: absolute;
      left: 7px;
    }

    html[dir='rtl'] .esri-date-picker__calendar {
      right: 0;
    }

    html[dir='rtl'] .esri-date-picker__date {
      margin: 0 0 0 24px;
    }

    html[dir='rtl'] .esri-date-picker__day-item:first-child {
      border-left: none;
    }

    html[dir='rtl'] .esri-date-picker__day-item:last-child {
      border-left: 1px solid rgba(110, 110, 110, 0.3);
    }

    html[dir='rtl'] .esri-date-picker__text-input.esri-input {
      padding-left: unset;
      padding-right: 30px;
    }

    html[dir='rtl'] .esri-date-picker__icon--leading {
      left: unset;
      right: 7px;
    }

    @keyframes pulse {
      to {
        box-shadow: 0 0 0 12px rgba(232, 76, 61, 0);
      }
    }

    .esri-daylight {
      padding: 12px;
      width: 350px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      flex-basis: auto;
      justify-content: space-between;
    }

    .esri-daylight .esri-widget__anchor {
      font-size: 12px;
    }

    .esri-daylight .esri-daylight__panel--error {
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-daylight .esri-daylight__container {
      margin: 6px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .esri-daylight .esri-daylight__container .esri-slider {
      width: inherit;
      flex-grow: 1;
    }

    .esri-daylight .esri-daylight__container .esri-slider .esri-slider__tick-label {
      font-size: 10px;
      line-height: normal;
      margin-top: 14px;
      text-align: center;
    }

    .esri-daylight
      .esri-daylight__container
      .esri-slider
      .esri-slider__tick-label
      .esri-label__ampm {
      font-size: 7px;
    }

    .esri-daylight .esri-daylight__container .esri-slider .esri-slider__label-input {
      font-size: 10px;
    }

    .esri-daylight .esri-daylight__container .esri-slider .esri-daylight__container__tick {
      width: 2px;
      margin: -3px 0 0 -3px;
      border-color: #ffffff;
      border-style: solid;
      border-width: 3px 3px 5px;
      box-sizing: content-box;
    }

    .esri-daylight .esri-daylight__container .esri-slider .esri-daylight__container__tick:hover {
      border-color: #f3f3f3;
    }

    .esri-daylight .esri-daylight__container .esri-slider .esri-daylight__container__labelled-tick {
      height: 8px;
    }

    .esri-daylight .esri-daylight__container .esri-date-picker,
    .esri-daylight .esri-daylight__container .esri-daylight__season-picker {
      flex-grow: 1;
    }

    .esri-daylight .esri-daylight__container .esri-daylight__play-pause-button {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.125);
      margin-left: 15px;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      flex-grow: 0;
      padding: 4px;
      fill: #ffffff;
      flex-shrink: 0;
    }

    .esri-daylight
      .esri-daylight__container
      .esri-daylight__play-pause-button.esri-icon-play::before {
      content: none;
    }

    .esri-daylight .esri-daylight__container .esri-daylight__play-pause-button.esri-icon-pause {
      padding: 0 6px 1px 8px;
      animation: pulse 1s infinite cubic-bezier(0.66, 0, 0, 1);
    }

    .esri-daylight .esri-daylight__container .esri-daylight__play-pause-button.esri-icon-pause svg {
      display: none;
    }

    .esri-daylight
      .esri-daylight__container
      .esri-slider--horizontal
      ~ .esri-daylight__play-pause-button {
      margin-bottom: 17px;
    }

    .esri-daylight
      .esri-daylight__container
      .esri-slider--horizontal
      .esri-slider-with-dropdown__box {
      font-size: 10px;
      min-width: inherit;
      white-space: nowrap;
      margin: 0;
    }

    .esri-daylight
      .esri-daylight__container
      .esri-slider--horizontal
      .esri-slider-with-dropdown__box
      .esri-slider__label {
      left: auto;
      margin: 0;
      min-width: auto;
      outline: none;
    }

    .esri-daylight
      .esri-daylight__container
      .esri-slider--horizontal
      .esri-slider-with-dropdown__box--drop-down-on {
      width: 100px;
      left: -46px;
    }

    .esri-daylight
      .esri-daylight__container
      .esri-slider--horizontal
      .esri-slider-with-dropdown__box--drop-down-off {
      width: 60px;
      left: -30px;
    }

    .esri-daylight .esri-daylight__checkbox {
      width: auto;
      padding: inherit;
      min-height: auto;
      margin-right: 7px;
      background-color: transparent;
      border: none;
      color: #0079c1;
    }

    .esri-daylight .esri-daylight__shadow-container {
      margin: 7px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .esri-daylight .esri-slider--date-on .esri-slider {
      padding: 20px 15px 50px;
    }

    .esri-daylight .esri-slider--date-off .esri-slider {
      padding: 20px 15px 40px;
    }

    .esri-daylight .esri-slider--shadow-on .esri-slider__thumb {
      box-shadow: 2px 2px 5px 0 rgba(148, 148, 148, 0.63);
    }

    .esri-daylight .esri-slider-with-dropdown__anchor {
      font-size: 10px;
    }

    .esri-daylight .esri-slider-with-dropdown__box .esri-slider__label-input {
      width: 50px;
    }

    .esri-slider-with-dropdown__box {
      text-align: center;
    }

    .esri-slider-with-dropdown__box .esri-slider__label {
      display: inline-block;
      position: static;
    }

    .esri-slider-with-dropdown__box .esri-slider__label-input {
      display: inline-block;
    }

    .esri-slider__anchor:focus .esri-slider-with-dropdown__box.esri-slider__label {
      outline: none !important;
    }

    .esri-slider-with-dropdown__dropdown-root {
      display: inline-block;
      margin-left: 4px;
    }

    .esri-slider-with-dropdown__anchor {
      background-color: transparent;
      border: none;
      padding: 0;
      margin: 0;
    }

    .esri-slider-with-dropdown__anchor--closed::after {
      content: '▿';
      visibility: hidden;
    }

    .esri-slider-with-dropdown__anchor--closed:hover::after {
      visibility: visible;
    }

    .esri-slider-with-dropdown__anchor--open::after {
      content: '▵';
    }

    .esri-ui-top-right .esri-slider-with-dropdown__list,
    .esri-ui-bottom-right .esri-slider-with-dropdown__list {
      left: -190px;
    }

    .esri-ui-top-left .esri-slider-with-dropdown__list,
    .esri-ui-bottom-left .esri-slider-with-dropdown__list {
      right: -186px;
    }

    .esri-ui-top-left .esri-slider-with-dropdown__list,
    .esri-ui-top-right .esri-slider-with-dropdown__list {
      top: 0.5em;
    }

    .esri-ui-bottom-left .esri-slider-with-dropdown__list,
    .esri-ui-bottom-right .esri-slider-with-dropdown__list {
      bottom: 0.5em;
    }

    .esri-slider-with-dropdown__list {
      position: absolute;
      padding: 0;
      list-style: none;
      background-color: #ffffff;
      border: 1px solid rgba(110, 110, 110, 0.15);
      height: 350px;
      width: 300px;
      overflow-y: scroll;
      overflow-x: hidden;
      text-align: left;
      white-space: inherit;
      font-size: 12px;
      z-index: 5;
    }

    .esri-slider-with-dropdown__list-item {
      display: flex;
      flex-direction: column;
      padding: 7px 10px 7px 8px;
    }

    .esri-slider-with-dropdown__list-item:hover {
      background-color: #f3f3f3;
    }

    .esri-slider-with-dropdown__list-item--selected {
      background-color: #e2f1fb;
    }

    html[dir='rtl'] .esri-slider-with-dropdown__dropdown-root {
      margin-left: 0;
      margin-right: 4px;
    }

    html[dir='rtl'] .esri-daylight .esri-daylight__container .esri-daylight__play-pause-button {
      margin-right: 15px;
      margin-left: 0;
    }

    html[dir='rtl'] .esri-daylight .esri-daylight__checkbox {
      margin-left: 7px;
      margin-right: 0;
    }

    html[dir='rtl']
      .esri-daylight
      .esri-slider--horizontal
      .esri-slider-with-dropdown__box--drop-down-on {
      right: -46px;
      left: auto;
    }

    html[dir='rtl']
      .esri-daylight
      .esri-slider--horizontal
      .esri-slider-with-dropdown__box--drop-down-off {
      right: -30px;
      left: auto;
    }

    .esri-directions {
      color: #323232;
    }

    .esri-directions__panel-content {
      padding: 12px 0;
    }

    .esri-directions__sign-in-panel {
      color: #6e6e6e;
      display: flex;
      justify-content: center;
    }

    .esri-directions__section {
      margin-top: 12px;
      margin-bottom: 12px;
    }

    .esri-directions__section-splitter {
      width: 100%;
      margin: 18px 0;
      border-top: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-directions__travel-modes-select,
    .esri-directions__departure-time {
      margin: 0 15px 6px;
      width: calc(100% - 30px);
    }

    .esri-directions__panel-content--sign-in,
    .esri-directions__panel-content--loading,
    .esri-directions__panel-content--error {
      min-height: 420px;
      margin: 0 12px;
      color: #6e6e6e;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .esri-directions__loader {
      height: 40px;
      width: 32px;
      background: url(https://js.arcgis.com/4.19/esri/themes/base/images/loading-throb.gif)
        no-repeat center;
    }

    .esri-directions__warning-card {
      border-top: solid 2px #de2900;
      color: #6e6e6e;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      padding: 12px;
      margin: 20px auto;
      width: 90%;
    }

    .esri-directions__warning-header {
      color: #8c2907;
      display: flex;
      margin-bottom: 6px;
    }

    .esri-directions__warning-heading {
      color: inherit;
      margin: 0 4px;
    }

    .esri-directions__warning-message {
      color: inherit;
      font-weight: 400;
    }

    .esri-directions__departure-time-controls {
      display: flex;
    }

    .esri-directions__departure-time-controls .esri-date-picker,
    .esri-directions__departure-time-controls .esri-time-picker {
      flex: 1 50% auto;
      border-top: 0;
    }

    .esri-directions__departure-time-controls .esri-widget:first-child {
      border-right: 0;
    }

    .esri-directions__departure-time-controls .esri-time-picker {
      padding: 0;
      display: flex;
      justify-content: center;
    }

    .esri-directions__departure-time-controls .esri-time-picker__input {
      width: 100%;
    }

    .esri-directions__departure-time-controls .esri-date-picker__calendar-toggle {
      padding: 0;
    }

    .esri-directions__directions-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .esri-directions__sign-in-content {
      align-self: flex-start;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .esri-directions__sign-in-button {
      width: auto;
    }

    .esri-directions__content-title {
      margin-top: 0;
      padding: 0 12px;
      align-self: flex-start;
    }

    .esri-directions__summary {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .esri-directions__summary-controls {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .esri-directions__stops {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .esri-directions__stop-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-top: dashed 2px transparent;
      background-color: #ffffff;
    }

    .esri-directions__stop-row-ghost {
      opacity: 0.25;
    }

    .esri-directions__stop-handle {
      flex: 0 0 auto;
      padding-left: 7px;
    }

    .esri-directions__stop-input {
      box-shadow: 0 0 0 1px rgba(110, 110, 110, 0.3);
    }

    .esri-directions__stop-input:hover {
      border-color: #000000;
    }

    .esri-search__sources-button [class*='esri-icon'] {
      position: relative;
      left: 1px;
    }

    .esri-directions__stop-input {
      margin: 0 4px;
      flex-grow: 0.8;
    }

    .esri-directions__stop-input .esri-search .esri-search__input {
      border: none;
      height: auto;
      margin-bottom: 2px;
      outline-offset: 4px;
      min-height: 32px;
    }

    .esri-directions__add-stop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      cursor: pointer;
    }

    .esri-directions__add-stop .esri-directions__stop-icon {
      display: flex;
      justify-content: flex-end;
      flex-grow: 0.08;
    }

    .esri-directions__add-stop .esri-directions__add-stop-text {
      width: auto;
      flex-grow: 0.9;
      padding: 0 4px;
    }

    .esri-directions__remove-stop-icon,
    .esri-directions__stop-row:hover .esri-directions__remove-stop-icon[hidden] {
      visibility: hidden;
    }

    .esri-directions__remove-stop:focus .esri-directions__remove-stop-icon,
    .esri-directions__stop-row:hover .esri-directions__remove-stop-icon {
      visibility: visible;
    }

    .esri-directions__reverse-stops[hidden] {
      display: inherit;
      visibility: hidden;
    }

    .esri-directions__stop-options {
      display: flex;
      flex-grow: 0.1;
      justify-content: space-between;
      padding-right: 7px;
    }

    .esri-directions__stop-row:first-child {
      margin-top: 0;
    }

    .esri-directions__stop-row:last-child {
      margin-bottom: 0;
    }

    .esri-directions__stop-icon[hidden] {
      display: inline-block;
      visibility: hidden;
    }

    .esri-directions__stop-icon--interactive {
      cursor: pointer;
    }

    .esri-directions__stop-icon-container {
      display: inline-block;
      position: relative;
    }

    .esri-directions__stop-icon-container--last::after {
      border: none;
    }

    .esri-directions__costs {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      cursor: pointer;
      padding: 12px 15px 0;
    }

    .esri-directions__costs-details {
      display: flex;
      justify-content: space-around;
      white-space: nowrap;
      width: 80%;
      margin-bottom: 6px;
    }

    .esri-directions__costs-units {
      display: flex;
      justify-content: space-around;
    }

    .esri-directions__costs-value,
    .esri-directions__other-costs-total,
    .esri-directions__vertical-splitter {
      color: #6e6e6e;
      font-size: 1.5em;
      line-height: 1.5;
    }

    .esri-directions__vertical-splitter {
      border: 1px solid rgba(50, 50, 50, 0.2);
    }

    .esri-directions__horizontal-splitter {
      border-top: 1px solid rgba(110, 110, 110, 0.3);
      flex-grow: 0.95;
    }

    .esri-directions__maneuvers {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 18px 0 0;
      padding: 0;
      border-top: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-directions__maneuver-list {
      padding: 0;
      margin: 0;
    }

    .esri-directions__maneuver {
      display: flex;
      padding: 12px 7px;
      border: none;
      border-left: 3px solid transparent;
      cursor: pointer;
    }

    .esri-directions__maneuver:hover,
    .esri-directions__maneuver:focus {
      background-color: #f3f3f3;
    }

    .esri-directions__maneuver--active,
    .esri-directions__maneuver--active:hover,
    .esri-directions__maneuver--active:focus {
      border-color: #0079c1;
      background-color: #e2f1fb;
    }

    .esri-directions__maneuver-section--collapsible {
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-directions__maneuver-section--collapsible:last-child {
      border-bottom: none;
    }

    .esri-directions__maneuver-section--collapsible .esri-directions__maneuver-list {
      background-color: #f3f3f3;
      padding-bottom: 12px;
      padding-top: 12px;
    }

    .esri-directions__maneuver-section-header {
      display: flex;
      padding: 0 7px;
    }

    .esri-directions__maneuver-section-header-toggle-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 12px 7px;
    }

    .esri-directions__maneuver-section-header-toggle-button
      .esri-directions__maneuver-section-title {
      padding: 0;
    }

    .esri-directions__maneuver-section-title {
      padding: 12px 7px;
      margin: 0;
    }

    .esri-directions__maneuver-section-toggle {
      cursor: pointer;
    }

    .esri-directions__maneuver-icon {
      fill: #323232;
      margin-right: 4px;
      width: 24px;
      height: 24px;
    }

    .esri-directions__maneuver-costs {
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;
    }

    .esri-directions__cost--intermediate,
    .esri-directions__cost--cumulative {
      font-size: 12px;
    }

    .esri-directions__maneuver-costs-container {
      width: 100%;
    }

    .esri-directions__scroller {
      overflow-y: auto;
    }

    .esri-directions__stop-row--valid .esri-directions__stop-handle:hover {
      cursor: move;
    }

    .esri-directions__disclaimer {
      font-size: 12px;
      color: #323232;
      padding: 0 15px;
    }

    .esri-directions .esri-search {
      box-shadow: none;
      width: auto;
    }

    .esri-directions .esri-search .esri-search__submit-button {
      display: none;
    }

    .esri-directions .esri-search .esri-search__container::before {
      display: none;
    }

    .esri-directions .esri-search .esri-search__container::after {
      top: auto;
      bottom: -2px;
    }

    .esri-ui-bottom-left .esri-directions .esri-search .esri-search__sources-button--up,
    .esri-ui-bottom-right .esri-directions .esri-search .esri-search__sources-button--up {
      display: none;
    }

    .esri-ui-bottom-left .esri-directions .esri-search .esri-search__sources-button--down,
    .esri-ui-bottom-right .esri-directions .esri-search .esri-search__sources-button--down {
      display: flex;
    }

    .esri-ui-bottom-right .esri-directions .esri-menu,
    .esri-ui-bottom-left .esri-directions .esri-menu {
      top: 100%;
      bottom: auto;
      margin: 2px 0 0;
    }

    .esri-direct-line-measurement-3d__container {
      position: relative;
      padding: 12px 0;
      overflow-y: auto;
    }

    .esri-direct-line-measurement-3d__container a {
      text-decoration: none;
    }

    .esri-direct-line-measurement-3d__header {
      position: relative;
      font-size: 12px;
      align-items: flex-start;
      justify-content: space-between;
      display: flex;
      flex: 0 0 auto;
    }

    .esri-direct-line-measurement-3d__header-title,
    h1 .esri-direct-line-measurement-3d__header-title {
      font-size: 16px;
      font-weight: 600;
      padding: 8px 0;
      margin: 0;
      display: block;
      flex: 1;
      word-break: break-word;
      text-align: left;
    }

    .esri-direct-line-measurement-3d__panel--error {
      color: #8c2907;
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-direct-line-measurement-3d__hint {
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-direct-line-measurement-3d__hint-text {
      margin: 12px 0;
      padding: 0;
    }

    .esri-direct-line-measurement-3d__measurement {
      padding: 12px 15px;
      margin: 12px 0;
      background-color: #f3f3f3;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-direct-line-measurement-3d__measurement-item {
      display: flex;
      padding-bottom: 12px;
      flex-flow: column;
    }

    .esri-direct-line-measurement-3d__measurement-item--disabled {
      display: flex;
      color: rgba(50, 50, 50, 0.4);
    }

    .esri-direct-line-measurement-3d__measurement-item-title {
      padding-bottom: 3px;
    }

    .esri-direct-line-measurement-3d__measurement-item-value {
      font-weight: 600;
    }

    .esri-direct-line-measurement-3d__settings {
      display: flex;
      justify-content: space-between;
      padding: 6px 15px;
    }

    .esri-direct-line-measurement-3d__units {
      display: flex;
      flex: 0 1 48%;
      flex-flow: column;
      padding: 0;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-direct-line-measurement-3d__units:only-child {
      flex: 1 0 100%;
    }

    .esri-direct-line-measurement-3d__units-select {
      width: 100%;
      padding-left: 0.5em;
      padding-right: 2.7em;
    }

    .esri-direct-line-measurement-3d__units-select-wrapper {
      width: 100%;
    }

    .esri-direct-line-measurement-3d__actions {
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding: 0 15px;
    }

    html[dir='rtl'] .esri-direct-line-measurement-3d__units-select {
      padding-left: 2.7em;
      padding-right: 0.5em;
    }

    .esri-distance-measurement-2d__container {
      position: relative;
      padding: 12px 0;
      overflow-y: auto;
    }

    .esri-distance-measurement-2d__container a {
      text-decoration: none;
    }

    .esri-distance-measurement-2d__header {
      position: relative;
      font-size: 12px;
      align-items: flex-start;
      justify-content: space-between;
      display: flex;
      flex: 0 0 auto;
    }

    .esri-distance-measurement-2d__header-title,
    h1 .esri-distance-measurement-2d__header-title {
      font-size: 16px;
      font-weight: 600;
      padding: 8px 0;
      margin: 0;
      display: block;
      flex: 1;
      word-break: break-word;
      text-align: left;
    }

    .esri-distance-measurement-2d__panel--error {
      color: #8c2907;
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-distance-measurement-2d__hint {
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-distance-measurement-2d__hint-text {
      margin: 12px 0;
      padding: 0;
    }

    .esri-distance-measurement-2d__measurement {
      padding: 12px 15px;
      margin: 12px 0;
      background-color: #f3f3f3;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-distance-measurement-2d__measurement-item {
      display: flex;
      padding-bottom: 12px;
      flex-flow: column;
    }

    .esri-distance-measurement-2d__measurement-item--disabled {
      display: flex;
      color: rgba(50, 50, 50, 0.4);
    }

    .esri-distance-measurement-2d__measurement-item-title {
      padding-bottom: 3px;
    }

    .esri-distance-measurement-2d__measurement-item-value {
      font-weight: 600;
    }

    .esri-distance-measurement-2d__settings {
      display: flex;
      justify-content: space-between;
      padding: 6px 15px;
    }

    .esri-distance-measurement-2d__units {
      display: flex;
      flex: 0 1 48%;
      flex-flow: column;
      padding: 0;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-distance-measurement-2d__units:only-child {
      flex: 1 0 100%;
    }

    .esri-distance-measurement-2d__units-select {
      width: 100%;
      padding-left: 0.5em;
      padding-right: 2.7em;
    }

    .esri-distance-measurement-2d__units-select-wrapper {
      width: 100%;
    }

    .esri-distance-measurement-2d__actions {
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding: 0 15px;
    }

    html[dir='rtl'] .esri-distance-measurement-2d__units-select {
      padding-left: 2.7em;
      padding-right: 0.5em;
    }

    .esri-editor {
      background-color: #f3f3f3;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .esri-editor__header {
      background-color: #ffffff;
      padding: 0 11px;
      font-size: 16px;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      display: flex;
      align-items: center;
      height: 56px;
    }

    .esri-editor__title {
      text-align: center;
      flex: 1 1 auto;
      overflow: hidden;
    }

    .esri-editor__content {
      background-color: #f3f3f3;
      padding: 6px 7px 0;
      justify-content: center;
      align-items: flex-start;
      flex: 1 1 auto;
      min-height: 20vh;
      display: flex;
      flex-direction: row;
      animation: esri-fade-in 250ms ease-in-out;
      transition: min-height 250ms ease-in-out;
    }

    .esri-editor__content:empty {
      min-height: 0;
    }

    .esri-editor__content-group {
      display: flex;
      flex-direction: column;
      flex: 1 0 100%;
    }

    .esri-editor__message {
      display: flex;
      align-items: center;
      align-self: stretch;
      font-size: 16px;
      margin-left: 15px;
      margin-right: 15px;
    }

    .esri-editor__scroller {
      overflow-y: auto;
      padding-top: 6px;
      padding-bottom: 12px;
    }

    .esri-editor .esri-feature-form {
      width: 100%;
      padding: 0;
    }

    .esri-editor .esri-item-list {
      background-color: transparent;
    }

    .esri-editor .esri-item-list__group {
      margin-left: 0;
      margin-right: 0;
    }

    .esri-editor__temp-wrapper {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
    }

    .esri-editor__back-button {
      display: flex;
      width: 32px;
      height: 32px;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      background-color: #f6f6f6;
      transition: background-color 125ms ease-in-out;
    }

    .esri-editor__back-button:hover {
      background-color: #f3f3f3;
      color: #2e2e2e;
    }

    .esri-editor__controls {
      background-color: #ffffff;
      border-top: 1px solid rgba(110, 110, 110, 0.3);
      padding: 12px 15px;
      display: flex;
      flex-direction: column;
    }

    .esri-editor__control-button {
      margin-bottom: 6px;
      min-height: 32px;
    }

    .esri-editor__feature-list-item {
      box-shadow: 0 1px 0 rgba(110, 110, 110, 0.3);
      padding: 12px 3px;
      background-color: #ffffff;
      cursor: pointer;
      margin: 3px 0;
      border: 1px solid rgba(110, 110, 110, 0.3);
      border-color: transparent;
      border-radius: 2px;
      display: flex;
      justify-content: space-between;
      transition: border-color 125ms ease-in-out;
    }

    .esri-editor__feature-list-item:hover,
    .esri-editor__feature-list-item:focus {
      border-color: #000000;
    }

    .esri-editor__feature-list-item:active {
      background-color: #e2f1fb;
      color: #6e6e6e;
    }

    .esri-editor__feature-list-item[class^='esri-icon'] {
      padding-right: 2.8px;
    }

    .esri-editor__feature-list-item--disabled {
      pointer-events: none;
      opacity: 0.4;
    }

    .esri-editor__feature-list-icon {
      flex: 0 0 auto;
      padding: 0 7px;
    }

    .esri-editor__feature-list-index {
      text-align: right;
      flex-basis: 2ch;
    }

    .esri-editor__feature-list-name {
      flex: 1 1 auto;
      margin: 0 7px;
    }

    .esri-editor__feature-list {
      width: 100%;
      margin: 0;
      padding: 3px;
      list-style: none;
    }

    .esri-editor__warning-card {
      background-color: #ffffff;
      border-top: solid 3px #de2900;
      color: #323232;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      padding: 12px 15px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 85%;
      display: flex;
      flex-flow: column nowrap;
      animation: esri-fade-in-up 250ms ease-in-out;
    }

    .esri-editor__warning-icon {
      color: inherit;
    }

    .esri-editor__warning-header {
      color: #8c2907;
      display: flex;
      margin-bottom: 12px;
      flex: 0 0 auto;
    }

    .esri-editor__warning-heading {
      color: #323232;
      margin: 0 3px;
    }

    .esri-editor__warning-message {
      color: inherit;
      font-weight: 400;
      word-break: break-word;
      flex: 1 1 auto;
      overflow: auto;
      overflow-x: hidden;
      padding: 0 0 12px;
    }

    .esri-editor__warning-divider {
      color: inherit;
      margin: 0 0 12px;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      border-color: rgba(110, 110, 110, 0.15);
      flex: 0 0 auto;
    }

    .esri-editor__warning-option {
      margin: 6px 0;
      cursor: pointer;
      flex: 0 0 auto;
    }

    .esri-editor__warning-option--positive {
      color: #0079c1;
    }

    .esri-editor__warning-option--negative {
      color: #8c2907;
    }

    .esri-editor__overlay {
      position: absolute;
      overflow: hidden;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.7);
    }

    .esri-editor__progress-bar {
      position: absolute;
      width: 100%;
    }

    .esri-editor__mode-selection {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
    }

    .esri-ui .esri-editor__scroller {
      max-height: 270px;
    }

    .esri-ui .esri-editor .esri-item-list__scroller {
      max-height: 190px;
    }

    .esri-editor__progress-bar::before,
    .esri-editor__progress-bar::after {
      content: '';
      opacity: 1;
      position: absolute;
      height: 1px;
      top: 0;
      transition: opacity 500ms ease-in-out;
    }

    .esri-editor__progress-bar::before {
      background-color: rgba(110, 110, 110, 0.3);
      width: 100%;
      z-index: 0;
    }

    .esri-editor__progress-bar::after {
      background-color: #6e6e6e;
      width: 20%;
      z-index: 0;
      animation: looping-progresss-bar-ani 1500ms linear infinite;
    }

    .esri-elevation-profile {
      position: relative;
      padding: 12px 15px;
    }

    .esri-elevation-profile.esri-component.esri-widget--panel {
      width: 550px;
      max-width: 100%;
    }

    .esri-elevation-profile__header {
      display: flex;
      flex-direction: row;
      height: 30px;
      align-items: center;
      justify-content: flex-end;
    }

    .esri-elevation-profile__header button {
      width: 34px;
      flex-shrink: 0;
      flex-grow: 0;
      z-index: 1;
    }

    .esri-elevation-profile__header button:focus:not(:focus-visible) {
      outline: none;
      border: none;
    }

    .esri-elevation-profile__footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      margin-top: 12px;
    }

    .esri-elevation-profile__action-button {
      width: auto;
      margin-inline-start: 7px;
    }

    .esri-elevation-profile__action-button:focus:not(:focus-visible) {
      outline: none;
      border: none;
    }

    .esri-elevation-profile__main-container {
      position: relative;
      width: 100%;
      height: 180px;
      margin-top: -30px;
    }

    .esri-elevation-profile__chart-container {
      position: relative;
      width: 100%;
      height: 100%;
      padding-top: 8px;
    }

    .esri-elevation-profile__prompt-container {
      display: flex;
      width: 100%;
      height: 100%;
      margin-bottom: 0;
      padding: 12px 15px;
      padding-top: 36px;
      text-align: center;
      align-items: center;
      justify-content: center;
    }

    .esri-elevation-profile__prompt-container > p {
      margin: 0;
      width: 100%;
    }

    .esri-elevation-profile__chart-spinner {
      font-size: 30px;
      color: #0079c1;
      opacity: 0;
      transition: opacity 150ms ease-in-out;
      pointer-events: none;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -15px;
    }

    .esri-elevation-profile__chart-spinner--visible {
      transition-delay: 1000ms;
      opacity: 1;
    }

    .esri-elevation-profile__chart-spinner--small {
      font-size: 16px;
      top: 0;
      left: 0;
      margin-left: 0;
    }

    .esri-elevation-profile--portrait,
    .esri-elevation-profile--portrait.esri-component.esri-widget--panel {
      height: auto;
    }

    .esri-elevation-profile--portrait .esri-elevation-profile__footer {
      flex-direction: column;
    }

    .esri-elevation-profile--portrait .esri-elevation-profile__action-button {
      align-self: stretch;
      margin-inline-start: 0;
    }

    .esri-elevation-profile--portrait .esri-elevation-profile__action-button:not(:last-of-type) {
      margin-bottom: 6px;
    }

    .esri-elevation-profile-settings__popover-content {
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      padding: 12px 15px;
      color: #323232;
      border: 1px solid rgba(110, 110, 110, 0.3);
      background-color: #ffffff;
    }

    .esri-elevation-profile-settings__select {
      min-width: 150px;
    }

    .esri-elevation-profile-settings__select-label {
      display: block;
      margin-bottom: 2px;
      font-size: 12px;
    }

    .esri-elevation-profile-legend {
      margin-top: 6px;
    }

    .esri-elevation-profile-legend-item {
      position: relative;
      background: #f3f3f3;
    }

    .esri-elevation-profile-legend-item:not(:last-of-type) {
      margin-bottom: 2px;
    }

    .esri-elevation-profile-legend-item--disabled {
      filter: grayscale(1);
      opacity: 0.4;
    }

    .esri-elevation-profile-legend-item__color-indicator {
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
    }

    .esri-elevation-profile-legend-item__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }

    .esri-elevation-profile-legend-item__content {
      display: block;
      padding: 12px 15px;
      padding-top: 0;
    }

    .esri-elevation-profile-legend-item__collapse-toggle {
      width: auto;
      color: #6e6e6e;
      flex-shrink: 0;
    }

    .esri-elevation-profile-legend-item__collapse-toggle:focus:not(:focus-visible) {
      outline: none;
      border: none;
    }

    .esri-elevation-profile-legend-item__collapse-toggle__icon {
      margin: 0 3px;
      transform: rotate(0);
      transition: transform 0.1s ease-in-out;
    }

    .esri-elevation-profile-legend-item--expanded
      .esri-elevation-profile-legend-item__collapse-toggle__icon {
      transform: rotate(180deg);
    }

    .esri-elevation-profile-legend-item__label {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-shrink: 1;
      flex-grow: 1;
      min-width: 0;
      padding-inline-start: 15px;
    }

    .esri-elevation-profile-legend-item__label:not(
        .esri-elevation-profile-legend-item__label--disabled
      ) {
      cursor: pointer;
    }

    .esri-elevation-profile-legend-item__label > span {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .esri-elevation-profile-legend-item__checkbox {
      font-size: 10px;
      line-height: 10px;
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-inline-end: 7px;
      padding: 1px;
      transition: all 0.1s ease-in-out;
      border: solid 1px rgba(110, 110, 110, 0.3);
      background: none;
      flex-shrink: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    .esri-elevation-profile-legend-item__checkbox::before {
      color: #ffffff;
    }

    .esri-elevation-profile-legend-item__checkbox--checked {
      background: #0079c1;
      border-color: #0079c1;
    }

    .esri-elevation-profile-legend-item__checkbox--checked::before {
      color: #ffffff;
    }

    .esri-elevation-profile-legend-item__checkbox:not(:disabled) {
      cursor: pointer;
    }

    .esri-elevation-profile-legend-item__checkbox:focus:not(:focus-visible) {
      outline: none;
    }

    .esri-elevation-profile-statistics {
      --max-width: 1px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(var(--max-width), 1fr));
      gap: 2px 22px;
      width: 100%;
      contain: layout paint style;
    }

    .esri-elevation-profile-statistics__statistic {
      display: block;
      width: max-content;
      white-space: nowrap;
      text-align: start;
    }

    .esri-elevation-profile-statistics__statistic__label {
      font-size: 10px;
      font-weight: 400;
    }

    .esri-elevation-profile-statistics__statistic__value {
      font-size: 10px;
      font-weight: 600;
      line-height: 0.95em;
    }

    .esri-elevation-profile-statistics__slope-value > [class^='esri-icon'] {
      font-size: 10px;
    }

    .esri-elevation-profile-statistics__slope-value > [class^='esri-icon']:not(:first-child) {
      margin-inline-start: 7px;
    }

    .esri-elevation-profile--portrait .esri-elevation-profile-statistics {
      gap: 6px 22px;
      margin-bottom: 12px;
    }

    .esri-elevation-profile--portrait .esri-elevation-profile-statistics__statistic__value {
      margin-top: 2px;
    }

    html[dir='rtl'] .esri-elevation-profile-legend-item__color-indicator {
      left: auto;
      right: 0;
    }

    html[dir='rtl'] .esri-elevation-profile__chart-spinner--small {
      left: auto;
      right: 0;
    }

    .esri-expand {
      overflow: visible;
      min-height: 32px;
      min-width: 32px;
    }

    .esri-expand__container {
      position: relative;
      transition: 300ms;
    }

    .esri-expand__content {
      opacity: 0;
      width: 0;
      height: 0;
      z-index: 1;
      margin: 0 3px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      transition:
        opacity 250ms ease-in-out,
        margin 250ms ease-in-out;
      overflow: hidden;
      visibility: hidden;
    }

    .esri-ui-top-left .esri-expand__content,
    .esri-ui-bottom-left .esri-expand__content {
      left: 100%;
    }

    .esri-ui-top-right .esri-expand__content,
    .esri-ui-bottom-right .esri-expand__content {
      right: 100%;
    }

    .esri-ui-top-left .esri-expand__content,
    .esri-ui-top-right .esri-expand__content {
      top: 0;
    }

    .esri-ui-bottom-left .esri-expand__content,
    .esri-ui-bottom-right .esri-expand__content {
      bottom: 0;
    }

    .esri-ui-top-left .esri-icon-expand,
    .esri-ui-bottom-left .esri-icon-expand,
    .esri-ui-top-left .esri-icon-collapse,
    .esri-ui-bottom-left .esri-icon-collapse {
      transform: rotate(180deg);
    }

    .esri-expand__content--expanded {
      opacity: 1;
      width: auto;
      height: auto;
      overflow: visible;
      margin-left: 7px;
      margin-right: 7px;
      visibility: visible;
    }

    .esri-expand__content .esri-widget {
      box-shadow: none;
    }

    .esri-expand__icon-number {
      position: absolute;
      top: -6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      line-height: 1em;
      padding: 0.125em 0.333em;
      height: 16px;
      border-radius: 16px;
      background-color: #6e6e6e;
      color: #ffffff;
      transform-origin: 50%;
      animation: expand-number-intro-ani 1000ms ease-in-out;
    }

    .esri-ui-top-left .esri-expand__icon-number,
    .esri-ui-bottom-left .esri-expand__icon-number {
      right: -6px;
    }

    .esri-ui-top-right .esri-expand__icon-number,
    .esri-ui-bottom-right .esri-expand__icon-number {
      left: -6px;
    }

    .esri-ui-bottom-right .esri-expand__icon-number--expanded,
    .esri-ui-top-right .esri-expand__icon-number--expanded,
    .esri-ui-bottom-left .esri-expand__icon-number--expanded,
    .esri-ui-top-left .esri-expand__icon-number--expanded {
      position: static;
      top: auto;
      left: auto;
      right: auto;
    }

    .esri-expand__icon-number--expanded {
      display: none;
    }

    .esri-view-height-greater-than-medium .esri-ui-corner .esri-component .esri-expand__content {
      max-height: 680px;
    }

    .esri-view-height-medium .esri-ui-corner .esri-component .esri-expand__content {
      max-height: 540px;
    }

    .esri-view-height-small .esri-ui-corner .esri-component .esri-expand__content {
      max-height: 420px;
    }

    .esri-view-height-xsmall .esri-ui-corner .esri-component .esri-expand__content {
      max-height: 240px;
    }

    .esri-expand--drawer .esri-widget {
      max-width: 100%;
      width: 100%;
    }

    .esri-expand--drawer .esri-expand__container--expanded {
      position: fixed;
      top: 0;
      bottom: 0;
      margin: 0;
      height: 100%;
      background: #ffffff;
      z-index: 1;
      overflow: auto;
    }

    .esri-expand--drawer .esri-expand__container--expanded .esri-expand__panel {
      display: flex;
      justify-content: space-between;
      padding: 1.023rem;
      align-items: center;
    }

    .esri-expand--drawer
      .esri-expand__container--expanded
      .esri-expand__panel
      .esri-expand__icon-number--expanded {
      display: block;
    }

    .esri-expand--drawer .esri-expand__mask--expanded {
      background-color: #000000;
      position: fixed;
      right: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      bottom: 0;
      opacity: 0.8;
      z-index: 1;
    }

    .esri-ui-top-right .esri-expand--drawer .esri-expand__panel,
    .esri-ui-bottom-right .esri-expand--drawer .esri-expand__panel {
      flex-flow: row nowrap;
    }

    .esri-ui-top-right .esri-expand--drawer .esri-expand__container--expanded,
    .esri-ui-bottom-right .esri-expand--drawer .esri-expand__container--expanded {
      width: 75%;
      max-width: 300px;
      animation: expand-slide-rtl-ani 300ms forwards;
    }

    .esri-ui-top-left esri-expand--drawer .esri-expand__panel,
    .esri-ui-bottom-left esri-expand--drawer .esri-expand__panel {
      flex-flow: row-reverse nowrap;
    }

    .esri-ui-top-left esri-expand--drawer .esri-expand__container--expanded,
    .esri-ui-bottom-left esri-expand--drawer .esri-expand__container--expanded {
      width: 75%;
      max-width: 300px;
      animation: expand-slide-ltr-ani 300ms forwards;
    }

    .esri-view-width-xsmall .esri-expand--auto .esri-widget {
      max-width: 100%;
      width: 100%;
    }

    .esri-view-width-xsmall .esri-expand--auto .esri-expand__container--expanded {
      position: fixed;
      top: 0;
      bottom: 0;
      margin: 0;
      height: 100%;
      background: #ffffff;
      z-index: 1;
      overflow: auto;
    }

    .esri-view-width-xsmall
      .esri-expand--auto
      .esri-expand__container--expanded
      .esri-expand__panel {
      display: flex;
      justify-content: space-between;
      padding: 1.023rem;
      align-items: center;
    }

    .esri-view-width-xsmall
      .esri-expand--auto
      .esri-expand__container--expanded
      .esri-expand__panel
      .esri-expand__icon-number--expanded {
      display: block;
    }

    .esri-view-width-xsmall .esri-expand--auto .esri-expand__mask--expanded {
      background-color: #000000;
      position: fixed;
      right: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      bottom: 0;
      opacity: 0.8;
      z-index: 1;
    }

    .esri-view-width-xsmall .esri-ui-top-right .esri-expand--auto .esri-expand__panel,
    .esri-view-width-xsmall .esri-ui-bottom-right .esri-expand--auto .esri-expand__panel {
      flex-flow: row nowrap;
    }

    .esri-view-width-xsmall .esri-ui-top-right .esri-expand--auto .esri-expand__container--expanded,
    .esri-view-width-xsmall
      .esri-ui-bottom-right
      .esri-expand--auto
      .esri-expand__container--expanded {
      width: 75%;
      max-width: 300px;
      animation: expand-slide-rtl-ani 300ms forwards;
    }

    .esri-view-width-xsmall .esri-ui-top-left esri-expand--auto .esri-expand__panel,
    .esri-view-width-xsmall .esri-ui-bottom-left esri-expand--auto .esri-expand__panel {
      flex-flow: row-reverse nowrap;
    }

    .esri-view-width-xsmall .esri-ui-top-left esri-expand--auto .esri-expand__container--expanded,
    .esri-view-width-xsmall
      .esri-ui-bottom-left
      esri-expand--auto
      .esri-expand__container--expanded {
      width: 75%;
      max-width: 300px;
      animation: expand-slide-ltr-ani 300ms forwards;
    }

    .esri-expand--floating .esri-expand__content {
      position: absolute;
    }

    .esri-expand--floating .esri-expand__mask,
    .esri-expand--floating .esri-expand__content-panel {
      display: none;
    }

    .esri-view-width-greater-than-xsmall .esri-expand--auto .esri-expand__content {
      position: absolute;
    }

    .esri-view-width-greater-than-xsmall .esri-expand--auto .esri-expand__mask,
    .esri-view-width-greater-than-xsmall .esri-expand--auto .esri-expand__content-panel {
      display: none;
    }

    @keyframes expand-slide-rtl-ani {
      from {
        right: -600px;
      }

      to {
        right: 0;
      }
    }

    @keyframes expand-slide-ltr-ani {
      from {
        left: -600px;
      }

      to {
        left: 0;
      }
    }

    @keyframes expand-number-intro-ani {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(1);
      }

      75% {
        transform: scale(1.25);
      }

      100% {
        transform: scale(1);
      }
    }

    .esri-feature__title {
      font-size: 14px;
      display: block;
      word-break: break-word;
      word-wrap: break-word;
    }

    .esri-feature__attachments {
      display: flex;
    }

    .esri-feature__loading-container {
      width: 100%;
      justify-content: center;
      display: flex;
      padding: 12px 0;
    }

    .esri-icon-loading-indicator {
      display: inline-block;
    }

    .esri-feature {
      width: 100%;
    }

    .esri-feature__main-container {
      line-height: normal;
    }

    .esri-feature__content-element {
      padding: 0 7px;
      margin-bottom: 24px;
    }

    .esri-feature__content-element:last-child {
      margin-bottom: 0;
    }

    .esri-feature-attachments {
      flex-flow: column wrap;
      align-items: flex-start;
    }

    .esri-feature__last-edited-info {
      font-size: 12px;
      padding-top: 6px;
    }

    html[dir='rtl'] .esri-feature__attachments-title {
      margin: 0 0 0 auto;
    }

    html[dir='rtl'] .esri-feature__attachments--list .esri-feature__attachment-item-mask {
      margin-right: 0;
      margin-left: 7px;
    }

    .esri-feature-content__loader-container {
      height: 150px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .esri-feature-content__loader {
      height: 64px;
      width: 100%;
      background: url(https://js.arcgis.com/4.19/esri/themes/base/images/loading-throb.gif)
        no-repeat center center;
    }

    .esri-feature-content h1,
    .esri-feature-content h2,
    .esri-feature-content h3,
    .esri-feature-content h4,
    .esri-feature-content h5,
    .esri-feature-content h6 {
      margin: 0.5em 0;
      letter-spacing: 0;
      font-weight: 600;
      line-height: normal;
    }

    .esri-feature-content h1 {
      font-size: 20px;
    }

    .esri-feature-content h2 {
      font-size: 16px;
    }

    .esri-feature-content h3,
    .esri-feature-content h4,
    .esri-feature-content h5,
    .esri-feature-content h6 {
      font-size: 14px;
    }

    .esri-feature-element-info__title {
      color: #323232;
      font-size: 20px;
      font-weight: 400;
      margin-bottom: 0.2em;
      margin-top: 0;
    }

    .esri-feature-element-info__description {
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 9px;
    }

    .esri-feature-content p {
      font-size: 14px;
      line-height: normal;
      margin: 0 0 1.2em;
    }

    .esri-feature-content img {
      max-width: 100%;
      max-height: 100%;
      image-orientation: from-image;
    }

    .esri-feature-content figcaption {
      font-size: 12px;
      font-style: italic;
      padding: 0;
      margin: 0.2em 0 0;
      display: block;
    }

    .esri-feature-content ul {
      margin-bottom: 1rem;
    }

    .esri-feature-content a {
      color: #6e6e6e;
    }

    .esri-feature-content a:hover,
    .esri-feature-content a:focus {
      color: #2e2e2e;
    }

    .esri-feature-media__container {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
    }

    .esri-feature-media__item-title {
      font-size: 16px;
      margin: 0 0 0.2em;
    }

    .esri-feature-media__item-caption {
      font-size: 12px;
      padding: 0.1rem 0 0;
    }

    .esri-feature-media__container {
      flex-flow: row nowrap;
      align-items: stretch;
      justify-content: center;
      width: 100%;
      min-height: 150px;
      margin-top: 6px;
    }

    .esri-feature-media__container .esri-feature-media__button {
      justify-content: center;
      align-items: center;
      flex: 0 0 32px;
      width: 32px;
      font-size: 20px;
      background: transparent;
      border: none;
      color: #6e6e6e;
      display: flex;
    }

    .esri-feature-media__container .esri-feature-media__button {
      cursor: pointer;
      color: #2e2e2e;
    }

    .esri-feature-media__item {
      width: 100%;
      height: auto;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      margin-top: 6px;
      margin-bottom: 12px;
    }

    .esri-feature-media__item-container {
      flex: 0 1 auto;
      width: 100%;
    }

    .esri-feature-media__item-container img {
      max-width: 100%;
    }

    .esri-feature-media__chart {
      background-color: #ffffff;
      width: 100%;
      height: 250px;
    }

    .esri-feature-media__previous-icon--rtl,
    .esri-feature-media__next-icon--rtl {
      display: none;
    }

    html[dir='rtl'] .esri-feature-media__image-summary {
      margin: 0 0.5em 0 0;
    }

    html[dir='rtl'] .esri-feature-media__previous-icon--rtl,
    html[dir='rtl'] .esri-feature-media__next-icon--rtl {
      display: inline-block;
    }

    html[dir='rtl'] .esri-feature-media__previous-icon,
    html[dir='rtl'] .esri-feature-media__next-icon {
      display: none;
    }

    .esri-feature-form {
      background-color: #f3f3f3;
      padding: 12px 15px;
    }

    .esri-feature-form__form {
      display: flex;
      flex-direction: column;
    }

    .esri-feature-form__label {
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-word;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      margin-bottom: 12px;
      position: relative;
      opacity: 1;
      transition:
        opacity 250ms,
        margin 250ms;
    }

    .esri-feature-form__label:last-child {
      margin-bottom: 0;
    }

    .esri-feature-form__form-header {
      margin-bottom: 12px;
    }

    .esri-feature-form__form-header .esri-feature-form__description-text ~ .esri-widget__heading {
      margin-bottom: 0;
    }

    .esri-feature-form__form-header .esri-feature-form__description-text {
      margin-top: 0;
    }

    .esri-feature-form__input {
      margin-top: 4px;
      width: 100%;
      resize: horizontal;
    }

    .esri-feature-form__input--date,
    .esri-feature-form__input--time {
      resize: none;
    }

    .esri-feature-form__input--disabled {
      opacity: 0.4;
    }

    .esri-feature-form__input--invalid {
      border: 1px solid #de2900;
    }

    .esri-feature-form__input-icon--invalid {
      position: absolute;
      top: 30px;
      right: 4px;
      color: #8c2907;
      background-color: #ffffff;
    }

    .esri-feature-form__input:focus + .esri-feature-form__input-icon--invalid {
      display: none;
    }

    .esri-feature-form__field-error-message {
      padding: 7px 0;
      font-size: 12px;
    }

    .esri-feature-form__date-input-container {
      display: flex;
    }

    .esri-feature-form__date-input-part {
      width: 50%;
      display: flex;
      flex-direction: column;
    }

    .esri-feature-form__date-input-part:nth-last-child(2) .esri-feature-form__input {
      border-right: none;
    }

    .esri-feature-form__date-input-part--lone {
      width: 100%;
    }

    .esri-feature-form__date-format-hint {
      color: #6e6e6e;
      font-size: 12px;
      padding: 0.5em 0.5em 0;
    }

    .esri-feature-form__input--radio-group {
      display: flex;
      flex-direction: column;
    }

    .esri-feature-form__input--radio-label {
      display: flex;
      align-items: center;
    }

    .esri-feature-form__input--radio {
      margin: 7px;
    }

    .esri-feature-form__group-description {
      margin: 6px 0 4px;
    }

    .esri-feature-form__group {
      border: none;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      padding: 0 0 12px;
      margin: 0 0 12px;
      min-inline-size: unset;
      transition: border-color 250ms;
    }

    .esri-feature-form__group-label {
      margin-bottom: 0;
    }

    .esri-feature-form__group-header {
      align-items: center;
      display: flex;
      cursor: pointer;
      justify-content: space-between;
      margin: 0 0 6px;
      padding: 6px 0;
      border: none;
      background-color: inherit;
      font-family: inherit;
      text-align: unset;
      width: 100%;
    }

    .esri-feature-form__group-title {
      flex: 0 1 auto;
    }

    .esri-feature-form__group-toggle-icon {
      justify-self: flex-end;
      flex: 0 0 16px;
      margin: 0 7px;
    }

    .esri-feature-form__group:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .esri-feature-form__group--sequential {
      border-bottom: none;
      border-left: 3px solid rgba(110, 110, 110, 0.3);
      padding-bottom: 0;
      padding-left: 6px;
      padding-right: 6px;
    }

    .esri-feature-form__group--sequential .esri-feature-form__group-header {
      padding-top: 0;
    }

    .esri-feature-form__group--sequential:not(.esri-feature-form__group--collapsed)
      .esri-feature-form__group-header {
      cursor: auto;
    }

    .esri-feature-form__group--active {
      border-left-color: #0079c1;
    }

    .esri-feature-form__group--collapsed .esri-feature-form__group-header {
      margin-bottom: 0;
    }

    .esri-feature-form__group--collapsed .esri-feature-form__label {
      pointer-events: none;
      opacity: 0;
      height: 0;
      margin: 0;
      transition: none;
    }

    .esri-feature-form__description-text {
      margin: 3px 0 0;
      font-size: 12px;
      color: #6e6e6e;
    }

    html[dir='rtl'] .esri-feature-form__group {
      border-left: none;
      border-right: 3px solid rgba(110, 110, 110, 0.3);
    }

    html[dir='rtl'] .esri-feature-form__date-input-part:first-child .esri-feature-form__input {
      border-right: 1px solid rgba(110, 110, 110, 0.3);
      border-left: none;
    }

    .esri-feature-table {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .esri-feature-table .esri-feature-table__content {
      flex: 1 1 0;
      flex-grow: 1;
      min-height: 0;
      margin: 0;
      padding: 0;
    }

    .esri-feature-table .esri-grid__grid {
      height: 100%;
      width: 100%;
    }

    .esri-feature-table .esri-grid__grid .esri-column__menu-container.esri-button-menu {
      height: 28px;
      width: 28px;
      position: inherit;
    }

    .esri-feature-table
      .esri-grid__grid
      .esri-column__menu-container.esri-button-menu
      .esri-button-menu__button {
      height: 26px;
      width: 16px;
    }

    .esri-feature-table__menu {
      height: 40px;
      order: 3;
      padding: 4px;
      width: 40px;
    }

    .esri-feature-table__menu .esri-button-menu {
      bottom: auto;
      position: relative;
    }

    .esri-feature-table__header {
      display: flex;
      flex-direction: row;
      font-weight: 400;
      height: 40px;
      line-height: 40px;
      margin: 0;
      width: 100%;
    }

    .esri-feature-table__title {
      flex-grow: 1;
      order: 2;
    }

    .esri-feature-table__loader-container {
      height: 40px;
      margin: 0 8px;
      order: 1;
      width: 32px;
    }

    .esri-feature-table__loader {
      height: 40px;
      width: 32px;
      background: url(https://js.arcgis.com/4.19/esri/themes/base/images/loading-throb.gif)
        no-repeat center;
    }

    .esri-field-column__header-content {
      align-items: center;
      display: flex;
      flex-grow: 1;
      min-width: 0;
      overflow: visible;
    }

    .esri-field-column__cell-content {
      font-size: 0.9em;
    }

    .esri-field-column__cell__date-input-container {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .esri-field-column__cell__date-input-container .esri-field-column__cell__date-input-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .esri-field-column__cell__date-input-container .esri-date-picker {
      flex: 1 1 0;
    }

    .esri-field-column__cell__date-input-container
      .esri-date-picker
      .esri-date-picker__text-input.esri-input {
      width: 100%;
    }

    .esri-field-column__cell__date-input-container
      .esri-date-picker
      .esri-date-picker__calendar-toggle {
      height: 26px;
    }

    .esri-field-column__cell__date-input-container .esri-time-picker {
      display: inline-flex;
      flex: 1 1 0;
    }

    .esri-field-column__cell__date-input-container .esri-time-picker input {
      width: 100%;
    }

    .esri-field-column__button {
      align-items: center;
      background-color: transparent;
      border: none;
      color: #0079c1;
      display: flex;
      font-size: 16px;
      height: auto;
      justify-content: center;
      text-align: center;
      transition: background-color 125ms ease-in-out;
      width: 26px;
    }

    .esri-field-column__button:disabled {
      cursor: default;
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-field-column__button:hover,
    .esri-field-column__button:focus {
      background-color: #f3f3f3;
      color: #2e2e2e;
      cursor: pointer;
    }

    .esri-field-column__cell__input-container {
      display: flex;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
    }

    .esri-field-column__cell-input {
      height: 100%;
      width: 100%;
      border: none;
      padding: 0 5px;
      flex: 1 1 0;
    }

    [dir='rtl'] .esri-feature-table__menu-content {
      left: 2px;
      right: auto;
    }

    .esri-floor-filter {
      display: flex;
      flex-direction: row;
      background: transparent;
      border: none;
      box-shadow: none !important;
    }

    .esri-floor-filter__position--top {
      align-items: flex-start;
    }

    .esri-floor-filter__position--top .esri-floor-filter__levels-container,
    .esri-floor-filter__position--top .esri-floor-filter__close-levels-button,
    .esri-floor-filter__position--top .esri-floor-filter__zoom-button,
    .esri-floor-filter__position--top .esri-floor-filter__zoom-button--levels,
    .esri-floor-filter__position--top .esri-floor-filter__minimize-toggle-button {
      border-width: 1px 0 0;
    }

    .esri-floor-filter__position--bottom {
      align-items: flex-end;
    }

    .esri-floor-filter__position--bottom .esri-floor-filter__levels-container,
    .esri-floor-filter__position--bottom .esri-floor-filter__close-levels-button,
    .esri-floor-filter__position--bottom .esri-floor-filter__zoom-button,
    .esri-floor-filter__position--bottom .esri-floor-filter__zoom-button--levels,
    .esri-floor-filter__position--bottom .esri-floor-filter__minimize-toggle-button {
      border-width: 0 0 1px;
    }

    .esri-floor-filter__layout--collapsed .esri-floor-filter__button-container {
      display: flex;
      flex-direction: column;
      max-width: 48px;
    }

    .esri-floor-filter__layout--collapsed .esri-floor-filter__button-container .esri-icon {
      position: relative;
      top: 2px;
    }

    .esri-floor-filter__layout--collapsed
      .esri-floor-filter__button-container
      .esri-floor-filter__browse-button {
      width: 48px;
      height: 48px;
      padding: 12px;
      border: none;
    }

    .esri-floor-filter__layout--collapsed
      .esri-floor-filter__button-container
      .esri-floor-filter__zoom-button {
      width: 48px;
      height: 48px;
      padding: 12px;
      border-style: solid;
      border-color: rgba(110, 110, 110, 0.3);
    }

    .esri-floor-filter__layout--collapsed
      .esri-floor-filter__button-container
      .esri-floor-filter__zoom-button--levels {
      width: 48px;
      height: 32px;
      padding: 8px 12px;
      border-style: solid;
      border-color: rgba(110, 110, 110, 0.3);
    }

    .esri-floor-filter__layout--collapsed
      .esri-floor-filter__button-container
      .esri-floor-filter__minimize-toggle-button {
      width: 48px;
      height: 32px;
      padding: 4px 12px;
      border-style: solid;
      border-color: rgba(110, 110, 110, 0.3);
    }

    .esri-floor-filter__layout--expanded .esri-floor-filter__button-container {
      display: flex;
      flex-direction: column;
      max-width: 300px;
    }

    .esri-floor-filter__layout--expanded .esri-floor-filter__button-container .esri-icon {
      position: relative;
      top: 2px;
    }

    .esri-floor-filter__layout--expanded
      .esri-floor-filter__button-container
      .esri-floor-filter__button-info {
      margin-right: auto;
    }

    .esri-floor-filter__layout--expanded
      .esri-floor-filter__button-container
      .esri-floor-filter__browse-button {
      width: auto;
      height: 48px;
      padding: 12px;
      border: none;
    }

    .esri-floor-filter__layout--expanded
      .esri-floor-filter__button-container
      .esri-floor-filter__level-button {
      text-align: left;
      justify-content: flex-start;
      padding: 16px;
    }

    .esri-floor-filter__layout--expanded
      .esri-floor-filter__button-container
      .esri-floor-filter__zoom-button {
      width: auto;
      height: 48px;
      padding: 12px;
      border-style: solid;
      border-color: rgba(110, 110, 110, 0.3);
    }

    .esri-floor-filter__layout--expanded
      .esri-floor-filter__button-container
      .esri-floor-filter__zoom-button--levels {
      width: auto;
      height: 32px;
      padding: 8px 12px;
      border-style: solid;
      border-color: rgba(110, 110, 110, 0.3);
    }

    .esri-floor-filter__layout--expanded
      .esri-floor-filter__button-container
      .esri-floor-filter__minimize-toggle-button {
      width: auto;
      height: 32px;
      padding: 4px 12px;
      border-style: solid;
      border-color: rgba(110, 110, 110, 0.3);
    }

    .esri-floor-filter__layout--expanded
      .esri-floor-filter__button-container
      .esri-floor-filter__button-label {
      margin-left: 8px;
    }

    .esri-floor-filter .esri-floor-filter__level-button {
      width: 100%;
      border: none;
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      height: 48px;
    }

    .esri-floor-filter .esri-floor-filter__levels-container {
      list-style-type: none;
      overflow: auto;
      max-height: 420px;
      margin: unset;
      padding: unset;
      width: 100%;
      border-style: solid;
      border-color: rgba(110, 110, 110, 0.3);
      scrollbar-width: thin;
    }

    .esri-floor-filter .esri-floor-filter__levels-container .esri-widget--button-active {
      font-weight: 600;
    }

    .esri-floor-filter .esri-floor-filter__levels-container::-webkit-scrollbar {
      width: 6px;
    }

    .esri-floor-filter .esri-floor-filter__levels-container::-webkit-scrollbar-track {
      background: #fafafa;
    }

    .esri-floor-filter .esri-floor-filter__levels-container::-webkit-scrollbar-thumb {
      background-color: #c1c1c1;
      border-radius: 20px;
      border: 3px solid #c1c1c1;
    }

    .esri-floor-filter .esri-widget--button-active {
      background: #e2f1fb;
      color: #005e95;
    }

    .esri-floor-filter .esri-floor-filter__button-container {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .esri-floor-filter .esri-floor-filter__filter-menu {
      width: 300px;
      max-height: 420px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .esri-floor-filter .esri-floor-filter__filter-menu .esri-floor-filter__filter-menu-header {
      align-items: stretch;
      display: flex;
      flex-direction: row;
      line-height: 1.3em;
      box-shadow: 0 0.5px 0 #e0e0e0;
      color: #323232;
      height: auto;
    }

    .esri-floor-filter .esri-floor-filter__filter-menu .esri-floor-filter__filter-menu-header-back {
      padding: 26px 0;
      min-width: 28px;
      border: none;
      border-right: 1px solid rgba(110, 110, 110, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      margin: unset;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-header-back:hover {
      background: #f3f3f3;
      cursor: pointer;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-header-text-group {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 12px;
      max-width: calc(300px - 28px - 40px);
    }

    .esri-floor-filter .esri-floor-filter__filter-menu .esri-floor-filter__filter-menu-header-text {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      margin: unset;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-header-subtext {
      font-style: normal;
      font-weight: 400;
      margin: 4px 0 0;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .esri-floor-filter .esri-floor-filter__filter-menu .esri-icon-close {
      padding: 26px 12px;
      display: flex;
      align-items: center;
      background-color: #ffffff;
      border: none;
      margin: 0 0 0 auto;
    }

    .esri-floor-filter .esri-floor-filter__filter-menu .esri-icon-close:hover {
      background: #f3f3f3;
      cursor: pointer;
    }

    .esri-floor-filter .esri-floor-filter__filter-menu .esri-floor-filter__filter-menu-search {
      padding: 10px;
      align-items: center;
      display: flex;
      background: #f3f3f3;
      box-shadow: 0 0.5px 0 #e0e0e0;
      margin-top: 0.5px;
      margin-bottom: 1px;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-search
      .esri-floor-filter__filter-menu-search-input {
      margin-left: 6px;
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #323232;
      font-size: 14px;
    }

    .esri-floor-filter .esri-floor-filter__filter-menu .esri-floor-filter__filter-menu-items {
      list-style-type: none;
      overflow-y: auto;
      color: #323232;
      margin: unset;
      padding: unset;
      width: 100%;
      max-height: 300px;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site:hover,
    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility:hover {
      background: #f3f3f3;
      cursor: pointer;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site:active,
    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility:active {
      background-color: #e2f1fb;
      color: #323232;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site,
    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility {
      padding: 18px;
      display: flex;
      flex-direction: row;
      align-items: center;
      background: #ffffff;
      border: none;
      width: 100%;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site
      .esri-floor-filter__filter-menu-item-name,
    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility
      .esri-floor-filter__filter-menu-item-name {
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site
      .esri-floor-filter__filter-menu-item-name--selected,
    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility
      .esri-floor-filter__filter-menu-item-name--selected {
      font-weight: 600;
      font-size: 14px;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site
      .esri-floor-filter__filter-menu-item-name,
    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site
      .esri-floor-filter__filter-menu-item-name--selected,
    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility
      .esri-floor-filter__filter-menu-item-name,
    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility
      .esri-floor-filter__filter-menu-item-name--selected {
      text-align: left;
      margin-right: 10px;
      max-width: 220px;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site
      .esri-icon-right,
    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility
      .esri-icon-right {
      margin-left: auto;
    }

    .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__selected-item-circle {
      margin-left: -10px;
      margin-right: 6px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #007ac2;
    }

    .esri-floor-filter .esri-floor-filter__separator {
      width: 10px;
      background: transparent;
      border: none;
      box-shadow: none;
    }

    .esri-view-height-less-than-medium .esri-floor-filter .esri-floor-filter__zoom-button,
    .esri-view-height-less-than-medium .esri-floor-filter .esri-floor-filter__zoom-button--levels,
    .esri-view-width-less-than-medium .esri-floor-filter .esri-floor-filter__zoom-button,
    .esri-view-width-less-than-medium .esri-floor-filter .esri-floor-filter__zoom-button--levels {
      display: none;
    }

    .esri-view-height-less-than-medium
      .esri-floor-filter
      .esri-floor-filter__minimize-toggle-button,
    .esri-view-width-less-than-medium
      .esri-floor-filter
      .esri-floor-filter__minimize-toggle-button {
      display: none;
    }

    .esri-view-height-less-than-medium .esri-floor-filter .esri-floor-filter__filter-menu,
    .esri-view-width-less-than-medium .esri-floor-filter .esri-floor-filter__filter-menu {
      width: 225px;
    }

    .esri-view-height-less-than-medium .esri-floor-filter .esri-floor-filter__close-levels-button,
    .esri-view-width-less-than-medium .esri-floor-filter .esri-floor-filter__close-levels-button {
      width: 48px;
      height: 48px;
      padding: 12px;
      border-style: solid;
      border-color: rgba(110, 110, 110, 0.3);
      background: #e7e7e7;
    }

    .esri-view-height-less-than-medium
      .esri-floor-filter
      .esri-floor-filter__filter-menu-header-text-group,
    .esri-view-width-less-than-medium
      .esri-floor-filter
      .esri-floor-filter__filter-menu-header-text-group {
      max-width: calc(225px - 28px - 40px);
    }

    .esri-view-height-less-than-medium .esri-floor-filter .esri-floor-filter__filter-menu-item-name,
    .esri-view-height-less-than-medium
      .esri-floor-filter
      .esri-floor-filter__filter-menu-item-name--selected,
    .esri-view-width-less-than-medium .esri-floor-filter .esri-floor-filter__filter-menu-item-name,
    .esri-view-width-less-than-medium
      .esri-floor-filter
      .esri-floor-filter__filter-menu-item-name--selected {
      max-width: 165px !important;
    }

    .esri-view-height-small .esri-floor-filter .esri-floor-filter__levels-container {
      max-height: calc(420px - 100px);
    }

    .esri-view-height-small .esri-floor-filter .esri-floor-filter__filter-menu {
      max-height: calc(420px - 100px);
    }

    .esri-view-height-xsmall .esri-floor-filter .esri-floor-filter__levels-container {
      max-height: calc(48px * 3 + 12px);
    }

    .esri-view-height-xsmall .esri-floor-filter .esri-floor-filter__filter-menu {
      max-height: 240px;
    }

    html[dir='rtl'] .esri-floor-filter__layout--expanded .esri-floor-filter__button-info {
      margin-left: auto;
      margin-right: unset;
    }

    html[dir='rtl'] .esri-floor-filter__layout--expanded .esri-floor-filter__button-label {
      margin-right: 8px;
      margin-left: unset;
    }

    html[dir='rtl'] .esri-floor-filter .esri-icon-close {
      margin: 0 auto 0 0;
    }

    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu
      .esri-floor-filter__filter-menu-header-back {
      border-left: 1px solid rgba(110, 110, 110, 0.3);
      border-right: none;
    }

    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-search
      .esri-floor-filter__filter-menu-search-input {
      margin-right: 6px;
      margin-left: unset;
    }

    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site
      .esri-icon-left,
    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site
      .esri-building-level-picker__arrow-up,
    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site
      .esri-building-level-picker__arrow-down,
    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site
      .esri-building-phase-picker__arrow-left,
    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-site
      .esri-building-phase-picker__arrow-right,
    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility
      .esri-icon-left,
    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility
      .esri-building-level-picker__arrow-up,
    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility
      .esri-building-level-picker__arrow-down,
    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility
      .esri-building-phase-picker__arrow-left,
    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-facility
      .esri-building-phase-picker__arrow-right {
      margin-right: auto;
    }

    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-item-name,
    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__filter-menu-item-name--selected {
      text-align: right !important;
      margin-right: unset !important;
      margin-left: 10px !important;
    }

    html[dir='rtl']
      .esri-floor-filter
      .esri-floor-filter__filter-menu-items
      .esri-floor-filter__selected-item-circle {
      margin-right: -10px;
      margin-left: 6px;
    }

    .esri-grid {
      width: 100%;
      height: 100%;
      --lumo-base-color: #ffffff;
      --lumo-primary-color: #0079c1;
      --lumo-primary-text-color: var(--lumo-primary-color);
      --lumo-primary-color-10pct: rgba(0, 121, 193, 0.2);
      --lumo-contrast-20pct: #6e6e6e;
      --lumo-contrast-30pct: #2e2e2e;
      --lumo-contrast-10pct: #f3f3f3;
      --lumo-row-background-hover: #f3f3f3;
    }

    .esri-grid .esri-grid__content {
      width: 100%;
      height: 100%;
      background-color: inherit;
    }

    .esri-grid .esri-grid__grid {
      height: 100%;
      width: 100%;
    }

    .esri-grid .esri-column__sorter {
      flex-grow: 1;
      margin: 0 5px;
      overflow: auto;
    }

    .esri-grid .esri-column__menu-container {
      display: inline-block;
      margin: 0 5px;
    }

    .esri-heatmap-slider {
      direction: ltr;
      min-width: 260px;
    }

    .esri-heatmap-slider .esri-slider {
      font-size: 12px;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__thumb {
      background-color: #6e6e6e;
      border-radius: 0;
      border: none;
      width: 6px;
      height: 12px;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__content {
      flex-direction: row;
      height: 240px;
      margin: 0 auto 0 40%;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__track {
      flex: 0 1 0px;
      width: 0;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__anchor {
      border-bottom: 1px solid #6e6e6e;
      border-top: 1px solid #ffffff;
      width: 30px;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__anchor:hover .esri-slider__label,
    .esri-heatmap-slider .esri-slider .esri-slider__anchor:focus .esri-slider__label {
      text-decoration: underline;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb,
    .esri-heatmap-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb {
      background-color: #2e2e2e;
      border: none;
      transform: none;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::after,
    .esri-heatmap-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::after {
      border-left-color: #2e2e2e;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::before,
    .esri-heatmap-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::before {
      background-color: #49b0f2;
      transform: translate3d(-1.5px, 0, 0);
    }

    .esri-heatmap-slider .esri-slider .esri-slider__thumb {
      left: -12px;
      top: -6px;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__thumb::before {
      position: absolute;
      top: 0;
      left: -1.5px;
      width: 3px;
      content: '';
      height: 12px;
      background-color: #6e6e6e;
      transition:
        transform 125ms ease-in-out,
        background-color 125ms ease-in-out;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__thumb::after {
      position: absolute;
      top: 0;
      left: 6px;
      content: '';
      border-bottom: 6px solid #00000000;
      border-left: 6px solid #6e6e6e;
      border-top: 6px solid #00000000;
      height: 0;
      width: 0;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__label {
      left: auto;
      line-height: 20px;
      min-width: 50px;
      right: 50px;
      text-align: right;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__label:hover {
      background-color: #f3f3f3;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__range-input {
      margin: auto;
      text-align: center;
      width: 50%;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__label-input {
      text-align: right;
      width: 70px;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__max,
    .esri-heatmap-slider .esri-slider .esri-slider__min {
      flex: 0 0 40px;
      height: 40px;
      padding: 9px 0;
    }

    .esri-heatmap-slider .esri-slider .esri-slider__extra-content {
      height: 100%;
    }

    .esri-heatmap-slider .esri-slider .esri-histogram__average-line,
    .esri-heatmap-slider .esri-slider .esri-histogram__label {
      stroke: #6e6e6e;
    }

    .esri-heatmap-slider .esri-slider .zoom-cap--max {
      position: absolute;
      top: 0;
    }

    .esri-heatmap-slider .esri-slider .zoom-cap--min {
      position: absolute;
      bottom: 0;
    }

    .esri-heatmap-slider .esri-slider .zoom-cap {
      height: 11px;
      width: 30px;
      stroke-width: 0;
    }

    .esri-heatmap-slider .esri-slider .zoom-cap .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-heatmap-slider .esri-slider .zoom-cap .zoom-cap--line {
      fill: #ffffff;
    }

    .esri-heatmap-slider .esri-slider .zoom-cap .zoom-cap--underline {
      fill: #323232;
    }

    .esri-heatmap-slider .esri-slider .zoom-cap:hover {
      cursor: pointer;
    }

    .esri-heatmap-slider .esri-slider .zoom-cap:hover .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-heatmap-slider .esri-slider .zoom-cap:hover .zoom-cap--line {
      fill: #0079c1;
    }

    .esri-heatmap-slider .esri-slider .zoom-cap:hover .zoom-cap--underline {
      fill: #ffffff;
    }

    .esri-heatmap-slider__ramp {
      display: inline-block;
      height: 100%;
      width: 30px;
      position: relative;
    }

    .esri-heatmap-slider__ramp svg {
      height: 100%;
      width: 100%;
      position: absolute;
      stroke: #6e6e6e;
      stroke-width: 1px;
      left: 0;
    }

    .esri-heatmap-slider__ramp svg rect {
      height: 100%;
      width: 100%;
    }

    .esri-heatmap-slider__ramp svg path {
      stroke-width: 0.5px;
    }

    .esri-heatmap-slider__histogram-container {
      display: inline-block;
      height: 100%;
      width: 120px;
    }

    .esri-histogram {
      direction: ltr;
      width: 100%;
      height: 100%;
    }

    .esri-histogram__content {
      height: 100%;
      width: 100%;
    }

    .esri-histogram__svg {
      display: inline-block;
      height: 100%;
      overflow: hidden;
      width: 100%;
    }

    .esri-histogram__data-line {
      stroke: #888888;
      stroke-width: 1px;
      shape-rendering: crispedges;
    }

    .esri-histogram__label {
      stroke: #000000;
      font-size: 12px;
      stroke-width: 0;
      direction: ltr;
      unicode-bidi: plaintext;
    }

    .esri-histogram__average-data-line {
      stroke: #444444;
    }

    .esri-histogram__average-symbol {
      font-family: 'Georgia, serif';
      font-style: italic;
    }

    [dir='rtl'] .esri-histogram {
      direction: rtl;
    }

    [dir='rtl'] .esri-histogram .esri-histogram__average-label {
      direction: rtl;
      unicode-bidi: plaintext;
    }

    .esri-histogram-range-slider {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      width: 100%;
    }

    .esri-histogram-range-slider .esri-slider .esri-slider__label {
      top: 24px;
      display: none;
    }

    .esri-histogram-range-slider .esri-slider__anchor--moving .esri-slider__label {
      display: inline;
    }

    .esri-histogram-range-slider .esri-slider {
      font-size: 12px;
    }

    .esri-histogram-range-slider .esri-slider__content {
      display: flex;
      flex-direction: column-reverse;
    }

    .esri-histogram-range-slider .esri-slider__max {
      bottom: 0;
      position: absolute;
      right: 0;
      text-align: right;
    }

    .esri-histogram-range-slider .esri-slider__max .esri-slider__range-input {
      text-align: right;
    }

    .esri-histogram-range-slider .esri-slider__min {
      bottom: 0;
      left: 0;
      position: absolute;
      text-align: left;
    }

    .esri-histogram-range-slider .esri-slider__min .esri-slider__range-input {
      text-align: left;
    }

    .esri-histogram-range-slider .esri-slider--horizontal .esri-slider__max,
    .esri-histogram-range-slider .esri-slider--horizontal .esri-slider__min {
      display: inline;
      min-width: 50%;
    }

    .esri-histogram-range-slider .esri-histogram {
      display: flex;
      align-self: flex-end;
    }

    .esri-histogram-range-slider .esri-histogram__bar {
      touch-action: none;
    }

    .esri-histogram-range-slider .esri-slider__max .esri-slider__range-input {
      float: right;
    }

    .esri-histogram-range-slider__slider-container {
      align-self: flex-end;
      margin-bottom: 24px;
      width: 100%;
    }

    .esri-histogram-range-slider__histogram-container {
      display: flex;
      flex-grow: 1;
      height: 100%;
      min-height: 0;
      width: 100%;
    }

    .esri-histogram-range-slider__range-type--less-than .esri-slider__segment-0,
    .esri-histogram-range-slider__range-type--at-most .esri-slider__segment-0 {
      background-color: #0079c1;
    }

    .esri-histogram-range-slider__range-type--greater-than .esri-slider__segment-1,
    .esri-histogram-range-slider__range-type--at-least .esri-slider__segment-1,
    .esri-histogram-range-slider__range-type--between .esri-slider__segment-1,
    .esri-histogram-range-slider__range-type--not-between .esri-slider__segment-1 {
      background-color: #0079c1;
    }

    .esri-identity-form {
      display: flex;
      flex-flow: column;
    }

    .esri-identity-form__group {
      margin-bottom: 12px;
    }

    .esri-identity-form__label {
      display: flex;
      flex-flow: column;
    }

    .esri-identity-form__footer {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
    }

    .esri-identity-modal {
      box-sizing: border-box;
      color: #323232;
      display: none;
      font-size: 14px;
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.3em;
      background-color: #ffffff;
    }

    .esri-identity-modal--open {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      z-index: 1001;
      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
      opacity: 1;
    }

    .esri-identity-modal--open .esri-identity-modal__dialog {
      position: relative;
      top: auto;
      left: auto;
      right: auto;
      bottom: auto;
      border: none;
      background: #ffffff;
      overflow: auto;
      border-radius: 0;
      outline: none;
      padding: 18px 22px;
      max-width: 40vw;
      max-height: 80vh;
      box-sizing: border-box;
      z-index: 102;
      text-align: left;
      display: inline-block;
      vertical-align: middle;
      transition: margin-top 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
      margin-top: 0;
    }

    .esri-identity-modal__title {
      font-size: 20px;
      margin: 0 0 12px;
      padding: 0;
    }

    .esri-identity-modal__close-button {
      position: absolute;
      top: 12px;
      right: 7px;
      z-index: 1;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      cursor: pointer;
    }

    .esri-identity-modal__content {
      margin-top: 18px;
    }

    .esri-identity-form__group {
      margin-bottom: 12px;
    }

    .esri-identity-form__label {
      display: flex;
      flex-flow: column;
    }

    .esri-identity-form__footer {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
    }

    @media only screen and (max-width: 680px) {
      .esri-identity-modal--open .esri-identity-modal__dialog {
        max-width: unset;
        width: 75vw;
      }
    }

    .esri-item-list {
      width: 100%;
    }

    .esri-item-list__filter-container {
      background: transparent;
      position: relative;
      display: flex;
      padding: 6px 7px;
      margin: 0 0 6px;
      overflow: hidden;
      flex-grow: 1;
    }

    .esri-item-list__filter-input {
      width: 100%;
      border: none;
      border-bottom: 2px solid rgba(110, 110, 110, 0.3);
      background-color: transparent;
      padding: 6px 0;
      transition: border 250ms ease-in-out;
    }

    .esri-item-list__filter-input:focus {
      outline: none;
      border-color: #0079c1;
    }

    .esri-item-list__filter-placeholder {
      position: absolute;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      color: #6e6e6e;
      margin: 6px 7px;
      padding: 0 7px;
      pointer-events: none;
    }

    .esri-item-list__filter-placeholder-text {
      margin: 0 3px;
    }

    .esri-item-list__group {
      color: #6e6e6e;
      padding: 0 15px 12px;
      margin: 4px 5px 6px;
    }

    .esri-item-list__scroller {
      overflow-y: auto;
    }

    .esri-item-list__group-header {
      display: flex;
      align-items: center;
      margin: 12px 0;
      padding: 0;
      font-weight: 400;
    }

    .esri-item-list__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .esri-item-list__list-item-container {
      background: #ffffff;
      display: flex;
      margin: 0 2px;
      width: 100%;
    }

    .esri-item-list__list-item-container .esri-item-list__list-item-label {
      margin: 0 7px;
    }

    .esri-item-list__list-item {
      box-shadow: 0 1px 0 rgba(110, 110, 110, 0.3);
      padding: 3px;
      background-color: #ffffff;
      cursor: pointer;
      border-radius: 2px;
      margin-bottom: 6px;
      border: 1px solid rgba(110, 110, 110, 0.3);
      min-height: 48px;
      border-color: transparent;
      transition: border 250ms ease-in-out;
      display: flex;
      justify-content: space-between;
    }

    .esri-item-list__list-item:hover,
    .esri-item-list__list-item:focus {
      border-color: #323232;
    }

    .esri-item-list__list-item[class^='esri-icon'] {
      padding-right: 2.8px;
    }

    .esri-item-list__list-item-label {
      flex: 1;
      margin: 0;
      display: flex;
      align-items: center;
    }

    .esri-item-list__no-matches-message {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 96px;
    }

    .esri-item-list__no-items-message {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 48px;
    }

    .esri-ui .esri-item-list__scroller {
      max-height: 420px;
    }

    .esri-layer-list {
      color: #323232;
      background-color: #f3f3f3;
      padding: 6px 7px;
      overflow-y: auto;
      display: flex;
      flex-flow: column;
    }

    .esri-layer-list__list {
      list-style: none;
      margin: 0 0 0 15px;
      padding: 2px;
      transition: background-color 125ms ease-in-out;
    }

    .esri-layer-list__list:empty {
      min-height: 48px;
    }

    .esri-layer-list__list.esri-layer-list--chosen {
      background-color: #e2f1fb;
      opacity: 0.75;
    }

    .esri-layer-list__list.esri-layer-list--chosen .esri-layer-list__item,
    .esri-layer-list__item.esri-layer-list--chosen .esri-layer-list__item {
      background-color: transparent;
    }

    .esri-layer-list__item--has-children {
      padding-bottom: 6px;
    }

    .esri-layer-list__item--has-children .esri-layer-list__list:not([hidden]) {
      animation: esri-fade-in 375ms ease-in-out;
    }

    .esri-layer-list__list[hidden] {
      display: none;
    }

    .esri-layer-list__list--root {
      margin: 0;
    }

    .esri-layer-list__item--selectable .esri-layer-list__item-container {
      cursor: pointer;
    }

    .esri-layer-list__item--selectable .esri-layer-list__item-container:hover {
      border-left-color: rgba(110, 110, 110, 0.3);
    }

    .esri-layer-list__item[aria-selected='true'] > .esri-layer-list__item-container {
      border-left-color: #0079c1;
    }

    .esri-layer-list__item[aria-selected='true'] > .esri-layer-list__item-container:hover {
      border-left-color: #0079c1;
    }

    .esri-layer-list__item-container ~ .esri-layer-list__list .esri-layer-list__item {
      border-bottom-width: 0;
    }

    .esri-layer-list__item {
      background-color: #ffffff;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      position: relative;
      overflow: hidden;
      list-style: none;
      margin: 3px 0;
      padding: 0;
      transition: background-color 125ms ease-in-out;
    }

    .esri-layer-list__item.esri-layer-list--chosen {
      background-color: #e2f1fb;
      opacity: 0.75;
    }

    .esri-layer-list__item-container {
      border-left: 3px solid transparent;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 12px 7px 12px 20px;
      transition: border-color 250ms ease-in-out;
    }

    .esri-layer-list__item--invisible-at-scale .esri-layer-list__item-title {
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-layer-list__item--has-children > .esri-layer-list__item-container {
      padding-left: 5px;
    }

    .esri-layer-list__item--has-children > .esri-layer-list__list {
      font-size: 12px;
    }

    .esri-layer-list__child-toggle {
      color: #6e6e6e;
      width: 15px;
      cursor: pointer;
    }

    .esri-layer-list__child-toggle [class*='esri-icon'] {
      line-height: 1.2em;
    }

    .esri-layer-list__child-toggle .esri-layer-list__child-toggle-icon--opened,
    .esri-layer-list__child-toggle .esri-layer-list__child-toggle-icon--closed-rtl,
    .esri-layer-list__child-toggle--open .esri-layer-list__child-toggle-icon--closed {
      display: none;
    }

    .esri-layer-list__child-toggle--open .esri-layer-list__child-toggle-icon--opened {
      display: block;
    }

    .esri-layer-list__item-label {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: flex-start;
      flex: 1;
      -webkit-user-select: none;
      user-select: none;
    }

    .esri-layer-list__item-label[role='switch'],
    .esri-layer-list__item-label[role='checkbox'],
    .esri-layer-list__item-label[role='radio'] {
      cursor: pointer;
    }

    .esri-layer-list--new-ui .esri-layer-list__item-toggle-icon {
      visibility: hidden;
    }

    .esri-layer-list--new-ui .esri-layer-list__item-toggle:focus .esri-layer-list__item-toggle-icon,
    .esri-layer-list--new-ui .esri-layer-list__item-label:focus .esri-layer-list__item-toggle-icon,
    .esri-layer-list--new-ui
      .esri-layer-list__item-container:hover
      .esri-layer-list__item-toggle-icon,
    .esri-layer-list--new-ui
      .esri-layer-list__item--invisible
      > .esri-layer-list__item-container
      .esri-layer-list__item-toggle-icon {
      visibility: visible;
    }

    .esri-layer-list__item-title {
      flex: 1;
      padding-left: 5px;
      padding-right: 5px;
      line-height: 1.3em;
      word-break: break-word;
      overflow-wrap: break-word;
      transition: color 125ms ease-in-out;
    }

    .esri-layer-list__item-error-message {
      display: flex;
      align-items: center;
      visibility: hidden;
      height: 0;
      margin-top: -1px;
      padding: 3px 7px;
      overflow: hidden;
      background-color: rgba(140, 41, 7, 0.1);
      color: #8c2907;
      font-size: 12px;
      transition: transform 250ms ease-in-out;
      transform: scale(1, 0);
      animation: esri-fade-in-down 250ms ease-in-out;
      transform-origin: center top;
    }

    .esri-layer-list__item-error-message [class^='esri-icon-'],
    .esri-layer-list__item-error-message .esri-building-level-picker__arrow-up,
    .esri-layer-list__item-error-message .esri-building-level-picker__arrow-down,
    .esri-layer-list__item-error-message .esri-building-phase-picker__arrow-left,
    .esri-layer-list__item-error-message .esri-building-phase-picker__arrow-right,
    .esri-layer-list__item-error-message [class*='esri-icon-'] {
      margin-right: 0.3rem;
    }

    .esri-layer-list__item--error .esri-layer-list__item-error-message {
      visibility: visible;
      height: auto;
      transform: scale(1, 1);
    }

    .esri-layer-list__item-toggle {
      padding: 0 3px;
      cursor: pointer;
      color: #6e6e6e;
    }

    .esri-layer-list__item--updating::before,
    .esri-layer-list__item--updating::after {
      content: '';
      opacity: 1;
      position: absolute;
      height: 1px;
      top: 0;
      transition: opacity 500ms ease-in-out;
    }

    .esri-layer-list__item--updating::before {
      background-color: rgba(110, 110, 110, 0.3);
      width: 100%;
      z-index: 0;
    }

    .esri-layer-list__item--updating::after {
      background-color: #6e6e6e;
      width: 20%;
      z-index: 0;
      animation: looping-progresss-bar-ani 1500ms linear infinite;
    }

    .esri-layer-list__item-actions-menu {
      display: flex;
    }

    .esri-layer-list__item-actions-menu-item {
      display: flex;
      flex: 1 0 21px;
      justify-content: center;
      align-items: center;
      color: #6e6e6e;
      cursor: pointer;
      padding: 0 3px;
      transition: border-color 250ms ease-in-out;
    }

    .esri-layer-list__item-actions-menu-item:first-of-type {
      margin: 0 2px;
    }

    .esri-layer-list__item-actions-menu-item:hover {
      background-color: #f3f3f3;
    }

    .esri-layer-list__item-actions-menu-item--active,
    .esri-layer-list__item-actions-menu-item--active:hover {
      background-color: #e2f1fb;
    }

    .esri-layer-list__item-actions {
      position: relative;
      background-color: #f3f3f3;
      color: #6e6e6e;
      margin: -1px 7px 6px;
      height: auto;
    }

    .esri-layer-list__item-actions[aria-expanded='true'] {
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-layer-list__item-actions-section {
      animation: esri-fade-in 375ms ease-in-out;
    }

    .esri-layer-list__item-actions[hidden] {
      display: none;
    }

    .esri-layer-list__item-actions-close {
      color: #6e6e6e;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      padding: 5px;
      z-index: 1;
    }

    .esri-layer-list__item-actions-list {
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 6px 0;
      list-style: none;
      border-top: 2px solid #ffffff;
    }

    .esri-layer-list__item-actions-list:first-of-type {
      border-top: 0;
    }

    .esri-layer-list__item-action,
    .esri-layer-list__action-toggle {
      border: 1px solid transparent;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      cursor: pointer;
      font-size: 12px;
      width: 100%;
      margin: 0;
      padding: 6px 15px;
      opacity: 1;
      transition:
        opacity 250ms ease-in-out 250ms,
        background-color 250ms ease-in-out;
    }

    .esri-layer-list__item-action {
      justify-content: flex-start;
      flex-flow: row;
    }

    .esri-layer-list__action-toggle {
      flex-flow: row-reverse;
      justify-content: space-between;
    }

    .esri-layer-list__action-toggle .esri-layer-list__item-action-title {
      margin-left: 0;
    }

    .esri-layer-list__action-toggle .esri-layer-list__item-action-icon {
      background-color: #4c4c4c;
      border-radius: 16px;
      box-shadow: 0 0 0 1px #ffffff;
      flex: 0 0 28px;
      height: 16px;
      overflow: hidden;
      padding: 0;
      position: relative;
      transition: background-color 125ms ease-in-out;
      width: 16px;
    }

    .esri-layer-list__action-toggle .esri-layer-list__item-action-icon::before {
      background-color: #ffffff;
      border-radius: 100%;
      content: '';
      display: block;
      height: 12px;
      left: 0;
      margin: 2px;
      position: absolute;
      top: 0;
      transition:
        background-color 125ms ease-in-out,
        left 125ms ease-in-out;
      width: 12px;
    }

    .esri-layer-list__action-toggle.esri-disabled-element {
      pointer-events: none;
      opacity: 0.4;
    }

    .esri-layer-list__action-toggle--on .esri-layer-list__item-action-icon {
      background-color: #ffffff;
    }

    .esri-layer-list__action-toggle--on .esri-layer-list__item-action-icon::before {
      background-color: #4c4c4c;
      box-shadow: 0 0 0 1px #4c4c4c;
      left: 12px;
    }

    .esri-layer-list__item-action:hover,
    .esri-layer-list__action-toggle:hover {
      background-color: #f3f3f3;
    }

    .esri-layer-list__item-actions[hidden] .esri-layer-list__item-action {
      opacity: 0;
    }

    .esri-layer-list__item-action-icon {
      flex: 0 0 16px;
      font-size: 16px;
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-top: 0.1em;
    }

    .esri-layer-list__item-action-image {
      flex: 0 0 16px;
      width: 16px;
      height: 16px;
      font-size: 14px;
      text-align: center;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }

    .esri-layer-list__item-action-title {
      margin-left: 5px;
    }

    .esri-layer-list-panel {
      margin: 12px 15px;
    }

    .esri-layer-list-panel__content--legend .esri-legend__service {
      padding: 0 0 12px;
    }

    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__item--has-children
      > .esri-layer-list__item-container {
      padding-left: 20px;
      padding-right: 5px;
    }

    html[dir='rtl'] .esri-layer-list .esri-layer-list__list {
      margin: 0 15px 0 0;
    }

    html[dir='rtl'] .esri-layer-list .esri-layer-list__list--root {
      margin: 0;
    }

    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__child-toggle
      .esri-layer-list__child-toggle-icon--closed {
      display: none;
    }

    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__child-toggle
      .esri-layer-list__child-toggle-icon--closed-rtl {
      display: block;
    }

    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__child-toggle--open
      .esri-layer-list__child-toggle-icon--closed-rtl {
      display: none;
    }

    html[dir='rtl'] .esri-layer-list .esri-layer-list__item-action-title {
      margin-left: 0;
      margin-right: 5px;
    }

    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__action-toggle
      .esri-layer-list__action-toggle {
      margin-right: 0;
    }

    html[dir='rtl'] .esri-layer-list .esri-layer-list__item::after {
      animation: looping-progresss-bar-ani 1500ms linear infinite reverse;
    }

    html[dir='rtl'] .esri-layer-list .esri-layer-list__item-error-message [class^='esri-icon-'],
    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__item-error-message
      .esri-building-level-picker__arrow-up,
    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__item-error-message
      .esri-building-level-picker__arrow-down,
    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__item-error-message
      .esri-building-phase-picker__arrow-left,
    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__item-error-message
      .esri-building-phase-picker__arrow-right,
    html[dir='rtl'] .esri-layer-list .esri-layer-list__item-error-message [class*='esri-icon-'] {
      margin-right: 0;
      margin-left: 0.3rem;
    }

    html[dir='rtl'] .esri-layer-list .esri-layer-list__item-container {
      border-left: none;
      border-right: 3px solid transparent;
    }

    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__item[aria-selected='true']
      > .esri-layer-list__item-container {
      border-right-color: #0079c1;
    }

    html[dir='rtl']
      .esri-layer-list
      .esri-layer-list__item[aria-selected='true']
      > .esri-layer-list__item-container:hover {
      border-right-color: #0079c1;
    }

    .esri-legend {
      overflow: hidden;
      overflow-y: auto;
    }

    .esri-legend__message {
      padding: 0.5em 1em;
    }

    .esri-legend__service {
      padding: 12px 15px;
      word-wrap: break-word;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-legend__service:last-child {
      border-bottom: none;
    }

    .esri-legend__layer {
      margin-left: 7px;
    }

    .esri-legend__group-layer-child {
      margin-left: 7px;
      padding-left: 0;
      padding-right: 0;
    }

    .esri-legend__layer-table {
      display: flex;
      flex-flow: column;
      width: 100%;
      margin-bottom: 12px;
    }

    .esri-legend__layer-child-table {
      display: table;
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 12px;
    }

    .esri-legend__layer-body {
      margin-left: 7px;
    }

    .esri-legend__layer-row {
      display: flex;
    }

    .esri-legend__layer-cell {
      min-width: 100px;
      word-break: break-word;
      padding: 4px 0;
      vertical-align: middle;
    }

    .esri-legend__layer-cell--symbols {
      min-width: 10px;
      text-align: center;
    }

    .esri-legend__layer-table--size-ramp {
      display: table;
    }

    .esri-legend__layer-table--size-ramp .esri-legend__layer-row {
      display: table-row;
    }

    .esri-legend__layer-table--size-ramp .esri-legend__layer-cell {
      display: table-cell;
    }

    .esri-legend__size-ramp ~ .esri-legend__layer-cell--info {
      max-width: 80%;
      width: 80%;
    }

    .esri-legend__layer-cell--info {
      font-size: 12px;
      padding-left: 7px;
      padding-right: 7px;
      word-wrap: normal;
      word-break: normal;
      max-width: 250px;
    }

    .esri-legend__imagery-layer-image--stretched {
      margin-bottom: -2px;
      display: block;
    }

    .esri-legend__imagery-layer-cell--stretched {
      vertical-align: top;
      line-height: 1;
      padding: 0;
    }

    .esri-legend__imagery-layer-info--stretched {
      vertical-align: top;
      padding: 0 2px;
    }

    .esri-legend__symbol {
      display: block;
      margin: auto;
    }

    .esri-legend__layer-caption {
      display: table-caption;
      padding: 6px 0;
    }

    .esri-legend__ramp-labels {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
    }

    .esri-legend__ramps {
      margin-left: 3px;
    }

    .esri-legend__color-ramp {
      width: 24px;
    }

    .esri-legend__opacity-ramp {
      background-image: url('https://js.arcgis.com/4.19/esri/themes/base/images/transparent-bg.png');
    }

    .esri-legend__ramp-tick {
      position: absolute;
      width: 4px;
      border-top: 1px solid rgba(110, 110, 110, 0.3);
      line-height: 0;
      right: 1px;
      left: auto;
    }

    .esri-legend__ramp-label {
      position: relative;
      padding: 0 7px;
      white-space: nowrap;
      line-height: 1em;
      font-size: 12px;
    }

    .esri-legend__ramp-label::before {
      position: absolute;
      top: 0.25em;
      right: 100%;
      display: block;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 3px 4px 3px 0;
      border-color: transparent rgba(50, 50, 50, 0.8) transparent transparent;
    }

    .esri-legend__ramp-label:first-child {
      margin-top: -4px;
    }

    .esri-legend__ramp-label:last-child {
      bottom: -3px;
    }

    .esri-legend-layer-caption {
      display: table-caption;
      padding: 6px 0;
    }

    html[dir='rtl'] .esri-legend__ramp-label::before {
      border-width: 3px 0 3px 4px;
      border-color: transparent transparent transparent rgba(50, 50, 50, 0.8);
      left: 100%;
      right: auto;
    }

    html[dir='rtl'] .esri-legend__layer,
    html[dir='rtl'] .esri-legend__group-layer-child,
    html[dir='rtl'] .esri-legend__layer-body {
      margin-left: 0;
      margin-right: 7px;
    }

    .esri-legend--card {
      display: flex;
      overflow-x: auto;
      transition: max-width 250ms ease-in-out;
      background: #ffffff;
      position: relative;
    }

    .esri-legend--card__section {
      font-size: 12px;
      min-height: 150px;
      min-width: 300px;
      padding: 12px 15px;
      border-left: 1px solid rgba(110, 110, 110, 0.3);
      overflow: auto;
    }

    .esri-legend--card__section:first-child {
      border-left: none;
    }

    .esri-legend--card__message {
      padding: 0.5em 1em;
    }

    .esri-legend--card__service-caption-container {
      font-weight: 600;
      height: 45px;
      padding: 12px 15px;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-legend--card__service-caption-text {
      margin: 0;
      overflow: auto;
      padding-bottom: 20px;
    }

    .esri-legend--card__layer-caption {
      font-weight: 400;
      margin-bottom: 12px;
      padding: 6px 0;
    }

    .esri-legend--card__service-content {
      display: flex;
      height: calc(100% - 45px);
    }

    .esri-legend--card__label-container {
      display: flex;
      flex-wrap: wrap;
    }

    .esri-legend--card__relationship-label-container {
      display: flex;
      flex-direction: column;
    }

    .esri-legend--card__relationship-label-container .esri-legend--card__layer-row {
      padding-bottom: 0.5em;
    }

    .esri-legend--card__relationship-label-container .esri-legend--card__layer-row:last-child {
      padding-bottom: 0;
    }

    .esri-legend--card__relationship-section {
      border: none;
    }

    .esri-legend--card__label-element {
      margin: 0.1em;
      padding: 0.5em 1em;
      min-width: 4em;
      min-height: 2.7em;
      text-align: center;
    }

    .esri-legend--card__image-label {
      padding-left: 7px;
      padding-right: 7px;
    }

    .esri-legend--card__layer-row,
    .esri-legend--card__size-ramp-container {
      display: flex;
      align-items: center;
    }

    .esri-legend--card__size-ramp-preview {
      display: flex;
    }

    .esri-legend--card__ramp-label {
      white-space: nowrap;
      margin: 0 0.5em;
    }

    .esri-legend--card__interval-separator {
      text-align: center;
      font-size: 0.5em;
    }

    .esri-legend--card__imagery-layer-image--stretched {
      margin-bottom: -2px;
      display: block;
    }

    .esri-legend--card__symbol-container {
      position: relative;
    }

    .esri-legend--card__interval-separators-container {
      position: absolute;
      left: 50%;
      top: 50px;
      transform: translate(-50%, -50%);
    }

    .esri-legend--card__carousel-title {
      margin: 0;
    }

    .esri-legend--card__service {
      min-width: fit-content;
      border-left: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-legend--card__symbol {
      display: block;
      margin: auto;
    }

    .esri-legend--stacked {
      height: 282px;
      min-width: 300px;
    }

    .esri-legend--stacked .esri-legend--card__section {
      border: none;
      overflow: auto;
      height: 250px;
      width: 250px;
    }

    .esri-legend--stacked .esri-legend--card__size-ramp-row {
      flex-direction: column;
    }

    .esri-legend--stacked .esri-legend--card__symbol-row {
      display: table-row;
      margin: 5px 0;
      width: 100%;
    }

    .esri-legend--stacked .esri-legend--card__label-cell {
      display: table-cell;
      vertical-align: middle;
    }

    .esri-legend--stacked .esri-legend--card__symbol-cell {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }

    .esri-legend--stacked .esri-legend--card__carousel-indicator-container {
      align-items: center;
      bottom: 0;
      box-shadow: 0 -1px 0 rgba(110, 110, 110, 0.3);
      display: flex;
      height: 32px;
      justify-content: center;
      left: 0;
      position: absolute;
      right: 0;
    }

    .esri-legend--stacked .esri-legend--card__carousel-indicator {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 16px;
    }

    .esri-legend--stacked .esri-legend--card__carousel-indicator::before {
      background-color: transparent;
      border-radius: 50%;
      box-shadow: 0 0 0 1px #6e6e6e;
      content: '';
      display: block;
      height: 10px;
      transition: background-color 125ms ease-in-out;
      width: 10px;
    }

    .esri-legend--stacked .esri-legend--card__carousel-indicator:hover::before,
    .esri-legend--stacked .esri-legend--card__carousel-indicator--activated::before,
    .esri-legend--stacked .esri-legend--card__carousel-indicator--activated:hover::before {
      background-color: #6e6e6e;
    }

    .esri-ui-corner {
      max-width: 100%;
    }

    .esri-ui-corner .esri-legend--card {
      max-height: 420px;
    }

    html[dir='rtl'] .esri-view-width-greater-than-small .esri-legend--card__section {
      border-left: 0;
      border-right: 1px solid rgba(110, 110, 110, 0.3);
    }

    html[dir='rtl'] .esri-view-width-greater-than-small .esri-legend--card__section:first-child {
      border-right: none;
    }

    .esri-relationship-ramp--diamond__container {
      display: flex;
      font-size: 12px;
    }

    .esri-relationship-ramp--diamond__left-column {
      align-self: center;
      padding-right: 5px;
      text-align: right;
      max-width: 85px;
    }

    .esri-relationship-ramp--diamond__right-column {
      align-self: center;
      padding-left: 5px;
      text-align: left;
      max-width: 85px;
    }

    .esri-relationship-ramp--diamond__middle-column {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    .esri-relationship-ramp--diamond__middle-column--label {
      align-self: center;
      max-width: 85px;
    }

    .esri-relationship-ramp--diamond__middle-column--ramp {
      width: 85px;
      height: 85px;
    }

    .esri-relationship-ramp--square__table {
      display: table;
      font-size: 12px;
    }

    .esri-relationship-ramp--square__table-row {
      display: table-row;
    }

    .esri-relationship-ramp--square__table-cell {
      display: table-cell;
    }

    .esri-relationship-ramp--square__table-label {
      max-width: 95px;
    }

    .esri-relationship-ramp--square__table-label--left-bottom {
      text-align: left;
      vertical-align: bottom;
    }

    .esri-relationship-ramp--square__table-label--right-bottom {
      text-align: right;
      vertical-align: bottom;
    }

    .esri-relationship-ramp--square__table-label--left-top {
      text-align: left;
      vertical-align: top;
    }

    .esri-relationship-ramp--square__table-label--right-top {
      text-align: right;
      vertical-align: top;
    }

    .esri-univariate-above-and-below-ramp__symbol {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .esri-univariate-above-and-below-ramp__label {
      position: relative;
      white-space: nowrap;
      line-height: 1em;
      font-size: 12px;
      margin-left: 7px;
    }

    .esri-univariate-above-and-below-ramp__label::before {
      position: absolute;
      top: 0.45em;
      left: -19px;
      display: block;
      content: '';
      width: 14px;
      height: 0;
      border-style: solid;
      border-width: 1px 0 0;
    }

    .esri-univariate-above-and-below-ramp__label:first-child {
      top: -6px;
    }

    .esri-univariate-above-and-below-ramp__label:last-child {
      bottom: -6px;
    }

    .esri-univariate-above-and-below-ramp__color--card {
      position: relative;
    }

    .esri-univariate-above-and-below-ramp__color--card::before {
      position: absolute;
      top: 1px;
      display: block;
      content: '';
      width: 100%;
      height: 15px;
      border-left: 1px solid #000000;
      border-right: 1px solid #000000;
    }

    html[dir='rtl'] .esri-univariate-above-and-below-ramp__label {
      margin-left: auto;
      margin-right: 7px;
    }

    html[dir='rtl'] .esri-univariate-above-and-below-ramp__label::before {
      left: auto;
      right: -19px;
    }

    .esri-line-of-sight__container {
      position: relative;
      padding: 12px 0;
      overflow-y: auto;
    }

    .esri-line-of-sight__container a {
      text-decoration: none;
    }

    .esri-line-of-sight__hint {
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-line-of-sight__hint-text {
      margin: 12px 0;
      padding: 0;
    }

    .esri-line-of-sight__panel--error {
      color: #8c2907;
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-line-of-sight__actions {
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding: 0 15px;
    }

    .esri-line-of-sight__secondary-button {
      margin-bottom: 10px;
    }

    .esri-navigation-toggle {
      display: flex;
      flex-flow: column nowrap;
    }

    .esri-navigation-toggle:hover,
    .esri-navigation-toggle:focus {
      background-color: #f3f3f3;
    }

    .esri-navigation-toggle:hover .esri-navigation-toggle__button,
    .esri-navigation-toggle:focus .esri-navigation-toggle__button {
      color: #2e2e2e;
    }

    .esri-navigation-toggle--horizontal {
      flex-flow: row nowrap;
    }

    .esri-navigation-toggle--horizontal .esri-navigation-toggle__button--rotate {
      border-top: none;
      border-left: solid 1px rgba(110, 110, 110, 0.3);
    }

    .esri-navigation-toggle__button {
      box-shadow: none;
      position: relative;
      background-color: transparent;
    }

    .esri-navigation-toggle__button::before {
      position: absolute;
      top: 1px;
      right: 1px;
      z-index: 0;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      transition: opacity 125ms ease-in-out;
      opacity: 0;
      border-width: 0 6px 6px 0;
      border-color: transparent #2e2e2e transparent transparent;
    }

    .esri-navigation-toggle__button:hover,
    .esri-navigation-toggle__button:focus {
      background-color: transparent;
    }

    .esri-navigation-toggle__button--rotate {
      border-top: solid 1px rgba(110, 110, 110, 0.3);
    }

    .esri-navigation-toggle__button--pan {
      margin-bottom: 0;
    }

    .esri-navigation-toggle__button--active {
      color: #2e2e2e;
    }

    .esri-navigation-toggle__button--active::before {
      opacity: 1;
    }

    .esri-navigation-toggle.esri-disabled .esri-navigation-toggle__button {
      background-color: #ffffff;
      color: rgba(110, 110, 110, 0.4);
      cursor: auto;
    }

    .esri-navigation-toggle.esri-disabled .esri-navigation-toggle__button::before {
      opacity: 0;
    }

    html[dir='rtl'] .esri-navigation-toggle--horizontal .esri-navigation-toggle__button--rotate {
      border-left: none;
      border-right: solid 1px rgba(110, 110, 110, 0.3);
    }

    html[dir='rtl'] .esri-navigation-toggle__button::before {
      border-width: 6px 6px 0 0;
      border-color: #2e2e2e transparent transparent;
      right: auto;
      left: 1px;
    }

    .esri-opacity-slider {
      direction: ltr;
      min-width: 260px;
    }

    .esri-opacity-slider .esri-slider {
      font-size: 12px;
    }

    .esri-opacity-slider .esri-slider .esri-slider__thumb {
      background-color: #6e6e6e;
      border-radius: 0;
      border: none;
      width: 6px;
      height: 12px;
    }

    .esri-opacity-slider .esri-slider .esri-slider__content {
      flex-direction: row;
      height: 240px;
      margin: 0 auto 0 40%;
    }

    .esri-opacity-slider .esri-slider .esri-slider__track {
      flex: 0 1 0px;
      width: 0;
    }

    .esri-opacity-slider .esri-slider .esri-slider__anchor {
      border-bottom: 1px solid #6e6e6e;
      border-top: 1px solid #ffffff;
      width: 30px;
    }

    .esri-opacity-slider .esri-slider .esri-slider__anchor:hover .esri-slider__label,
    .esri-opacity-slider .esri-slider .esri-slider__anchor:focus .esri-slider__label {
      text-decoration: underline;
    }

    .esri-opacity-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb,
    .esri-opacity-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb {
      background-color: #2e2e2e;
      border: none;
      transform: none;
    }

    .esri-opacity-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::after,
    .esri-opacity-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::after {
      border-left-color: #2e2e2e;
    }

    .esri-opacity-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::before,
    .esri-opacity-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::before {
      background-color: #49b0f2;
      transform: translate3d(-1.5px, 0, 0);
    }

    .esri-opacity-slider .esri-slider .esri-slider__thumb {
      left: -12px;
      top: -6px;
    }

    .esri-opacity-slider .esri-slider .esri-slider__thumb::before {
      position: absolute;
      top: 0;
      left: -1.5px;
      width: 3px;
      content: '';
      height: 12px;
      background-color: #6e6e6e;
      transition:
        transform 125ms ease-in-out,
        background-color 125ms ease-in-out;
    }

    .esri-opacity-slider .esri-slider .esri-slider__thumb::after {
      position: absolute;
      top: 0;
      left: 6px;
      content: '';
      border-bottom: 6px solid #00000000;
      border-left: 6px solid #6e6e6e;
      border-top: 6px solid #00000000;
      height: 0;
      width: 0;
    }

    .esri-opacity-slider .esri-slider .esri-slider__label {
      left: auto;
      line-height: 20px;
      min-width: 50px;
      right: 50px;
      text-align: right;
    }

    .esri-opacity-slider .esri-slider .esri-slider__label:hover {
      background-color: #f3f3f3;
    }

    .esri-opacity-slider .esri-slider .esri-slider__range-input {
      margin: auto;
      text-align: center;
      width: 50%;
    }

    .esri-opacity-slider .esri-slider .esri-slider__label-input {
      text-align: right;
      width: 70px;
    }

    .esri-opacity-slider .esri-slider .esri-slider__max,
    .esri-opacity-slider .esri-slider .esri-slider__min {
      flex: 0 0 40px;
      height: 40px;
      padding: 9px 0;
    }

    .esri-opacity-slider .esri-slider .esri-slider__extra-content {
      height: 100%;
    }

    .esri-opacity-slider .esri-slider .esri-histogram__average-line,
    .esri-opacity-slider .esri-slider .esri-histogram__label {
      stroke: #6e6e6e;
    }

    .esri-opacity-slider .esri-slider .zoom-cap--max {
      position: absolute;
      top: 0;
    }

    .esri-opacity-slider .esri-slider .zoom-cap--min {
      position: absolute;
      bottom: 0;
    }

    .esri-opacity-slider .esri-slider .zoom-cap {
      height: 11px;
      width: 30px;
      stroke-width: 0;
    }

    .esri-opacity-slider .esri-slider .zoom-cap .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-opacity-slider .esri-slider .zoom-cap .zoom-cap--line {
      fill: #ffffff;
    }

    .esri-opacity-slider .esri-slider .zoom-cap .zoom-cap--underline {
      fill: #323232;
    }

    .esri-opacity-slider .esri-slider .zoom-cap:hover {
      cursor: pointer;
    }

    .esri-opacity-slider .esri-slider .zoom-cap:hover .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-opacity-slider .esri-slider .zoom-cap:hover .zoom-cap--line {
      fill: #0079c1;
    }

    .esri-opacity-slider .esri-slider .zoom-cap:hover .zoom-cap--underline {
      fill: #ffffff;
    }

    .esri-opacity-slider__ramp {
      display: inline-block;
      height: 100%;
      width: 30px;
      position: relative;
    }

    .esri-opacity-slider__ramp svg {
      height: 100%;
      width: 100%;
      position: absolute;
      stroke: #6e6e6e;
      stroke-width: 1px;
      left: 0;
    }

    .esri-opacity-slider__ramp svg rect {
      height: 100%;
      width: 100%;
    }

    .esri-opacity-slider__ramp svg path {
      stroke-width: 0.5px;
    }

    .esri-opacity-slider__histogram-container {
      display: inline-block;
      height: 100%;
      width: 120px;
    }

    @keyframes esri-docking-animation {
      0% {
        opacity: 0;
      }

      25% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    @keyframes popup-intro-animation-down {
      0% {
        transform: translate(0, -5px);
        opacity: 0;
      }

      100% {
        transform: translate(0, 0);
        opacity: 1;
      }
    }

    @keyframes popup-intro-animation-up {
      0% {
        transform: translate(0, 5px);
        opacity: 0;
      }

      100% {
        transform: translate(0, 0);
        opacity: 1;
      }
    }

    .esri-ui .esri-popup {
      pointer-events: none;
      position: absolute;
      z-index: 1;
      display: flex;
      flex-flow: column nowrap;
    }

    .esri-popup--shadow {
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
    }

    .esri-popup__button {
      border-radius: 2px;
      padding: 6px 7px;
      margin: 6px 0;
      line-height: 1.3em;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      color: #6e6e6e;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      transition: background-color 125ms ease-in-out;
    }

    .esri-popup__button--disabled {
      cursor: default;
      opacity: 0.4;
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-popup__button:hover {
      color: #2e2e2e;
      background-color: #f3f3f3;
    }

    .esri-popup--aligned-top-center {
      transform-origin: 50% 100%;
    }

    .esri-popup--aligned-bottom-center {
      transform-origin: 50% -5%;
    }

    .esri-popup--aligned-top-left,
    .esri-popup--aligned-bottom-left {
      transform-origin: 100% 50%;
    }

    .esri-popup--aligned-top-right,
    .esri-popup--aligned-bottom-right {
      transform-origin: -5% 50%;
    }

    .esri-popup--aligned-top-center,
    .esri-popup--aligned-top-left,
    .esri-popup--aligned-top-right {
      animation: popup-intro-animation-down 200ms ease-in-out;
    }

    .esri-popup--aligned-bottom-center,
    .esri-popup--aligned-bottom-left,
    .esri-popup--aligned-bottom-right {
      animation: popup-intro-animation-up 200ms ease-in-out;
    }

    .esri-popup__main-container {
      pointer-events: auto;
      position: relative;
      z-index: 1;
      width: 340px;
      max-height: 340px;
      background-color: #ffffff;
      display: flex;
      flex-flow: column nowrap;
    }

    .esri-popup__header {
      position: relative;
      font-size: 12px;
      align-items: flex-start;
      justify-content: space-between;
      display: flex;
      flex: 0 0 auto;
    }

    .esri-popup__header-buttons {
      padding: 0 7px;
      margin: 0 0 0 auto;
      display: flex;
    }

    .esri-popup__header-container {
      flex: 1;
    }

    .esri-popup__header-container--button {
      border: none;
      background: transparent;
      display: flex;
      justify-content: flex-start;
      padding: 0;
      font-size: 100%;
      font-family: inherit;
      color: inherit;
      text-align: initial;
    }

    .esri-popup__header-container--button:hover {
      background-color: #f3f3f3;
    }

    .esri-popup__header-title {
      border-radius: 2px;
      font-size: 14px;
      padding: 6px 7px;
      margin: 6px auto 6px 7px;
      display: block;
      transition: background-color 125ms ease-in-out;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-word;
    }

    .esri-popup__content {
      display: flex;
      flex-flow: column nowrap;
      flex: 1 1 auto;
      font-size: 12px;
      font-weight: 400;
      margin: 0 15px 12px;
      overflow: auto;
      line-height: normal;
    }

    .esri-popup__content img {
      image-orientation: from-image;
    }

    .esri-popup__feature-menu-button {
      transition:
        box-shadow 125ms ease-in-out,
        background-color 125ms ease-in-out;
    }

    .esri-popup__feature-menu-button:hover,
    .esri-popup__feature-menu-button:focus {
      background-color: #f3f3f3;
    }

    .esri-popup--feature-menu-open .esri-popup__feature-menu-button {
      background-color: #f3f3f3;
      color: #2e2e2e;
    }

    .esri-popup--feature-menu-open .esri-popup__header,
    .esri-popup--feature-menu-open .esri-popup__content {
      flex: 0 1 0px;
      overflow: hidden;
      opacity: 0;
    }

    .esri-popup--feature-updated {
      opacity: 0;
      transition: opacity 375ms ease-out;
    }

    .esri-popup--feature-updated-active {
      opacity: 1;
    }

    .esri-popup__pagination-page-text {
      white-space: nowrap;
    }

    .esri-popup__footer {
      align-items: center;
      display: flex;
      flex: 0 0 auto;
      justify-content: space-between;
      padding: 6px 0;
    }

    .esri-popup__footer .esri-popup__button {
      font-weight: 400;
      font-size: 12px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      flex: 0 0 auto;
    }

    .esri-popup__actions {
      animation: esri-fade-in-scale 125ms ease-in-out;
      background: #ffffff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      color: #6e6e6e;
      display: flex;
      flex-flow: column;
      margin: 6px 7px;
      max-width: 50%;
      padding: 0;
      position: absolute;
      right: 0;
      z-index: 1;
    }

    .esri-popup__actions .esri-popup__button[class*='esri-popup__action'] {
      align-items: center;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      color: #6e6e6e;
      display: flex;
      justify-content: flex-start;
      padding: 12px 7px;
      margin-top: 0;
      margin-bottom: 0;
      font-size: 12px;
    }

    .esri-popup__actions .esri-popup__button[class*='esri-popup__action']:hover {
      background-color: #f3f3f3;
    }

    .esri-popup__actions .esri-popup__button[class*='esri-popup__action']:last-child {
      border-bottom: none;
    }

    .esri-popup__actions .esri-popup__button[class*='esri-popup__action'] .esri-popup__icon {
      flex: 0 0 16px;
    }

    .esri-popup__footer .esri-popup__actions-menu-button {
      padding-left: 7px;
      padding-right: 7px;
      margin: 0 7px;
      transition: box-shadow 125ms ease-in-out;
    }

    .esri-popup__footer .esri-popup__actions-menu-button:hover {
      background-color: #f3f3f3;
    }

    .esri-popup--actions-menu-open .esri-popup__footer .esri-popup__actions-menu-button {
      background-color: #f3f3f3;
      color: #2e2e2e;
    }

    [class*='esri-popup--is-docked-bottom-'].esri-popup--is-docked .esri-popup__actions,
    [class*='esri-popup--aligned-top-'] .esri-popup__actions {
      bottom: 32px;
      top: auto;
      transform-origin: bottom center;
    }

    [class*='esri-popup--is-docked-top-'].esri-popup--is-docked .esri-popup__actions,
    [class*='esri-popup--aligned-bottom-'] .esri-popup__actions {
      bottom: auto;
      top: 32px;
      transform-origin: top center;
    }

    .esri-popup__icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      flex: 0 0 16px;
    }

    [class*='esri-popup--is-docked-top-'] .esri-popup__footer,
    [class*='esri-popup--aligned-bottom-'] .esri-popup__footer {
      border-bottom: solid 1px rgba(110, 110, 110, 0.3);
    }

    [class*='esri-popup--is-docked-bottom-'] .esri-popup__content ~ .esri-popup__footer,
    [class*='esri-popup--aligned-top-'] .esri-popup__content ~ .esri-popup__footer {
      margin-top: -12px;
    }

    .esri-popup__navigation {
      background-color: #f3f3f3;
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 15px 0 auto;
      padding: 0;
      justify-content: center;
    }

    .esri-popup__navigation .esri-popup__button {
      margin: 0;
      padding-left: 3px;
      padding-right: 3px;
    }

    .esri-popup__inline-actions-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      margin: 0 7px;
      position: relative;
    }

    .esri-popup__inline-actions-container:only-child {
      width: 100%;
      max-width: unset;
      justify-content: flex-start;
    }

    .esri-popup__inline-actions-container:only-child .esri-popup__actions-menu-button {
      margin-left: auto;
    }

    .esri-popup__inline-actions-container > .esri-popup__action,
    .esri-popup__inline-actions-container > .esri-popup__action-toggle {
      flex: 0 1 auto;
    }

    .esri-popup__inline-actions-container .esri-popup__icon,
    .esri-popup__inline-actions-container [class*='esri-icon'] {
      margin: 0 3px;
    }

    .esri-popup__footer--has-pagination .esri-popup__inline-actions-container {
      width: 70%;
    }

    .esri-popup__action-toggle.esri-popup__action-toggle--on {
      background-color: #e2f1fb;
      color: #2e2e2e;
    }

    .esri-popup__action-toggle.esri-popup__action-toggle--on:hover {
      background-color: #e2f1fb;
      color: #2e2e2e;
    }

    .esri-popup__feature-menu {
      left: 0;
      font-size: 12px;
      font-weight: 400;
      position: absolute;
      width: 100%;
      background-color: #ffffff;
      color: #323232;
      z-index: 1;
      margin: 6px 0;
      max-height: 0;
      opacity: 0;
      height: 0;
      overflow: hidden;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    [class*='esri-popup--is-docked-bottom-'].esri-popup--is-docked .esri-popup__feature-menu,
    [class*='esri-popup--aligned-top-'] .esri-popup__feature-menu {
      bottom: 32px;
      top: auto;
      transform-origin: bottom center;
    }

    [class*='esri-popup--is-docked-top-'].esri-popup--is-docked .esri-popup__feature-menu,
    [class*='esri-popup--aligned-bottom-'] .esri-popup__feature-menu {
      bottom: auto;
      top: 32px;
      transform-origin: top center;
    }

    .esri-popup__feature-menu-list {
      padding: 0;
      margin: 0;
      counter-reset: section;
    }

    .esri-popup__feature-menu-item {
      list-style-type: none;
      border: solid 1px rgba(110, 110, 110, 0.3);
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      transition: background-color 125ms ease-in-out;
      margin-top: -1px;
      position: relative;
    }

    .esri-popup__feature-menu-item:hover,
    .esri-popup__feature-menu-item:focus {
      cursor: pointer;
      background-color: #f3f3f3;
    }

    .esri-popup__feature-menu-item::before {
      counter-increment: section;
      content: counter(section);
      display: flex;
      justify-content: center;
      flex: 0 0 8%;
      text-align: center;
    }

    .esri-popup__feature-menu-item--selected,
    .esri-popup__feature-menu-item--selected:hover,
    .esri-popup__feature-menu-item--selected:focus {
      background-color: #e2f1fb;
    }

    .esri-popup__feature-menu-item .esri-icon-check-mark {
      padding: 0 0.5rem;
    }

    .esri-popup__feature-menu-title {
      display: flex;
      flex: 1 0 82%;
      min-height: 1em;
      margin: 0;
      padding: 0.8em 4%;
      border-left: solid 1px rgba(0, 0, 0, 0.25);
    }

    .esri-popup__feature-menu-viewport {
      max-height: 0;
      opacity: 0;
      overflow: auto;
      position: relative;
      z-index: 1;
    }

    .esri-popup__feature-menu-header {
      background-color: transparent;
      border-bottom: solid 1px rgba(110, 110, 110, 0.3);
      padding: 0;
      margin: 0;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.2em;
      overflow: hidden;
      position: relative;
      opacity: 0;
    }

    .esri-popup--feature-menu-open .esri-popup__feature-menu {
      height: auto;
      opacity: 1;
      animation: esri-fade-in-scale 125ms ease-out;
      max-height: none;
      overflow: visible;
    }

    .esri-popup--feature-menu-open .esri-popup__feature-menu-header {
      padding: 12px 15px;
      max-height: none;
      display: block;
      opacity: 1;
      margin: 0;
    }

    .esri-popup--feature-menu-open .esri-popup__feature-menu-viewport {
      max-height: 175px;
      opacity: 1;
      padding-top: 1px;
    }

    .esri-popup__feature-menu-loader {
      position: sticky;
      z-index: 2;
      padding: 6px;
      bottom: 10px;
      text-align: center;
      pointer-events: none;
    }

    .esri-popup__feature-menu-observer {
      position: relative;
      z-index: 2;
      bottom: 20px;
      text-align: center;
    }

    .esri-popup__loading-container {
      margin: 0 7px;
      text-align: center;
      -webkit-user-select: none;
      user-select: none;
    }

    .esri-popup__action-image {
      width: 16px;
      height: 16px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      flex: 0 0 16px;
    }

    .esri-popup__action-text {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .esri-popup__collapse-button {
      align-items: center;
      background-color: #f3f3f3;
      cursor: pointer;
      display: flex;
      flex: 1 0;
      justify-content: center;
      padding: 6px 0;
    }

    .esri-popup__pointer {
      position: absolute;
      width: 0;
      height: 0;
    }

    .esri-popup__pointer-direction {
      background-color: #ffffff;
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
    }

    .esri-popup--aligned-top-center .esri-popup__pointer {
      top: 100%;
      left: 50%;
      margin: 0 0 0 -6px;
    }

    .esri-popup--aligned-bottom-center .esri-popup__pointer {
      bottom: 100%;
      left: 50%;
      margin: 0 0 0 -6px;
    }

    .esri-popup--aligned-top-left .esri-popup__pointer {
      bottom: 6px;
      right: 6px;
      transform: rotate(-45deg);
    }

    .esri-popup--aligned-bottom-left .esri-popup__pointer {
      top: 6px;
      right: 6px;
      transform: rotate(45deg);
    }

    .esri-popup--aligned-top-right .esri-popup__pointer {
      bottom: 6px;
      left: 6px;
      transform: rotate(45deg);
    }

    .esri-popup--aligned-bottom-right .esri-popup__pointer {
      top: 6px;
      left: 6px;
      transform: rotate(-45deg);
    }

    .esri-popup--aligned-top-center .esri-popup__pointer-direction,
    .esri-popup--aligned-bottom-center .esri-popup__pointer-direction {
      transform: scale(0.75, 2) rotate(45deg);
    }

    .esri-popup--aligned-top-left .esri-popup__pointer-direction,
    .esri-popup--aligned-bottom-left .esri-popup__pointer-direction,
    .esri-popup--aligned-top-right .esri-popup__pointer-direction,
    .esri-popup--aligned-bottom-right .esri-popup__pointer-direction {
      top: -6px;
      left: -6px;
      transform: scale(1, 3.5) rotate(45deg);
    }

    .esri-popup--aligned-top-center .esri-popup__pointer-direction {
      top: -6px;
      left: 0;
    }

    .esri-popup--aligned-bottom-center .esri-popup__pointer-direction {
      bottom: -6px;
      left: 0;
    }

    .esri-view-width-xlarge .esri-popup__main-container {
      width: 460px;
    }

    .esri-view-width-large .esri-popup__main-container {
      width: 400px;
    }

    .esri-view-width-medium .esri-popup__main-container {
      width: 340px;
    }

    .esri-view-width-less-than-medium .esri-popup__main-container {
      width: 280px;
    }

    .esri-view-width-less-than-medium .esri-popup__action-text {
      display: none;
    }

    .esri-view-width-xsmall .esri-popup__button[class*='esri-popup__navigation-'],
    .esri-view-width-xsmall .esri-popup__pagination-page-text {
      display: none;
    }

    .esri-view-width-xsmall .esri-popup--is-docked-bottom-center {
      margin-bottom: 16px;
    }

    .esri-view-width-xsmall .esri-popup--is-docked-top-center,
    .esri-view-width-xsmall .esri-popup--is-docked-bottom-center {
      width: auto;
      margin: 0;
    }

    .esri-view-width-xsmall .esri-popup--is-docked-top-center .esri-popup__main-container,
    .esri-view-width-xsmall .esri-popup--is-docked-bottom-center .esri-popup__main-container {
      width: 100%;
      max-height: 75%;
      padding: 4px 0;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .esri-view-width-xsmall
      .esri-popup--is-docked-top-center
      .esri-popup__main-container.esri-popup--is-collapsible::before,
    .esri-view-width-xsmall
      .esri-popup--is-docked-bottom-center
      .esri-popup__main-container.esri-popup--is-collapsible::before {
      background-color: rgba(110, 110, 110, 0.3);
      border-radius: 2px;
      content: '';
      height: 2px;
      left: calc(50% - 16px);
      position: absolute;
      top: 6px;
      width: 32px;
    }

    .esri-view-width-xsmall
      .esri-popup--is-docked-top-center.esri-popup--feature-menu-open
      .esri-popup__main-container::before,
    .esri-view-width-xsmall
      .esri-popup--is-docked-bottom-center.esri-popup--feature-menu-open
      .esri-popup__main-container::before {
      visibility: hidden;
    }

    .esri-view-width-xsmall .esri-popup--is-docked-bottom-center .esri-popup__feature-menu,
    .esri-view-width-xsmall .esri-popup--is-docked-bottom-center .esri-popup__actions {
      bottom: 36px;
    }

    .esri-view-height-xlarge .esri-popup__main-container {
      max-height: 460px;
    }

    .esri-view-height-xlarge.esri-popup--feature-menu-open .esri-popup__feature-menu-viewport {
      max-height: 410px;
    }

    .esri-view-height-large .esri-popup__main-container {
      max-height: 400px;
    }

    .esri-view-height-large.esri-popup--feature-menu-open .esri-popup__feature-menu-viewport {
      max-height: 350px;
    }

    .esri-view-height-less-than-medium .esri-popup__main-container {
      max-height: 300px;
    }

    .esri-view-height-less-than-medium.esri-popup--feature-menu-open
      .esri-popup__feature-menu-viewport {
      max-height: 250px;
    }

    .esri-popup--is-docked {
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      margin: 15px 15px 30px;
      animation: esri-docking-animation 250ms ease-out;
    }

    .esri-ui .esri-popup--is-docked {
      flex-flow: row nowrap;
    }

    .esri-popup--is-docked .esri-popup__header {
      padding-top: 2px;
    }

    .esri-popup--is-docked-top-left,
    .esri-popup--is-docked-top-center,
    .esri-popup--is-docked-top-right {
      align-items: flex-start;
    }

    .esri-popup--is-docked-bottom-left,
    .esri-popup--is-docked-bottom-center,
    .esri-popup--is-docked-bottom-right {
      align-items: flex-end;
    }

    .esri-popup--is-docked-top-left,
    .esri-popup--is-docked-bottom-left {
      justify-content: flex-start;
    }

    .esri-popup--is-docked-top-center,
    .esri-popup--is-docked-bottom-center {
      justify-content: center;
    }

    .esri-popup--is-docked-top-right,
    .esri-popup--is-docked-bottom-right {
      justify-content: flex-end;
    }

    .esri-popup--is-docked-top-left .esri-popup__main-container,
    .esri-popup--is-docked-top-right .esri-popup__main-container,
    .esri-popup--is-docked-bottom-left .esri-popup__main-container,
    .esri-popup--is-docked-bottom-right .esri-popup__main-container {
      max-height: 80%;
    }

    .esri-popup--is-docked-top-center .esri-popup__main-container,
    .esri-popup--is-docked-bottom-center .esri-popup__main-container {
      max-height: 40%;
    }

    html[dir='rtl'] .esri-widget .esri-popup__header-title,
    html[dir='rtl'] .esri-popup__header-title {
      margin: 6px 7px 6px auto;
    }

    html[dir='rtl'] .esri-popup__header-buttons {
      margin: 0 auto 0 0;
    }

    html[dir='rtl'] .esri-popup__feature-menu-title {
      border-left: none;
      border-right: solid 1px rgba(0, 0, 0, 0.25);
    }

    html[dir='rtl'] .esri-popup__navigation {
      margin: 0 auto 0 15px;
    }

    html[dir='rtl'] .esri-popup__actions {
      right: auto;
      left: 0;
    }

    html[dir='rtl']
      .esri-popup__inline-actions-container:only-child
      .esri-popup__actions-menu-button {
      margin-left: 7px;
      margin-right: auto;
    }

    html[dir='rtl'] .esri-popup__inline-actions-container .esri-popup__action {
      margin-right: 7px;
      margin-left: 15px;
    }

    html[dir='rtl'] .esri-popup--is-docked .esri-popup__loading-container {
      order: 0;
    }

    html[dir='rtl'] .esri-popup--is-docked-top-left,
    html[dir='rtl'] .esri-popup--is-docked-bottom-left {
      justify-content: flex-end;
    }

    html[dir='rtl'] .esri-popup--is-docked-top-right,
    html[dir='rtl'] .esri-popup--is-docked-bottom-right {
      justify-content: flex-start;
    }

    .esri-print {
      position: relative;
      padding: 12px 15px;
      overflow-y: auto;
    }

    .esri-print section[aria-hidden='true'] {
      display: none;
    }

    .esri-print__form-section-container {
      margin: 0 0 12px;
    }

    .esri-print__header-title {
      font-size: 16px;
      font-weight: 600;
      padding: 0 0 12px;
      margin: 0 auto 0 0;
    }

    .esri-print__template-list {
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.33);
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      padding: 0;
      width: 280px;
    }

    .esri-print__template-list .esri-widget__heading,
    .esri-print__template-list-footer {
      margin: 0;
      padding: 12px 15px;
      flex: 1 0 auto;
    }

    .esri-print__template-list-scroller {
      max-height: 175px;
      overflow-y: auto;
      border-top: 1px solid rgba(110, 110, 110, 0.3);
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-print__template-list .esri-menu__list-item {
      font-size: 12px;
    }

    .esri-print__layout-section,
    .esri-print__map-only-section {
      padding: 12px 0 0;
      margin-bottom: 12px;
      border-top: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-print__layout-tab-list {
      position: relative;
      bottom: -1px;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: space-between;
    }

    .esri-print__layout-tab {
      display: inline-block;
      text-align: center;
      margin: 0;
      padding: 5px;
      width: 100%;
      cursor: pointer;
      color: #6e6e6e;
      border: 1px solid rgba(0, 0, 0, 0);
    }

    .esri-print__layout-tab:hover,
    .esri-print__layout-tab:focus {
      color: #323232;
      background-color: #f3f3f3;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-print__layout-tab[aria-selected='true'],
    .esri-print__layout-tab[aria-selected='true']:hover {
      background-color: #ffffff;
      color: #323232;
      border-color: rgba(110, 110, 110, 0.3);
      border-bottom-color: #ffffff;
    }

    .esri-print__panel--error {
      color: #8c2907;
    }

    .esri-print__panel-container {
      flex: 1 0;
    }

    .esri-print__input-text {
      width: 100%;
      margin: 0;
    }

    .esri-print__scale-input-container {
      display: flex;
      align-items: center;
    }

    .esri-print__advanced-options-section {
      background-color: #f3f3f3;
      color: #6e6e6e;
    }

    .esri-print__advanced-options-button-container {
      color: #6e6e6e;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: transparent;
      width: 100%;
      overflow: visible;
    }

    .esri-print__advanced-options-button {
      border: none;
      cursor: pointer;
      font-family: inherit;
      padding: 6px 7px;
      width: 100%;
      background-color: transparent;
    }

    .esri-print__advanced-options-button[aria-expanded='true']
      .esri-print__advanced-options-button-icon--closed,
    .esri-print__advanced-options-button[aria-expanded='false']
      .esri-print__advanced-options-button-icon--opened,
    .esri-print__advanced-options-button .esri-print__advanced-options-button-icon--closed-rtl {
      display: none;
    }

    .esri-print__advanced-options-button[aria-expanded='false']
      .esri-print__advanced-options-button-icon--closed,
    .esri-print__advanced-options-button[aria-expanded='true']
      .esri-print__advanced-options-button-icon--opened {
      display: block;
    }

    .esri-print__advanced-options-button-title {
      font-size: 12px;
      margin: 0 3px;
    }

    .esri-print__advanced-options-container {
      font-size: 12px;
      padding: 6px 7px;
    }

    .esri-print__advanced-options-container .esri-print__form-section-container {
      margin-bottom: 6px;
    }

    .esri-print__size-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .esri-print__advanced-options-section [class*='esri-icon'],
    .esri-print__size-container [class*='esri-icon'] {
      background: transparent;
    }

    .esri-print__size-container [class*='esri-icon'] {
      align-self: flex-end;
    }

    .esri-print__size-container button {
      color: #6e6e6e;
    }

    .esri-print__width-container,
    .esri-print__height-container {
      flex: 0 0 43%;
    }

    .esri-print__swap-button {
      flex: 0 0 5%;
      border: none;
    }

    .esri-print__refresh-button {
      border: 1px solid rgba(110, 110, 110, 0.3);
      border-left-width: 0;
    }

    .esri-print__export-button,
    .esri-print__template-button {
      margin: 6px 0;
    }

    .esri-print__export-panel-container {
      font-size: 12px;
      border-top: 1px solid #dddddd;
      padding: 12px 0;
    }

    .esri-print__export-panel-container [class*='esri-icon'] {
      margin-right: 0.5em;
      margin-top: 0.15em;
    }

    .esri-print__exported-file-link-title {
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-word;
    }

    .esri-print__exported-file-link {
      color: #6e6e6e;
      display: flex;
      align-items: flex-start;
      margin-bottom: 6px;
      text-decoration: none;
    }

    .esri-print__exported-file-link:hover {
      color: #2e2e2e;
    }

    .esri-print__exported-file--error {
      color: #8c2907;
      cursor: pointer;
    }

    .esri-print .esri-print__exported-file--error:hover {
      color: #8c2907;
    }

    .esri-print__loader {
      height: 40px;
      width: 32px;
      background: url(https://js.arcgis.com/4.19/esri/themes/base/images/loading-throb.gif)
        no-repeat center;
      margin: 0 auto;
    }

    html[dir='rtl'] .esri-print__refresh-button {
      border-left-width: 1px;
      border-right-width: 0;
    }

    html[dir='rtl'] .esri-print__export-panel-container [class*='esri-icon'] {
      margin-right: 0;
      margin-left: 0.5em;
    }

    html[dir='rtl']
      .esri-print__advanced-options-button[aria-expanded='false']
      .esri-print__advanced-options-button-icon--closed {
      display: none;
    }

    html[dir='rtl']
      .esri-print__advanced-options-button[aria-expanded='false']
      .esri-print__advanced-options-button-icon--closed-rtl {
      display: block;
    }

    .esri-scale-bar.esri-widget {
      background: transparent;
      box-shadow: none;
    }

    .esri-scale-bar__bar-container {
      position: relative;
      display: flex;
      align-items: flex-end;
      transition: width 250ms ease-in-out;
      font-size: 12px;
    }

    .esri-scale-bar__bar-container--ruler {
      flex-direction: column;
    }

    .esri-scale-bar__bar-container--line:last-child {
      align-items: flex-start;
    }

    .esri-scale-bar__ruler {
      display: flex;
      flex-wrap: wrap;
      height: 6px;
      background-color: #ffffff;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.33),
        0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .esri-scale-bar__ruler-block {
      height: 50%;
      width: 25%;
      background-color: #323232;
    }

    .esri-scale-bar__ruler-block:nth-child(-n + 2) {
      margin-right: 25%;
    }

    .esri-scale-bar__ruler-block:nth-child(n + 3) {
      margin-left: 25%;
    }

    .esri-scale-bar__line {
      position: relative;
      height: 1.5em;
      background-color: rgba(255, 255, 255, 0.33);
      left: 0;
      z-index: 1;
    }

    .esri-scale-bar__line--top {
      bottom: -1px;
      border-bottom: 2px solid #323232;
    }

    .esri-scale-bar__line--bottom {
      top: -1px;
      border-top: 2px solid #323232;
    }

    .esri-scale-bar__line--top::before,
    .esri-scale-bar__line--top::after,
    .esri-scale-bar__line--bottom::before,
    .esri-scale-bar__line--bottom::after {
      content: '';
      display: block;
      width: 2px;
      height: 1.5em;
      background-color: #323232;
      position: absolute;
      border-right: 2px solid #323232;
    }

    .esri-scale-bar__line--top::before {
      bottom: -2px;
      left: 0;
    }

    .esri-scale-bar__line--top::after {
      bottom: -2px;
      right: 0;
    }

    .esri-scale-bar__line--bottom::before {
      top: -2px;
      left: 0;
    }

    .esri-scale-bar__line--bottom::after {
      height: 1.5em;
      top: -2px;
      right: 0;
    }

    .esri-scale-bar__label-container--line {
      position: absolute;
      left: 0;
      z-index: 1;
    }

    .esri-scale-bar__label-container--ruler {
      display: flex;
      width: 100%;
      justify-content: space-between;
      position: relative;
    }

    .esri-scale-bar__label-container--ruler .esri-scale-bar__label {
      padding: 6px 0 0;
      text-shadow:
        0 0 1px #ffffff,
        0 0 1px #ffffff,
        0 0 1px #ffffff;
    }

    .esri-scale-bar__label-container--top {
      bottom: 0;
    }

    .esri-scale-bar__label-container--bottom {
      top: 1px;
    }

    .esri-scale-bar__label {
      font-size: inherit;
      color: #323232;
      white-space: nowrap;
      padding: 0 7px;
      font-weight: 600;
    }

    html[dir='rtl'] .esri-scale-bar__ruler {
      margin: 0 0.5ch 0 2ch;
    }

    html[dir='rtl'] .esri-scale-bar__label-container--line {
      left: auto;
      right: 0;
    }

    .esri-scale-range-slider {
      background-color: transparent;
      min-width: 310px;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .esri-scale-range-slider .esri-slider {
      background-color: transparent;
      padding: 9px 11px 9px 9px;
    }

    .esri-scale-range-slider .esri-slider__segment-1 {
      background-color: #0079c1;
      height: 4px;
    }

    .esri-scale-range-slider.esri-widget {
      box-shadow: none;
    }

    .esri-scale-range-slider.esri-disabled {
      opacity: 0.4;
      pointer-events: none;
      -webkit-user-select: none;
      user-select: none;
    }

    .esri-scale-range-slider__scale-indicator-container {
      position: absolute;
      left: 9px;
      right: 11px;
    }

    .esri-scale-range-slider__scale-indicator {
      top: 11px;
      margin-left: -4px;
      width: 1px;
      position: relative;
      transition-property: left;
      transition-duration: 0.2s;
    }

    .esri-scale-range-slider__scale-indicator-icon {
      fill: #323232;
    }

    .esri-scale-range-slider__scale-menu-container {
      margin-top: 12px;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    .esri-scale-range-slider__scale-menu-toggle {
      color: #0079c1;
      cursor: pointer;
      background-color: transparent;
      border: none;
      font-size: 14px;
      white-space: nowrap;
    }

    .esri-scale-range-slider__scale-menu-toggle--active {
      font-weight: 600;
    }

    .esri-scale-range-slider__scale-menu-toggle-icon {
      font-size: 12px;
      margin: 0 7px;
    }

    .esri-scale-range-slider__scale-preview {
      display: inline-flex;
      flex-direction: column;
      background-color: #ffffff;
      padding: 6px 7px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .esri-scale-range-slider__scale-preview-thumbnail {
      display: block;
      box-sizing: border-box;
      padding: 64px;
    }

    .esri-scale-range-slider__scale-menu {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;
      border-radius: 2px;
      background-color: #ffffff;
      color: #323232;
    }

    .esri-scale-range-slider__scale-menu-list {
      min-width: 200px;
      padding: 6px 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      list-style-type: none;
    }

    .esri-scale-range-slider__scale-menu-item {
      display: flex;
      flex-direction: column;
      padding: 6px 7px;
      margin: 0;
      cursor: pointer;
    }

    .esri-scale-range-slider__scale-menu-item:hover,
    .esri-scale-range-slider__scale-menu-item:focus {
      background-color: #f3f3f3;
    }

    .esri-scale-range-slider__scale-menu-scroller {
      max-height: 450px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .esri-scale-range-slider__scale-item-label {
      padding-bottom: 4px;
    }

    .esri-scale-range-slider__scale-item-label::before {
      content: '•';
      color: transparent;
      margin: 0 7px;
    }

    .esri-scale-range-slider__scale-menu-item--current-scale
      .esri-scale-range-slider__scale-item-label::before {
      color: #0079c1;
    }

    .esri-scale-range-slider__scale-menu-item:hover
      .esri-scale-range-slider__scale-item-label::before {
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-scale-range-slider__scale-item-value {
      color: #6e6e6e;
      font-size: 12px;
      margin: 0 30px;
    }

    .esri-scale-range-slider__scale-item-value--editable {
      width: 14ch;
    }

    .esri-search {
      width: 240px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      overflow: visible;
    }

    .esri-search .esri-widget--button {
      box-shadow: none;
    }

    .esri-search .esri-icon-notice-triangle {
      font-size: 16px;
      line-height: 16px;
      margin: 0 5px 0 0;
      vertical-align: text-bottom;
    }

    .esri-search .esri-widget__loader {
      align-items: center;
      display: flex;
      justify-content: center;
      min-height: 32px;
    }

    .esri-search .esri-widget__loader-text {
      margin: 0 5px;
    }

    .esri-search__container,
    .esri-search__input-container,
    .esri-search__form {
      display: flex;
      flex-flow: row nowrap;
    }

    .esri-search__container {
      position: relative;
      align-items: stretch;
      flex: 1 0 100%;
    }

    .esri-search__container .esri-search__input,
    .esri-search__container .esri-widget--button {
      z-index: 0;
    }

    .esri-search__container .esri-search__input:focus,
    .esri-search__container .esri-widget--button:focus {
      z-index: 1;
    }

    .esri-search--searching::before,
    .esri-search--searching::after {
      content: '';
      opacity: 1;
      position: absolute;
      height: 1px;
      top: 0;
      transition: opacity 500ms ease-in-out;
    }

    .esri-search--searching::before {
      background-color: rgba(110, 110, 110, 0.3);
      width: 100%;
      z-index: 0;
    }

    .esri-search--searching::after {
      background-color: #6e6e6e;
      width: 20%;
      z-index: 0;
      animation: looping-progresss-bar-ani 1500ms linear infinite;
    }

    .esri-search__input-container {
      align-items: stretch;
      flex: 2 0;
    }

    .esri-search__form {
      padding: 0;
      margin: 0;
      align-items: stretch;
      flex: 1 0;
    }

    .esri-search__input {
      display: block;
      width: 100%;
      margin: 0;
      border: none;
      box-shadow: none;
    }

    .esri-search__input::-ms-clear {
      display: none;
    }

    .esri-search__input::-moz-placeholder {
      color: rgba(50, 50, 50, 0.4);
      opacity: 1;
    }

    .esri-search__input:-ms-input-placeholder {
      color: rgba(50, 50, 50, 0.4);
    }

    .esri-search__input::-webkit-input-placeholder {
      color: rgba(50, 50, 50, 0.4);
    }

    .esri-search__submit-button,
    .esri-search__sources-button {
      cursor: pointer;
      align-self: flex-end;
    }

    .esri-search__submit-button {
      border-top: none;
      border-right: none;
      border-bottom: none;
      border-left: solid 1px rgba(110, 110, 110, 0.3);
    }

    .esri-search__sources-button {
      border-top: none;
      border-right: solid 1px rgba(110, 110, 110, 0.3);
      border-bottom: none;
      border-left: none;
    }

    .esri-search__sources-button--up {
      display: none;
    }

    .esri-search__clear-button {
      border-top: none;
      border-right: none;
      border-bottom: none;
      border-left: none;
      align-self: flex-end;
      display: flex;
    }

    .esri-search__source-name {
      clip: rect(0 0 0 0);
      overflow: hidden;
      position: absolute;
      height: 1px;
      width: 1px;
    }

    .esri-search__suggestions-menu [class^='esri-icon'] {
      vertical-align: middle;
    }

    .esri-search__suggestions-menu .esri-menu__header:first-child,
    .esri-search__suggestions-menu ul:first-child {
      border: none;
    }

    .esri-search--show-suggestions .esri-search__suggestions-menu,
    .esri-search--sources .esri-search__sources-menu {
      overflow: auto;
      visibility: visible;
      max-height: 300px;
      animation: esri-fade-in 250ms ease-out;
    }

    .esri-search__source--active {
      background-color: #e2f1fb;
    }

    .esri-search--warning .esri-search__warning-menu {
      transition: opacity 125ms ease-in-out;
      visibility: visible;
      opacity: 1;
      max-height: inherit;
    }

    .esri-search__sources-button {
      display: flex;
    }

    .esri-search--multiple-sources .esri-search__input {
      border-left: 0;
    }

    .esri-search__warning-menu {
      z-index: 1;
      font-size: 14px;
      opacity: 0;
    }

    .esri-search__warning-body {
      padding: 0.8em 1em;
    }

    .esri-search__warning-header {
      font-weight: 600;
      margin-bottom: 5px;
    }

    .esri-ui-bottom-left .esri-search__sources-button--up,
    .esri-ui-bottom-right .esri-search__sources-button--up {
      display: flex;
    }

    .esri-ui-bottom-left .esri-search__sources-button--down,
    .esri-ui-bottom-right .esri-search__sources-button--down {
      display: none;
    }

    .esri-view-width-less-than-small .esri-search__input {
      font-size: 16px;
    }

    html[dir='rtl'] .esri-search__submit-button {
      border-left: none;
      border-right: solid 1px rgba(110, 110, 110, 0.3);
    }

    html[dir='rtl'] .esri-search__sources-button {
      border-right: none;
      border-left: solid 1px rgba(110, 110, 110, 0.3);
    }

    html[dir='rtl'] .esri-search__container::after {
      animation: looping-progresss-bar-ani 1500ms linear infinite reverse;
    }

    .esri-search-result-renderer .esri-search-result-renderer__more-results-header {
      font-weight: 600;
      margin-bottom: 2px;
    }

    .esri-search-result-renderer .esri-search-result-renderer__more-results-item {
      margin-bottom: 10px;
    }

    .esri-search-result-renderer .esri-search-result-renderer__more-results-list {
      display: none;
    }

    .esri-search-result-renderer .esri-search-result-renderer__more-results-list ul {
      list-style: none;
      margin: 0 0 10px;
      padding: 0;
    }

    .esri-search-result-renderer .esri-search-result-renderer__more-results-list li {
      padding: 2px 0;
    }

    .esri-search-result-renderer
      .esri-search-result-renderer__more-results--show-more-results
      .esri-search-result-renderer__more-results-list {
      display: block;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #cccccc;
    }

    .esri-size-slider {
      direction: ltr;
      min-width: 260px;
    }

    .esri-size-slider .esri-slider {
      font-size: 12px;
    }

    .esri-size-slider .esri-slider .esri-slider__thumb {
      background-color: #6e6e6e;
      border-radius: 0;
      border: none;
      width: 6px;
      height: 12px;
    }

    .esri-size-slider .esri-slider .esri-slider__content {
      flex-direction: row;
      height: 240px;
      margin: 0 auto 0 40%;
    }

    .esri-size-slider .esri-slider .esri-slider__track {
      flex: 0 1 0px;
      width: 0;
    }

    .esri-size-slider .esri-slider .esri-slider__anchor {
      border-bottom: 1px solid #6e6e6e;
      border-top: 1px solid #ffffff;
      width: 30px;
    }

    .esri-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__label,
    .esri-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__label {
      text-decoration: underline;
    }

    .esri-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb,
    .esri-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb {
      background-color: #2e2e2e;
      border: none;
      transform: none;
    }

    .esri-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::after,
    .esri-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::after {
      border-left-color: #2e2e2e;
    }

    .esri-size-slider .esri-slider .esri-slider__anchor:hover .esri-slider__thumb::before,
    .esri-size-slider .esri-slider .esri-slider__anchor:focus .esri-slider__thumb::before {
      background-color: #49b0f2;
      transform: translate3d(-1.5px, 0, 0);
    }

    .esri-size-slider .esri-slider .esri-slider__thumb {
      left: -12px;
      top: -6px;
    }

    .esri-size-slider .esri-slider .esri-slider__thumb::before {
      position: absolute;
      top: 0;
      left: -1.5px;
      width: 3px;
      content: '';
      height: 12px;
      background-color: #6e6e6e;
      transition:
        transform 125ms ease-in-out,
        background-color 125ms ease-in-out;
    }

    .esri-size-slider .esri-slider .esri-slider__thumb::after {
      position: absolute;
      top: 0;
      left: 6px;
      content: '';
      border-bottom: 6px solid #00000000;
      border-left: 6px solid #6e6e6e;
      border-top: 6px solid #00000000;
      height: 0;
      width: 0;
    }

    .esri-size-slider .esri-slider .esri-slider__label {
      left: auto;
      line-height: 20px;
      min-width: 50px;
      right: 50px;
      text-align: right;
    }

    .esri-size-slider .esri-slider .esri-slider__label:hover {
      background-color: #f3f3f3;
    }

    .esri-size-slider .esri-slider .esri-slider__range-input {
      margin: auto;
      text-align: center;
      width: 50%;
    }

    .esri-size-slider .esri-slider .esri-slider__label-input {
      text-align: right;
      width: 70px;
    }

    .esri-size-slider .esri-slider .esri-slider__max,
    .esri-size-slider .esri-slider .esri-slider__min {
      flex: 0 0 40px;
      height: 40px;
      padding: 9px 0;
    }

    .esri-size-slider .esri-slider .esri-slider__extra-content {
      height: 100%;
    }

    .esri-size-slider .esri-slider .esri-histogram__average-line,
    .esri-size-slider .esri-slider .esri-histogram__label {
      stroke: #6e6e6e;
    }

    .esri-size-slider .esri-slider .zoom-cap--max {
      position: absolute;
      top: 0;
    }

    .esri-size-slider .esri-slider .zoom-cap--min {
      position: absolute;
      bottom: 0;
    }

    .esri-size-slider .esri-slider .zoom-cap {
      height: 11px;
      width: 30px;
      stroke-width: 0;
    }

    .esri-size-slider .esri-slider .zoom-cap .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-size-slider .esri-slider .zoom-cap .zoom-cap--line {
      fill: #ffffff;
    }

    .esri-size-slider .esri-slider .zoom-cap .zoom-cap--underline {
      fill: #323232;
    }

    .esri-size-slider .esri-slider .zoom-cap:hover {
      cursor: pointer;
    }

    .esri-size-slider .esri-slider .zoom-cap:hover .zoom-cap--mask {
      fill: #ffffff;
    }

    .esri-size-slider .esri-slider .zoom-cap:hover .zoom-cap--line {
      fill: #0079c1;
    }

    .esri-size-slider .esri-slider .zoom-cap:hover .zoom-cap--underline {
      fill: #ffffff;
    }

    .esri-size-slider__ramp {
      display: inline-block;
      height: 100%;
      width: 30px;
      position: relative;
    }

    .esri-size-slider__ramp svg {
      height: 100%;
      width: 100%;
      position: absolute;
      stroke: #6e6e6e;
      stroke-width: 1px;
      left: 0;
    }

    .esri-size-slider__ramp svg rect {
      height: 100%;
      width: 100%;
    }

    .esri-size-slider__ramp svg path {
      stroke-width: 0.5px;
    }

    .esri-size-slider__histogram-container {
      display: inline-block;
      height: 100%;
      width: 120px;
    }

    .esri-sketch {
      display: flex;
      flex-flow: column wrap;
    }

    .esri-sketch__menu-header {
      margin: 6px;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      display: flex;
      align-items: center;
    }

    .esri-sketch__menu-title {
      flex: 1 1 auto;
      overflow: hidden;
    }

    .esri-sketch__panel {
      align-items: center;
      display: flex;
      flex-flow: row nowrap;
      padding: 0;
    }

    .esri-sketch__info-panel {
      background-color: #f3f3f3;
      opacity: 1;
      transition: opacity 250ms ease-in-out;
    }

    .esri-sketch__info-panel:empty {
      opacity: 0;
      padding: 0;
      visibility: hidden;
    }

    .esri-sketch__menu-container {
      display: flex;
      flex-flow: column;
      flex: 1 1 auto;
      flex-direction: column;
    }

    .esri-sketch__menu-content {
      background-color: #f3f3f3;
      padding: 0 7px;
      justify-content: center;
      align-items: flex-start;
      flex: 1 1 auto;
      min-height: 6vh;
      display: flex;
      flex-direction: row;
      animation: esri-fade-in 250ms ease-in-out;
      transition: min-height 250ms ease-in-out;
    }

    .esri-sketch__menu-item-wrapper {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
    }

    .esri-sketch__section {
      align-items: center;
      display: flex;
      flex-flow: row nowrap;
      padding: 0 7px;
      margin: 6px 0;
    }

    .esri-sketch__tool-section {
      border-right: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-sketch__tool-section:last-child {
      border-right: none;
    }

    .esri-sketch__button {
      align-items: center;
      background-color: transparent;
      border: none;
      color: #6e6e6e;
      display: flex;
      font-size: 16px;
      height: 32px;
      justify-content: center;
      text-align: center;
      transition: background-color 125ms ease-in-out;
      width: 32px;
    }

    .esri-sketch__button:disabled {
      cursor: default;
      color: rgba(110, 110, 110, 0.4);
    }

    .esri-sketch__button:hover,
    .esri-sketch__button:focus {
      background-color: #f3f3f3;
      color: #2e2e2e;
      cursor: pointer;
    }

    .esri-sketch__button.esri-sketch__button--selected,
    .esri-sketch__button.esri-sketch__button--selected:hover {
      background: #4c4c4c;
      color: #ffffff;
    }

    .esri-sketch__menu-item {
      box-shadow: 0 1px 0 rgba(110, 110, 110, 0.3);
      padding: 3px;
      background-color: #ffffff;
      cursor: pointer;
      margin: 3px 0;
      border: 1px solid rgba(110, 110, 110, 0.3);
      border-color: transparent;
      border-radius: 2px;
      display: flex;
      justify-content: space-between;
      transition: border-color 125ms ease-in-out;
    }

    .esri-sketch__item-action-icon {
      flex: 0 0 16px;
      font-size: 16px;
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-top: 0.1em;
    }

    .esri-sketch__item-action-image {
      flex: 0 0 16px;
      width: 16px;
      height: 16px;
      font-size: 14px;
      text-align: center;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }

    .esri-sketch__action-toggle {
      align-items: flex-start;
      border: 1px solid transparent;
      cursor: pointer;
      display: flex;
      flex-flow: row-reverse;
      font-size: 12px;
      justify-content: space-between;
      margin: 0;
      opacity: 1;
      padding: 6px 15px;
      transition:
        opacity 250ms ease-in-out 250ms,
        background-color 250ms ease-in-out;
      width: 100%;
    }

    .esri-sketch__action-toggle .esri-sketch__item-action-title {
      margin-left: 0;
    }

    .esri-sketch__action-toggle .esri-sketch__item-action-icon {
      background-color: #f3f3f3;
      border-radius: 16px;
      box-shadow: 0 0 0 1px #6e6e6e;
      flex: 0 0 28px;
      height: 16px;
      overflow: hidden;
      padding: 0;
      position: relative;
      transition: background-color 125ms ease-in-out;
      width: 16px;
    }

    .esri-sketch__action-toggle .esri-sketch__item-action-icon::before {
      background-color: #6e6e6e;
      box-shadow: 0 0 0 1px #ffffff;
      border-radius: 100%;
      content: '';
      display: block;
      height: 12px;
      left: 0;
      margin: 2px;
      position: absolute;
      top: 0;
      transition:
        background-color 125ms ease-in-out,
        left 125ms ease-in-out;
      width: 12px;
    }

    .esri-sketch__action-toggle.esri-disabled-element {
      pointer-events: none;
      opacity: 0.4;
    }

    .esri-sketch__action-toggle--on .esri-sketch__item-action-icon {
      background-color: #0079c1;
      box-shadow: 0 0 0 1px #0079c1;
    }

    .esri-sketch__action-toggle--on .esri-sketch__item-action-icon::before {
      background-color: #ffffff;
      left: 12px;
    }

    .esri-sketch__feature-count-badge {
      align-items: center;
      background: #ffffff;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      border-radius: 2px;
      display: flex;
      font-size: 12px;
      justify-content: center;
      margin: 0;
      padding: 0.25em 0.75em;
    }

    html[dir='rtl'] .esri-sketch__tool-section {
      border-left: 1px solid rgba(110, 110, 110, 0.3);
      border-right: none;
    }

    html[dir='rtl'] .esri-sketch__tool-section:last-child {
      border: none;
    }

    html[dir='rtl'] .esri-expand__content .esri-sketch--vertical .esri-sketch__tool-section {
      border-left: none;
      border-right: none;
    }

    .esri-sketch--vertical {
      flex-direction: row-reverse;
    }

    .esri-sketch--vertical .esri-sketch__panel {
      flex-flow: column;
    }

    .esri-sketch--vertical .esri-sketch__section {
      flex-flow: column;
      padding-left: 0;
      padding-right: 0;
      margin-left: 7px;
      margin-right: 7px;
    }

    .esri-sketch--vertical .esri-sketch__tool-section {
      border-right: none;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-sketch--vertical .esri-sketch__tool-section:last-child {
      border-bottom: none;
    }

    .esri-sketch--vertical .esri-sketch__info-panel {
      padding-top: 6px;
    }

    .esri-sketch--vertical .esri-sketch__info-panel:empty {
      padding: 0;
    }

    .esri-sketch--vertical .esri-sketch__info-section {
      margin-top: 3px;
      width: 32px;
    }

    .esri-sketch--vertical .esri-sketch__menu-container {
      min-width: 30vh;
    }

    .esri-slice {
      flex-shrink: 0;
    }

    .esri-slice__container {
      position: relative;
      padding: 12px 0;
      overflow-y: auto;
    }

    .esri-slice__container a {
      text-decoration: none;
    }

    .esri-slice__hint {
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-slice__hint-text {
      margin: 12px 0;
      padding: 0;
    }

    .esri-slice__exclude-button {
      margin-bottom: 12px;
    }

    .esri-slice__settings {
      padding: 6px 15px 12px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-slice__settings ul {
      padding: 0;
      margin: 0;
    }

    .esri-slice__settings li {
      list-style: none;
    }

    .esri-slice__layer-item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-bottom: 6px;
    }

    .esri-slice__cross {
      margin-right: 7px;
      color: inherit;
      position: relative;
      top: 2px;
    }

    .esri-slice__panel--error {
      color: #8c2907;
      padding: 0 15px;
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-slice__actions {
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding: 0 15px;
    }

    html[dir='rtl'] .esri-slice__cross {
      margin-right: 0;
      margin-left: 7px;
    }

    @supports (-ms-ime-align: auto) {
      .esri-slider__anchor:focus {
        outline: 1px dotted #000000;
      }
    }

    .esri-slider {
      direction: ltr;
      display: flex;
      height: 100%;
      width: 100%;
      -webkit-user-select: none;
      user-select: none;
    }

    .esri-disabled .esri-slider__content,
    .esri-disabled .esri-slider__min,
    .esri-disabled .esri-slider__max {
      opacity: 0.4;
    }

    .esri-disabled .esri-slider__thumb:hover {
      transform: none;
      border-color: #0079c1;
      cursor: default;
    }

    .esri-disabled .esri-slider__label:hover {
      cursor: default;
    }

    .esri-disabled .esri-slider__segment:hover {
      cursor: default;
    }

    .esri-disabled .esri-slider--horizontal .esri-slider__segment--interactive:hover,
    .esri-disabled .esri-slider--vertical .esri-slider__segment--interactive:hover {
      cursor: default;
    }

    .esri-slider--reversed.esri-slider--horizontal {
      flex-direction: row-reverse;
    }

    .esri-slider--reversed.esri-slider--vertical {
      flex-direction: column;
    }

    .esri-slider--horizontal {
      flex-direction: row;
    }

    .esri-slider--horizontal .esri-slider__content {
      height: auto;
    }

    .esri-slider--horizontal .esri-slider__track {
      height: 2px;
      width: 100%;
    }

    .esri-slider--horizontal .esri-slider__segment--interactive:hover {
      cursor: ew-resize;
    }

    .esri-slider--horizontal .esri-slider__anchor {
      height: 100%;
      width: 1px;
    }

    .esri-slider--horizontal .esri-slider__label {
      left: -50px;
      margin: 0 11px;
      top: -30px;
      text-align: center;
    }

    .esri-slider--horizontal .esri-slider__label-input {
      text-align: center;
    }

    .esri-slider--horizontal .esri-slider__max,
    .esri-slider--horizontal .esri-slider__min {
      flex: 0 0 auto;
      margin: auto;
      height: auto;
      width: 50px;
    }

    .esri-slider--horizontal .esri-slider__ticks {
      left: 0;
      margin: 9px 0 0;
      top: 100%;
      width: 100%;
    }

    .esri-slider--horizontal .esri-slider__tick {
      height: 5px;
      width: 1px;
    }

    .esri-slider--horizontal .esri-slider__tick-label {
      margin-top: 18px;
    }

    .esri-slider--vertical {
      flex-direction: column-reverse;
    }

    .esri-slider--vertical .esri-slider__content {
      flex-direction: column;
      width: auto;
    }

    .esri-slider--vertical .esri-slider__track {
      flex: 1 0 0px;
      flex-direction: column;
      height: 100%;
      width: 2px;
    }

    .esri-slider--vertical .esri-slider__segment--interactive:hover {
      cursor: ns-resize;
    }

    .esri-slider--vertical .esri-slider__anchor {
      height: 1px;
      width: 100%;
    }

    .esri-slider--vertical .esri-slider__label {
      left: 20px;
      text-align: left;
      top: -10px;
    }

    .esri-slider--vertical .esri-slider__max,
    .esri-slider--vertical .esri-slider__min {
      margin: auto;
      width: 100%;
    }

    .esri-slider--vertical .esri-slider__max {
      flex: 0 0 22px;
    }

    .esri-slider--vertical .esri-slider__min {
      flex: 0 0 22px;
    }

    .esri-slider--vertical .esri-slider__ticks {
      left: 100%;
      margin: 0 0 0 11px;
      top: 0;
    }

    .esri-slider--vertical .esri-slider__tick {
      height: 1px;
      width: 5px;
    }

    .esri-slider--vertical .esri-slider__tick-label {
      margin-left: 30px;
    }

    .esri-slider__content {
      display: flex;
      flex: 1 0 auto;
      line-height: 0;
      margin: auto;
      position: relative;
      align-items: center;
      justify-content: center;
      z-index: 0;
    }

    .esri-slider__track {
      background-color: rgba(110, 110, 110, 0.4);
      display: inline-block;
      touch-action: none;
      position: relative;
    }

    .esri-slider__segment {
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      touch-action: none;
      transform-origin: 0 0;
      width: 100%;
      will-change: transform;
    }

    .esri-slider__segment:hover {
      cursor: pointer;
    }

    .esri-slider__anchor {
      background-color: #4c4c4c;
      position: absolute;
      touch-action: none;
      -webkit-user-select: none;
      user-select: none;
    }

    .esri-slider__anchor:focus .esri-slider__thumb,
    .esri-slider__anchor:focus .esri-slider__label {
      outline: inherit;
    }

    .esri-slider__anchor--moving .esri-slider__label:hover {
      cursor: grabbing;
    }

    .esri-slider__anchor--moving .esri-slider__label--interactive:hover {
      cursor: grabbing;
    }

    .esri-slider__anchor--moving:focus .esri-slider__thumb {
      border: 3px solid #00598e;
      cursor: grabbing;
    }

    .esri-slider__thumb {
      background-color: #ffffff;
      border: 2px solid #0079c1;
      border-radius: 16px;
      height: 16px;
      left: -7px;
      position: absolute;
      top: -7px;
      touch-action: none;
      width: 16px;
      transition: transform 125ms ease-in-out;
      z-index: 1;
    }

    .esri-slider__thumb:hover {
      transform: scale(1.2);
      border-color: #00598e;
      cursor: grab;
    }

    .esri-slider__label {
      line-height: 22px;
      min-width: 80px;
      position: absolute;
    }

    .esri-slider__label:hover {
      cursor: grab;
    }

    .esri-slider__label--interactive:hover,
    .esri-slider__max--interactive:hover,
    .esri-slider__min--interactive:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    .esri-slider__label-input {
      position: relative;
      width: 100%;
      z-index: 1;
    }

    .esri-slider__extra-content {
      display: inline-block;
    }

    .esri-slider__max,
    .esri-slider__min {
      height: 22px;
      line-height: 22px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .esri-slider__max--interactive:hover,
    .esri-slider__min--interactive:hover {
      background-color: #f3f3f3;
    }

    .esri-slider__range-input {
      padding: 1px 0;
      text-align: center;
      width: 100%;
    }

    .esri-slider__ticks {
      display: inline-block;
      height: 100%;
      position: absolute;
      z-index: 0;
    }

    .esri-slider__tick {
      background: rgba(110, 110, 110, 0.4);
      position: absolute;
    }

    .esri-slider__tick-label {
      position: absolute;
      width: max-content;
    }

    [dir='rtl'] .esri-slider__label,
    [dir='rtl'] .esri-slider__max,
    [dir='rtl'] .esri-slider__min,
    [dir='rtl'] .esri-slider__tick-label {
      direction: rtl;
      unicode-bidi: plaintext;
    }

    @keyframes esri-spinner--start-animation {
      0% {
        opacity: 0;
        transform: scale(0);
      }

      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes esri-spinner--finish-animation {
      0% {
        opacity: 1;
        transform: scale(1);
      }

      100% {
        opacity: 0;
        transform: scale(0);
      }
    }

    @keyframes esri-spinner--rotate-animation {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    .esri-ui .esri-spinner {
      background-color: transparent;
      box-shadow: none;
      padding: 0;
      overflow: visible;
      width: 24px;
      height: 24px;
      position: absolute;
      left: -999em;
      top: -999em;
      z-index: 2;
      pointer-events: none;
      display: none;
      opacity: 0;
      transform-origin: 0 0;
    }

    .esri-ui .esri-spinner::before {
      position: absolute;
      margin: -50% 0 0 -50%;
      width: 100%;
      height: 100%;
      background: url('https://js.arcgis.com/4.19/esri/themes/base/images/Loading_Indicator_double_32.svg')
        no-repeat center;
      display: block;
      content: '';
      animation: esri-spinner--rotate-animation 750ms linear infinite;
    }

    .esri-ui .esri-spinner--start {
      display: block;
      animation: esri-spinner--start-animation 250ms cubic-bezier(0.17, 0.67, 0.36, 0.99) forwards;
    }

    .esri-ui .esri-spinner--finish {
      display: block;
      opacity: 1;
      animation: esri-spinner--finish-animation 125ms ease-in forwards;
      animation-delay: 75ms;
    }

    .esri-swipe {
      width: 100%;
      height: 100%;
      position: absolute;
      overflow: hidden;
      margin: 0;
      padding: 0;
      background: transparent;
      -webkit-user-select: none;
      user-select: none;
    }

    .esri-swipe,
    .esri-ui .esri-swipe {
      pointer-events: none;
    }

    .esri-swipe__container {
      position: absolute;
      margin: 0;
      padding: 0;
      border: 0;
      z-index: 1;
      touch-action: none;
      pointer-events: auto;
      overflow: hidden;
    }

    .esri-swipe--horizontal .esri-swipe__container {
      margin-left: -16px;
      height: 100%;
      cursor: col-resize;
    }

    .esri-swipe--vertical .esri-swipe__container {
      margin-top: -16px;
      width: 100%;
      cursor: row-resize;
    }

    .esri-swipe--disabled .esri-swipe__container {
      pointer-events: none;
      cursor: default;
    }

    .esri-swipe__divider {
      position: absolute;
      background-color: #ffffff;
    }

    .esri-swipe--horizontal .esri-swipe__divider {
      border-left: 1px solid rgba(110, 110, 110, 0.5);
      border-right: 1px solid rgba(110, 110, 110, 0.5);
      width: 4px;
      height: 100%;
      margin-left: -2px;
      top: 0;
      left: 16px;
    }

    .esri-swipe--vertical .esri-swipe__divider {
      border-top: 1px solid rgba(110, 110, 110, 0.5);
      border-bottom: 1px solid rgba(110, 110, 110, 0.5);
      width: 100%;
      height: 4px;
      margin-top: -2px;
      left: 0;
      top: 16px;
    }

    .esri-swipe__handle {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 1px solid rgba(110, 110, 110, 0.5);
      border-radius: 2px;
      background-color: #ffffff;
    }

    .esri-swipe__handle--hidden {
      visibility: hidden;
    }

    .esri-swipe__handle-icon {
      position: relative;
      z-index: 2;
    }

    .esri-swipe--horizontal .esri-swipe__handle {
      top: calc(50% - 16px);
    }

    .esri-swipe--vertical .esri-swipe__handle {
      left: calc(50% - 16px);
    }

    .esri-feature-templates {
      background: #f3f3f3;
    }

    .esri-feature-templates__list-item-icon {
      flex: 0;
      width: 48px;
      min-width: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .esri-feature-templates__list-item-icon > div {
      display: flex;
    }

    .esri-feature-templates__loader {
      margin: 0 auto;
      height: 48px;
      width: 32px;
      background: url(https://js.arcgis.com/4.19/esri/themes/base/images/loading-throb.gif)
        no-repeat center;
    }

    .esri-ui .esri-feature-templates {
      width: 300px;
    }

    .esri-table-list {
      color: #323232;
      background-color: #f3f3f3;
      padding: 6px 7px;
      overflow-y: auto;
      display: flex;
      flex-flow: column;
    }

    .esri-table-list__list {
      list-style: none;
      margin: 0 0 0 15px;
      padding: 0;
    }

    .esri-table-list__list[hidden] {
      display: none;
    }

    .esri-table-list__list--root {
      margin: 0;
    }

    .esri-table-list__item--selectable .esri-table-list__item-container {
      cursor: pointer;
    }

    .esri-table-list__item--selectable .esri-table-list__item-container:hover {
      border-left-color: rgba(110, 110, 110, 0.3);
    }

    .esri-table-list__item[aria-selected='true'] > .esri-table-list__item-container {
      border-left-color: #0079c1;
    }

    .esri-table-list__item[aria-selected='true'] > .esri-table-list__item-container:hover {
      border-left-color: #0079c1;
    }

    .esri-table-list__item-container ~ .esri-table-list__list .esri-table-list__item {
      border-bottom-width: 0;
    }

    .esri-table-list__item {
      background-color: #ffffff;
      border-bottom: 1px solid rgba(110, 110, 110, 0.3);
      position: relative;
      overflow: hidden;
      list-style: none;
      margin: 3px 0;
      padding: 0;
      transition: background-color 125ms ease-in-out;
    }

    .esri-table-list__item.esri-table-list__item--chosen {
      background-color: #e2f1fb;
      opacity: 0.75;
    }

    .esri-table-list__item-container {
      border-left: 3px solid transparent;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 12px 7px 12px 20px;
      transition: border-color 250ms ease-in-out;
    }

    .esri-table-list__item-title {
      flex: 1;
      padding-left: 5px;
      padding-right: 5px;
      line-height: 1.3em;
      word-break: break-word;
      overflow-wrap: break-word;
      transition: color 125ms ease-in-out;
    }

    .esri-table-list__item-error-message {
      display: flex;
      align-items: center;
      visibility: hidden;
      height: 0;
      margin-top: -1px;
      padding: 3px 7px;
      overflow: hidden;
      background-color: rgba(140, 41, 7, 0.1);
      color: #8c2907;
      font-size: 12px;
      transition: transform 250ms ease-in-out;
      transform: scale(1, 0);
      animation: esri-fade-in-down 250ms ease-in-out;
      transform-origin: center top;
    }

    .esri-table-list__item-error-message [class^='esri-icon-'],
    .esri-table-list__item-error-message .esri-building-level-picker__arrow-up,
    .esri-table-list__item-error-message .esri-building-level-picker__arrow-down,
    .esri-table-list__item-error-message .esri-building-phase-picker__arrow-left,
    .esri-table-list__item-error-message .esri-building-phase-picker__arrow-right,
    .esri-table-list__item-error-message [class*='esri-icon-'] {
      margin-right: 0.3rem;
    }

    .esri-table-list__item--error .esri-table-list__item-error-message {
      visibility: visible;
      height: auto;
      transform: scale(1, 1);
    }

    .esri-table-list__item-toggle {
      padding: 0 3px;
      cursor: pointer;
      color: #6e6e6e;
    }

    .esri-table-list__item-actions-menu {
      display: flex;
    }

    .esri-table-list__item-actions-menu-item {
      display: flex;
      flex: 1 0 21px;
      justify-content: center;
      align-items: center;
      color: #6e6e6e;
      cursor: pointer;
      padding: 0 3px;
      transition: border-color 250ms ease-in-out;
    }

    .esri-table-list__item-actions-menu-item:first-of-type {
      margin: 0 2px;
    }

    .esri-table-list__item-actions-menu-item:hover {
      background-color: #f3f3f3;
    }

    .esri-table-list__item-actions-menu-item--active,
    .esri-table-list__item-actions-menu-item--active:hover {
      background-color: #e2f1fb;
    }

    .esri-table-list__item-actions {
      position: relative;
      background-color: #f3f3f3;
      color: #6e6e6e;
      margin: -1px 7px 6px;
      height: auto;
    }

    .esri-table-list__item-actions[aria-expanded='true'] {
      animation: esri-fade-in 250ms ease-in-out;
    }

    .esri-table-list__item-actions-section {
      animation: esri-fade-in 375ms ease-in-out;
    }

    .esri-table-list__item-actions[hidden] {
      display: none;
    }

    .esri-table-list__item-actions-close {
      color: #6e6e6e;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      padding: 5px;
      z-index: 1;
    }

    .esri-table-list__item-actions-list {
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 6px 0;
      list-style: none;
      border-top: 2px solid #ffffff;
    }

    .esri-table-list__item-actions-list:first-of-type {
      border-top: 0;
    }

    .esri-table-list__item-action,
    .esri-table-list__action-toggle {
      border: 1px solid transparent;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      cursor: pointer;
      font-size: 12px;
      width: 100%;
      margin: 0;
      padding: 6px 15px;
      opacity: 1;
      transition:
        opacity 250ms ease-in-out 250ms,
        background-color 250ms ease-in-out;
    }

    .esri-table-list__item-action {
      justify-content: flex-start;
      flex-flow: row;
    }

    .esri-table-list__action-toggle {
      flex-flow: row-reverse;
      justify-content: space-between;
    }

    .esri-table-list__action-toggle .esri-table-list__item-action-title {
      margin-left: 0;
    }

    .esri-table-list__action-toggle .esri-table-list__item-action-icon {
      background-color: #4c4c4c;
      border-radius: 16px;
      box-shadow: 0 0 0 1px #ffffff;
      flex: 0 0 28px;
      height: 16px;
      overflow: hidden;
      padding: 0;
      position: relative;
      transition: background-color 125ms ease-in-out;
      width: 16px;
    }

    .esri-table-list__action-toggle .esri-table-list__item-action-icon::before {
      background-color: #ffffff;
      border-radius: 100%;
      content: '';
      display: block;
      height: 12px;
      left: 0;
      margin: 2px;
      position: absolute;
      top: 0;
      transition:
        background-color 125ms ease-in-out,
        left 125ms ease-in-out;
      width: 12px;
    }

    .esri-table-list__action-toggle--on .esri-table-list__item-action-icon {
      background-color: #ffffff;
    }

    .esri-table-list__action-toggle--on .esri-table-list__item-action-icon::before {
      background-color: #4c4c4c;
      box-shadow: 0 0 0 1px #4c4c4c;
      left: 12px;
    }

    .esri-table-list__item-action:hover,
    .esri-table-list__action-toggle:hover {
      background-color: #f3f3f3;
    }

    .esri-table-list__item-actions[hidden] .esri-table-list__item-action {
      opacity: 0;
    }

    .esri-table-list__item-action-icon {
      flex: 0 0 16px;
      font-size: 16px;
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-top: 0.1em;
    }

    .esri-table-list__item-action-image {
      flex: 0 0 16px;
      width: 16px;
      height: 16px;
      font-size: 14px;
      text-align: center;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }

    .esri-table-list__item-action-title {
      margin-left: 5px;
    }

    .esri-table-list-panel {
      margin: 12px 15px;
    }

    .esri-table-list-panel__content--legend .esri-legend__service {
      padding: 0 0 12px;
    }

    html[dir='rtl'] .esri-table-list .esri-table-list__list {
      margin: 0 15px 0 0;
    }

    html[dir='rtl'] .esri-table-list .esri-table-list__list--root {
      margin: 0;
    }

    html[dir='rtl'] .esri-table-list .esri-table-list__item-action-title {
      margin-left: 0;
      margin-right: 5px;
    }

    html[dir='rtl']
      .esri-table-list
      .esri-table-list__action-toggle
      .esri-table-list__action-toggle {
      margin-right: 0;
    }

    html[dir='rtl'] .esri-table-list .esri-table-list__item::after {
      animation: looping-progresss-bar-ani 1500ms linear infinite reverse;
    }

    html[dir='rtl'] .esri-table-list .esri-table-list__item-error-message [class^='esri-icon-'],
    html[dir='rtl']
      .esri-table-list
      .esri-table-list__item-error-message
      .esri-building-level-picker__arrow-up,
    html[dir='rtl']
      .esri-table-list
      .esri-table-list__item-error-message
      .esri-building-level-picker__arrow-down,
    html[dir='rtl']
      .esri-table-list
      .esri-table-list__item-error-message
      .esri-building-phase-picker__arrow-left,
    html[dir='rtl']
      .esri-table-list
      .esri-table-list__item-error-message
      .esri-building-phase-picker__arrow-right,
    html[dir='rtl'] .esri-table-list .esri-table-list__item-error-message [class*='esri-icon-'] {
      margin-right: 0;
      margin-left: 0.3rem;
    }

    .esri-time-picker {
      display: inline-block;
      border: 1px solid rgba(110, 110, 110, 0.3);
      padding: 0 0.5em;
    }

    .esri-time-picker__input {
      border: none;
    }

    .esri-time-slider {
      cursor: default;
      min-width: 375px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .esri-time-slider__layout--wide .esri-time-slider__row {
      display: flex;
      height: 88px;
      overflow: hidden;
    }

    .esri-time-slider__layout--wide .esri-time-slider__animation {
      width: 64px;
    }

    .esri-time-slider__layout--wide .esri-time-slider__time-extent {
      align-items: center;
      border-left: 1px solid rgba(110, 110, 110, 0.3);
      border-right: 1px solid rgba(110, 110, 110, 0.3);
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      width: 110px;
    }

    .esri-time-slider__layout--wide .esri-time-slider__min,
    .esri-time-slider__layout--wide .esri-time-slider__max {
      width: 110px;
    }

    .esri-time-slider__layout--wide .esri-time-slider__max {
      border-right: 1px solid rgba(110, 110, 110, 0.3);
    }

    .esri-time-slider__layout--wide .esri-time-slider__slider {
      flex: auto;
    }

    .esri-time-slider__layout--wide .esri-time-slider__previous,
    .esri-time-slider__layout--wide .esri-time-slider__next {
      width: 42px;
    }

    .esri-time-slider__layout--compact .esri-time-slider__row {
      display: flex;
    }

    .esri-time-slider__layout--compact .esri-time-slider__row:nth-child(1),
    .esri-time-slider__layout--compact .esri-time-slider__row:nth-child(3) {
      padding-bottom: 6px;
      padding-top: 6px;
    }

    .esri-time-slider__layout--compact .esri-time-slider__row:nth-child(2) {
      height: 88px;
      overflow: hidden;
    }

    .esri-time-slider__layout--compact .esri-time-slider__animation {
      width: 35px;
    }

    .esri-time-slider__layout--compact .esri-time-slider__time-extent {
      align-items: center;
      display: flex;
      flex: auto;
      flex-flow: row nowrap;
      justify-content: center;
    }

    .esri-time-slider__layout--compact .esri-time-slider__time-extent-separator {
      margin: 0 15px;
    }

    .esri-time-slider__layout--compact .esri-time-slider__slider {
      flex: auto;
    }

    .esri-time-slider__layout--compact .esri-time-slider__min,
    .esri-time-slider__layout--compact .esri-time-slider__max {
      flex: auto;
      margin: 0 35px;
    }

    .esri-time-slider__layout--compact .esri-time-slider__min {
      align-items: flex-start;
    }

    .esri-time-slider__layout--compact .esri-time-slider__max {
      align-items: flex-end;
    }

    .esri-time-slider__layout--compact .esri-time-slider__previous,
    .esri-time-slider__layout--compact .esri-time-slider__next {
      width: 35px;
    }

    .esri-time-slider__mode--instant .esri-slider__segment-0,
    .esri-time-slider__mode--instant .esri-slider__segment-1 {
      background-color: rgba(110, 110, 110, 0.4);
    }

    .esri-time-slider__mode--time-window .esri-slider__segment-1 {
      background-color: #0079c1;
      height: 6px;
      margin-top: -1px;
    }

    .esri-time-slider__mode--time-window .esri-slider__segment-0,
    .esri-time-slider__mode--time-window .esri-slider__segment-2 {
      background-color: rgba(110, 110, 110, 0.4);
    }

    .esri-time-slider__mode--cumulative-from-start .esri-slider__segment-0 {
      background-color: #0079c1;
      height: 6px;
      margin-top: -1px;
    }

    .esri-time-slider__mode--cumulative-from-start .esri-slider__segment-1 {
      background-color: rgba(110, 110, 110, 0.4);
    }

    .esri-time-slider__mode--cumulative-from-end .esri-slider__segment-0 {
      background-color: rgba(110, 110, 110, 0.4);
    }

    .esri-time-slider__mode--cumulative-from-end .esri-slider__segment-1 {
      background-color: #0079c1;
      height: 6px;
      margin-top: -1px;
    }

    .esri-time-slider__animation-button {
      border: none;
      height: 100%;
      width: 100%;
    }

    .esri-time-slider__animation-button .esri-icon-play,
    .esri-time-slider__animation-button .esri-icon-pause {
      font-size: 24px;
    }

    .esri-time-slider__time-extent {
      font-size: 12px;
      line-height: 12px;
    }

    .esri-time-slider__time-extent-group {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
    }

    .esri-time-slider__time-extent-date {
      font-weight: 600;
      color: #0079c1;
    }

    .esri-time-slider__time-extent-time {
      color: #0079c1;
    }

    .esri-time-slider__time-extent-separator {
      font-size: 16px;
      font-weight: 600;
      line-height: 16px;
    }

    .esri-time-slider__min,
    .esri-time-slider__max {
      align-items: center;
      display: flex;
      flex-flow: column nowrap;
      font-size: 12px;
      justify-content: center;
      line-height: 12px;
    }

    .esri-time-slider__min-date,
    .esri-time-slider__max-date {
      font-weight: 600;
    }

    .esri-time-slider__slider {
      background-color: #f3f3f3;
      padding: 0 40px;
    }

    .esri-time-slider__slider .esri-slider {
      margin-top: -19px;
      background-color: #f3f3f3;
    }

    .esri-time-slider__slider .esri-slider__content {
      height: 2px;
    }

    .esri-time-slider__slider .esri-slider__thumb {
      border-width: 3px;
      top: -6px;
    }

    .esri-time-slider__slider .esri-slider__tick-label {
      font-size: 12px;
      margin-top: 23px;
      white-space: nowrap;
    }

    .esri-time-slider__slider .esri-slider__tick {
      background: rgba(110, 110, 110, 0.4);
      width: 1px;
    }

    .esri-time-slider__slider .esri-slider__tick.minorTick {
      height: 4px;
    }

    .esri-time-slider__slider .esri-slider__tick.majorTick {
      height: 8px;
    }

    .esri-time-slider__slider .esri-slider__ticks {
      margin: 16px 0 0;
    }

    .esri-time-slider__slider .esri-slider__track {
      height: 4px;
    }

    .esri-time-slider__previous-button,
    .esri-time-slider__next-button {
      border: none;
      height: 100%;
      width: 100%;
    }

    .esri-time-slider__previous-button .esri-icon-reverse,
    .esri-time-slider__previous-button .esri-icon-forward,
    .esri-time-slider__next-button .esri-icon-reverse,
    .esri-time-slider__next-button .esri-icon-forward {
      font-size: 24px;
    }

    html[dir='rtl'] .esri-time-slider__layout--wide .esri-time-slider__row {
      flex-direction: row-reverse;
    }

    html[dir='rtl'] .esri-time-slider__layout--compact .esri-time-slider__row:nth-child(3) {
      flex-direction: row-reverse;
    }

    html[dir='rtl'] .esri-time-slider__layout--compact .esri-time-slider__min {
      align-items: flex-end;
    }

    html[dir='rtl'] .esri-time-slider__layout--compact .esri-time-slider__max {
      align-items: flex-start;
    }

    .esri-zoom {
      display: flex;
      flex-flow: column nowrap;
    }

    .esri-zoom.esri-zoom--horizontal {
      flex-flow: row-reverse nowrap;
    }

    .esri-zoom.esri-zoom--horizontal .esri-widget--button:last-child {
      border-top: none;
    }

    .esri-zoom.esri-zoom--horizontal .esri-widget--button:first-child {
      border-left: solid 1px rgba(110, 110, 110, 0.3);
    }

    .esri-zoom .esri-widget--button {
      box-shadow: none;
    }

    .esri-zoom .esri-widget--button:first-child {
      margin-bottom: 0;
    }

    .esri-zoom .esri-widget--button:last-child {
      border-top: solid 1px rgba(110, 110, 110, 0.3);
    }

    html[dir='rtl'] .esri-zoom.esri-zoom--horizontal .esri-widget--button:first-child {
      border-top: none;
    }

    html[dir='rtl'] .esri-zoom.esri-zoom--horizontal .esri-widget--button:last-child {
      border-left: solid 1px rgba(110, 110, 110, 0.3);
    }

    @keyframes esri-fade-in-down {
      0% {
        opacity: 0;
        transform: translate3d(0, -5px, 0);
      }

      25% {
        opacity: 0;
        transform: translate3d(0, -5px, 0);
      }

      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes esri-fade-in-up {
      0% {
        opacity: 0;
        transform: translate3d(0, 5px, 0);
      }

      25% {
        opacity: 0;
        transform: translate3d(0, 5px, 0);
      }

      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes esri-fade-in {
      0% {
        opacity: 0;
      }

      25% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    @keyframes esri-fade-in-scale {
      0% {
        opacity: 0;
        transform: scale3d(0.95, 0.95, 1);
      }

      100% {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    }

    @keyframes looping-progresss-bar-ani {
      0% {
        left: 0%;
        width: 0%;
      }

      20% {
        left: 0%;
        width: 20%;
      }

      80% {
        left: 80%;
        width: 20%;
      }

      100% {
        left: 100%;
        width: 0%;
      }
    }

    @keyframes esri-rotate {
      0% {
        transform: rotate(0);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes panel-advance {
      0% {
        opacity: 0;
        transform: translate3d(50px, 0, 0) scale(0.99);
      }

      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
      }
    }

    @keyframes panel-retreat {
      0% {
        opacity: 0;
        transform: translate3d(-50px, 0, 0) scale(0.99);
      }

      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
      }
    }

    @keyframes panel-advance--rtl {
      0% {
        opacity: 0;
        transform: translate3d(-50px, 0, 0) scale(0.99);
      }

      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
      }
    }

    @keyframes panel-retreat--rtl {
      0% {
        opacity: 0;
        transform: translate3d(50px, 0, 0) scale(0.99);
      }

      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
      }
    }
  `;
});
