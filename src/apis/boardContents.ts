import authAPI from '@apis/authAPI';
import { Content } from '@pages/contents/[channelLink]/[boardId]';

export const fetchBoardContents = async (channelLink: string, boardId: string) => {
  const res = await authAPI<Content>({
    method: 'get',
    url: `/api/channel/${channelLink}/${boardId}`,
  });

  return res;
};

export const updateBoardContents = async (
  channelLink: string,
  boardId: string,
  updatedContent: Content,
) => {
  const res = await authAPI({
    method: 'post',
    url: `/api/channel/${channelLink}/${boardId}`,
    data: {
      title: updatedContent.title,
      content: updatedContent.content,
    },
  });

  return res;
};

export const deleteBoardContents = async (channelLink: string, BoardId: string) => {
  const res = await authAPI({ method: 'delete', url: `/api/channel/${channelLink}/${boardId}` });

  return res;
};
