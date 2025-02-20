import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from './HomeSlider';
import CategorySlider from './CategorySlider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from './../Context/CartContext';

const Home = () => {

  const { addToCart } = useContext(CartContext)

  const [loading, setLoading] = useState(false)

  async function AddProduct(id) {
    setLoading(true)
    const data = await addToCart(id)

    if (data.status == "success") {
      toast.success(data.message)
      setLoading(false)
    } else {
      toast.error(data.message)
      setLoading(false)
    }
  }


  async function getProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const {data, isFetched } = useQuery("products", getProducts)

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>


      {isFetched ? <section className=' md:w-[90%] mx-auto'>
        <HomeSlider />
        <CategorySlider />
        <div className=' flex flex-wrap justify-center items-center'>
          {data.data.data.map((product, index) => {
            return (<div key={index} className=' w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-4'>
              <div className=' bg-slate-100 p-3'>
                <img src={product.imageCover} alt="" className=' w-full' />
                <h4 className=' text-green-500 mt-3'>{product.category.name}</h4>
                <Link to={`/ProductDetails/${product.id}`}><h3 className=' mt-3 line-clamp-1 font-medium hover:underline'>{product.title}</h3></Link>
                <div className=' mt-3 flex justify-between items-center'>
                  <h3>{product.price} EGP</h3>
                  <p><span className=' text-gray-600'>{product.ratingsAverage}</span> <i className=' fa-solid fa-star text-yellow-400'></i></p>

                </div>
                <button onClick={() => {
                  AddProduct(product.id)
                }} type='button' className=' mt-3 w-full focus:outline-none cursor-pointer text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>{loading?<i className='fa-solid fa-spin fa-spinner text-white'></i> :"Add To cart"}</button>
              </div>
            </div>)
          })}
        </div>
      </section> : <div className=' h-screen bg-green-600 flex justify-center items-center'>
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
      </div>}




    </>
  )
}

export default Home