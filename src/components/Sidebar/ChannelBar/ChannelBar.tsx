import Icon from '@components/Icon';
import Modal from '@components/Modal';
import ChannelCircle from '@components/Sidebar/ChannelCircle/ChannelCircle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChannelCircleProps } from '@type/channelCircle';

import { useState } from 'react';
import SelectChannelType from '@components/Sidebar/ChannelBar/SelectChannelType';

interface ChannelBarProps {
  channels: ChannelCircleProps[];
  updateSelectedChannel: (channelId: string) => void;
}

const ChannelBar = ({ channels, updateSelectedChannel }: ChannelBarProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModal = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <ChannelbarContainer>
      {channels &&
        channels.map(({ channelLink, title, category, customChannelIndex }) => (
          <div
            key={channelLink}
            onClick={() => updateSelectedChannel(channelLink)}
            css={css`
              margin: 0 auto;
              margin-bottom: 2.2rem;
            `}
          >
            <ChannelCircle
              channelLink={channelLink}
              title={title}
              category={category}
              customChannelIndex={customChannelIndex}
            />
          </div>
        ))}
      <ChannelParticipate onClick={() => setIsModal(true)}>
        <CenteredIcon kind='plus' color='white' size={24} />
      </ChannelParticipate>
      {isModal && (
        <Modal onClose={() => setIsModal(!isModal)}>
          <SelectChannelType handleModal={handleModal} />
        </Modal>
      )}
    </ChannelbarContainer>
  );
};

const ChannelbarContainer = styled.div`
  padding: 2rem 0 5rem;
  width: 10rem;
  height: 100vh;
  background-color: #141c24;
  float: left;
  text-align: center;
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow: auto;
`;

const ChannelParticipate = styled.button`
  width: 6rem;
  height: 6rem;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  background: #344051;
`;

const CenteredIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ChannelBar;
