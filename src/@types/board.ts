export interface BoardInfo {
  hostName: string;
  leagueTitle: string;
  gameCategory: number;
  permission: number;
  currentPlayer: number;
  maxPlayer: number;
}

export interface Channels {
  boardId: string;
  boardTitle: string;
  boardIndex: number;
}
