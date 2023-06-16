import Icon from '@components/Icon';
import ChannelCircle from '@components/Sidebar/ChannelCircle/ChannelCircle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChannelCircleProps } from '@type/channelCircle';

interface ChannelBarProps {
  ChannelCircles: ChannelCircleProps[];
}

const ChannelBar = ({ ChannelCircles }: ChannelBarProps) => {
  return (
    <ChannelbarContainer>
      {ChannelCircles.map(({ channelId, channelName, channelGame }) => (
        <div
          key={channelId}
          css={css`
            margin: 0 auto;
            margin-bottom: 2.2rem;
          `}
        >
          <ChannelCircle
            channelId={channelId}
            channelName={channelName}
            channelGame={channelGame}
          />
        </div>
      ))}
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

export default ChannelBar;
