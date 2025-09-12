import React from 'react';
import {
  Card,
  CardContent,
  Text,
  FieldValueList,
  useTheme,
} from '@pega/cosmos-react-core';
import type { FieldConfig } from '../config/geozone-fields';

interface GeozoneInfoProps {
  attributes: any | null;
  fields: FieldConfig[];
}

const GeozoneInfo: React.FC<GeozoneInfoProps> = ({ attributes, fields }) => {
  const theme = useTheme();

  if (!attributes) return null;

  // Convert fields to FieldValueList format
  const fieldValues = fields
    .filter((field) => attributes[field.name]) // Only include fields with values
    .map((field) => ({
      name: field.label,
      value: field.isLink ? (
        <a
          href={attributes[field.name]}
          target='_blank'
          rel='noopener noreferrer'
          style={{
            color: theme.base.palette['brand-primary'],
            textDecoration: 'none',
          }}
        >
          Link
        </a>
      ) : (
        <Text
          variant='secondary'
          style={{
            maxWidth: '200px',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            lineHeight: 1.4,
          }}
        >
          {attributes[field.name]}
        </Text>
      ),
    }));

  return (
    <Card style={{ minWidth: '300px', maxWidth: '400px' }}>
      <CardContent>
        <FieldValueList
          fields={fieldValues}
          variant='inline'
          style={{
            gap: '8px',
            maxHeight: '300px',
            overflowY: 'auto',
            paddingRight: '4px',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default GeozoneInfo;
