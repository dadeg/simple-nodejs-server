import {IncomingMessage, Server, ServerResponse} from 'http';
import Router, {Route} from './router';
import {Home, Ping} from "./routes";

const server = new Server();
const router = new Router();

router.register({route: new Ping(), method: "GET", pattern: "/ping"});
router.register({route: new Home(), method: "GET", pattern: "/"});

server.on('request', async (request: IncomingMessage, response: ServerResponse) => {
  const route: Route = await router.match(request);
  await route.handle(request, response);
  response.end();
});

server.listen(3000, () => {
  console.log('listening on 3000');
});
