import { Client } from '@stomp/stompjs';
import { SOCKET_URL } from '@config/index';
import Cookies from 'js-cookie';

export const connectToStomp = () => {
  const client = new Client();
  const accessToken = Cookies.get('accessToken');

  client.configure({
    brokerURL: SOCKET_URL,
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    onConnect: () => {
      console.log('소켓 연결 성공');
    },
    onDisconnect: () => {
      console.log('소켓 연결 종료');
    },
    beforeConnect: () => {
      console.log('소켓 연결 시도');
    },
  });

  return client;
};
