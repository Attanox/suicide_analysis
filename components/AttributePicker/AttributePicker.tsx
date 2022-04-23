import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import React from 'react';
import type { Attributes, K } from '../../types';
import { getDisplayAttributes } from '../../utils/mapping';

type LocalProps = {
  attributes: Attributes;
  selectedAttribute: Array<K | ''>;
  setAttribute: (a: Array<K | ''>) => void;
};

const AttributePicker = ({
  attributes,
  setAttribute,
  selectedAttribute,
}: LocalProps) => {
  const displayAttributes = getDisplayAttributes(attributes);

  return (
    <CheckboxGroup
      colorScheme="blue"
      onChange={(v) => setAttribute(v as Array<K | ''>)}
      value={selectedAttribute}
    >
      <Stack
        style={{ minWidth: '200px' }}
        spacing={[1, 5]}
        direction={['column']}
      >
        {displayAttributes.map((a) => {
          return (
            <Checkbox key={a} value={a}>
              {a}
            </Checkbox>
          );
        })}
      </Stack>
    </CheckboxGroup>
  );
};

export default AttributePicker;
