// Import necessary libraries and components
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import Alert from "./Alert";
import alertState from "../Atoms/alert.atom";
import userState from "../Atoms/user.atom";

// Define SignUp component
const SignUp = () => {
  // State
  const [formFields, setFormFields] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
  });

  // Hooks
  const navigate = useNavigate();
  const setAlert = useSetRecoilState(alertState);
  const userData = useRecoilValue(userState);

  // Destructuring
  const { First_Name, Last_Name, Email, Password } = formFields;

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!First_Name || !Last_Name || !Email || !Password) {
      return;
    }
    try {
      // API call
      const response = await axios.post(
        `/api/v1/auth/register`,
        {
          firstName: First_Name,
          lastName: Last_Name,
          email: Email,
          password: Password,
        }
      );
      const message = response.data.msg;
      // Success
      setAlert({ show: true, message: message, type: "success" });
      setFormFields({
        First_Name: "",
        Last_Name: "",
        Email: "",
        Password: "",
      });
    } catch (error) {
      // Failure
      const errorMessage = error.response.data.msg;
      setAlert({ show: true, message: errorMessage, type: "danger" });
    }
  };

  useEffect(() => {
    // Redirect if user logged in
    if (userData.user) {
      setTimeout(() => {
        navigate("/");
      }, 10);
    }
  }, [userData.user, navigate]);
  return (
    <main className='flex flex-col justify-center items-center'>
      <Alert />
      <div className='max-w-sm w-full border rounded-lg mx-auto px-3 py-4  my-10'>
        <img src='/static/logo.png' className='w-56' alt='logo' />
        <h1 className='text-xl font-bold mt-3'>SignUp</h1>
        <form onSubmit={handleSubmit} className='mt-3 px-4'>
          <div>
            <label htmlFor='fname' className='text-lg font-normal ml-2'>
              First name
            </label>{" "}
            <br />
            <input
              type='text'
              id='fname'
              name='First_Name'
              className='rounded-full w-[100%] mt-2'
              placeholder='First Name'
              onChange={handleChange}
              value={First_Name}
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor='lname' className='text-lg font-normal ml-2'>
              Last name
            </label>{" "}
            <br />
            <input
              type='text'
              id='lname'
              name='Last_Name'
              className='rounded-full w-[100%] mt-2'
              placeholder='Last Name'
              onChange={handleChange}
              value={Last_Name}
              required
            />
          </div>
          <br />

          <div>
            <label htmlFor='email' className='text-lg font-normal ml-2'>
              Email
            </label>{" "}
            <br />
            <input
              type='email'
              id='email'
              name='Email'
              className='rounded-full w-[100%] mt-2'
              placeholder='example@gmail.com'
              onChange={handleChange}
              value={Email}
              required
            />
          </div>
          <br />

          <div>
            <label htmlFor='password' className='text-lg font-normal ml-2'>
              Password
            </label>{" "}
            <br />
            <input
              type='password'
              id='password'
              name='Password'
              className='rounded-full w-[100%] mt-2'
              placeholder='password'
              onChange={handleChange}
              value={Password}
              required
            />
          </div>

          <br />
          <button
            type='submit'
            className='bg-[#FF4F5A] block text-center mx-auto py-2 mt-2 rounded-lg text-white text-xl font-medium w-[100%] hover:drop-shadow-md'
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
