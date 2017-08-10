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
      resolve(this.getMatchedRoute(request));
    });
  }

  private getMatchedRoute(request: IncomingMessage): Route {
    const matchedRouteInfo: RouteRegistrationInfo | undefined = this.registeredRoutes.find(routeInfo => {
      return (routeInfo.method === request.method && routeInfo.pattern === request.url);
    });

    if (matchedRouteInfo) {
      return matchedRouteInfo.route;
    } else {
      throw new Error("no route found.");
    }
  }
}

export type RouteRegistrationInfo = Readonly<{
  route: Route;
  method: string;
  pattern: string;
}>

export interface Route {
  handle(response: ServerResponse): Promise<ServerResponse>;
}
