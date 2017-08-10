import {IncomingMessage, ServerResponse} from "http";
import {CrudRoute} from "./crud-route";

export default class Ping extends CrudRoute {
  get(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      response.write('pong');
      resolve(response);
    });
  }
}
