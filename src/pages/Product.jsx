import React, { useEffect, useState } from 'react'
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
import { Link as RouterLink} from 'react-router-dom'
import ProductCards from '../components/ProductCards';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { baseURL } from '../baseUrl';
export const Product = () => {
  const [categories, setCategories] = useState("Fiction");
  const [bookList, setBookList] = useState([]);
  const [isReady, setReady] = useState(false)
  useEffect(async ()  => {
    let result = await axios.get(`${baseURL}/api/books`)
    console.log(result.data);
    
    setBookList(result.data)
  }, [])

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
        my={'2em'}
        borderColor='black'
        borderRadius='md'
        borderLeft='0px'
        display={{base: 'none', md: 'block'}}
      >
        <Stack>
          <Flex justify="center" padding="1em" align="center" columnGap="1em">
            <Input background='white' placeholder='Search Anything' />
            <SearchIcon />
          </Flex>
          <Text fontWeight="bold">Categories</Text>
          <Flex 
            flexDirection="column"
            alignItems="start"
            pt="2em"
            rowGap="1em"
            pr="2em"
          >
            <Box 
              pl="2em" 
              cursor="pointer" 
              background={categories === 'Fiction' ? `yellow.400` : `` } 
              w="full" 
              borderRightRadius="md" 
              onClick={() => setCategories('Fiction')}
            >
              <Text fontSize="lg" textAlign="left" color={categories === 'Fiction' ? `white` : `` }>Fiction</Text>
            </Box>
            <Box 
              cursor="pointer" 
              pl="2em" 
              background={categories === 'Non-Fiction' ? `yellow.400` : `` }
              w="full" 
              borderRightRadius="md" 
              onClick={() => setCategories('Non-Fiction')}
            >
              <Text fontSize="lg" fontSize="lg" textAlign="left" color={categories ==='Non-Fiction' ? `white` : ``}>Non-Fiction</Text>
            </Box>
            <Box 
              cursor="pointer" 
              pl="2em" 
              background={categories === 'Movies' ? `yellow.400` : `` } 
              w="full" borderRightRadius="md" onClick={() => setCategories('Movies')}
            >
              <Text fontSize="lg" textAlign="left" color={categories === 'Movies' ? `white` : `` } >Adapted to Movies</Text>
            </Box>
          </Flex>
        </Stack>
      </Box>
      <Box
        pl={{md: '2em'}}
      >
        <Flex
          wrap='wrap'
          rowGap='1em'
          columnGap='2em'
          justify={{base: 'center', 'md': 'flex-start'}}
        >
          {/* <Box cursor="pointer">
            <RouterLink to="/Product/testing">
              <ProductCards />
            </RouterLink>
          </Box> */}
          {
            bookList.map((book, key) => 
              
              <Box key={book._id} cursor="pointer">
                {/* /Product/testing */}
                <RouterLink to={`/Product/${book._id}`}>
                  <ProductCards key={book._id} genre={book.genre} name={book.name} image={book.image} price={book.price} rating={book.rating} />
                </RouterLink>
              </Box>
            )
          }
          {/* {JSON.stringify(bookList)} */}
            {/* <ProductCards />
            <ProductCards />
            <ProductCards />
            <ProductCards />
            <ProductCards /> */}
        </Flex>
      </Box>
    </Flex>
  )
}
