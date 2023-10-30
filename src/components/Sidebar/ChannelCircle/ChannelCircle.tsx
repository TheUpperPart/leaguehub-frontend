import { GameEnum } from '@constants/MakeGame';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ChannelCircleProps } from 'src/@types/channelCircle';

const ChannelCircle = ({
  channelLink,
  title,
  gameCategory,
  imgSrc,
  customChannelIndex,
}: ChannelCircleProps) => {
  return (
    <ChannelBtn url={imgSrc}>
      <ChannelName>{imgSrc ? '' : title.substring(0, 2)}</ChannelName>
      <ChannelGame>{GameEnum[gameCategory]}</ChannelGame>
    </ChannelBtn>
  );
};

export default ChannelCircle;

const ChannelBtn = styled.div<{ url?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 8rem;
  height: 8rem;
  border: 0;
  margin: 12px 0;
  border-radius: 34px;

  cursor: pointer;
  font-size: 1.2rem;
  color: #000000;
  transition: border-radius 0.3s ease;

  background-color: #ffffff;

  ${(prop) =>
    prop.url &&
    css`
      background-image: url(${prop.url});
      background-size: 100% 100%;
      background-position: center top;
      background-repeat: no-repeat;
    `}

  &:hover {
    border-radius: 30%;
  }
`;

const ChannelName = styled.div`
  height: 75%;
  width: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 1.2rem;
`;

const ChannelGame = styled.div`
  position: absolute;
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #ffffff;
  background-color: #ff4655;
  border: 0.2px solid #1e1e1e;

  border-radius: 8px;
  width: 3.1rem;
  height: 1.2rem;

  bottom: -5px;
`;
