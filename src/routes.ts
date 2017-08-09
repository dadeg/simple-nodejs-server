import {IncomingMessage, ServerResponse} from "http";
import {Route} from "./router";

export class Ping implements Route {
  handle(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      response.write('pong');
      resolve(response);
    });
  }
}

export class Home implements Route {
  handle(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      response.write('Hello World!');
      resolve(response);
    });
  }
}
