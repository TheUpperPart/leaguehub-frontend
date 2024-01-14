import { deleteBoardContents, fetchBoardContents, updateBoardContents } from '@apis/boardContents';
import ContentModify from '@components/Content/ContentModify';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import useLastVisitedBoardLists from '@hooks/useLastVisitedBoardLists';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export interface Content {
  title: string;
  content: string;
}
interface ContentButtonProps {
  onClick?: () => void;
  right?: string;
  backgroundColor?: string;
}

const boardContents = () => {
  const [contents, setContents] = useState<Content>({ title: '', content: '' });
  const [isModify, setIsModify] = useState(false);

  const router = useRouter();
  const { channelLink, boardId } = router.query;
  const { channelPermission } = useChannels();
  const { handleBoard } = useLastVisitedBoardLists();

  const fetchBoardContent = async () => {
    const res = await fetchBoardContents(channelLink as string, boardId as string);
    if (res.status !== 200) return router.push('/');

    setContents(res.data);
  };

  const handleContentUpdate = async ({ title, content }: Content) => {
    const updatedContent: Content = {
      title,
      content,
    };
    if (!channelLink) return;

    const res = await updateBoardContents(channelLink as string, boardId as string, updatedContent);
    if (res.status !== 200) {
      alert('요청실패');
      return;
    }

    setContents(updatedContent);
    setIsModify(false);
    handleBoard(channelLink as string, boardId as string, title);
  };

  const deleteBoard = async () => {
    if (!confirm('공지를 삭제하시겠습니까?')) return;
    const res = await deleteBoardContents(channelLink as string, boardId as string);

    if (res.status !== 200) {
      alert('서버 에러가 발생했습니다.');
      return;
    }

    handleBoard(channelLink as string, '', '');

    alert('정상적으로 처리되었습니다.');
  };

  useEffect(() => {
    setIsModify(false);
    if (!channelLink || !boardId) {
      router.push('/');
      return;
    }
    fetchBoardContent();
  }, [channelLink, boardId]);

  return (
    <Container>
      {isModify ? (
        <ContentModify
          title={contents.title}
          content={contents.content}
          onUpdateContent={handleContentUpdate}
        />
      ) : (
        <>
          <Title>{contents.title}</Title>
          <div
            css={css`
              padding-top: 2rem;
              padding-bottom: 1rem;
              white-space: pre-line;
            `}
          >
            <ReactMarkdown children={contents.content} />
          </div>
          {channelPermission === 0 && (
            <>
              <ModifyButton right='15' backgroundColor='#ff0044' onClick={() => deleteBoard()}>
                공지 삭제
              </ModifyButton>
              <ModifyButton backgroundColor='#0067a3' onClick={() => setIsModify(true)}>
                내용 수정
              </ModifyButton>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default boardContents;

const Container = styled.div`
  padding: 5rem;
  font-size: 2rem;
  max-height: 85vh;
  overflow: auto;
  padding-bottom: 5rem;
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: 900;
  padding-bottom: 2rem;
  border-bottom: 1px solid #d3d3d3;
`;

const ModifyButton = styled.button<ContentButtonProps>`
  font-size: 2rem;
  color: white;
  position: fixed;
  bottom: 3rem;
  right: 5rem;
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  right: ${(props) => props.right + 'rem'};
  background-color: ${(props) => props.backgroundColor};

  &:hover {
    cursor: pointer;
  }
`;
