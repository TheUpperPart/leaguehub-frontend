import authAPI from '@apis/authAPI';
import Icon from '@components/Icon';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MouseEventHandler, useState } from 'react';

interface BoardBodyProps {
  channelId: string;
  channels: {
    id: string;
    name: string;
  }[];
}

const BoardBody = ({ channels, channelId }: BoardBodyProps) => {
  const [selected, setSelected] = useState<string>('');
  const router = useRouter();

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    const clickedId = e.currentTarget.dataset.id;
    if (clickedId === selected) return;
    if (clickedId) {
      setSelected(clickedId);
      router.push(`/contents/${channelId}/${clickedId}`);
    }
  };

  return (
    <Container>
      {channels.map((channel) => (
        <Wrapper
          key={channel.id}
          data-id={channel.id}
          onClick={onClick}
          isSelected={channel.id === selected}
        >
          {channel.name}
          <Icon kind='lock' color='#637083' size='1.5rem' />
        </Wrapper>
      ))}
      <Wrapper isSelected={false}>
        공지 추가하기
        <Icon kind='plus' color='#637083' size='1.6rem' />
      </Wrapper>
      <Boarder></Boarder>
    </Container>
  );
};

export default BoardBody;

const Container = styled.ul`
  color: white;
`;

const Wrapper = styled.li<{ isSelected: boolean }>`
  font-size: 1.5rem;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #39587e;
  }

  ${({ isSelected }) => isSelected && `background-color: #39587E`};
`;

const Boarder = styled.div`
  margin: 1.4rem;
  border-bottom: solid 1px #344051;
`;
