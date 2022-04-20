import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
  } from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import axios from 'axios';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseURL } from '../baseUrl';
import { Link } from 'react-router-dom';
export default function ProductDetail() {
    const [isReady, setReady] = useState(false);
    const [books, setBooks] = useState();
    const { id } = useParams();
    useEffect(async () => {

        let book = await axios.get(`${baseURL}/api/books/${id}`)
        console.log(book);
        if(book.status == 200){
             
            setBooks(book.data);
            setReady(true)
        }
    }, [])

    if(!isReady) return 'LOADING....';
return (
   
    <Container maxW={'7xl'}>
        <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}>
            <Flex>
                <Image
                    rounded={'md'}
                    alt={'product image'}
                    src={
                    books.image
                    }
                    fit={'cover'}
                    align={'center'}
                    w={'100%'}
                    h={{ base: '100%', sm: '400px', lg: '500px' }}
                />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
                <Box as={'header'}>
                    <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                    {books.name}
                    </Heading>
                    <Text
                    color='gray.900'
                    fontWeight={300}
                    fontSize={'2xl'}>
                    ${books.price} HKD
                    </Text>
                </Box>

                <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={'column'}
                    divider={
                    <StackDivider
                        borderColor='gray.200'
                    />
                    }>
                    <VStack spacing={{ base: 4, sm: 6 }}>
                        
                        <Text fontSize={'lg'}>
                            {books.description}
                        </Text>
                    </VStack>
                    <Box>
                        <Text
                            fontSize={{ base: '16px', lg: '18px' }}
                            color='yellow.500'
                            fontWeight={'500'}
                            textTransform={'uppercase'}
                            mb={'4'}>
                            Product Details
                        </Text>

                        <List spacing={2}>
                            <ListItem>
                                <Text as={'span'} fontWeight={'bold'}>
                                    Genre
                                </Text>{' '}
                                {books.genre}
                            </ListItem>
                            <ListItem>
                                <Text as={'span'} fontWeight={'bold'}>
                                    Rating: 
                                </Text>{' '}
                                {books.rating}
                            </ListItem>
                        </List>
                    </Box>
                </Stack>
                <RouterLink to="/checkout">
                    <Button
                        rounded={'none'}
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        bg='yellow.500'
                        color='white'
                        textTransform={'uppercase'}
                        _hover={{
                        transform: 'translateY(2px)',
                        boxShadow: 'lg',
                        }}>
                        
                        <Link to='/checkout'>
                            Buy
                        </Link>
                    </Button>
                </RouterLink>

                <Stack direction="row" alignItems="center" justifyContent={'center'}>
                    <MdLocalShipping />
                    <Text>Deliver to Email upon purchase</Text>
                </Stack>
            </Stack>
        </SimpleGrid>
    </Container>
    );
}