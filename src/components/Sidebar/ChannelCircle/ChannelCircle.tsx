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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 7rem;
  height: 7rem;
  border: 0;

  border-radius: 50%;

  cursor: pointer;
  font-size: 1.2rem;
  color: #ffffff;
  transition: border-radius 0.3s ease;

  background: linear-gradient(to bottom, #344051 75%, #202b37 25%);

  ${(prop) =>
    prop.url &&
    css`
      background-image: url(${prop.url});
      background-size: 100% 75%;
      background-position: center top; /* 배경 이미지를 가운데 정렬하고 위에서부터 정렬합니다. */
      background-repeat: no-repeat; /* 배경 이미지 반복을 비활성화합니다. */
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
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;
