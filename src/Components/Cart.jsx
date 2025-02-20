import React, { useContext, useState } from 'react'
import sliderImg1 from "../assets/slider-image-1.jpeg"
import { CartContext } from './../Context/CartContext';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Cart = () => {

  const { products, totalPrice, loading, updateCount, deleteProduct, clearCart } = useContext(CartContext)
  if (loading) {
    return <div className=' h-screen bg-green-600 flex justify-center items-center'>
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
  }

  return (
    <section className=' p-5 my-5 mx-auto container lg:w-[90%] w-[95%] bg-slate-100'>
      {products.length == 0 ? <h1 className=' text-center text-4xl text-green-600 p-5 uppercase font-medium'>your cart is empty !</h1> : <><h1 className=' text-2xl font-bold mb-3'>Shop Cart</h1>
        <div className=' flex justify-between items-center'>
          <h3 className=' text-green-500 font-mono mb-3'>Total Price : {totalPrice} EGP</h3>
          <button onClick={clearCart} className='focus:outline-none cursor-pointer text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2'><i className="fa-regular fa-trash-can me-1"></i> Clear Cart</button>
        </div>

        <Link to="/payment" className='focus:outline-none cursor-pointer text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2'><i class="fa-solid fa-basket-shopping me-1"></i> Make Order</Link>

        {/* mapping */}
        {products?.map((item, index) => {
          return (<div key={index} className=' mt-5 flex flex-wrap justify-between items-center border-b-1 border-gray-300'>
            <div className=' w-5/6 flex justify-center items-start lg:items-center flex-col lg:flex-row '>
              {/* Image */}
              <picture className='p-4 w-full lg:w-1/6 '>
                <img src={item.product.imageCover} className=' lg:w-full w-1/4' alt="product image" />
              </picture>

              {/* content */}
              <div className=' p-4 w-full lg:w-5/6  '>
                <h2 className=' text-lg md:text-2xl font-bold'>{item.product.title}</h2>
                <h3 className=' text-green-500 my-3 font-mono text-md md:text-lg'>Price : {item.price} EGP</h3>
                <button onClick={() => deleteProduct(item.product._id)} type='button' className=' focus:outline-none cursor-pointer text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '>{loading ? <i className='fa-solid fa-spin fa-spinner text-white'></i> : <div><i className="fa-regular fa-trash-can"></i> Remove</div>}</button>
              </div>
            </div>

            {/* counter */}
            <div className=' w-1/6 p-4'>
              <div className=' flex flex-wrap flex-col xl:flex-row justify-center items-center'>
                <button onClick={() => updateCount(item.product._id, item.count + 1)} className=' focus:outline-none cursor-pointer text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 '><i className="fa-solid fa-plus"></i></button>
                <h3 className=' mx-2'>{item.count}</h3>
                <button onClick={() => updateCount(item.product._id, item.count - 1)} className=' focus:outline-none cursor-pointer text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 '><i className="fa-solid fa-minus"></i></button>
              </div>
            </div>
          </div>)
        })}</>}
    </section>
  )
}

export default Cart