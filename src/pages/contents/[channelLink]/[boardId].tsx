import authAPI from '@apis/authAPI';
import ContentModify from '@components/Content/ContentModify';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const boardContents = () => {
  const [contents, setContents] = useState('');
  const [isModify, setIsModify] = useState(false);

  const router = useRouter();
  const { channelLink, boardId } = router.query;

  const fetchBoardContent = async (channelLink: string, boardId: string) => {
    const res = await authAPI<string>({
      method: 'get',
      url: `/api/channel/${channelLink}/${boardId}`,
    });
    setContents(res.data);
  };

  const handleContentUpdate = (updatedContent: string) => {
    setContents(updatedContent);
    setIsModify(false);
  };

  useEffect(() => {
    setIsModify(false);
    if (!channelLink || !boardId) {
      router.push('/');
      return;
    }
    const channelLinkString = typeof channelLink === 'string' ? channelLink : channelLink[0];
    const boardIdString = typeof boardId === 'string' ? boardId : boardId[0];
    fetchBoardContent(channelLinkString, boardIdString);
  }, [channelLink, boardId]);

  return (
    <Container>
      {isModify ? (
        <ContentModify content={contents} onUpdateContent={handleContentUpdate} />
      ) : (
        <>
          <div
            css={css`
              padding-bottom: 1rem;
            `}
          >
            <ReactMarkdown children={contents} />
          </div>
          <ModifyButton>공지 삭제</ModifyButton>
          <ModifyButton onClick={() => setIsModify(true)}>내용 수정</ModifyButton>
        </>
      )}
    </Container>
  );
};

export default boardContents;

const Container = styled.div`
  padding: 5rem;
  font-size: 2rem;
  position: relative;
  max-height: 85vh;
  overflow: auto;
  padding-bottom: 5rem;
`;

const ModifyButton = styled.button`
  font-size: 2rem;
  color: white;
  background-color: #0067a3;
  position: fixed;
  bottom: 3rem;
  right: 5rem;
  border: none;
  padding: 1rem;
  border-radius: 1rem;

  &:hover {
    cursor: pointer;
  }
`;