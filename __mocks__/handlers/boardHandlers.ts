import { SERVER_URL } from '@config/index';
import { rest } from 'msw';
import { BoardInfo } from '@type/board';

const boardHandlers = [
  rest.get(SERVER_URL + '/api/channel/:channelid', (req, res, ctx) => {
    const { channelid } = req.params;
    let boardInfo: BoardInfo;
    if (channelid === '1') {
      boardInfo = {
        hostName: 'host1',
        leagueTitle: '부경대 총장기',
        game: 'TFT',
        participateNum: 999,
        channels: [
          {
            id: '1',
            name: '공지사항',
          },
        ],
        permission: 0,
      };
    } else if (channelid === '2') {
      boardInfo = {
        hostName: 'host2',
        leagueTitle: '부산대 총장기',
        game: 'LOL',
        participateNum: 11,
        channels: [
          {
            id: '1',
            name: '리그 공지사항',
          },
          {
            id: '2',
            name: '참여자 규칙',
          },
          {
            id: '3',
            name: '참여하기',
          },
        ],
        permission: 1,
      };
    } else {
      boardInfo = {
        hostName: 'host3',
        leagueTitle: '동의대 총장기',
        game: 'HS',
        participateNum: 216,
        channels: [
          {
            id: '1',
            name: '리그 공지사항',
          },
          {
            id: '2',
            name: '참여자 규칙',
          },
          {
            id: '3',
            name: '참여하기',
          },
        ],
        permission: 1,
      };
    }
    return res(ctx.json(boardInfo));
  }),
];

export default boardHandlers;
