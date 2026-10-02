import { UserList } from './views/UserList';
import { Collection } from './models/Collections';
import { User, UserProps } from './models/User';

const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on('change', () => {
  const root = document.getElementById('root');
  console.log(root);

  if (root) {
    const userList = new UserList(root, users);
    console.log(userList);
    userList.render();
  }
});

users.fetch();

// import { UserEdit } from './views/UserEdit';
// import { UserForm } from './views/UserForm';
// import { User } from './models/User';

// // const test = User.buildUser({ id: 5 });
// // test.on('change', () => {
// //   console.log(test);
// //   console.log(test.get('name'));
// // });

// // test.fetch();
// const user = User.buildUser({ name: 'NAME', age: 22 });

// const root = document.getElementById('root');

// if (root) {
//   const userEdit = new UserEdit(root, user);
//   // console.log(userEdit);
//   userEdit.render();
// } else {
//   throw new Error('Root element not found');
// }
