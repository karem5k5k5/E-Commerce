import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'

const AllOrders = () => {

  const { id } = jwtDecode(localStorage.getItem("token"))

  async function getAllOrders() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }

  const { data, isLoading } = useQuery("allOrders", getAllOrders)

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
    <section className=' p-5 my-5 mx-auto container lg:w-[90%] w-[95%] bg-slate-100'>
      <h1 className=' text-6xl text-center font-medium text-green-500 mb-22'>All Orders</h1>
      {data?.data.map((item, idx) => (<div key={idx} className=' mt-5 flex gap-9 flex-col justify-center items-center border-b-1 border-gray-300'>
        <div className=' flex justify-between items-center w-[80%]'>
          <h2 className=' text-lg font-bold'>Order Total Price : <span className=' text-green-600'>{item.totalOrderPrice} EGP</span></h2>
          <h2  className=' text-lg font-bold'>Payment Method : <span className={item.paymentMethodType=='cash'?'text-green-600' :'text-sky-600'}>{item.paymentMethodType}</span></h2>
        </div>

        <div className=' flex flex-wrap justify-center gap-3 items-center'>
          {item.cartItems?.map((item, idx) => (<div key={idx}>
            <img src={item.product.imageCover} className=' w-[100px]' alt="product image" />
          </div>))}
        </div>
      </div>))}
    </section>
  )
}

export default AllOrders