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
    Toast,
    useToast,
  } from '@chakra-ui/react';
import { Link as RouterLink} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../baseUrl';
import { wait, waitFor } from '@testing-library/react';
export default function UserProfile() {
    const [ userName, setUserName ] = useState('');
    const [ userEmail, setUserEmail ] = useState('');
    const token = localStorage.getItem('TOKEN');
    const [edit, setEdit] = useState(true);
    useEffect(async () => {
        let result = await axios.get(`${baseURL}/api/users/profile`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        })
        console.log(result);
        setUserName(result.data.name);
        setUserEmail(result.data.email);
    }, [])
    const toast = useToast()
    const editProfile = () =>{
        axios.put(`${baseURL}/api/users/profile`,       
           {
                name: userName,
                email: userEmail
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            },
            
        ).then(function (response){
            let data = response.data;
            console.log(response);   
            console.log(userName);
            toast({
                title: 'Successfully Updated',
                status: 'success',
                isClosable: true
              })
            //   setTimeout(() => {
            //     window.location.reload();
            //   }, 1000);
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
            <Heading fontSize={'4xl'}>User Profile</Heading>
        </Stack>
        <Box
        rounded={'lg'}
        bg={'white'}
        boxShadow={'lg'}
        p={8}
        w={'50vh'}>
            <Stack spacing={4}>
                <FormControl id="username" isReadOnly={edit}>
                    <FormLabel>Username</FormLabel>
                    <Input background={edit ? 'gray.200' : 'white'} type="text" onChange={(ev) => setUserName(ev.target.value)} defaultValue={userName}/>
                </FormControl>
                <FormControl id="email" isReadOnly>
                    <FormLabel>Email address</FormLabel>
                    <Input background='gray.200' type="email" defaultValue={userEmail} />
                </FormControl>
                {/* <FormControl id="password" isDisabled>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" />
                </FormControl> */}
                <Stack spacing={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                    </Stack>
                    <Button
                        onClick={() => setEdit(!edit)}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                        bg: 'blue.500',
                        }}>
                        {edit ? 'Edit' : 'Close'}
                    </Button>
                    {!edit && 
                     <Button
                     onClick={() => editProfile()}
                     bg={'blue.400'}
                     color={'white'}
                     _hover={{
                     bg: 'blue.500',
                     }}>
                     Submit
                    </Button>
                    
                    }
                </Stack>
            </Stack>
        </Box>
    </Stack>
</Flex>
);
}