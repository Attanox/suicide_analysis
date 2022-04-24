import * as React from 'react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { getTotal } from '../../utils/mapping';

type LocalProps = {
  familyIds: string[];
  familyId: string;
  setFamilyId: (v: string) => void;
};

const FamilyPicker = ({ familyIds, familyId, setFamilyId }: LocalProps) => {
  return (
    <RadioGroup
      position="sticky"
      top="0"
      width="100%"
      backgroundColor={'blue.700'}
      color={'white'}
      colorScheme="whiteAlpha"
      borderRadius={'0 0 10px 10px'}
      paddingTop="3"
      paddingBottom="3"
      paddingLeft="2"
      paddingRight="2"
      zIndex={'sticky'}
      onChange={setFamilyId}
      value={familyId}
    >
      <Stack
        spacing={[1, 5]}
        justifyContent="center"
        direction={['column', 'row']}
      >
        {familyIds.map((fId, idx) => {
          return (
            <Radio size="sm" key={fId} value={fId}>
              Family {fId} ({getTotal(fId)})
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export default FamilyPicker;
