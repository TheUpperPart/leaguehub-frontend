import ModalsContext from '@contexts/ModalContext';
import { ComponentProps, FunctionComponent, useCallback, useContext } from 'react';

const useModals = () => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error('MajorContext does not exists.');
  }
  const { modals, setModals } = context;

  const openModal = useCallback(
    <T extends FunctionComponent<any>>(Component: T, props: Omit<ComponentProps<T>, 'open'>) => {
      setModals((modals) => [...modals, { Component, props: { ...props, open: true } }]);
    },
    [setModals],
  );

  const closeModal = useCallback(
    <T extends FunctionComponent<any>>(Component: T) => {
      setModals((modals) => modals.filter((modal) => modal.Component !== Component));
    },
    [setModals],
  );
  return {
    modals,
    openModal,
    closeModal,
  };
};

export default useModals;
