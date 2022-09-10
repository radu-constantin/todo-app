const app = require('./app');
const http = require('http');
const port = 3000; // Will have to be moved to config file later on
// const config = require('./utils/config');
// const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})