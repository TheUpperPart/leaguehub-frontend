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
  matchStatus: string;
  matchRound: number;
  matchCurrentSet: number;
  matchSetCurrent: number;
  matchPlayerInfoList: PlayerInfo[];
  matchId: number;
}

export interface BracketContents {
  myGameId: string;
  matchInfoDtoList: MatchInfo[];
}
