import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigation = (pages) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (route) => {
    navigate(`/home/${route}`);
  };
  
  const isActivePage = (route) => location.pathname === `/home/${route}`;

  return { handleNavigation, isActivePage };
};
