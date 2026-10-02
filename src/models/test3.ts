import { Eventing } from './Eventing';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

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

const user = new User({});

user.events;
