import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../atoms/authAtom";

const GlobalAuthGuard = ({ children }) => {
  const logged = useRecoilValue(isLoggedInState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!logged) {
      navigate("/"); 
    }  
  }, [logged, navigate]);

  return logged ? children : null; 
};

export default GlobalAuthGuard;
