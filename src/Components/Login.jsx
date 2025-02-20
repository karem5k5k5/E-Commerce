import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { AuthContext } from '../Context/AuthContext';

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {setToken} = useContext(AuthContext);

  const user = {
    email: "",
    password: "",
  }

  async function signin(values) {
    setIsLoading(true)
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      setToken(data.token);
      localStorage.setItem("token" , data.token)
      
      toast.success("Signed in Successfully!");
      setIsLoading(false);
      navigate('/');
    } catch (e) {
      toast.error(e.response.data.message);
      setIsLoading(false)
    }
  }

  const validYup = yup.object().shape(
    {
      email: yup.string().required("Email is required").email("Invalid email address"),
      password: yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/
        , "Password must be at least 8 characters with letters , numbers and at least one symbol")
    }
  )

  const formik = useFormik({
    initialValues: user,
    onSubmit: signin,
    validationSchema: validYup
  })

  return (
    <section className=' py-12'>
      <div className="container mx-auto">
        <h1 className=' text-5xl text-green-500 text-center font-bold mb-12'>Login</h1>
        <div className=' w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] mx-auto'>
          <form onSubmit={formik.handleSubmit} autoComplete='on'>

            {/* email input */}
            <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>

            {formik.errors.email && formik.touched.email ?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>:""}

            {/* password input */}
            <div className="relative z-0 w-full mb-5 group">
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

              {formik.errors.password && formik.touched.password ?<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div>:""}
            </div>
            {/* login button */}
            <button type="submit" className="focus:outline-none cursor-pointer text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {isLoading ? <i className='fa-solid fa-spin fa-spinner text-white'></i> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login