import * as React from 'react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

type LocalProps = {
  familyIds: string[];
  familyId: string;
  setFamilyId: (v: string) => void;
};

const FamilyPicker = ({ familyIds, familyId, setFamilyId }: LocalProps) => {
  return (
    <RadioGroup colorScheme="green" onChange={setFamilyId} value={familyId}>
      <Stack spacing={[1, 5]} direction={['column', 'row']}>
        {familyIds.map((fId) => {
          return (
            <Radio key={fId} value={fId}>
              {fId}
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export default FamilyPicker;
