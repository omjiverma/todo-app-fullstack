import { Outlet, Link } from "react-router-dom";
import axios from "axios"
import userState from "../Atoms/user.atom";
import { useRecoilState } from "recoil";
import removeUserFromLocalStorage from "../utils/removeUserFromLocalStorage";

const Navbar = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const { user } = userData;
  const handleLogOut = async() => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/logout",
      );
    } catch (error) {
      
    }
    removeUserFromLocalStorage();
    setUserData({ userId: "", user: "", email: "" });
  };

  return (
    <>
      <nav className='bg-[#FF4F5A]'>
        <div className='max-w-7xl mx-auto px-2 py-3 flex justify-between'>
          <Link to='/'>
            <img src='/static/logo-white.png' className='w-[180px]' alt='' />
          </Link>

          {!user ? (
            <ul className='list-none space-x-2 flex items-center text-white'>
              <li className='py-2 px-2 text-base font-medium'>
                <Link to='signin'>Login</Link>
              </li>
              <li className='py-2 px-2 text-base font-medium'>
                <Link to='signup'>SignUp</Link>
              </li>
            </ul>
          ) : (
            <ul className='list-none space-x-2 flex items-center text-white'>
              <li className='py-2 px-2 text-base font-medium'>
                <button onClick={handleLogOut}>Log Out</button>
              </li>
              <li className='py-2 px-2 text-base font-medium'>
                <a href='#'>{user}</a>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
