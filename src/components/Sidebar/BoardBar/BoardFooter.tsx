import Modal from '@components/Modal';
import JoinLeague from '@components/Modal/JoinLeague/JoinLeague';
import ModifyChannel from '@components/Modal/ModifyChannel/ModifyChannel';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import useModals from '@hooks/useModals';

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
  const { channelPermission } = useChannels();
  const { openModal, closeModal } = useModals();

  const updateChannel = (leagueTitle?: string, maxPlayer?: number) => {
    if (leagueTitle && maxPlayer) updateChannelData(leagueTitle, maxPlayer);

    closeModal(Modal);
    return;
  };

  const renderLeagueButton = () => {
    switch (channelPermission) {
      case 0:
        return (
          <div
            onClick={() =>
              openModal(Modal, {
                onClose: () => closeModal(Modal),
                children: (
                  <ModifyChannel
                    channelLink={channelLink}
                    leagueTitle={leagueTitle}
                    maxPlayer={maxPlayer}
                    onClose={updateChannel}
                  />
                ),
              })
            }
          >
            리그 수정하기
          </div>
        );
      case 1:
        return <div>리그 나가기</div>;
      case 2:
        return (
          <div
            onClick={() =>
              openModal(Modal, {
                onClose: () => closeModal(Modal),
                children: (
                  <JoinLeague channelLink={channelLink} onClose={() => closeModal(Modal)} />
                ),
              })
            }
          >
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
