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
  matchId: number;
  matchStatus: 'READY' | 'PROGRESS' | 'END';
  matchRound: number;
  matchCurrentSet: number;
  matchSetCurrent: number;
  matchPlayerInfoList: PlayerInfo[];
  alarm: boolean;
}

export interface BracketContents {
  myGameId: string;
  matchInfoDtoList: MatchInfo[];
}
