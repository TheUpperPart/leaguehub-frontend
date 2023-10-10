import { MatchMessages, MatchPlayerScoreInfos } from '@components/RoundCheckIn';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Client } from '@stomp/stompjs';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

interface CallAdminChatProps {
  client: Client | undefined;
  matchId: string;
  players: MatchPlayerScoreInfos[];
  matchMessage: MatchMessages[];
  requestUser: number;
}

const CallAdminChat = ({
  client,
  matchId,
  players,
  matchMessage,
  requestUser,
}: CallAdminChatProps) => {
  const [chats, setChats] = useState<MatchMessages[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const router = useRouter();
  const { channelLink } = router.query;

  const handleInputMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!client || inputMessage.length === 0) return;
    const requestUserParticipantId = players.find(
      (player) => player.matchPlayerId === requestUser,
    )?.participantId;

    const newMessage = {
      channelLink,
      content: inputMessage,
      matchId,
      participantId: requestUserParticipantId,
      type: 'TEXT',
    };
    client.publish({
      destination: `/app/match/chat`,
      body: JSON.stringify(newMessage),
    });
    setInputMessage('');
  };

  const findUserIMG = (playerParticipantId: number): string => {
    const user = players.find((player) => player.participantId === playerParticipantId);

    if (!user)
      return 'data:image/png;base64,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';
    return user.profileSrc;
  };

  const findUserName = (playerParticipantId: number): string => {
    const user = players.find((player) => player.participantId === playerParticipantId);
    if (!user) return '관리자';
    return user.gameId;
  };

  const findRequestUser = (playerParticipantId: number): number => {
    const user = players.find((player) => player.participantId === playerParticipantId);
    if (!user) return -1;
    return user.matchPlayerId;
  };

  useEffect(() => {
    if (!client) return;
    const subscription = client.subscribe(`/match/${matchId}/chat`, (data) => {
      setChats((prevChat) => [...prevChat, JSON.parse(data.body)]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [client]);

  useEffect(() => {
    if (!matchMessage || matchMessage.length === 0) return;
    setChats(matchMessage);
  }, [matchMessage]);

  return (
    <Container>
      <Header>
        <div>Chat</div>
        <CallAdminButton>Call Admin</CallAdminButton>
      </Header>
      <ChattingWrapper>
        {chats.length !== 0 &&
          chats.map((message, idx) => (
            <ChattingInfo key={idx}>
              <ChattingContent>
                {requestUser === findRequestUser(message.participantId) ? (
                  <MyChattingContent>
                    <MyContentText>{message.content}</MyContentText>
                  </MyChattingContent>
                ) : (
                  <>
                    <ImageWrapper>
                      <Image
                        src={findUserIMG(message.participantId)}
                        alt='프로필사진'
                        width={45}
                        height={45}
                      />
                    </ImageWrapper>
                    <ContentWrapper>
                      <ContentName>{findUserName(message.participantId)}</ContentName>
                      <ContentText>{message.content}</ContentText>
                    </ContentWrapper>
                  </>
                )}
              </ChattingContent>
            </ChattingInfo>
          ))}
      </ChattingWrapper>
      <div
        css={css`
          position: relative;
        `}
      >
        <InputChat
          type='text'
          placeholder='메세지를 입력해주세요'
          value={inputMessage}
          onChange={handleInputMessage}
          onKeyUp={handleKeyPress}
        />
        <SubmitButton onClick={sendMessage} disabled={inputMessage.length === 0}>
          입력
        </SubmitButton>
      </div>
    </Container>
  );
};

export default CallAdminChat;

const Container = styled.div`
  height: 50rem;
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
  height: 40rem;
  overflow: scroll;
`;

const ImageWrapper = styled.div`
  border-radius: 0.3rem;
`;

const ContentWrapper = styled.div`
  margin-left: 0.5rem;
  max-width: 70%;
`;

const ContentName = styled.div`
  padding-top: 0.2rem;
`;

const ContentText = styled.div`
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 0 1rem 1rem 1rem;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
`;

const MyContentText = styled.div`
  padding: 0.5rem;
  border: 1px solid black;
  background: yellow;
  border-radius: 1rem 0 1rem 1rem;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin-right: 1rem;
`;

const ChattingInfo = styled.div`
  min-height: 5rem;
  display: flex;
  align-items: center;
  margin: 0.4rem;
`;

const ChattingContent = styled.div`
  display: flex;
  width: 100%;
`;

const MyChattingContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
