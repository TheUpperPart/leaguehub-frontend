import styled from '@emotion/styled';
import { BoardInfo } from '@type/board';

const BoardBody = ({ channels }: Pick<BoardInfo, 'channels'>) => {
  const addNoti = {
    id: 'add',
    name: '공지 추가하기',
  };
  channels.push(addNoti);
  return (
    <Container>
      {channels.map((channel) => (
        <Wrapper key={channel.id}>{channel.name}</Wrapper>
      ))}
    </Container>
  );
};

export default BoardBody;

const Container = styled.ul`
  color: white;
`;

const Wrapper = styled.li``;
