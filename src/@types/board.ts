export interface BoardInfo {
  hostName: string;
  leagueTitle: string;
  game: string;
  permission: number;
  currentPlayer: number;
  maxPlayer: number;
  channels: {
    id: string;
    name: string;
  }[];
}
