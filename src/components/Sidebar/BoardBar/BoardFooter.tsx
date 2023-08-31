import JoinLeague from '@components/Modal/JoinLeague/JoinLeague';
import ModifyChannel from '@components/Modal/ModifyChannel/ModifyChannel';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import { MouseEventHandler, useState } from 'react';

interface BoardFooterProps {
  channelLink: string;
  leagueTitle: string;
  maxPlayer: number;
  updateChannelData: (leagueTitle: string, maxPlayer: number) => void;
}

const BoardFooter = ({
  channelLink,
  leagueTitle,
  maxPlayer,
  updateChannelData,
}: BoardFooterProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { channelPermission } = useChannels();

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target === e.currentTarget) setIsModalOpen(true);
  };

  const updateChannel = (leagueTitle?: string, maxPlayer?: number) => {
    if (leagueTitle && maxPlayer) updateChannelData(leagueTitle, maxPlayer);

    setIsModalOpen(false);
    return;
  };

  const renderModal = () => {
    if (isModalOpen === false) return;

    switch (channelPermission) {
      case 0:
        return (
          <div>
            <ModifyChannel
              channelLink={channelLink}
              leagueTitle={leagueTitle}
              maxPlayer={maxPlayer}
              onClose={updateChannel}
            />
          </div>
        );
      case 1:
        alert('기능 구현중입니다');
        return <></>;
      case 2:
        return (
          <div>
            <JoinLeague onClose={() => setIsModalOpen(false)} channelLink={channelLink} />
          </div>
        );
    }
  };

  const renderLeagueButton = () => {
    switch (channelPermission) {
      case 0:
        return <div onClick={onClick}>리그 수정하기</div>;
      case 1:
        return <div onClick={onClick}>리그 나가기</div>;
      case 2:
        return <div onClick={onClick}>리그 참여하기</div>;
    }
  };

  return (
    <Container>
      {renderModal()}
      {renderLeagueButton()}
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
