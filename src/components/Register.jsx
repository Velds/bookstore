import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import { baseURL } from '../baseUrl';
import axios from 'axios';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    useEffect(() =>{
        let isLogged = localStorage.getItem('isLoggedIn');
        if(isLogged){
            navigate('/');
        }
    })
    const toast = useToast();

    const register = async () => {
      let valid = true;
      console.log(email, password, username);
      if(email == ''){
        toast({
          title: 'Email can\'t be empty',
          status: 'error',
          isClosable: true
        })
        valid = false;
      }
      else if(password.length < 6){
        toast({
          title: 'Minimum 6 character for password',
          status: 'Error',
          isClosable: true
        })
        valid = false;
      }
      else if(username == ''){
        toast({
          title: 'Username can\'t be empty',
          status: 'error',
          isClosable: true
        })
        valid = false;
      }
      if (!valid) return;
      axios.post(`${baseURL}/api/users`,{
        name: username, 
        email: email,
        password: password
      }).then(function (response){
        let data = response.data;
        console.log(response)
        if(response.status == 201){
          toast({
            title: 'Successfully registered',
            status: 'success',
            isClosable: true
          })
          navigate('/login');
        }
      }).catch((err) => {
        console.log(err);
        toast({
          title: 'Error encountered',
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
       
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w={'50vh'}>
            <Stack spacing={4}>
                <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" onChange={(event) => setUsername(event.target.value)}/>
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" onChange={(event) => setEmail(event.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'} onChange={(event) => setPassword(event.target.value)} />
                        <InputRightElement h={'full'}>
                            <Button
                            variant={'ghost'}
                            onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                            }>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={() => register()}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text fontSize='xs' align={'center'}>
                  Already a user? <Link color={'blue.400'}> <RouterLink to="/login" >Login </RouterLink> </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}