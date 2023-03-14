import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import userState from "../Atoms/user.atom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useRecoilValue(userState);
  if (!user) {
    return <Navigate to='/signin' />;
  }
  return children;
};
export default ProtectedRoutes;
