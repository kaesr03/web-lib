import { Eventing } from './Eventing';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  constructor(private data: UserProps, private events: Eventing) {}

  get(propName: keyof UserProps): number | string | undefined {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  fetch(): void {
    fetch(`http://localhost:3000/users/${this.get('id')}`)
      .then((response) => response.json())
      .then(({ data }): void => {
        this.set(data);
      });
  }

  save(): void {
    const id = this.get('id');

    if (id) {
      // PUT
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data),
      });
    } else {
      // POST
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data),
      });
    }
  }
}

new User({ name: 'asd', age: 123 }, new Eventing(), new Attributes());
