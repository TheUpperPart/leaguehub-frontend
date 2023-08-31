import authAPI from '@apis/authAPI';
import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRef } from 'react';

interface ModifyChannelProps {
  channelLink: string;
  leagueTitle: string;
  maxPlayer: number;
  onClose: (leagueTitle?: string, maxPlayer?: number) => void;
}

const ModifyChannel = ({ channelLink, leagueTitle, maxPlayer, onClose }: ModifyChannelProps) => {
  const leagueTitleRef = useRef<HTMLInputElement>(null);
  const maxPlayerRef = useRef<HTMLInputElement>(null);

  const onClickSubmit = async () => {
    console.log(leagueTitleRef.current?.value, maxPlayerRef.current?.value);
    if (!leagueTitleRef.current || !maxPlayerRef.current) return;
    const updatedLeagueTitle = leagueTitleRef.current.value;
    const updatedMaxPlayer = parseInt(maxPlayerRef.current.value, 10);
    if (isNaN(updatedMaxPlayer)) {
      alert('최대인원수를 숫자로 입력해주세요');
      return;
    }
    if (!confirm('리그를 수정하시겠습니까?')) return;
    const res = await authAPI({
      method: 'post',
      url: `/api/channel/${channelLink}`,
      data: {
        title: updatedLeagueTitle,
        maxPlayer: updatedMaxPlayer,
      },
    });
    if (res.status !== 200) return;
    alert('정보가 수정되었습니다');
    onClose(updatedLeagueTitle, updatedMaxPlayer);
  };

  return (
    <Modal>
      <Container>
        <Wrapper
          css={css`
            padding-bottom: 3rem;
          `}
        >
          <h1>리그 수정하기</h1>
        </Wrapper>
        <Wrapper>
          <FlexWrapper>리그 제목</FlexWrapper>
          <FlexWrapper>
            <Input
              type='text'
              placeholder='리그 제목을 입력해주세요'
              ref={leagueTitleRef}
              defaultValue={leagueTitle}
            />
          </FlexWrapper>
        </Wrapper>
        <Wrapper>
          <FlexWrapper>최대 참여자 인원</FlexWrapper>
          <FlexWrapper>
            <Input
              type='text'
              placeholder='최대 인원을 설정해주세요'
              ref={maxPlayerRef}
              defaultValue={maxPlayer}
            />
          </FlexWrapper>
        </Wrapper>
        <ButtonWrapper>
          <SubmitButton onClick={() => onClose()}>취소</SubmitButton>
          <SubmitButton onClick={onClickSubmit}>수정하기</SubmitButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

export default ModifyChannel;

const Container = styled.div`
  color: black;
  padding: 5%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1.7rem;
  font-weight: bold;
  min-height: 7rem;
`;

const FlexWrapper = styled.div`
  flex: 1;
  justify-content: flex-start;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1.7rem;
  font-weight: bold;
  min-height: 7rem;
`;

const Input = styled.input`
  width: 80%;
  height: 4rem;
  border: none;
  border-radius: 0.6rem;
  padding: 0.6rem;
`;

const SubmitButton = styled.button`
  width: 10rem;
  height: 6rem;
  background-color: #344051;
  border: none;
  border-radius: 0.5rem;
  color: white;
  margin: 0 6rem 0 6rem;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;
