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
    useToast,
    Textarea
  } from '@chakra-ui/react';
import { useEffect, useState  } from 'react';
import { Link as RouterLink, Router, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../baseUrl';
export const CreateBooks = () => {
    const [name, setName] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [price, setPrice] = useState(0);
    const [genre, setGenre] = useState('');
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState('');
    const userId = localStorage.getItem('TOKEN');
    const toast = useToast();
    const create = () => {
        let valid = true;
        if(name == ''){
            toast({
                title: 'Name must not be empty',
                status: 'error',
                isClosable: true
            })           
            valid = false; 
        }
        if(imageURL == ''){
            toast({
                title: 'Image must not be empty',
                status: 'error',
                isClosable: true
            })
            valid = false;
        }
        if(price < 0){
            toast({
                title: 'Price must be above 0',
                status: 'error',
                isClosable: true
            })
            valid = false; 
        }
        if(genre == ''){
            toast({
                title: 'Genre must not be empty',
                status: 'error',
                isClosable: true
            })
            valid = false; 
        }
        if(stock < 0){
            toast({
                title: 'Stock must be above 0',
                status: 'error',
                isClosable: true
            })
            valid = false; 
        }
        if(description == ''){
            setDescription('no description available for this book')
        }
        if(!valid) return;

        axios.post(`${baseURL}/api/books/createBook`,{
            name: name, 
            price: price, 
            user: '625ede0cffba23a794bebf38',
            description: description,
            image: imageURL,
            genre: genre,
            countInStock: stock
          },{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userId}`
              }
          }).then(function (response){
            let data = response.data;
            console.log(response)
            if(response.status == 201){
              toast({
                title: 'Successfully Created',
                status: 'success',
                isClosable: true
              })
              // reset form
              setName('')
              setImageURL('')
              setPrice(0)
              setGenre('')
              setStock(0)
              setDescription('')
            }
            else if(response.status == 401){
                toast({
                    title: 'Error encountered',
                    status: 'error',
                    isClosable: true
                  })
            }
          }).catch((err) => {
            console.log(err);
            toast({
              title: err.message,
              status: 'error',
              isClosable: true
            })
          })
        
    }
  return (
    <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'gray.50'}
    >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Create Books</Heading>
            </Stack>
            <Box
            rounded={'lg'}
            bg={'white'}
            boxShadow={'lg'}
            p={8}
            w={'50vh'}>
                <Stack spacing={4}>
                    <FormControl id="name">
                        <FormLabel>Book Name</FormLabel>
                        <Input type="text" onChange={(ev) => setName(ev.target.value) } value={name}/>
                    </FormControl>
                    <FormControl id="imageurl">
                        <FormLabel>Image Url</FormLabel>
                        <Input type="text" onChange={(ev) => setImageURL(ev.target.value) } value={imageURL}/>
                    </FormControl>
                    <FormControl id="price">
                        <FormLabel>Price</FormLabel>
                        <Input type="number" onChange={(ev) => setPrice(ev.target.value) } value={price} />
                    </FormControl>
                    <FormControl id="genre">
                        <FormLabel>Book Genre</FormLabel>
                        <Input type="text" onChange={(ev) => setGenre(ev.target.value) } value={genre} />
                    </FormControl>
                    <FormControl id="stock">
                        <FormLabel>Stock</FormLabel>
                        <Input type="number" onChange={(ev) => setStock(ev.target.value)} value={stock} />
                    </FormControl>
                    <FormControl id="description">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            onChange={(ev) => setDescription(ev.target.value)}
                            placeholder='Here is a sample placeholder'
                            size='sm'
                            value={description}
                        />
                    </FormControl>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                        bg: 'blue.500',
                        }}
                        onClick={() => create()}
                        >
                        Create
                    </Button>
                    <RouterLink to='/admin'>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}
                            >
                            Back to index 
                        </Button>
                    </RouterLink>
                </Stack>
            </Box>
        </Stack>
    </Flex>
  )
}
