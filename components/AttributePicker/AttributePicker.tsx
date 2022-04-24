import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import React from 'react';
import type { Attributes, K } from '../../types';
import { getColor, getDisplayAttributes } from '../../utils/mapping';

type LocalProps = {
  attributes: Attributes;
  selectedAttributes: Array<K | ''>;
  setAttribute: (a: Array<K | ''>) => void;
};

const AttributePicker = ({
  attributes,
  setAttribute,
  selectedAttributes,
}: LocalProps) => {
  const displayAttributes = getDisplayAttributes(attributes);

  return (
    <CheckboxGroup
      colorScheme="blue"
      onChange={(v) => setAttribute(v as Array<K | ''>)}
      value={selectedAttributes}
    >
      <Stack
        style={{
          width: '200px',
          marginLeft: 'auto',
          // boxSizing: 'content-box',
          // paddingLeft: '50px',
        }}
        spacing={[1, 5]}
        direction={['column']}
      >
        {displayAttributes.map((a) => {
          return (
            <Checkbox
              letterSpacing={1}
              fontWeight={700}
              color={getColor(a)}
              key={a}
              value={a}
            >
              {a}
            </Checkbox>
          );
        })}
      </Stack>
    </CheckboxGroup>
  );
};

export default AttributePicker;
