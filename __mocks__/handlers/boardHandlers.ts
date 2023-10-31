import { SERVER_URL } from '@config/index';
import { rest } from 'msw';
import { BoardInfo, Channels } from '@type/board';

interface ChannelInfo {
  [key: string]: BoardInfo;
}

interface BoardsInfo {
  [key: string]: {
    myMatchRound: number;
    myMatchId: number;
    channelBoardLoadDtoList: Channels[];
  };
}

const mockChannelInfo: ChannelInfo = {
  '123': {
    hostName: 'host1',
    leagueTitle: '부경대 총장기',
    gameCategory: 0,
    permission: 0,
    currentPlayer: 50,
    maxPlayer: 999,
  },
  '234': {
    hostName: 'host2',
    leagueTitle: '부산대 총장기',
    gameCategory: 1,
    permission: 1,
    currentPlayer: 77,
    maxPlayer: 999,
  },
  '456': {
    hostName: 'host3',
    leagueTitle: '동의대 총장기',
    gameCategory: 2,
    permission: 2,
    currentPlayer: 5,
    maxPlayer: 32,
  },
};

const boardsInfo: BoardsInfo = {
  '123': {
    myMatchRound: 0,
    myMatchId: 0,
    channelBoardLoadDtoList: [
      {
        boardId: 111,
        boardTitle: '공지사항',
        boardIndex: 0,
      },
      {
        boardId: 222,
        boardTitle: '게임 룰',
        boardIndex: 1,
      },
      {
        boardId: 333,
        boardTitle: '커뮤니티',
        boardIndex: 2,
      },
    ],
  },
  '234': {
    myMatchRound: 1,
    myMatchId: 1,
    channelBoardLoadDtoList: [
      {
        boardId: 222,
        boardTitle: '리그 공지사항',
        boardIndex: 0,
      },
      {
        boardId: 333,
        boardTitle: '참여자 규칙',
        boardIndex: 1,
      },
      {
        boardId: 444,
        boardTitle: '참여하기',
        boardIndex: 2,
      },
    ],
  },
  '456': {
    myMatchRound: 2,
    myMatchId: 2,
    channelBoardLoadDtoList: [
      {
        boardId: 333,
        boardTitle: '리그 공지사항',
        boardIndex: 0,
      },
      {
        boardId: 444,
        boardTitle: '참여자 규칙',
        boardIndex: 1,
      },
      {
        boardId: 555,
        boardTitle: '참여하기',
        boardIndex: 2,
      },
    ],
  },
};

const boardHandlers = [
  rest.get(SERVER_URL + '/api/channel/:channelLink', (req, res, ctx) => {
    const { channelLink } = req.params;
    if (channelLink === '123') {
      return res(ctx.json(mockChannelInfo['123']));
    }

    if (channelLink === '234') {
      return res(ctx.json(mockChannelInfo['234']));
    }

    return res(ctx.json(mockChannelInfo['456']));
  }),

  rest.get(SERVER_URL + '/api/channel/:channelLink/boards', (req, res, ctx) => {
    const { channelLink } = req.params;
    if (channelLink === '123') {
      return res(ctx.json(boardsInfo['123']));
    }

    if (channelLink === '234') {
      return res(ctx.json(boardsInfo['234']));
    }

    return res(ctx.json(boardsInfo['456']));
  }),

  rest.get(SERVER_URL + '/api/channel/:channelLink/:boardId', (req, res, ctx) => {
    const { channelLink, boardId } = req.params;
    const title = '임시제목';
    const content = `# H1
## H2
### H3
#### H4
##### H5
, React Markdown!\nThis is **${channelLink} ${boardId}** text rendered in a React component`;

    return res(ctx.json({ title, content }));
  }),
  rest.post(SERVER_URL + '/api/channel/:channelLink/:boardId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];

export default boardHandlers;
