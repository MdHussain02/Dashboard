import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { isLoggedInState } from "../atoms/authAtom";

const GlobalAuthGuard = ({ children }) => {
  const logged = useRecoilValue(isLoggedInState);

  // Redirect to login if the user is not logged in
  if (!logged) {
    return <Navigate to="/" replace />; // Redirect to login page
  }

  // Render children if the user is logged in
  return children;
};

export default GlobalAuthGuard;
