const data = {
  query: 'users',
  origin: null,
  data: {
    count: 17,
    items: [
      { id: 1, name: 'Alice', isActive: true },
      { id: 2, name: 'Bob', isActive: false },
    ],
    meta: [['ENTITY', 'USER'], []],
    related: [],
  },
};

console.log(getSchema(data));

/*
Expected output:
{
  query: string
  origin: null
  data: {
    count: number
    items: {
      id: number
      name: string
      isActive: boolean
    }[]
    meta: string[][]
    related: []
  }
}
*/
