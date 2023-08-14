import { SERVER_URL } from '@config/index';
import { rest } from 'msw';
import { BoardInfo, Channels } from '@type/board';

interface ChannelInfo {
  [key: string]: BoardInfo;
}

interface BoardsInfo {
  [key: string]: Channels[];
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
    permission: 1,
    currentPlayer: 5,
    maxPlayer: 32,
  },
};

const boardsInfo: BoardsInfo = {
  '123': [
    {
      boardId: 'aaa',
      boardTitle: '공지사항',
      boardIndex: 0,
    },
  ],
  '234': [
    {
      boardId: 'bbb',
      boardTitle: '리그 공지사항',
      boardIndex: 0,
    },
    {
      boardId: 'ccc',
      boardTitle: '참여자 규칙',
      boardIndex: 1,
    },
    {
      boardId: 'ddd',
      boardTitle: '참여하기',
      boardIndex: 2,
    },
  ],
  '456': [
    {
      boardId: 'eee',
      boardTitle: '리그 공지사항',
      boardIndex: 0,
    },
    {
      boardId: 'fff',
      boardTitle: '참여자 규칙',
      boardIndex: 1,
    },
    {
      boardId: 'ggg',
      boardTitle: '참여하기',
      boardIndex: 2,
    },
  ],
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
    const content = `# H1
## H2
### H3
#### H4
##### H5
, React Markdown!\nThis is **${channelLink} ${boardId}** text rendered in a React component`;

    return res(ctx.json(content));
  }),
];

export default boardHandlers;
