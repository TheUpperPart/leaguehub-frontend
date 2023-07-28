import Modal from '@components/Modal';
import { SERVER_URL } from '@config/index';
import styled from '@emotion/styled';
import useProfile from '@hooks/useProfile';
import axios from 'axios';
import { ChangeEvent, useState, MouseEventHandler, useEffect, useRef } from 'react';

const JoinLeague = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string>('');
  const [tier, setTier] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const { profile } = useProfile();
  const inputRef = useRef<HTMLInputElement>(null);

  const submitGameId: MouseEventHandler<HTMLElement> = async () => {
    if (gameId.length < 2) {
      return;
    }
    const userTier: string = (await axios.get(SERVER_URL + '/api/stat?gameid=' + gameId)).data.tier;
    setTier(userTier);
  };

  const nicknameHandler: MouseEventHandler<HTMLElement> = () => {
    if (nickname) {
      setNickname(null);
      return;
    }
    const inputVal = inputRef.current?.value;
    if (inputVal) setNickname(inputVal);
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
                <Input type='text' placeholder='닉네임' ref={inputRef} />
              </>
            )}
            <Button onClick={nicknameHandler}>{nickname ? '수정' : '확인'}</Button>
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
