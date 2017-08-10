export default class Task {
  private id: number;
  private label: string;

  constructor(id: number, label: string) {
    this.id = id;
    this.label = label;
  }
  toString(): string {
    return this.label;
  }
}
