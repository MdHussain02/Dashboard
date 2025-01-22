import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms/authAtom";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  return { isLoggedIn, logIn, logOut };
};

export default useAuth;
