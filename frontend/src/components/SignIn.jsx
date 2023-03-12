import { useState } from "react";
import Alert from "./Alert";
import alertState from "../Atoms/alert.atom";
import { useSetRecoilState } from "recoil";
import userState from "../Atoms/user.atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import addUserToLocalStorage from "../utils/addUserToLocalStorage";
import { redirect } from "react-router-dom";

const SignIn = () => {
  // Global States
  const setAlert = useSetRecoilState(alertState);
  const [userData, setUserData] = useRecoilState(userState);

  // Form Input Handle Logic Start
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

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!Email || !Password) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email: Email,
          password: Password,
        }
      );
      const { userId, user, email } = response.data.user;
      addUserToLocalStorage({ userId, user, email });
      setUserData({ userId, user, email });
      setAlert({
        show: true,
        message: "Logged In SuccessFully, Redirecting",
        type: "success",
      });
      setFormFields(defaultFormFields);
      redirect("/")
    } catch (error) {
      const errorMessage = error.response.data.msg;
      setAlert({ show: true, message: errorMessage, type: "danger" });
    }
  };
  // Component JSX
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
