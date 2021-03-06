import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Carousel from './components/Carousel';
import {Routes, Route} from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import { Product } from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import  Contact  from './pages/Contact';
import UserProfile from './pages/UserProfile';
import Checkout from './pages/Checkout';
import { AdminIndex } from './admin/AdminIndex';
import { CreateBooks } from './admin/CreateBooks';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Navbar />
        <Routes>
            <Route exact path="/" element={ <Homepage />} />
            <Route exact path="/login" element={  <Login /> } />
            <Route exact path="/register" element={ <Register /> } />
            <Route exact path="/product" element={ <Product />}></Route>
            <Route exact path="/product/:id" element={ <ProductDetail />}></Route>
            <Route exact path="/userprofile/:id" element={ <UserProfile />}></Route>
            <Route exact path="/contact" element={ <Contact />}></Route>
            <Route exact path="/checkout" element={<Checkout />}></Route>
            {/* Admin, unprotected for now */}
            <Route exact path="/admin/createbooks" element={<CreateBooks />}></Route>
            <Route exact path="/admin/" element={<AdminIndex />}></Route>

        </Routes>

        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
