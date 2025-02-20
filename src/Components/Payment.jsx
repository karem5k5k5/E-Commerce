import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Payment = () => {

    const [details, setDetails] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { cartId , setNumOfItems, setProducts, setTotalPrice} = useContext(CartContext)

    async function cashPayment() {
        setLoading(true)
        const user = {
            shippingAddress: {
                details: details,
                phone: phone,
                city: city
            }
        }

        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, user, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            setNumOfItems(0)
            setProducts([])
            setTotalPrice(0)

            setLoading(false)

            navigate('/allorders')

            

        } catch (error) {
            console.log(error);
            setLoading(false)

        }

    }
    async function onlinePayment() {
        
        const user = {
            shippingAddress: {
                details: details,
                phone: phone,
                city: city
            }
        }

        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, user, {
                headers: {
                    token: localStorage.getItem("token")
                } , params:{
                    url : "http://localhost:5173"
                }
            })

            window.open(data.session.url)

           

        } catch (error) {
            console.log(error);
           

        }

    }

    return (
        <section className=' py-10 w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] mx-auto p-5'>
            <h1 className=' text-5xl text-green-500 text-center font-bold mb-12'>Payment</h1>
            {/* details input */}
            <div className="relative z-0 w-full mb-5 group">
                <textarea onChange={(e) => { setDetails(e.target.value) }} name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required/>
                <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
            </div>
            {/* city input */}
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={(e) => { setCity(e.target.value) }} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required/>
                <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
            </div>
            {/* phone input */}
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={(e) => { setPhone(e.target.value) }} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required/>
                <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
            </div>

            <button onClick={cashPayment} type='submit' className='focus:outline-none cursor-pointer text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 mt-4'>{loading? <i className='fa-solid fa-spin fa-spinner text-white'></i>: <div><i className="fa-solid fa-money-bill-wave me-1"></i> Cash Payment</div>}</button>

            <button onClick={onlinePayment} type='submit' className='focus:outline-none cursor-pointer text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 mt-4'>{loading? <i className='fa-solid fa-spin fa-spinner text-white'></i>: <div><i className="fa-solid fa-credit-card me-1"></i> Online Payment</div>}</button>

        </section>
    )
}

export default Payment