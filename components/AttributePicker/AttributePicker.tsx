import {
  Checkbox,
  CheckboxGroup,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { LegacyRef } from 'react';
import type { Attributes, K } from '../../types';
import { getColor, getDisplayAttributes } from '../../utils/mapping';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const displayAttributes = getDisplayAttributes(attributes);

  return (
    <React.Fragment>
      <IconButton
        ref={btnRef}
        aria-label="Search database"
        position="fixed"
        bottom="1rem"
        right="1rem"
        colorScheme="blue"
        isRound={true}
        size="md"
        icon={<SettingsIcon fontSize="20px" />}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Set new attributes</DrawerHeader>

          <DrawerBody>
            <CheckboxGroup
              colorScheme="blue"
              onChange={(v) => setAttribute(v as Array<K | ''>)}
              value={selectedAttributes}
            >
              <Stack
                style={{
                  boxSizing: 'content-box',
                }}
                minWidth="240px"
                marginLeft="auto"
                paddingLeft="5"
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default AttributePicker;
