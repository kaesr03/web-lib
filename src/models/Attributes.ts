import { UserProps } from './User';

export class Attributes<T extends object> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}

// example
// const attrs = new Attributes<UserProps>({
//   id: 5,
//   age: 20,
//   name: 'andy',
// });

// const name = attrs.get('name');
// const age = attrs.get('age');
// const id = attrs.get('id');
