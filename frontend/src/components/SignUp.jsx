import { useState } from "react";
const SignUp = () => {

  const defaultFormFields = {
    First_Name: "",
    Last_Name: "",
    Email: "",
    Password: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { First_Name, Last_Name, Email, Password } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <main className='flex flex-col justify-center items-center'>
      <div className='max-w-sm w-full border rounded-lg mx-auto px-3 py-4  my-10'>
        <img src='/static/logo.png' className='w-56' alt='logo' />
        <h1 className='text-xl font-bold mt-3'>SignUp</h1>
        <form action='' className='mt-3 px-4'>
          <div>
            <label for='fname' className='text-lg font-normal ml-2'>
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
            />
          </div>
          <br />
          <div>
            <label for='lname' className='text-lg font-normal ml-2'>
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
            />
          </div>
          <br />

          <div>
            <label for='email' className='text-lg font-normal ml-2'>
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
            />
          </div>
          <br />

          <div>
            <label for='password' className='text-lg font-normal ml-2'>
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
