const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

// Use port 4000 so it matches the frontend
const port = process.env.PORT || 4000;

const server = http.createServer(app);

// Initialize websocket server
initializeSocket(server);

server.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
