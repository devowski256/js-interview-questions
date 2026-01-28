const users = [
  {
    id: 1,
    name: 'Alice',
    posts: [{ id: 10 }, { id: 11 }, { id: 12 }],
    comments: [{ id: 101 }, { id: 102 }],
  },
  {
    id: 2,
    name: 'Bob',
    posts: [{ id: 20 }, { id: 21 }, { id: 22 }],
    comments: [{ id: 201 }, { id: 202 }],
  },
  {
    id: 3,
    name: 'Charlie',
    posts: [{ id: 30 }],
    comments: [],
  },
];

console.log(normalize(users, 'users', 'posts', 'comments'));

/*
Expected output:
{
  users: {
    '1': { id: 1, name: 'Alice' },
    '2': { id: 2, name: 'Bob' },
    '3': { id: 3, name: 'Charlie' }
  },
  posts: {
    '10': { id: 10, usersId: 1 },
    '11': { id: 11, usersId: 1 },
    '12': { id: 12, usersId: 1 },
    '20': { id: 20, usersId: 2 },
    '21': { id: 21, usersId: 2 },
    '22': { id: 22, usersId: 2 },
    '30': { id: 30, usersId: 3 }
  },
  comments: {
    '101': { id: 101, usersId: 1 },
    '102': { id: 102, usersId: 1 },
    '201': { id: 201, usersId: 2 },
    '202': { id: 202, usersId: 2 }
  }
}
*/
