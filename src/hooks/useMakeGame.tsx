import MakeGameContext from '@contexts/MakeGameContext';
import { useContext } from 'react';

const useMakeGame = () => {
  const context = useContext(MakeGameContext);

  if (!context) {
    throw new Error('Make Game Context 오류');
  }

  return context;
};

export default useMakeGame;
