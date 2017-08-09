import {IncomingMessage, Server, ServerResponse} from 'http';
import Router, {Route} from './router';

const server = new Server();
const router = new Router();

server.on('request', async (request: IncomingMessage, response: ServerResponse) => {
  const route: Route = await router.match(request, response);
  await route.handle(request, response);
  response.end();
});

server.listen(3000, () => {
  console.log('listening on 3000');
});
