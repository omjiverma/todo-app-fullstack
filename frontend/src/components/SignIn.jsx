// Import necessary libraries and components
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";
import alertState from "../Atoms/alert.atom";
import userState from "../Atoms/user.atom";
import addUserToLocalStorage from "../utils/addUserToLocalStorage";

// Define SignIn component
const SignIn = () => {
  // Declare hooks
  const navigate = useNavigate();
  const setAlert = useSetRecoilState(alertState);
  const [userData, setUserData] = useRecoilState(userState);

  // Define form state and input handling functions
  const defaultFormFields = {
    Email: "",
    Password: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { Email, Password } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    // Check if all inputs are present
    if (!Email || !Password) return;

    try {
      // Send login request to backend API
      const response = await axios.post(
        `/api/v1/auth/login`,
        {
          email: Email,
          password: Password,
        }
      );
      // Save user data to local storage and global state
      const { userId, user, email } = response.data.user;
      addUserToLocalStorage({ userId, user, email });
      setUserData({ userId, user, email });
      // Show success alert and reset form
      setAlert({
        show: true,
        message: "Logged In SuccessFully, Redirecting",
        type: "success",
      });
      setFormFields(defaultFormFields);
    } catch (error) {
      // Show error alert if login fails
      const errorMessage = error.response.data.msg;
      setAlert({ show: true, message: errorMessage, type: "danger" });
    }
  };

  // Redirect to homepage if user is already logged in
  useEffect(() => {
    if (userData.user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }, [userData.user, navigate]);

  // Render component JSX
  return (
    <main className='h-[68vh] flex flex-col justify-center items-center'>
      <Alert />
      <div className='max-w-sm w-full border rounded-lg mx-auto px-3 py-4  my-auto'>
        <img src='/static/logo.png' className='w-56' alt='logo' />
        <h1 className='text-xl font-bold mt-3'>Sign In</h1>
        <form onSubmit={handleLogin} className='mt-3 px-4'>
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
              value={Email}
              onChange={handleChange}
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
              value={Password}
              onChange={handleChange}
            />
          </div>

          <br />
          <button
            type='submit'
            className='bg-[#FF4F5A] block text-center mx-auto py-2 mt-2 rounded-lg text-white text-xl font-medium w-[100%] hover:drop-shadow-md'
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
