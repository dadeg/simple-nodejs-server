export interface Persister {
  get(id: number): {id: number, label: string};
  getAll(): Array<{id: number, label: string}>;
}
