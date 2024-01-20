import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MainChannelCircle = () => {
  const router = useRouter();

  return (
    <ChannelButton onClick={() => router.push('/')}>
      <Image src={'/img/logo/logo-circle.png'} width={38} height={25} alt='circle-logo' />
    </ChannelButton>
  );
};

export default MainChannelCircle;

const ChannelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 5rem;
  height: 5rem;
  margin: 24px 0;
  border: 0;

  border-radius: 34px;

  cursor: pointer;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme['bg-40']};
  transition: border-radius 0.3s ease;

  &:hover {
    border-radius: 30%;
  }
`;
