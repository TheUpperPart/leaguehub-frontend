import Modal from '@components/Modal';
import { SERVER_URL } from '@config/index';
import styled from '@emotion/styled';
import useProfile from '@hooks/useProfile';
import axios from 'axios';
import { ChangeEvent, useState, MouseEventHandler, useEffect } from 'react';

const JoinLeague = () => {
  const [nickname, setNickname] = useState<string>();
  const [gameId, setGameId] = useState<string>('');
  const [joinCode, setJoinCode] = useState<string>('');
  const [tier, setTier] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const { profile } = useProfile();

  const submitGameId: MouseEventHandler<HTMLElement> = async () => {
    if (gameId.length < 2) {
      return;
    }
    const userTier: string = (await axios.get(SERVER_URL + '/api/stat?gameid=' + gameId)).data.tier;
    setTier(userTier);
  };

  useEffect(() => {
    if (profile) setNickname(profile.nickname);
  }, []);

  return (
    <Modal>
      <Container>
        <Wrapper>
          <FlexWrapper>이름</FlexWrapper>
          <FlexWrapper>
            {nickname ? (
              nickname
            ) : (
              <>
                <Input
                  type='text'
                  placeholder='닉네임'
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                />
                <Button onClick={() => setNickname()}>수정</Button>
              </>
            )}
          </FlexWrapper>
        </Wrapper>
        <Wrapper>
          <FlexWrapper>게임 아이디</FlexWrapper>
          <FlexWrapper>
            <Input
              type='text'
              placeholder='게임 아이디'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setGameId(e.target.value)}
            />
            <Button onClick={submitGameId}>입력</Button>
          </FlexWrapper>
        </Wrapper>
        <Wrapper>
          <FlexWrapper>현재 티어</FlexWrapper>
          <FlexWrapper>{tier && <div>{tier}</div>}</FlexWrapper>
        </Wrapper>
        <Wrapper>
          <FlexWrapper>참여 코드</FlexWrapper>
          <FlexWrapper>
            <Input
              type='text'
              placeholder='코드번호'
              onChange={(e: ChangeEvent<HTMLInputElement>) => setJoinCode(e.target.value)}
            ></Input>
          </FlexWrapper>
        </Wrapper>
        <Wrapper>
          <Input type='checkbox' id='confirmJoin' onClick={() => setChecked(!checked)} />
          <label htmlFor='confirmJoin'>신청 하시겠습니까?</label>
        </Wrapper>
        <Wrapper>
          <Button>취소</Button>
          <Button disabled={!checked}>신청</Button>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default JoinLeague;

const Container = styled.div`
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FlexWrapper = styled.div`
  flex: 1;
  justify-content: flex-start;
`;

const Input = styled.input``;
const Button = styled.button``;
