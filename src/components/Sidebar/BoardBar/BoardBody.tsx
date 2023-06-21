import styled from '@emotion/styled';
import { BoardInfo } from '@type/board';
import { MouseEventHandler, useEffect, useState } from 'react';

const BoardBody = ({ channels }: Pick<BoardInfo, 'channels'>) => {
  const [selected, setSelected] = useState<string>('');

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    const clickedId = e.currentTarget.dataset.id;
    if (clickedId) {
      setSelected(clickedId);
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
        </Wrapper>
      ))}
      <Wrapper isSelected={false}>공지 추가하기</Wrapper>
    </Container>
  );
};

export default BoardBody;

const Container = styled.ul`
  color: white;
`;

const Wrapper = styled.li<{ isSelected: boolean }>`
  ${({ isSelected }) => isSelected && `background-color: #39587E`}
`;
