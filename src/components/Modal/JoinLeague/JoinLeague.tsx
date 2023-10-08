import authAPI from '@apis/authAPI';
import Icon from '@components/Icon';
import { SERVER_URL } from '@config/index';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useProfile from '@hooks/useProfile';
import { useState, MouseEventHandler, useEffect, useRef } from 'react';

interface JoinLeagueProps {
  channelLink: string;
  onClose: () => void;
}

const JoinLeague = ({ onClose, channelLink }: JoinLeagueProps) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string>('');
  const [tier, setTier] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const { profile } = useProfile();
  const userNameRef = useRef<HTMLInputElement>(null);
  const gameIdRef = useRef<HTMLInputElement>(null);

  const submitGameId: MouseEventHandler<HTMLElement> = async () => {
    const gameIdVal = gameIdRef.current?.value;
    if (!gameIdVal || gameIdVal.length < 2) {
      return;
    }
    const userTier: string = (
      await authAPI.get(SERVER_URL + '/api/participant/stat?gameid=' + gameIdVal)
    ).data.tier;
    setTier(userTier);
    setGameId(gameIdVal);
  };

  const nicknameHandler: MouseEventHandler<HTMLElement | SVGElement> = () => {
    if (nickname) {
      setNickname(null);
      return;
    }
    const inputVal = userNameRef.current?.value;
    if (inputVal) setNickname(inputVal);
  };

  const submitHandler = (): boolean => {
    if (nickname && checked) return false;
    return true;
  };

  const onClickSubmit: MouseEventHandler<HTMLElement> = async () => {
    if (!nickname || !checked) return;
    const res = await authAPI({
      method: 'post',
      url: `/api/${channelLink}/participant`,
      data: {
        gameId,
        nickname,
      },
    });
    if (res.status !== 200) return;
    alert('정상적으로 리그참여 요청을 전송했어요');
    onClose();
  };

  useEffect(() => {
    if (profile) setNickname(profile.nickname);
  }, []);

  return (
    <Container>
      <Wrapper
        css={css`
          padding-bottom: 3rem;
        `}
      >
        <h1>참가 신청서</h1>
      </Wrapper>
      <Wrapper>
        <FlexWrapper>이름</FlexWrapper>
        <FlexWrapper>
          <InputButton>
            {nickname ? (
              <>
                <div
                  css={css`
                    font-size: 1.5rem;
                    display: inline-block;
                  `}
                >
                  {nickname}
                </div>
                <IconWrapper>
                  <Icon kind='modify' aria-label='modify' onClick={nicknameHandler} />
                </IconWrapper>
              </>
            ) : (
              <>
                <Input type='text' placeholder='닉네임' ref={userNameRef} />
                <Button onClick={nicknameHandler}>확인</Button>
              </>
            )}
          </InputButton>
        </FlexWrapper>
      </Wrapper>
      <Wrapper>
        <FlexWrapper>게임 아이디</FlexWrapper>
        <FlexWrapper>
          <InputButton>
            <Input type='text' placeholder='게임 아이디' ref={gameIdRef} />
            <Button onClick={submitGameId}>입력</Button>
          </InputButton>
        </FlexWrapper>
      </Wrapper>
      <Wrapper>
        <FlexWrapper>현재 티어</FlexWrapper>
        <FlexWrapper>
          {tier && (
            <div
              css={css`
                font-size: 1.5rem;
                color: blue;
              `}
            >
              {tier}
            </div>
          )}
        </FlexWrapper>
      </Wrapper>
      <CheckboxWrapper>
        <input type='checkbox' id='confirmJoin' onClick={() => setChecked(!checked)} />
        <label
          css={css`
            display: flex;
            align-items: center;
          `}
          htmlFor='confirmJoin'
        >
          신청 하시겠습니까?
        </label>
      </CheckboxWrapper>
      <Wrapper>
        <SubmitButton onClick={onClose}>취소</SubmitButton>
        <SubmitButton disabled={submitHandler()} onClick={onClickSubmit}>
          신청
        </SubmitButton>
      </Wrapper>
    </Container>
  );
};

export default JoinLeague;

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

const Input = styled.input`
  width: 80%;
  height: 4rem;
  border: none;
  border-radius: 0.6rem;
  padding: 0.6rem;
`;

const Button = styled.button`
  position: absolute;
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  background-color: #344051;
  border: none;
  color: white;
  border-radius: 0.6rem;
  right: 3.2rem;
  top: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  background-color: white;
  margin: 0 auto;
  width: 50%;
  height: 5rem;
  color: #616161;
  border-radius: 2rem;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
  margin-bottom: 3rem;
`;

const InputButton = styled.div`
  position: relative;
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

const IconWrapper = styled.div`
  float: right;
  margin-right: 3rem;
`;
