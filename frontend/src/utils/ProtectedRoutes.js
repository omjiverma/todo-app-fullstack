import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import userState from "../Atoms/user.atom";

// A component that protects routes from unauthorized access
const ProtectedRoutes = ({ children }) => {
  // Get the user object from Recoil state
  const { user } = useRecoilValue(userState);

  // If there is no user logged in, redirect to the signin page
  if (!user) {
    return <Navigate to='/signin' />;
  }

  // If there is a user logged in, render the protected route
  return children;
};

export default ProtectedRoutes;