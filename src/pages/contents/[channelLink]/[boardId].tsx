import authAPI from '@apis/authAPI';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const boardContents = () => {
  const [contents, setContents] = useState('');

  const router = useRouter();
  const { channelLink, boardId } = router.query;

  const fetchBoardContent = async (channelLink: string, boardId: string) => {
    const res = await authAPI<string>({
      method: 'get',
      url: `/api/channel/${channelLink}/${boardId}`,
    });
    setContents(res.data);
  };

  useEffect(() => {
    if (!channelLink || !boardId) {
      router.push('/');
      return;
    }
    const channelLinkString = typeof channelLink === 'string' ? channelLink : channelLink[0];
    const boardIdString = typeof boardId === 'string' ? boardId : boardId[0];
    fetchBoardContent(channelLinkString, boardIdString);
  }, [channelLink, boardId]);

  return <ReactMarkdown children={contents} />;
};

export default boardContents;
