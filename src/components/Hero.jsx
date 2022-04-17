import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import coverImage from '../images/BookieBook_image1.png'
  export default function SplitScreen() {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={3} w={'full'} maxW={'xl'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} textAlign={'left'} letterSpacing={'normal'}>
              <Text
                as={'span'}
                position={'relative'}
               >
                Welcome to BookieBook
              </Text>
              <br />{' '}
              <Text color={'green.600'} as={'span'} fontSize={'3xl'}>
              Smartest online e-bookstore in Hong Kong
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'} textAlign={'left'}>
            BookieBook is a online shopping platform that allows customers to purchase e-books in different interests. We also allow customers to sell their writtings without any service fee. Anyone could upload their writtings and become a author in our store. We are looking forward to work with the best authors in Hong Kong!
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',   
                }}>
               Go!
              </Button>
              <Button rounded={'full'}>How It Works</Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} align={'center'} justifyContent={{sm: 'center'}}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            boxSize={{sm: '400px' ,md: '300px' , lg: '500px'}}
            align={'center'}
            justifyContent={'center'}
            src={
              coverImage
            }
          />
        </Flex>
      </Stack>
    );
  }