import {IncomingMessage, ServerResponse} from "http";
import {CrudRoute} from "./crud-route";

export default class Home extends CrudRoute {
  get(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      response.write('Hello World!');
      resolve(response);
    });
  }
}
