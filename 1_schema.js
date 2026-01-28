const data = {
  query: 'users',
  origin: null,
  data: {
    count: 17,
    items: [
      {
        id: 1,
        name: 'Alice',
        isActive: true,
      },
      {
        id: 2,
        name: 'Bob',
        isActive: false,
      },
    ],
    meta: [['ENTITY', 'USER'], []],
    related: [],
  },
};

function getSchema(json, indent = 0) {
  if (Array.isArray(json)) {
    if (json.length === 0) return '[]';

    const elementSchema = getSchema(json[0], indent);

    return `${elementSchema}[]`;
  }

  if (typeof json === 'object' && json !== null) {
    const prefix = ' '.repeat(indent * 2);

    const body = Object.keys(json)
      .map((field) => {
        const fieldSchema = getSchema(json[field], indent + 1);

        return `  ${prefix}${field}: ${fieldSchema}`;
      })
      .join('\n');

    return `{\n${body}\n${prefix}}`;
  }

  return String(typeof json);
}

console.log(getSchema(data));

/*
Expected output:
{
  query: string
  origin: object
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
