import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout';
import Home from './Components/Home';
import Brands from './Components/Brands';
import Cart from './Components/Cart';
import Categories from './Components/Categories';
import Login from './Components/Login';
import Register from './Components/Register';
import Error from './Components/Error';
import Products from './Components/Products';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails';
import CartContextProvider from './Context/CartContext';
import Payment from './Components/Payment';
import AllOrders from './Components/AllOrders';

const App = () => {

  const query = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "/ProductDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "/brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "/categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "/login", element: <Login /> },
        { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "/payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
        { path: "/register", element: <Register /> },
        { path: "/allorders", element: <ProtectedRoute><AllOrders /> </ProtectedRoute>},
        { path: "*", element: <Error /> },
      ]
    }
  ])
  return (

    <QueryClientProvider client={query}>
      <AuthContextProvider>
        <CartContextProvider>
          <Toaster />
          <RouterProvider router={router} />
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>

  )
}

export default App