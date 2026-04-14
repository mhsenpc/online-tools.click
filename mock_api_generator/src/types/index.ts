export type DataType = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'uuid' | 'name' | 'email' | 'date' | 'integer';

export interface Field {
  id: string;
  name: string;
  type: DataType;
  children?: Field[];
  parentId?: string;
}

export interface MockDataConfig {
  rootType: 'object' | 'array';
  arrayLength: number;
}
