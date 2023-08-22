import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { parse } from 'cookie';

import { SERVER_URL } from '@config/index';

const Bracket = (props) => {
  return (
    <div>
      <h2>Bracket!</h2>
    </div>
  );
};

export default Bracket;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = parse(context.req.headers.cookie || 'no-cookie');
  const channelLink = context.params?.channelLink;

  try {
    const accessToken = cookies.accessToken;

    const res = await axios<{ roundList: number[] }>({
      method: 'get',
      url: `${SERVER_URL}/api/match/${channelLink}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      props: {
        data: {
          roundList: res.data.roundList,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};
