import { GetServerSidePropsContext } from 'next';
import styled from '@emotion/styled';
import { useState } from 'react';
import { parse } from 'cookie';
import axios from 'axios';

import { SERVER_URL } from '@config/index';
import { BracketHeader } from '@type/bracket';
import BracketHeaders from '@components/Bracket/BracketHeaders';
import BracketContents from '@components/Bracket/BracketContents';

interface Props {
  data: BracketHeader;
}

const Bracket = (props: Props) => {
  const [curRound, setCurRound] = useState<number>(1);

  const handleCurRound = (round: number) => {
    setCurRound(round);
  };

  return (
    <Container>
      <BracketHeaders
        roundList={props.data.roundList}
        liveRound={props.data.liveRound}
        curRound={curRound}
        handleCurRound={handleCurRound}
      />
      <Content>
        <BracketContents curRound={curRound} />
      </Content>
    </Container>
  );
};

export default Bracket;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = parse(context.req.headers.cookie || 'no-cookie');
  const channelLink = context.params?.channelLink;

  try {
    const accessToken = cookies.accessToken;

    const res = await axios<BracketHeader>({
      method: 'get',
      url: `${SERVER_URL}/api/match/${channelLink}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { roundList, liveRound } = res.data;

    return {
      props: {
        data: {
          roundList,
          liveRound,
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

const Container = styled.div`
  margin: 2rem 2rem;
`;

const Content = styled.div`
  margin: 2rem 0;
`;
