import { MatchPlayerScoreInfos } from '@components/RoundCheckIn';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

interface CallAdminChatProps {
  client: Client | undefined;
  matchId: string;
  players: MatchPlayerScoreInfos[];
}

interface Chat {
  channelId: number;
  content: string;
  matchId: number;
  participantId: number;
  type: string;
}

const CallAdminChat = ({ client, matchId, players }: CallAdminChatProps) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (!client) return;
    const subscription = client.subscribe(`/match/${matchId}/chat`, (data) => {
      setChats([...chats, JSON.parse(data.body)]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [client]);
  return (
    <Container>
      <Header>
        <div>Chat</div>
        <CallAdminButton>Call Admin</CallAdminButton>
      </Header>
      <ChattingWrapper></ChattingWrapper>
      <div
        css={css`
          position: relative;
        `}
      >
        <InputChat />
        <SubmitButton>입력</SubmitButton>
      </div>
    </Container>
  );
};

export default CallAdminChat;

const Container = styled.div`
  height: 40rem;
  background: #fff;
  border-radius: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  color: white;
  background: #202b37;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`;

const CallAdminButton = styled.button`
  background: #fddc8b;
  width: 9rem;
  border: none;
  border-radius: 0.3rem;
`;

const ChattingWrapper = styled.div`
  height: 30rem;
  overflow: scroll;
`;

const InputChat = styled.input`
  width: 90%;
  height: 4rem;
  padding-left: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  background: #f9fafb;
  border: none;
  padding-right: 6rem;
`;

const SubmitButton = styled.button`
  position: absolute;
  width: 4rem;
  top: 1.8rem;
  right: 3.5rem;
  background: #344051;
  color: white;
  border: none;
  border-radius: 0.3rem;
  height: 2.5rem;
  &: hover {
    cursor: pointer;
  }
`;