import { MatchMessages, MatchPlayerScoreInfos } from '@components/RoundCheckIn';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Client } from '@stomp/stompjs';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { BASE_PROFILE_IMG } from '@config/index';

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

    if (!user) return BASE_PROFILE_IMG;
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
