import Modal from '@components/Modal';
import styled from '@emotion/styled';

interface ParticipantListProps {
  leagueTitle: string;
  onClose: () => void;
}

const ParticipantList = ({ leagueTitle, onClose }: ParticipantListProps) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <Title>{leagueTitle}</Title>
      </Container>
    </Modal>
  );
};

export default ParticipantList;

const Container = styled.div`
  color: black;
`;

const Title = styled.div``;
