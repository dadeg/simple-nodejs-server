import {IncomingMessage, ServerResponse} from "http";
import {Persister} from "../persistence/persister";
import TaskModel from "../models/task";
import {CrudRoute} from "./crud-route";

export default class Task extends CrudRoute {
  private persistenceHelper: Persister;

  constructor(persistenceHelper: Persister) {
    super();
    this.persistenceHelper = persistenceHelper;
  }

  get(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      const results: Array<TaskModel> = this.persistenceHelper.getAll().map(taskInfo => {
        return new TaskModel(taskInfo.id, taskInfo.label)
      });
      response.write(JSON.stringify(results));
      resolve(response);
    });
  }

  post(request: IncomingMessage, response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      const results: Array<TaskModel> = this.persistenceHelper.getAll().map(taskInfo => {
        return new TaskModel(taskInfo.id, taskInfo.label)
      });
      response.write(JSON.stringify(results));
      resolve(response);
    });
  }
}
