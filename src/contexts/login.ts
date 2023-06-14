import { createContext } from 'react';

interface UserState {
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginContext = createContext<UserState | null>(null);

export default LoginContext;
