import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ProductCards from '../components/ProductCards';
import { SearchIcon } from '@chakra-ui/icons';

export const Product = () => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'space-between'}
    >
      <Box
        bg={useColorModeValue('yellow.50', 'gray.800')}
        minH={'150vh'}
        border='1px'
        w={'60vh'}
        borderColor='black'
        borderRadius='md'
        borderLeft='0px'
      >
        <Stack>
          <Flex justify="center" padding="1em" align="center" columnGap="1em">
            <Input background='white' placeholder='Search Anything' />
            <SearchIcon />
          </Flex>
        </Stack>
      </Box>
      <Box
        pl={'2em'}
      >
        <Flex
          wrap='wrap'
          rowGap='1em'
          columnGap='2em'
          justify='flex-start'
        >
            <ProductCards />
            <ProductCards />
            <ProductCards />
            <ProductCards />
            <ProductCards />
            <ProductCards />
        </Flex>
      </Box>
    </Flex>
  )
}
