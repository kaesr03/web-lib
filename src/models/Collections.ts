import { Eventing } from './Eventing';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public root: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    fetch(this.root)
      .then((response: Response) => response.json())
      .then((res): void => {
        res.forEach((value: K) => {
          this.models.push(this.deserialize(value));
        });
        this.trigger('change');
      });
  }
}

// import { User, UserProps } from './User';
// import { Eventing } from './Eventing';

// export class Collection {
//   models: User[] = [];
//   events: Eventing = new Eventing();
//   root: string;

//   constructor(root: string) {
//     this.root = root;
//   }

//   get on() {
//     return this.events.on;
//   }

//   get trigger() {
//     return this.events.trigger;
//   }

//   fetch(): void {
//     fetch(this.root)
//       .then((response: Response) => response.json())
//       .then((res): void => {
//         res.forEach((value: UserProps) => {
//           const user = User.buildUser(value);
//           this.models.push(user);
//         });
//       });

//     this.trigger('change');
//   }
// }
