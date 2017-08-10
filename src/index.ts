import {IncomingMessage, Server, ServerResponse} from 'http';
import Router, {Route} from './router';
import Ping from "./routes/ping";
import Task from "./routes/task";
import Home from "./routes/home";

import FakePersister from "./persistence/filesystem-persister";

const server = new Server();
const router = new Router();

//const persistenceHelper = new LocalStoragePersister();
//const persistenceHelper = new FilesystemPersister();
const persistenceHelper = new FakePersister();

router.register({route: new Ping(), method: "GET", pattern: "/ping"});
router.register({route: new Home(), method: "GET", pattern: "/"});
router.register({route: new Task(persistenceHelper), method: "GET", pattern: "/tasks"});
router.register({route: new Task(persistenceHelper), method: "POST", pattern: "/tasks"});

server.on('request', async (request: IncomingMessage, response: ServerResponse) => {
  response.setHeader('Content-Type', 'application/json');

  try {
    const route: Route = await router.match(request);
    await route.handle(request, response);
  } catch (error) {
    response.statusCode = 500;
    response.write(error.message);
  } finally {
    response.end();
  }

});

server.listen(3000, () => {
  console.log('listening on 3000');
});
