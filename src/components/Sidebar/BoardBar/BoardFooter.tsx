import Modal from '@components/Modal';
import JoinLeague from '@components/Modal/JoinLeague/JoinLeague';
import styled from '@emotion/styled';
import useModals from '@hooks/useModals';

const BoardFooter = ({ channelLink }: { channelLink: string }) => {
  const { openModal, closeModal } = useModals();

  return (
    <Container
      onClick={() =>
        openModal(Modal, {
          onClose: () => closeModal(Modal),
          children: <JoinLeague onClose={() => closeModal(Modal)} channelLink={channelLink} />,
        })
      }
    >
      리그 참여하기
    </Container>
  );
};

const Container = styled.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
`;

export default BoardFooter;
