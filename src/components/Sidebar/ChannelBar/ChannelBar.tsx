import Icon from '@components/Icon';
import ChannelCircle from '@components/Sidebar/ChannelCircle/ChannelCircle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChannelCircleProps } from '@type/channelCircle';

interface ChannelBarProps {
  channels: ChannelCircleProps[];
  updateSelectedChannel: (channelId: string) => void;
}

const ChannelBar = ({ channels, updateSelectedChannel }: ChannelBarProps) => {
  return (
    <ChannelbarContainer>
      {channels &&
        channels.map(({ channelLink, title, category }) => (
          <div
            key={channelLink}
            onClick={() => updateSelectedChannel(channelLink)}
            css={css`
              margin: 0 auto;
              margin-bottom: 2.2rem;
            `}
          >
            <ChannelCircle channelLink={channelLink} title={title} category={category} />
          </div>
        ))}
      <ChannelParticipate>
        <CenteredIcon kind='plus' color='white' size={24} />
      </ChannelParticipate>
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
