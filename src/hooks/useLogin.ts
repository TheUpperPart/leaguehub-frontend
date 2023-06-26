import { useContext } from 'react';

import ProfileContext from '@contexts/ProfileContext';

const useLogin = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('LoginContext does not exists.');
  }

  return context;
};

export default useLogin;
