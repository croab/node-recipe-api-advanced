const users = [
  {
    name: 'ADMIN',
    email: 'admin@gmail.com',
    role: 'admin',
    // password: password
    password: '123123123',
    passwordConfirm: '123123123'
  },
  {
    name: 'User 1',
    email: 'user1@gmail.com',
    role: 'user',
    // password: password
    password: '123123123',
    passwordConfirm: '123123123'
  },
  {
    name: 'User 2',
    email: 'user2@gmail.com',
    role: 'user',
    // password: bcrypt.hash('123123123', 12).then(val => val)
    // password: password
    password: '123123123',
    passwordConfirm: '123123123'
  },
  {
    name: 'User 3',
    email: 'user3@gmail.com',
    role: 'user',
    // password: bcrypt.hash('123123123', 12).then(val => val)
    // password: password
    password: '123123123',
    passwordConfirm: '123123123'
  }
];

module.exports = users;