import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
} from '@chakra-ui/react';
  
// const IMAGE = 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';
  
export default function ProductCards({genre, name, image, price, rating}) {
return (
    <Center py={12}>
        <Box
            role={'group'}
            p={6}
            maxW={'250px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'lg'}
            height={'350px'}
            pos={'relative'}
            zIndex={1}>
            <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'200px'}
            _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 5,
                left: 0,
                backgroundImage: `url(${image}})`,
                filter: 'blur(15px)',
                zIndex: -1,
            }}
            _groupHover={{
                _after: {
                filter: 'blur(20px)',
                },
            }}>
                <Image
                    rounded={'lg'}
                    height={230}
                    width={282}
                    objectFit={'cover'}
                    src={image}
                />
            </Box>
            <Stack pt={10} align={'center'}>
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                    {genre}
                </Text>
                <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} overflow="hidden">
                    {name.length > 15 ? name.slice(0,15)+".." : name}
                </Heading>
                <Stack direction={'row'} align={'center'}>
                    <Text fontWeight={800} fontSize={'xl'}>
                    ${price}
                    </Text>
                </Stack>
            </Stack>
        </Box>
    </Center>
);
}