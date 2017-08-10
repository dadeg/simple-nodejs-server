import {Route} from "../router";
import {ServerResponse} from "http";
import {Persister} from "../persistence/persister";
import TaskModel from "../models/task";

export default class Task implements Route {
  private persistenceHelper: Persister;

  constructor(persistenceHelper: Persister) {
    this.persistenceHelper = persistenceHelper;
  }

  handle(response: ServerResponse): Promise<ServerResponse> {
    return new Promise((resolve) => {
      const results: Array<TaskModel> = this.persistenceHelper.getAll().map(taskInfo => {
        return new TaskModel(taskInfo.id, taskInfo.label)
      });
      response.write(JSON.stringify(results));
      resolve(response);
    });
  }
}
