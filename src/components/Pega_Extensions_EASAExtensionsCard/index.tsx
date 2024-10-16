import { Fragment, Children, type ReactElement } from 'react';
import {
  Grid,
  Flex,
  FieldGroup,
  withConfiguration,
  type GridContainerProps
} from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import DetailsRender from './DetailsRender';
import HighlightRender from './HighlightRender';
import ImageContainer from './ImageContainer';

import {
  StyledPegaExtensionsEasaExtensionsCardWrapper,
  StyledDetailsGridContainer,
  StyledHighlightedFieldsHrLine,
  StyledGridItem,
  StyledGridContainer
} from './styles';

// includes in bundle
import { getAllFields } from './utils';

// interface for props
interface PegaExtensionsEasaExtensionsCardProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  showLabel: boolean;
  showHighlightedData: boolean;
  showDomainIconData: boolean;
  children: any;
}

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function PegaExtensionsEasaExtensionsCard(props: PegaExtensionsEasaExtensionsCardProps) {
  const {
    getPConnect,
    label,
    showLabel = true,
    showHighlightedData = false,
    showDomainIconData = true
  } = props;
  const propsToUse = { label, showLabel, ...getPConnect().getInheritedProps() };

  // storybook doesn't get children of 1 as an array of 1
  let { children } = props;
  if (!Array.isArray(children)) {
    children = Children.toArray(children);
  }

  // update children with readonly
  Children.toArray(children).forEach(child => {
    // @ts-ignore
    child.props.getPConnect().setInheritedProp('readOnly', true);
    // @ts-ignore
    child.props.getPConnect().setInheritedProp('displayMode', 'DISPLAY_ONLY');
  });

  const numRegions = getAllFields(getPConnect)?.length;
  const gridRepeat = 'repeat('.concat(numRegions).concat(', 1fr)');

  const gridContainer: GridContainerProps = { colGap: 6 };
  gridContainer.cols = gridRepeat;
  gridContainer.alignItems = 'start';

  // Set up highlighted data to pass in return if is set to show, need raw metadata to pass to createComponent
  let highlightedDataArr = [];
  if (showHighlightedData) {
    // @ts-ignore
    const { highlightedData = [] } = getPConnect().getRawMetadata().config;
    // @ts-ignore
    highlightedDataArr = highlightedData.map(field => {
      return <HighlightRender field={field} getPConnect={props.getPConnect} />;
    });
  }

  // Set up Domain Icon data to pass in return if is set to show, need raw metadata to pass to createComponent
  let DomainIconDataArr = [];
  if (showDomainIconData) {
    // @ts-ignore
    const { DomainIconData = [] } = getPConnect().getRawMetadata().config;
    // @ts-ignore
    DomainIconDataArr = DomainIconData.map(field => {
      return <ImageContainer field={field} getPConnect={props.getPConnect} />;
    });
  }

  return (
    <StyledPegaExtensionsEasaExtensionsCardWrapper>
      <FieldGroup name={propsToUse.showLabel ? propsToUse.label : ''}>
        <Grid
          container={{
            cols: '70px 1fr',
            rows: 'auto',
            areas: '"sidebar main"'
          }}
          as={StyledGridContainer}
          height={20}
        >
          <Grid item={{ area: 'sidebar' }} as={StyledGridItem}>
            {showDomainIconData && DomainIconDataArr.length > 0 && (
              <Flex
                // @ts-ignore
                container={{ direction: 'row', alignItems: 'normal', colGap: 10 }}
                data-testid={`highlighted-column-count-${numRegions}`}
              >
                {DomainIconDataArr.map((child: ReactElement, i: number) => (
                  <Fragment key={`hf-${i + 1}`}>{child}</Fragment>
                ))}
              </Flex>
            )}
          </Grid>
          <Grid item={{ area: 'main' }} as={StyledGridItem}>
            {showHighlightedData && highlightedDataArr.length > 0 && (
              <>
                <Flex
                  // @ts-ignore
                  container={{ direction: 'row', alignItems: 'normal', colGap: 10 }}
                  data-testid={`highlighted-column-count-${numRegions}`}
                >
                  {highlightedDataArr.map((child: ReactElement, i: number) => (
                    <Fragment key={`hf-${i + 1}`}>{child}</Fragment>
                  ))}
                </Flex>
                <StyledHighlightedFieldsHrLine />
              </>
            )}
            <Grid
              as={StyledDetailsGridContainer}
              container={gridContainer}
              data-testid={`column-count-${numRegions}`}
            >
              {children.map((child: ReactElement, i: number) => (
                <Flex
                  // @ts-ignore
                  container={{ direction: 'column', alignItems: 'normal', colGap: 1, rowGap: 1.5 }}
                  key={`r-${i + 1}`}
                >
                  <DetailsRender child={child} />
                </Flex>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </FieldGroup>
    </StyledPegaExtensionsEasaExtensionsCardWrapper>
  );
}

export default withConfiguration(PegaExtensionsEasaExtensionsCard);
