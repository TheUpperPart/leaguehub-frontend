export interface BoardInfo {
  hostName: string;
  leagueTitle: string;
  game: string;
  permission: number;
  currentPlayer: number;
  maxPlayer: number;
}

export interface Channels {
  boardId: string;
  boardTitle: string;
  boardIndex: number;
}
