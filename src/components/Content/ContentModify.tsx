import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Content } from '@pages/contents/[channelLink]/[boardId]';
import { useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface ContentModifyProps {
  title: string;
  content: string;
  onUpdateContent: (updatedContent: Content) => void;
}

interface ContentButtonProps {
  onClick?: () => void;
  right: string;
  backgroundColor: string;
}

const ContentModify = ({ title, content, onUpdateContent }: ContentModifyProps) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdateContent = () => {
    if (textRef.current === null || titleRef.current === null) {
      alert('글자를 입력해주세요!');
      return;
    }
    if (textRef.current.value.length < 5) {
      alert('5글자 이상 입력해주세요!');
      return;
    }

    const res = window.confirm('수정하겠습니까?');
    if (res) {
      const modifiedContent: Content = {
        title: titleRef.current.value,
        content: textRef.current.value,
      };
      onUpdateContent(modifiedContent);
    }
  };

  return (
    <>
      {isPreviewModalOpen && titleRef.current && textRef.current && (
        <Modal onClose={() => setIsPreviewModalOpen(false)}>
          <div
            css={css`
              text-align: start;
              white-space: pre-line;
            `}
          >
            <PreviewTitle>{titleRef.current.value}</PreviewTitle>
            <ReactMarkdown children={textRef.current.value} />
          </div>
        </Modal>
      )}
      <TitleField placeholder={'제목을 입력해주세요'} defaultValue={title} ref={titleRef} />
      <InputField placeholder={'텍스트를 입력해주세요'} defaultValue={content} ref={textRef} />
      <ContentButton right='25' backgroundColor='#ff0044'>
        삭제하기
      </ContentButton>
      <ContentButton right='15' backgroundColor='grey' onClick={() => setIsPreviewModalOpen(true)}>
        미리보기
      </ContentButton>
      <ContentButton right='5' backgroundColor='#0067a3' onClick={handleUpdateContent}>
        수정완료
      </ContentButton>
    </>
  );
};

export default ContentModify;

const TitleField = styled.input`
  width: 100%;
  font-size: 1.5rem;
  height: 5vh;
  border: 2px solid #d3d3d3;
  outline-color: #039be5;
  border-radius: 1rem;
  padding-left: 1rem;
  margin-bottom: 2vh;
`;

const InputField = styled.textarea`
  width: 100%;
  min-height: 68vh;
  resize: vertical;
  border: 2px solid #d3d3d3;
  outline-color: #039be5;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1.5rem;
`;

const ContentButton = styled.button<ContentButtonProps>`
  font-size: 2rem;
  color: white;
  position: fixed;
  bottom: 3rem;
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  &: hover {
    cursor: pointer;
  }
  right: ${(props) => props.right + 'rem'};
  background-color: ${(props) => props.backgroundColor};
`;

const PreviewTitle = styled.div`
  font-size: 2em;
  font-weight: 900;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #c0c0c0;
  text-align: center;
`;
