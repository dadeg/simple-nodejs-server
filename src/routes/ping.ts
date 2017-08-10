import {Route} from "../router";
import {ServerResponse} from "http";

export default class Ping implements Route {
  handle(response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      response.write('pong');
      resolve(response);
    });
  }
}
