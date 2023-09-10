import { Modals } from '@type/modals';
import { createContext } from 'react';

interface ModalState {
  modals: Modals;
  setModals: React.Dispatch<React.SetStateAction<Modals>>;
}

const ModalsContext = createContext<ModalState | null>(null);

export default ModalsContext;
