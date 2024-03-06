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
  azure: {
    sasKey: process.env.AZURE_SAS_KEY || 'sas_key',
    accountName: process.env.AZURE_ACCOUNT_NAME || 'account_name',
    containerName: process.env.AZURE_CONTAINER_NAME || 'container_name',
  },
});
