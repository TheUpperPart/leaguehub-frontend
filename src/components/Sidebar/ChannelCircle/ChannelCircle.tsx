import { GameEnum } from '@constants/MakeGame';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { ChannelCircleProps } from 'src/@types/channelCircle';

const ChannelCircle = ({
  title,
  gameCategory,
  imgSrc,
  channelLink,
}: Omit<ChannelCircleProps, 'customChannelIndex'>) => {
  const router = useRouter();

  return (
    <ChannelContainer onClick={() => router.push(`/contents/${channelLink}/main`)}>
      <ChannelBtn url={imgSrc}>{imgSrc ? '' : title.substring(0, 2)}</ChannelBtn>
      <ChannelGame>{GameEnum[gameCategory] || gameCategory}</ChannelGame>
    </ChannelContainer>
  );
};

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  width: 6rem;
  height: 6rem;

  margin: 1rem 0;
`;

const ChannelBtn = styled.div<{ url?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 5rem;
  height: 5rem;

  margin-top: -1rem;

  border-radius: 5rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: border-radius 0.3s ease;
  background-color: ${({ theme }) => theme['bg-40']};
  color: ${({ theme }) => theme['text']};

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

const ChannelGame = styled.div`
  position: absolute;
  width: 6rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme['text']};
  background-color: ${({ theme }) => theme['bg-80']};

  border-radius: 8px;

  bottom: 0rem;
`;
export default ChannelCircle;
