import {Route} from "../router";
import {ServerResponse} from "http";

export default class Home implements Route {
  handle(response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      response.write('Hello World!');
      resolve(response);
    });
  }
}
