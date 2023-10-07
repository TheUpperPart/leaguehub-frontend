import RoundCheckIn from '@components/RoundCheckIn';
import { useRouter } from 'next/router';

const CheckIn = () => {
  const router = useRouter();
  const { matchId, channelLink } = router.query;

  if (!matchId || !channelLink) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RoundCheckIn channelLink={channelLink as string} matchId={matchId as string} />
    </>
  );
};

export default CheckIn;
