import { SERVER_URL } from '@config/index';
import { rest } from 'msw';
import { BoardInfo } from '@type/board';

interface ChannelInfo {
  [key: string]: Omit<BoardInfo, 'channels'>;
}

interface BoardsInfo {
  [key: string]: Pick<BoardInfo, 'channels'>;
}

const mockChannelInfo: ChannelInfo = {
  '123': {
    hostName: 'host1',
    leagueTitle: '부경대 총장기',
    game: 'TFT',
    permission: 0,
    currentPlayer: 50,
    maxPlayer: 999,
  },
  '234': {
    hostName: 'host2',
    leagueTitle: '부산대 총장기',
    game: 'LOL',
    permission: 1,
    currentPlayer: 77,
    maxPlayer: 999,
  },
  '456': {
    hostName: 'host3',
    leagueTitle: '동의대 총장기',
    game: 'HS',
    permission: 1,
    currentPlayer: 5,
    maxPlayer: 32,
  },
};

const boardsInfo: BoardsInfo = {
  '123': {
    channels: [
      {
        id: 'aaa',
        name: '공지사항',
      },
    ],
  },
  '234': {
    channels: [
      {
        id: 'bbb',
        name: '리그 공지사항',
      },
      {
        id: 'ccc',
        name: '참여자 규칙',
      },
      {
        id: 'ddd',
        name: '참여하기',
      },
    ],
  },
  '456': {
    channels: [
      {
        id: 'eee',
        name: '리그 공지사항',
      },
      {
        id: 'fff',
        name: '참여자 규칙',
      },
      {
        id: 'ggg',
        name: '참여하기',
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
];

export default boardHandlers;
