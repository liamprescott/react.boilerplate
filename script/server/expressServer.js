// This is a simple development server for Mac based development
// simply redirects all requests to the main application  entry point

const express = require('express');
const path = require('path');

const server = express();
server.use('/', express.static(path.resolve(`${__dirname} /../../`)));

server.get('/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname} /../../index.htm`));
});

const port = 8000;
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
