/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { Text, FieldValueList, Button, DateTimeDisplay, useTheme } from '@pega/cosmos-react-core';
import PegaExtensionsEasaExtensionsCard from './index';
import {
  pyReviewRaw,
  pyReviewResolved,
  regionChildrenResolved,
  operatorDetails,
  configProps
} from './mock';
import StatusWorkRenderer from './StatusWork';
import Operator from './Operator';

const meta: Meta<typeof PegaExtensionsEasaExtensionsCard> = {
  title: 'PegaExtensionsEasaExtensionsCard',
  component: PegaExtensionsEasaExtensionsCard,
  excludeStories: /.*Data$/,
  parameters: {
    type: 'Details'
  }
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsEasaExtensionsCard>;

if (!window.PCore) {
  window.PCore = {};
}

window.PCore.getLocaleUtils = () => {
  return {
    getLocaleValue: value => {
      return value;
    }
  };
};

window.PCore.getUserApi = () => {
  return {
    getOperatorDetails: () => {
      return new Promise(resolve => {
        resolve(operatorDetails);
      });
    }
  };
};

const Region = props => {
  return <></>;
};

const renderField = resolvedProps => {
  const {
    displayAsStatus = false,
    displayMode,
    value = '',
    label = '',
    key,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    theme = useTheme()
  } = resolvedProps;

  const variant = displayMode === 'LABELS_LEFT' ? 'inline' : 'stacked';

  let val =
    value !== '' ? (
      <Text variant='h1' as='span' key={key}>
        {value}
      </Text>
    ) : (
      ''
    );

  if (label === 'Create date/time')
    val = (
      <DateTimeDisplay
        value={value}
        variant='datetime'
        format='long'
        clockFormat={null}
        key={key}
      />
    );

  if (displayAsStatus === true) val = <StatusWorkRenderer value={value} key={key} />;

  const [_label] =
    label === 'Create operator'
      ? [configProps.createLabel, configProps.createOperator, configProps.createDateTime]
      : label === 'Update operator'
        ? [configProps.updateLabel, configProps.updateOperator, configProps.updateDateTime]
        : [configProps.resolveLabel, configProps.resolveOperator, configProps.resolveDateTime];

  if (label === 'Create Operator')
    val = (
      <Operator
        label={configProps.hideLabel ? '' : _label}
        name={configProps.createOperator.userName}
        id={configProps.createOperator.userId}
        value={undefined}
        validatemessage=''
        hideLabel={false}
        readOnly={false}
        required={false}
        disabled={false}
        externalUser={undefined}
        metaObj={undefined}
        testId=''
        helperText=''
      />
    );

  if (variant === 'inline') {
    val = value || (
      <span aria-hidden='true' key={key}>
        &ndash;&ndash;
      </span>
    );
  } else {
    val = (
      <Text variant='h1' as='span' key={key}>
        {val}
      </Text>
    );
  }
  return <FieldValueList variant={variant} fields={[{ name: label, value: val }]} key={key} />;
};

export const BasePegaExtensionsEasaExtensionsCard: Story = args => {
  const props = {
    getPConnect: () => {
      return {
        getChildren: () => {
          return pyReviewRaw.children;
        },
        getRawMetadata: () => {
          return pyReviewRaw;
        },
        getContextName: () => {
          return 'app/primary_1';
        },
        getInheritedProps: () => {
          return pyReviewRaw.config.inheritedProps;
        },
        createComponent: config => {
          // eslint-disable-next-line default-case
          switch (config.config.value) {
            case '@P .pyStatusWork':
              return renderField(pyReviewResolved.highlightedData[0].config);
            case '@P .pyID':
              return renderField(pyReviewResolved.highlightedData[1].config);
            case '@P .pxCreateDateTime':
              return renderField(pyReviewResolved.highlightedData[2].config);
            case '@USER .pxCreateOperator':
              return renderField(pyReviewResolved.highlightedData[3].config);
            case '@P .pySLADeadline':
              return renderField(regionChildrenResolved[0]);
            case '@P .pySLAGoal':
              return renderField(regionChildrenResolved[1]);
            case '@P .pySLAStartTime':
              return renderField(regionChildrenResolved[2]);
          }
        },
        setInheritedProp: () => {
          /* nothing */
        },
        resolveConfigProps: config => {
          return config;
        }
      };
    }
  };

  return (
    <>
      <PegaExtensionsEasaExtensionsCard {...props} {...args}>
        <Region
          {...{
            getPConnect: () => ({
              setInheritedProp: () => {},
              getChildren: () =>
                pyReviewRaw.children[0].children.map((child, index) => {
                  return {
                    getPConnect: () => ({
                      getRawMetadata: () => pyReviewRaw.children[0].children[index],
                      getConfigProps: () => {},
                      resolveConfigProps: () => regionChildrenResolved[index],
                      getComponent: config =>
                        props.getPConnect().createComponent(pyReviewRaw.children[0].children[index])
                    })
                  };
                })
            })
          }}
        />
      </PegaExtensionsEasaExtensionsCard>
    </>
  );
};

BasePegaExtensionsEasaExtensionsCard.args = {
  showLabel: true,
  label: 'Details template',
  showHighlightedData: true,
  showDomainIconData: true
};
