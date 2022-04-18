import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import React from 'react';
import type { K } from '../../types';

type LocalProps = { attributes: K[]; setAttribute: (a: Array<K | ''>) => void };

const AttributePicker = ({ attributes, setAttribute }: LocalProps) => {
  return (
    <CheckboxGroup
      colorScheme="green"
      onChange={(v) => setAttribute(v as Array<K | ''>)}
    >
      <Stack spacing={[1, 5]} direction={['column']}>
        {attributes.map((a) => {
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
