import JoinLeague from '@components/Modal/JoinLeague/JoinLeague';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import { MouseEventHandler, useState } from 'react';

const BoardFooter = ({ channelLink }: { channelLink: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { channelPermission } = useChannels();

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target === e.currentTarget) setIsModalOpen(true);
  };

  const renderLeagueButton = () => {
    switch (channelPermission) {
      case 0:
        return <div>리그 수정하기</div>;
      case 1:
        return <div>리그 나가기</div>;
      case 2:
        return (
          <div onClick={onClick}>
            {isModalOpen && (
              <JoinLeague onClose={() => setIsModalOpen(false)} channelLink={channelLink} />
            )}
            리그 참여하기
          </div>
        );
    }
  };

  return <Container>{renderLeagueButton()}</Container>;
};

const Container = styled.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
`;

export default BoardFooter;
