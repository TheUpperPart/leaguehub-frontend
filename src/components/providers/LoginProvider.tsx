import { useState } from 'react';
import LoginContext from '@contexts/login';

interface LoginProviderProps {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: LoginProviderProps) => {
  const [name, setName] = useState<string | null>(null);

  return <LoginContext.Provider value={{ name, setName }}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
