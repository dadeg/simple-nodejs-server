import {IncomingMessage, ServerResponse} from "http";

export default class Router {
  private registeredRoutes: Array<RouteRegistrationInfo>;

  constructor() {
    this.registeredRoutes = [];
    this.registeredRoutes.unshift({route: new NullRoute(), method: "GET", pattern: "default route not found"})
  }

  register(routeInfo: RouteRegistrationInfo) {
    this.registeredRoutes.unshift(routeInfo);
  }

  match(request: IncomingMessage): Promise<Route> {
    return new Promise((resolve) => {
      const route: Route = this.getMatchedRoute(request);
      resolve(route);
    });
  }

  private getMatchedRoute(request: IncomingMessage): Route {
    const matchedRouteInfo: RouteRegistrationInfo | undefined = this.registeredRoutes.find(routeInfo => {
      return (routeInfo.method === request.method && routeInfo.pattern === request.url);
    });

    if (matchedRouteInfo) {
      return matchedRouteInfo.route;
    } else {
      return new NullRoute();
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

export class NullRoute implements Route {
  handle(response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      response.write('silly user, you made a mistake');
      resolve(response);
    });
  }
}
