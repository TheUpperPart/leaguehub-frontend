let SERVER_URL = 'http://54.180.1.85:8080';
const SOCKET_URL = 'ws://54.180.1.85:8080/ws/websocket';

if (process.env.NODE_ENV === 'development') {
  SERVER_URL = 'http://localhost:8080';
}

export { SERVER_URL, SOCKET_URL };
