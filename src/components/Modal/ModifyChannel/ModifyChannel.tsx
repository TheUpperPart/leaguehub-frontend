import authAPI from '@apis/authAPI';
import Modal from '@components/Modal';
import styled from '@emotion/styled';

interface ModifyChannelProps {
  channelLink: string;
  leagueTitle: string;
  maxPlayer: number;
  onClose: (leagueTitle?: string, maxPlayer?: number) => void;
}

const ModifyChannel = ({ channelLink, leagueTitle, maxPlayer, onClose }: ModifyChannelProps) => {
  const onClickSubmit = async () => {
    if (!confirm('채널을 수정하시겠습니까?')) return;
    const res = await authAPI({ method: 'post', url: `/url/channel/${channelLink}` });
    if (res.status !== 200) return;
    alert('정보가 수정되었습니다');
    onClose(leagueTitle, maxPlayer);
  };

  return (
    <Modal>
      <Container>
        <ButtonWrapper>
          <SubmitButton onClick={() => onClose()}>취소</SubmitButton>
          <SubmitButton onClick={onClickSubmit}>수정하기</SubmitButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

export default ModifyChannel;

const Container = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1.7rem;
  font-weight: bold;
  min-height: 7rem;
`;

const SubmitButton = styled.button`
  width: 10rem;
  height: 6rem;
  background-color: #344051;
  border: none;
  border-radius: 0.5rem;
  color: white;
  margin: 0 6rem 0 6rem;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;
