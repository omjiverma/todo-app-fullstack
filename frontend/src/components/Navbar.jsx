import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className='bg-[#FF4F5A]'>
        <div className='max-w-7xl mx-auto px-2 py-3 flex justify-between'>
          <Link to='/'>
            <img src='/static/logo-white.png' className='w-[180px]' alt='' />
          </Link>

          <ul className='list-none space-x-2 flex items-center text-white'>
            <li className='py-2 px-2 text-base font-medium'>
              <Link to='signin'>Login</Link>
            </li>
            <li className='py-2 px-2 text-base font-medium'>
              <Link to='signup'>SignUp</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
