import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
  } from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';


import { Link as RouterLink, Router, useNavigate} from 'react-router-dom'
import jwtDecode from 'jwt-decode';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [ isAuthorized, setAuthorized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  useEffect(() =>{
    let isLogged = localStorage.getItem('isLoggedIn');
    if(isLogged){
      setIsLoggedIn(true);
      let profile = JSON.parse(localStorage.getItem('profile'));
      console.log(profile);
      setUserName(profile.name);
    }
  })
  useEffect(() => {
    console.log(localStorage.getItem('TOKEN'));    
    let token = localStorage.getItem('TOKEN');
    let decodedToken;
    let valid = true
    try{
       decodedToken = jwtDecode(token) 
    }
    catch (e){
      console.log('error', e);
      valid = false; 
    }
    let currentDate = new Date();
    if(valid && decodedToken.exp * 1000 < currentDate.getTime()){
      setAuthorized(false);
      console.log('Token expired or no token');
    }
    else{
      setAuthorized(true);
      console.log('Authorized');
    }
  }, [localStorage.getItem('TOKEN')])


  const logout = () => {
    localStorage.clear();
    setAuthorized(false);
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('yellow.50', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontWeight={'bold'}
            color={useColorModeValue('gray.800', 'white')}>
            <RouterLink to="/"> BookieBook </RouterLink>
            
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          { !isLoggedIn && <Button
            as={'a'}
            fontSize={'lg'}
            fontWeight={400}
            variant={'link'}
            href={'#'}>
             <RouterLink to="/login">Sign In</RouterLink>
          </Button>}

          {!isLoggedIn && <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'lg'}
            fontWeight={600}
            color={'white'}
            bg={'orange.400'}
            href={'#'}
            _hover={{
              bg: 'orange.300',
            }}>
            <RouterLink to="/register">
              Sign Up
            </RouterLink>
          </Button>}

          { isLoggedIn && <Button
            as={'a'}
            fontSize={'lg'}
            fontWeight={400}
            variant={'link'}
            href={'#'}>
              <Link color="black">
                <RouterLink to={`/userprofile/${userName}`}>{userName}</RouterLink>
              </Link>
          </Button>}

          {isLoggedIn && <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'lg'}
            fontWeight={600}
            color={'white'}
            bg={'orange.400'}
            href={'#'}
            _hover={{
              bg: 'orange.300',
            }}
            onClick={() => logout()}
            >
              Logout
          </Button>}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
  
const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NavItem.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'lg'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                <RouterLink to={`/${navItem.label}`}> {navItem.label} </RouterLink>
               
              </Link>
            </PopoverTrigger>

          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
  
const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            textAlign={'left'}
            _groupHover={{ color: 'blue.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text textAlign={'left'} fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};
  
const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NavItem.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};
  
const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
            <RouterLink to={`/${label}`}>
              {label}
            </RouterLink>
        </Text>
        
      </Flex>

      
    </Stack>
  );
};
  
//   interface NavItem {
//     label: string;
//     subLabel?: string;
//     children?: Array<NavItem>;
//     href?: string;
//   }
  

   
const NavItem =  [
  {
    label: 'Product',
    children: [
      {
        label: 'Our best seller',
        subLabel: 'The very best',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming best-seller',
        href: '#',
      },
    ],
  },
  {
    label: 'Contact',
    href: '#',
  }
];
