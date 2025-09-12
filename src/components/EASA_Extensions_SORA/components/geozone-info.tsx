import React from 'react';
import type { FieldConfig } from '../config/geozone-fields';

interface GeozoneInfoProps {
  attributes: any | null;
  fields: FieldConfig[];
}

const GeozoneInfo: React.FC<GeozoneInfoProps> = ({ attributes, fields }) => {
  if (!attributes) return null;

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

  const labelStyle: React.CSSProperties = {
    paddingRight: '8px',
  };

  const containerStyle: React.CSSProperties = {
    fontSize: '12px',
    lineHeight: 1.5,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flexGrow: 1,
  };

  const renderField = (label: string, value: any, isLink = false) => {
    if (!value) return null;

    return (
      <div style={rowStyle}>
        <div style={labelStyle}>{label}:</div>
        <div>
          {isLink ? (
            <a href={value} target='_blank' rel='noopener noreferrer'>
              Link
            </a>
          ) : (
            value
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', fontSize: '1.5rem' }}>
      <div style={containerStyle}>
        {fields.map((field) =>
          renderField(field.label, attributes[field.name], field.isLink),
        )}
      </div>
    </div>
  );
};

export default GeozoneInfo;
