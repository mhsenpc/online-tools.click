import { Field, DataType } from '../types';
import { nanoid } from 'nanoid';

export const generateMockValue = (type: DataType): any => {
  switch (type) {
    case 'uuid':
      return nanoid();
    case 'name':
      const names = ['Alice Smith', 'Bob Johnson', 'Charlie Brown', 'Diana Ross', 'Edward Norton'];
      return names[Math.floor(Math.random() * names.length)];
    case 'email':
      const domains = ['gmail.com', 'outlook.com', 'example.com', 'hotmail.com'];
      const user = Math.random().toString(36).substring(7);
      return `${user}@${domains[Math.floor(Math.random() * domains.length)]}`;
    case 'date':
      return new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();
    case 'string':
      return 'Mock String';
    case 'number':
      return parseFloat((Math.random() * 100).toFixed(2));
    case 'integer':
      return Math.floor(Math.random() * 100);
    case 'boolean':
      return Math.random() > 0.5;
    default:
      return null;
  }
};

export const generateMockData = (fields: Field[], config: { rootType: 'object' | 'array', arrayLength: number }): any => {
  const generateObject = (currentFields: Field[]): any => {
    const obj: any = {};
    currentFields.forEach(field => {
      if (field.type === 'object') {
        obj[field.name] = generateObject(field.children || []);
      } else if (field.type === 'array') {
        obj[field.name] = Array.from({ length: 3 }, () => 
          field.children && field.children.length > 0 
            ? (field.children[0].type === 'object' 
                ? generateObject(field.children[0].children || []) 
                : generateMockValue(field.children[0].type))
            : 'Empty Array Item'
        );
      } else {
        obj[field.name] = generateMockValue(field.type);
      }
    });
    return obj;
  };

  if (config.rootType === 'array') {
    return Array.from({ length: config.arrayLength }, () => generateObject(fields));
  }
  return generateObject(fields);
};
