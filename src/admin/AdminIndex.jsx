import {
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseURL } from '../baseUrl';
import { Link as RouterLink, Router, useNavigate} from 'react-router-dom';
export const AdminIndex = () => {
    const [books, setBooks] = useState()
    const [ready, setReady] = useState(false)
    const userId = localStorage.getItem('TOKEN')

    useEffect(async () => {
        let result = await axios.get(`${baseURL}/api/books`)
        setBooks(result.data)
        setReady(true);
    }, [])

    const toast = useToast();

    if (!ready) return 'LOADING';
    const deleteBook = (bookId) => {
        axios.delete(`${baseURL}/api/books/deleteBook/${bookId}`,{
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userId}`
              }   
          }).then(function (response){
            let data = response.data;
            console.log(response)
            if(response.status != 404){
              toast({
                title: 'Successfully Deleted',
                status: 'success',
                isClosable: true
              })
              // reset form
              window.location.reload();
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
    <TableContainer p='10'>
        <Table variant='simple' size='sm'>
            <TableCaption>Book List</TableCaption>
            <Thead>
                <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th isNumeric>Price</Th>
                    <Th>Delete</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    books.map((book, key) => 
                        <Tr key={book._id}>
                            <Td>{book.name}</Td>
                            <Td>{book.genre}</Td>
                            <Td>{book.price}</Td>
                            <Td><Button background='red.500'  _hover={{ bg: 'red.700' }}  onClick={() => deleteBook(book._id)}> <Text color='white'> Delete </Text></Button></Td>
                        </Tr>
                  )
                }
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th isNumeric>Price</Th>
                    <Th>Delete</Th>
                </Tr>
            </Tfoot>
        </Table>
        <RouterLink to='/admin/createbooks'>
            <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                bg: 'blue.500',
                }}
                >
                Create Books
            </Button>
        </RouterLink>
    </TableContainer>
  )
}
