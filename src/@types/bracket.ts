export interface BracketHeader {
  roundList: number[];
  liveRound: number;
}

interface PlayerInfo {
  gameId: string;
  gameTier: string;
  playerStatus: string;
  score: number;
  profileSrc?: string;
}
interface MatchInfo {
  matchName: string;
  matchLink: string;
  matchStatus: string;
  matchRound: number;
  matchRoundCount: number;
  matchRoundMaxCount: number;
  matchPlayerInfoList: PlayerInfo[];
}

export interface BracketContents {
  myGameId: string;
  matchInfoDtoList: MatchInfo[];
}
