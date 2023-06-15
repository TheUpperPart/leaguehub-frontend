let SERVER_URL = 'http://localhost:4000';

if (process.env.NODE_ENV === 'development') {
  SERVER_URL = 'http://localhost:8080';
}

export { SERVER_URL };
