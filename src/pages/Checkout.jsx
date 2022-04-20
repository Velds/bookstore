import React from 'react'
import {
    Flex,
    Box, 
    Stack,
    Text,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button
} from '@chakra-ui/react'

export default function Checkout(){
    return(
        <Box>
            <Flex minH="100vh" p="10" direction="column" rowGap="2em">
                <Text fontSize="3xl" fontWeight="bold" textAlign="left">
                    Customer Info 
                </Text>
                <Stack direction="row" columnGap="1em">
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input id='firstName' name="firstName" type='text' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input id='lastName' name="lastName" type='text' />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input id='email' name="email" type='email' />
                    </FormControl>
                </Stack>
                <Text fontSize="3xl" fontWeight="bold" textAlign="left">
                    Payment Info 
                </Text>
                <Stack direction="row" columnGap="1em" width="60%">
                    <FormControl>
                        <FormLabel>Credit Card Number</FormLabel>
                        <Input id='creditnumber' name="creditnumber" type='text' placeholder="0000000" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Biling Zip</FormLabel>
                        <Input id='lastName' name="lastName" type='text' />
                    </FormControl>
                </Stack>
                <Stack direction="row" columnGap="1em" width="60%">
                    <FormControl>
                        <FormLabel>Month</FormLabel>
                        <Select id='month' name="month">
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Year</FormLabel>
                        <Select id='year' name="year">
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                            <option>2029</option>
                            <option>2030</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>CVC</FormLabel>
                        <Input id='cvc' name="cvc" type='text' placeholder='000' />
                    </FormControl>
                </Stack>
                <Button
                    rounded={'none'}
                    w={'50%'}
                    mt={8}
                    size={'lg'}
                    py={'7'}
                    bg={'yellow.500'}
                    color={'white'}
                    textTransform={'uppercase'}
                    _hover={{
                    transform: 'translateY(2px)',
                    boxShadow: 'lg',
                    }}>
                    Checkout
                </Button>
            </Flex>
        </Box>
    )
}
