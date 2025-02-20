import axios from 'axios'
import React, { useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'

const Categories = () => {

  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  const { data, isFetched } = useQuery("categories", getCategories)

  useEffect(() => {
    getCategories()
  }, [])

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
        {data?.data.data.map((item, index) => (
          <div key={index} className='w-full sm:w-1/2 md:w-1/3 p-4'>
            <div className=' p-3 bg-slate-100 h-[500px] pb-16'>
              <img src={item.image} alt={item.name} className=' w-full h-full' />
              <h3 className=' text-green-500 mt-3 text-lg lg:text-2xl font-medium text-center'>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories