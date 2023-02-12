import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate , Link} from 'react-router-dom';
import reg from '../images/reg.jpg';

const NewRegister = (props) => {

    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [logged, setLogged] = useState("");
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', {
            userName,
            email,
            password,
            confirmPassword,
        }, { withCredentials: true })
            .then(res => {
                console.log("hello")
                sessionStorage.setItem("userInSession", res.data.user.userName)
                setLogged(res.data.user)
                setUser(res.data.user)
                navigate("/")
            })
            .catch(err => {
                const errorRes = err.response.data.errors;
                const errorArr = [];

                for (const key of Object.keys(errorRes)) {
                    errorArr.push(errorRes[key].message)
                }
                setErrors(errorArr);
            })
    }

  return (
    <>
      <div className="flex min-h-full">
        <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h1 className='text-center text-5xl font-fugaz text-dark-blue py-6 border-b'>PAIRED UP</h1>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-dark-blue">Register</h2>
              
            </div>

            <div className="mt-8">

              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green focus:outline-none focus:ring-green sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green focus:outline-none focus:ring-green sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green focus:outline-none focus:ring-green sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green focus:outline-none focus:ring-green sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-dark-blue py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-greenfocus:ring-offset-2"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-screen w-auto flex-1 lg:block">
          <img
            className="absolute inset-0 h-screen w-full object-cover"
            src={reg}
            alt="colorful floating shoe"
          />
        </div>
      </div>
    </>
  )
}
export default NewRegister;