import Modal from '@components/Modal';
import useProfile from '@hooks/useProfile';

const JoinLeague = () => {
  const { profile } = useProfile();

  return (
    <Modal>
      <>
        <p>이름</p>
        {profile?.nickname}
      </>
    </Modal>
  );
};

export default JoinLeague;
