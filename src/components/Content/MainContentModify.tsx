import styled from '@emotion/styled';
import { MainContent } from '@pages/contents/[channelLink]/main';
import { MouseEventHandler, useRef } from 'react';

interface MainContentModify {
  onUpdateContent: (updatedContent: MainContent) => void;
  mainContent: MainContent | undefined;
}

const MainContentModify = ({ onUpdateContent, mainContent }: MainContentModify) => {
  const subTitleRef = useRef<HTMLInputElement>(null);
  const channelRuleRef = useRef<HTMLTextAreaElement>(null);
  const channelTimeInfoRef = useRef<HTMLTextAreaElement>(null);
  const channelPrizeInfoRef = useRef<HTMLTextAreaElement>(null);

  const onClick: MouseEventHandler<HTMLElement> = () => {
    if (!confirm('내용을 수정하시겠습니까?')) return;
    const subTitle = subTitleRef.current?.value;
    const channelRule = channelRuleRef.current?.value;
    const channelTimeInfo = channelTimeInfoRef.current?.value;
    const channelPrizeInfo = channelPrizeInfoRef.current?.value;
    if (
      !subTitle ||
      !channelRule ||
      !channelTimeInfo ||
      !channelPrizeInfo ||
      !mainContent?.channelTitleInfo
    ) {
      alert('빈 칸을 입력해주세요');
      return;
    }

    const updatedContent: MainContent = {
      channelTitleInfo: mainContent?.channelTitleInfo,
      channelContentInfo: subTitle,
      channelRuleInfo: channelRule,
      channelTimeInfo: channelTimeInfo,
      channelPrizeInfo: channelPrizeInfo,
    };

    onUpdateContent(updatedContent);
  };

  return (
    <>
      <Title>{mainContent?.channelTitleInfo}</Title>
      <SubTitle>
        <InputField
          placeholder='설명을 추가해주세요'
          defaultValue={mainContent?.channelContentInfo}
          ref={subTitleRef}
        />
      </SubTitle>
      <HomeCardWrapper>
        <TextAreaField
          placeholder='참가조건을 입력해주세요'
          defaultValue={mainContent?.channelRuleInfo}
          ref={channelRuleRef}
        />
        <TextAreaField
          placeholder='대회 일정을 입력해주세요'
          defaultValue={mainContent?.channelTimeInfo}
          ref={channelTimeInfoRef}
        />
        <TextAreaField
          placeholder='대진표 바로가기'
          defaultValue='대진표 바로가기'
          disabled={true}
        />
        <TextAreaField
          placeholder='대회 경품을 입력해주세요'
          defaultValue={mainContent?.channelPrizeInfo}
          ref={channelPrizeInfoRef}
        />
      </HomeCardWrapper>
      <ModifyButton onClick={onClick}>수정 완료</ModifyButton>
    </>
  );
};

export default MainContentModify;

const Title = styled.div`
  padding-top: 10rem;
  font-size: 2.5rem;
  font-weight: bold;
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  padding: 5rem 0 5rem;
`;

const InputField = styled.input`
  width: 80%;
  height: 5vh;
  border-radius: 1rem;
  padding-left: 1rem;
`;

const HomeCardWrapper = styled.div`
  display: flex;
  column-gap: 2rem;
`;

const TextAreaField = styled.textarea`
  width: 22%;
  height: 30rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1rem;
  border-radius: 1rem;
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
