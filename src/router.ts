import {IncomingMessage, ServerResponse} from "http";

export default class Router {
  private registeredRoutes: Array<RouteRegistrationInfo>;

  constructor() {
    this.registeredRoutes = [];
  }

  register(routeInfo: RouteRegistrationInfo) {
    this.registeredRoutes.push(routeInfo);
  }

  match(request: IncomingMessage): Promise<Route> {

    return new Promise((resolve, reject) => {
      const matchedRouteInfo: RouteRegistrationInfo | undefined = this.registeredRoutes.find(routeInfo => {
        return (routeInfo.method === request.method && routeInfo.pattern === request.url)
      });

      if (matchedRouteInfo) {
        resolve(matchedRouteInfo.route);
      } else {
        reject(new Error('bad url'));
      }


    });
  }
}

export type RouteRegistrationInfo = Readonly<{
  route: Route;
  method: string;
  pattern: string;
}>

export interface Route {
  handle(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse>;

}

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
