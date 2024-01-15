import { fetchMainContents, updateMainContents } from '@apis/mainContents';
import HomeCard from '@components/Card/HomeCard';
import MainContentModify from '@components/Content/MainContentModify';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface MainContent {
  readonly channelTitleInfo: string;
  readonly channelContentInfo: string;
  readonly channelRuleInfo: string;
  readonly channelTimeInfo: string;
  readonly channelPrizeInfo: string;
}

const Main = () => {
  const [mainContents, setMainContents] = useState<MainContent>();
  const [isModify, setIsModify] = useState(false);

  const router = useRouter();
  const { channelPermission } = useChannels();
  const channelLink = router.query.channelLink;
  
  const { data, isSuccess, refetch } = useQuery<MainContent | undefined>({
    queryKey: ['getMainContents', channelLink],
    queryFn: () => fetchMainContents(channelLink as string),
  });

  useEffect(() => {
    if (isSuccess && data) setMainContents(data);
  }, [isSuccess]);

  useEffect(() => {
    refetch();
  }, [router.query.channelLink as string]);

  const handleContentUpdate = async (updatedContent: MainContent) => {
    if (!channelLink) return;

    await updateMainContents(channelLink as string, updatedContent);

    setMainContents(updatedContent);
    setIsModify(false);
  };

  return (
    <Container>
      {isModify ? (
        <MainContentModify onUpdateContent={handleContentUpdate} mainContent={mainContents} />
      ) : (
        <>
          <Title>{mainContents?.channelTitleInfo}</Title>
          <SubTitle>{mainContents?.channelContentInfo}</SubTitle>

          <HomeCardWrapper>
            <HomeCard contents={mainContents?.channelRuleInfo} />
            <HomeCard contents={mainContents?.channelTimeInfo} />
            <HomeCard
              contents='대진표 바로가기'
              onClick={() => router.push(`/contents/${channelLink}/bracket`)}
            />
            <HomeCard contents={mainContents?.channelPrizeInfo} />
          </HomeCardWrapper>
          {channelPermission === 0 && (
            <ModifyButton onClick={() => setIsModify(true)}>내용 수정</ModifyButton>
          )}
        </>
      )}
    </Container>
  );
};

export default Main;

const Container = styled.div`
  padding: 5%;
`;

const Title = styled.div`
  padding-top: 10rem;
  font-size: 2.5rem;
  font-weight: bold;
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  padding: 5rem 0 5rem;
`;

const HomeCardWrapper = styled.div`
  display: flex;
  column-gap: 2rem;
`;

const ModifyButton = styled.button`
  font-size: 2rem;
  color: white;
  position: fixed;
  bottom: 3rem;
  right: 5rem;
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #0067a3;

  &: hover {
    cursor: pointer;
  }
`;
