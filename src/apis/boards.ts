import authAPI from '@apis/authAPI';
import { NEWBOARD } from '@constants/MakeBoard';
import { Channels } from '@type/board';
import { MainPageNoticeData } from '@type/mainPage';

interface NewBoard {
  boardId: number;
  boardTitle: string;
  boardIndex: number;
}

interface BoardsInfo {
  myMatchRound: number;
  myMatchId: number;
  channelBoardLoadDtoList: Channels[];
}

export const fetchGamePatchNote = async (board: string) => {
  const res = await authAPI<Array<MainPageNoticeData>>({
    method: 'get',
    url: `/api/notice/${board}`,
  });

  return res;
};

export const fetchBoardLists = async (channelLink: string) => {
  const res = await authAPI<BoardsInfo>({
    method: 'get',
    url: `/api/channel/${channelLink}/boards`,
  });

  return res.data;
};

export const createNewBoard = async (channelLink: string) => {
  const res = await authAPI<NewBoard>({
    method: 'post',
    url: `/api/channel/${channelLink}/new`,
    data: {
      title: NEWBOARD.DEFAULT_TITLE,
      content: NEWBOARD.DEFAULT_CONTENT,
    },
  });

  return res.data;
};

export const changeBoardOrder = async (channelLink: string, customedBoards: Channels[]) => {
  const res = await authAPI({
    method: 'post',
    url: `/api/channel/${channelLink}/order`,
    data: {
      channelBoardLoadDtoList: customedBoards,
    },
  });

  return res;
};
