import Modal from '@components/Modal';
import JoinLeague from '@components/Modal/JoinLeague/JoinLeague';
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

  const renderLeagueButton = () => {
    switch (channelPermission) {
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
  color: black;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
`;

export default BoardFooter;
