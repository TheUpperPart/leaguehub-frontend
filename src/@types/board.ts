export interface BoardInfo {
  hostName: string;
  leagueTitle: string;
  game: string;
  participateNum: number;
  channels: {
    id: string;
    name: string;
  }[];
  permission: number;
}
