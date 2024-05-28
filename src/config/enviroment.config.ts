export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    host: process.env.DATABASE_HOST || '127.0.0.1:27017',
  },
  websocket: {
    port: parseInt(process.env.WEBSOCKET_PORT || '3600', 10),
    cors: {
      origin: process.env.WEBSOCKET_CORS_ORIGIN || '*',
    },
  },
});
