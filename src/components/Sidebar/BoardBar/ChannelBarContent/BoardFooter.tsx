import Modal from '@components/Modal';
import JoinLeague from '@components/Modal/JoinLeague/JoinLeague';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import useModals from '@hooks/useModals';

interface BoardFooterProps {
  channelLink: string;
}

const BoardFooter = ({ channelLink }: BoardFooterProps) => {
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

  if (channelPermission === 0) {
    return <></>;
  }

  return <Container>{renderLeagueButton()}</Container>;
};

const Container = styled.div`
  color: #020202;
  background-color: #ffffff;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
  position: absolute;
  bottom: 1rem;
  display: flex;
  align-items: center;
  width: 18.4rem;
  height: 4rem;
  left: 1rem;
  border-radius: 0.6rem;
  text-align: center;
  padding-left: 1rem;
  &:hover {
    background-color: #ff4655;
    color: #f2f2f2;
  }
`;

export default BoardFooter;
