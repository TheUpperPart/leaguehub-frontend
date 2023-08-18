import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

interface ModalProps {
  children: JSX.Element;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <Container onClick={onClick}>
      <ModalContent>{children}</ModalContent>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div`
  background-color: #fffef9;
  border-radius: 2rem;
  text-align: center;
  margin: 0 auto;
`;
