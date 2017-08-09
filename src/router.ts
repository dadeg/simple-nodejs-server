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

    return new Promise((resolve) => {
      const matchedRouteInfo: RouteRegistrationInfo | undefined = this.registeredRoutes.find(routeInfo => {
        return (routeInfo.method === request.method && routeInfo.pattern === request.url)
      });

      let route = new NullRoute();
      if (matchedRouteInfo) {
        route = matchedRouteInfo.route;
      }

      resolve(route);
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

export class NullRoute implements Route {
  handle(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      response.write('silly user, you made a mistake');
      resolve(response);
    });
  }
}
