import {createRealmContext} from '@realm/react';
import TodoModel, {AddressSchema} from './Todo';

export const SCHEMA_VERSION = 2; // 디비구조가 바뀌면 버전을 바꿔야합니다.

export const config = {
  schema: [TodoModel, AddressSchema], // AddressSchema 추가
  schemaVersion: SCHEMA_VERSION,
};

const realmContext = createRealmContext(config);

export default realmContext;
