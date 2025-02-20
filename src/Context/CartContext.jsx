import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {

    const { token } = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [numOfItems, setNumOfItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const [cartId, setCartId] = useState(null)


    async function addToCart(id) {

        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
                productId: id
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            getUserCart()

            return data
        } catch (error) {
            console.log(error);

        }
    }

    async function getUserCart() {
        setLoading(true)
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            setProducts(data.data.products)
            setNumOfItems(data.numOfCartItems)
            setTotalPrice(data.data.totalCartPrice)
            setLoading(false)
            setCartId(data.data._id)

        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }

    async function updateCount(id, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                count: count
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            setProducts(data.data.products)
            setNumOfItems(data.numOfCartItems)
            setTotalPrice(data.data.totalCartPrice)


        } catch (error) {
            console.log(error);

        }
    }

    async function deleteProduct(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            setProducts(data.data.products)
            setNumOfItems(data.numOfCartItems)
            setTotalPrice(data.data.totalCartPrice)
        } catch (error) {
            console.log(error);

        }
    }

    async function clearCart() {
        try {
            const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
                headers:{
                    token:localStorage.getItem("token")
                }
            })

            setProducts([])
            setNumOfItems(0)
            setTotalPrice(0)

        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        if (token != null) {
            getUserCart()
        }
    }, [token])


    return (
        <CartContext.Provider value={
            { addToCart, products, numOfItems, totalPrice, setNumOfItems, setProducts, setTotalPrice, loading, updateCount , deleteProduct , clearCart , cartId }
        }>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider