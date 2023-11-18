import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  updateSelectedChannel: (channelLink: string) => void;
}

const MainChannelCircle = ({ updateSelectedChannel }: Props) => {
  const router = useRouter();

  const hanleClick = () => {
    updateSelectedChannel('main');
    router.push('/');
  };

  return (
    <ChannelBtn onClick={hanleClick}>
      <Image src={'/img/logo/logo-circle.png'} width={58} height={38} alt='circle-logo' />
    </ChannelBtn>
  );
};

export default MainChannelCircle;

const ChannelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 8rem;
  height: 8rem;
  margin: 24px 0;
  border: 0;

  border-radius: 34px;

  cursor: pointer;
  font-size: 1.2rem;
  background-color: #ffffff;
  transition: border-radius 0.3s ease;

  &:hover {
    border-radius: 30%;
  }
`;
