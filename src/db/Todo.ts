import 'react-native-get-random-values';
import {Realm} from '@realm/react';

export interface ITodo {
  _id?: string;
  text: string;
  addresses: IAddress[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IAddress {
  name: string;
}

export const AddressSchema = {
  name: 'Address',
  embedded: true,
  properties: {
    name: 'string',
  },
};

export const TodoSchema = {
  name: 'Todo',
  properties: {
    _id: {type: 'string', default: () => `${new Realm.BSON.ObjectId()}`},
    text: 'string',
    addresses: {type: 'list', objectType: 'Address'},
    createdAt: {type: 'string', default: () => new Date().toISOString()},
    updatedAt: {type: 'string', default: () => new Date().toISOString()},
  },
  primaryKey: '_id',
};

class TodoModel extends Realm.Object {
  static schema = TodoSchema;
}

export default TodoModel;
