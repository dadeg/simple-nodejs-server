import {Persister} from "./persister";

export default class FilesystemPersister implements Persister {
  get(id: number): {id: number, label: string} {
    return {id: id, label: 'laundry'};
  }

  getAll(): Array<{id: number, label: string}> {
    return [{id: 123, label: 'laundry'}, {id: 345, label: 'get milk'}]
  }
}
