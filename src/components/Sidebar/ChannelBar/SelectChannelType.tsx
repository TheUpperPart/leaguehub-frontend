import authAPI from '@apis/authAPI';
import Button from '@components/Button';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import { ChannelCircleProps } from '@type/channelCircle';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
  handleModal: () => void;
}

const SelectChannelType = (props: Props) => {
  const { handleModal } = props;

  const router = useRouter();

  const channels = useChannels();

  const [curIdx, setCurIdx] = useState<number>(0);

  const [channelInput, setChannelInput] = useState<string>();

  const handleRouter = () => {
    handleModal();
    router.push('/make-channel');
  };

  const fetchEnterNewChannel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await authAPI<ChannelCircleProps>({
        method: 'post',
        url: `/api/${channelInput}/participant/observer`,
      });

      const newChannel: ChannelCircleProps = {
        channelLink: res.data.channelLink,
        title: res.data.title,
        category: res.data.category,
        imgSrc: res.data?.imgSrc,
        customChannelIndex: res.data.customChannelIndex,
      };

      channels.addChannel(newChannel);
      handleModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    }
  };

  const handleChannelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelInput(e.target.value);
  };

  return (
    <Container>
      {curIdx === 0 ? (
        <>
          <ModalTitle>대회 개최하기</ModalTitle>
          <ModalSubTitle>대회를 만들고 시작해보세요!</ModalSubTitle>
          <Content>
            <BtnContainer>
              <BtnTitle>대회 개최하기</BtnTitle>
              <Button width={20} height={10} onClick={handleRouter}>
                대회 개최
              </Button>
            </BtnContainer>
            <BtnContainer>
              <BtnTitle>대회 참여하기</BtnTitle>
              <Button width={20} height={10} onClick={() => setCurIdx(1)}>
                대회 참여
              </Button>
            </BtnContainer>
          </Content>
        </>
      ) : (
        <>
          <ModalTitle>대회 참여하기</ModalTitle>
          <ModalSubTitle>대회에 참여하여 우승해보세요!</ModalSubTitle>
          <Content2>
            <FormConatiner>
              <ChannelForm onSubmit={fetchEnterNewChannel}>
                <ChannelInput required value={channelInput} onChange={handleChannelInput} />
                <Button width={10} height={4} type='submit'>
                  참여 하기
                </Button>
              </ChannelForm>
            </FormConatiner>
            <BtnContainer>
              <Button width={20} height={5} onClick={() => setCurIdx(0)}>
                뒤로 가기
              </Button>
            </BtnContainer>
          </Content2>
        </>
      )}
    </Container>
  );
};

export default SelectChannelType;

const Container = styled.div`
  padding: 3rem;
`;

const ModalTitle = styled.h1`
  font-size: 4rem;
  height: 7rem;
  line-height: 7rem;
`;

const ModalSubTitle = styled.div`
  font-size: 2.4rem;
  height: 4rem;
  line-height: 4rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 3rem;
  height: 20rem;
`;

const Content2 = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 3rem;
  height: 20rem;
`;

const BtnContainer = styled.div``;

const BtnTitle = styled.div`
  font-size: 1.5rem;
`;

const FormConatiner = styled.div`
  height: 40rem;
  display: flex;
  align-items: center;
`;

const ChannelForm = styled.form`
  width: 35rem;
  display: flex;
  margin: 0 auto;
  align-items: center;
  background-color: #ffffff;
`;

const ChannelInput = styled.input`
  width: 25rem;
  height: 5rem;
  border: none;

  background-color: #f1f0e8;

  border-radius: 1rem;

  color: #61677a;
`;
ChannelInput.defaultProps = { placeholder: '참여 코드 입력' };
