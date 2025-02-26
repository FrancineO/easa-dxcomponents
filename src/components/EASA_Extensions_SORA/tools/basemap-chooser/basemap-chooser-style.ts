import styled, { css } from 'styled-components';

export default styled.div(({ theme }) => {
  return css`
    .basemap-chooser {
      justify-content: center;
      position: absolute;
      right: 2rem;
      bottom: 0.5rem;
    }

    .basemap-chooser .basemap-choice {
      transition: cubic-bezier(0.19, 1, 0.22, 1) 0.5s;
      position: absolute;
      background: transparent;
      width: 3rem;
      height: 3rem;
    }

    .basemap-chooser .basemap-choice .img-box {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      padding: 0;
      border: 0.2rem solid ${theme.base.palette['brand-secondary']};
    }

    .basemap-chooser .basemap-choice .img-box:hover {
      border: 0.2rem solid ${theme.base.palette['brand-primary']};
    }

    .basemap-chooser .basemap-choice .img-box > img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: none;
    }

    .basemap-chooser .slider {
      width: 5rem;
    }
  `;
});
