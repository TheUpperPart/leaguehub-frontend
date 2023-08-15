import JoinLeague from '@components/Modal/JoinLeague/JoinLeague';
import styled from '@emotion/styled';
import { MouseEventHandler, useState } from 'react';

const BoardFooter = ({ channelLink }: { channelLink: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target === e.currentTarget) setIsModalOpen(true);
  };

  return (
    <Container onClick={onClick}>
      {isModalOpen && (
        <JoinLeague onClose={() => setIsModalOpen(false)} channelLink={channelLink} />
      )}
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
