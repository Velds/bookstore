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
    useToast
  } from '@chakra-ui/react';
import { useEffect, useState,  } from 'react';
import { Link as RouterLink, Router, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../baseUrl';

export default function SimpleCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(true);
    const toast = useToast();


    const isEmailEmpty = email === '';
    const isPasswordEmpty = password === '';
    const navigate = useNavigate();
    useEffect(() =>{
        let isLogged = localStorage.getItem('isLoggedIn');
        if(isLogged){
            navigate('/');
            
        }
    })

    const login = () => {
        axios.post(`${baseURL}/api/users/login`, {
            email: email, 
            password: password
        })
        .then(function (response){
            console.log(response);
            if(response.status == 200){
                localStorage.setItem('TOKEN', response.data.token)
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('profile', JSON.stringify({
                    'email': response.data.email,
                    'name': response.data.name
                }))
                toast({
                    title: 'Login Successful',
                    status: 'success',
                    isClosable: true
                })
                window.location.reload();
            }
        })
        .catch(function (err){
            console.log('err:', err);
            toast({
                title: 'Wrong Credential, please try again',
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
        bg={useColorModeValue('gray.50', 'gray.800')}
    >
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool books
            </Text>
        </Stack>
        <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
        w={'50vh'}>
            <Stack spacing={4}>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" onChange={(ev) => setEmail(ev.target.value) }/>
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" onChange={(ev) => setPassword(ev.target.value)} />
                </FormControl>
                <Stack spacing={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox>Remember me</Checkbox>
                    </Stack>
                    <Text fontSize='xs'>Don't have an account? Click <Link color={'blue.400'}> <RouterLink to="/register"> here </RouterLink> </Link> to register</Text>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                        bg: 'blue.500',
                        }}
                        onClick={() => login()}
                        >
                        Sign in
                    </Button>
                </Stack>
            </Stack>
        </Box>
    </Stack>
</Flex>
);
}