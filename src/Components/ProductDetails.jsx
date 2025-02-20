import React, { useContext, useState } from 'react'
import sliderImg1 from "../assets/slider-image-1.jpeg"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { ThreeDots } from 'react-loader-spinner'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'

const ProductDetails = () => {

    const { id } = useParams()

    const {addToCart} = useContext(CartContext)

    const [loading, setLoading] = useState(false)

    async function AddProduct() {
        setLoading(true)
        const data = await addToCart(id)

        if (data.status == "success"){
            toast.success(data.message)
            setLoading(false)
        }else{
            toast.error(data.message)
            setLoading(false)
        }
    }

    async function getOneProduct() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const { data, isLoading } = useQuery(`productDetails/${id}`, getOneProduct)

    if (isLoading) {
        return (
            <div className=' h-screen bg-green-600 flex justify-center items-center'>
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#fff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    return (
        <section className=' md:w-3/4 py-30 mx-auto flex flex-wrap justify-center items-center'>
            <picture className=' md:w-1/3 p-5'>
                <img src={data.data.data.imageCover} className=' w-full' alt={data.data.data.title} />
            </picture>
            <div className=' md:w-2/3 p-5'>
                <h1 className=' text-3xl font-bold '>{data.data.data.title}</h1>
                <p className=' my-3 text-gray-500'>{data.data.data.description}</p>
                <h3 className=' font-medium'>{data.data.data.category.name}</h3>
                <div className=' my-3 flex justify-between items-center'>
                    <h4>{data.data.data.price} EGP</h4>
                    <p><span className=' text-gray-600'>{data.data.data.ratingsAverage}</span> <i className=' fa-solid fa-star text-yellow-400'></i></p>
                </div>
                <button onClick={AddProduct} type='button' className=' w-full focus:outline-none cursor-pointer text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>{loading? <i className='fa-solid fa-spin fa-spinner text-white'></i> :"Add To Cart"}</button>
            </div>
        </section>
    )
}

export default ProductDetails