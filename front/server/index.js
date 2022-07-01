const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./server/data.json');
const middlewares = jsonServer.defaults({
  bodyParser: true,
});

const PORT = 8080;

server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
  console.log(`Mock Server is running (PORT: ${PORT})`);
});
