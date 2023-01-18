import {useCallback} from 'react';
import realmContext from '../db';
import {ITodo} from '../db/Todo';

const useTodo = () => {
  const {useQuery, useRealm} = realmContext;
  const todos: Realm.Results<ITodo> = useQuery<ITodo>('Todo');
  const realm = useRealm();

  const createTodo = useCallback(
    (todo: ITodo) => {
      if (!todo.text) {
        return;
      }
      try {
        realm.write(() => {
          let t: ITodo = realm.create('Todo', {
            text: todo.text,
            addresses: todo.addresses,
          });
          console.log(`created one todo: ${t.text}`);
        });
      } catch (error) {
        console.log('Fail create', error);
      }
    },
    [realm],
  );

  const deleteTodo = useCallback(
    (_id: string) => {
      try {
        const todo = realm.objectForPrimaryKey<ITodo>('Todo', _id);
        if (todo) {
          realm.write(() => {
            realm.delete(todo);
          });
        }
      } catch (error) {
        console.log('Not found id', error);
      }
    },
    [realm],
  );
  return {createTodo, deleteTodo, todos};
};

export default useTodo;
