import { useEffect, useState } from 'react';
import {
  EmailDisplay,
  PhoneDisplay,
  URLDisplay,
  withConfiguration,
  Status,
  StyledLabel
} from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';

import StatusWorkRenderer from './StatusWork';

import StyledPegaExtensionsElevanceFieldStatusWrapper from './styles';

// interface for props
interface PegaExtensionsElevanceFieldStatusProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  displayAsStatus?: boolean;
  hasSuggestions?: boolean;
  variant?: any;
  propVariant?: any;
}

export const formatExists = (formatterVal: string) => {
  const formatterValues = [
    'TextInput',
    'WorkStatus',
    'RichText',
    'Email',
    'Phone',
    'URL',
    'Operator'
  ];
  let isformatter = false;
  if (formatterValues.includes(formatterVal)) {
    isformatter = true;
  }
  return isformatter;
};

export const textFormatter = (formatter: string, value: string) => {
  let displayComponent: any = null;
  switch (formatter) {
    case 'TextInput': {
      displayComponent = value;
      break;
    }
    case 'Email': {
      displayComponent = <EmailDisplay value={value} displayText={value} variant='link' />;
      break;
    }
    case 'Phone': {
      displayComponent = <PhoneDisplay value={value} variant='link' />;
      break;
    }
    case 'URL': {
      displayComponent = (
        <URLDisplay target='_blank' value={value} displayText={value} variant='link' />
      );
      break;
    }
    // no default
  }
  return displayComponent;
};

// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function PegaExtensionsElevanceFieldStatus(props: PegaExtensionsElevanceFieldStatusProps) {
  const {
    /* getPConnect, */
    validatemessage,
    label,
    propVariant,
    displayAsStatus,
    variant,
    hasSuggestions = false
  } = props;

  let { value, readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    prop => prop === true || (typeof prop === 'string' && prop === 'true')
  );

  const [status, setStatus] = useState(hasSuggestions ? 'pending' : undefined);

  // cast status
  let myStatus: 'success' | 'warning' | 'error' | 'pending';
  // eslint-disable-next-line prefer-const
  myStatus = status as 'success' | 'warning' | 'error' | 'pending';

  useEffect(() => {
    if (validatemessage !== '') {
      setStatus('error');
    }
    if (hasSuggestions) {
      setStatus('pending');
    } else if (!hasSuggestions && myStatus !== 'success') {
      setStatus(validatemessage !== '' ? 'error' : undefined);
    }
  }, [validatemessage, hasSuggestions, myStatus]);

  // Override the value to render as status work when prop passed to display as status
  if (displayAsStatus) {
    value = StatusWorkRenderer({ value });
  }

  if (propVariant && propVariant !== '') {
    return (
      <StyledPegaExtensionsElevanceFieldStatusWrapper>
        <div>
          <StyledLabel>{label}</StyledLabel>
        </div>
        <div>
          <Status variant={propVariant}>{value}</Status>
        </div>
      </StyledPegaExtensionsElevanceFieldStatusWrapper>
    );
  }
  return (
    <StyledPegaExtensionsElevanceFieldStatusWrapper>
      <div>
        <StyledLabel>{label}</StyledLabel>
      </div>
      <div>
        <Status variant={variant}>{value}</Status>
      </div>
    </StyledPegaExtensionsElevanceFieldStatusWrapper>
  );
}

export default withConfiguration(PegaExtensionsElevanceFieldStatus);
