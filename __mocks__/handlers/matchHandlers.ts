import { SERVER_URL } from '@config/index';
import { rest } from 'msw';

const players = {
  requestMatchPlayerId: '유리',
  matchPlayerScoreInfos: [
    {
      matchPlayerId: 0,
      participnatId: 0,
      matchRank: 1,
      participantImageUrl: '',
      participantGameId: '짱구',
      playerScore: 10,
    },
    {
      matchPlayerId: 1,
      participnatId: 1,
      matchRank: 2,
      participantImageUrl: '',
      participantGameId: '철수',
      playerScore: 9,
    },
    {
      matchPlayerId: 2,
      participnatId: 2,
      matchRank: 3,
      participantImageUrl: '',
      participantGameId: '유리',
      playerScore: 8,
    },
    {
      matchPlayerId: 3,
      participnatId: 3,
      matchRank: 4,
      participantImageUrl: '',
      participantGameId: '맹구',
      playerScore: 7,
    },
    {
      matchPlayerId: 4,
      participnatId: 4,
      matchRank: 5,
      participantImageUrl: '',
      participantGameId: '훈이',
      playerScore: 6,
    },
    {
      matchPlayerId: 5,
      participnatId: 5,
      matchRank: 6,
      participantImageUrl: '',
      participantGameId: '흑곰',
      playerScore: 5,
    },
    {
      matchPlayerId: 6,
      participnatId: 6,
      matchRank: 7,
      participantImageUrl: '',
      participantGameId: '수지',
      playerScore: 3,
    },
    {
      matchPlayerId: 7,
      participnatId: 7,
      matchRank: 8,
      participantImageUrl: '',
      participantGameId: '키자루',
      playerScore: 2,
    },
  ],
};

const matchHandler = [
  rest.get(SERVER_URL + '/api/match/:matchId/player/info', (req, res, ctx) => {
    console.log('qwe');
    return res(ctx.status(200), ctx.json(players));
  }),
];

export default matchHandler;
