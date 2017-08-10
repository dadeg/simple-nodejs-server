import {Route} from "../router";
import {IncomingMessage, ServerResponse} from "http";

export abstract class CrudRoute implements Route {
  handle(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    if (request.method === "GET") {
      return this.get(request, response);
    }
    
    if (request.method === "POST") {
      return this.post(request, response);
    }
  }

  get(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    throw new Error('`get` not implemented');
  }
  post(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    throw new Error('`post` not implemented');
  }
}
