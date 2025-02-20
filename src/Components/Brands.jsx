import axios from 'axios'
import React, { useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'

const Brands = () => {

  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  const {data , isFetched} = useQuery("brands" , getBrands)

  useEffect(()=>{
    getBrands()
  },[])

   if (!isFetched) {
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
    <section className=' md:w-[90%] mx-auto'>
      <div className=' flex flex-wrap justify-center items-center'>
        {data?.data.data.map((item , index)=>(
          <div key={index} className='w-1/2 sm:w-1/3 md:w-1/5 p-4'>
              <div className=' p-3 bg-slate-100 h-[300px] pb-16'>
                <img src={item.image} alt={item.name} className=' w-full h-full' />
                <h3 className=' text-gray-800 mt-3 text-lg lg:text-2xl font-medium text-center'>{item.name}</h3>
              </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Brands