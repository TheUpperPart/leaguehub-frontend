import Modal from '@components/Modal';
import { SERVER_URL } from '@config/index';
import styled from '@emotion/styled';
import useProfile from '@hooks/useProfile';
import axios from 'axios';
import { ChangeEvent, useState, MouseEventHandler } from 'react';

const JoinLeague = () => {
  const [gameId, setGameId] = useState<string>('');
  const [joinCode, setJoinCode] = useState<string>('');
  const [tier, setTier] = useState<string | null>(null);
  const { profile } = useProfile();

  const submitGameId: MouseEventHandler<HTMLElement> = async () => {
    if (gameId.length < 2) {
      return;
    }
    const userTier: string = (await axios.get(SERVER_URL + '/api/stat?gameid=' + gameId)).data.tier;
    setTier(userTier);
  };

  return (
    <Modal>
      <>
        <p>이름</p>
        {profile?.nickname}
        <p>게임 아이디</p>
        <Input type='text' placeholder='게임 아이디' onChange={(e) => setGameId(e.target.value)} />
        <Button onClick={submitGameId}>입력</Button>
        {tier && <p>{tier}</p>}
        <p>참여 코드</p>
        <Input
          type='text'
          placeholder='코드번호'
          onChange={(e) => setJoinCode(e.target.value)}
        ></Input>
      </>
    </Modal>
  );
};

export default JoinLeague;

const Input = styled.input``;
const Button = styled.button``;
