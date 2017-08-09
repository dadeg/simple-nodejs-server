import {IncomingMessage, ServerResponse} from "http";

export default class Router {
  match(request: IncomingMessage, response: ServerResponse): Promise<Route> {
    return new Promise(resolve => {
      resolve(new Ping());
    });
  }
}

export interface Route {
  handle(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse>;
}

class Ping implements Route {
  handle(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      response.write('pong');
      resolve(response);
    });
  }
}
