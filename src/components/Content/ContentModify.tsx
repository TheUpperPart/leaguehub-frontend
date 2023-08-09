import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface ContentModifyProps {
  content: string;
  onUpdateContent: (updatedContent: string) => void;
}

interface ContentButtonProps {
  onClick?: () => void;
  right: string;
  backgroundColor: string;
}

const ContentModify = ({ content, onUpdateContent }: ContentModifyProps) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdateContent = () => {
    if (textRef.current) onUpdateContent(textRef.current.value);
  };

  return (
    <>
      {isPreviewModalOpen && textRef.current && (
        <Modal onClose={() => setIsPreviewModalOpen(false)}>
          <div
            css={css`
              text-align: start;
            `}
          >
            <ReactMarkdown children={textRef.current.value} />
          </div>
        </Modal>
      )}
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

const InputField = styled.textarea`
  width: 100%;
  min-height: 75vh;
  border: none;
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
