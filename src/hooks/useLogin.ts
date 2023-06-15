import LoginContext from '@contexts/login';
import { useContext } from 'react';

const useLogin = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('LoginContext does not exists.');
  }

  return context;
};

export default useLogin;
