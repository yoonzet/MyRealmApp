import React, {useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import realmContext from './src/db';
import useTodo from './src/hooks/useTodo';

const App = () => {
  const {useRealm} = realmContext;
  const realm = useRealm();

  const [text, setText] = useState('');
  const {createTodo, deleteTodo, todos} = useTodo();

  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            height: 40,
          }}
          onChangeText={setText}
          value={text}
        />
        <Button
          title="생성"
          onPress={() => {
            createTodo({
              text,
              addresses: [],
            });
            setText('');
            console.log(realm.path);
          }}
        />
        <FlatList
          data={todos}
          // extraData={todos}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <View>
              <Text>{item.text}</Text>
              <Button
                title="삭제"
                onPress={() => {
                  if (item._id) {
                    deleteTodo(item._id);
                  }
                }}
              />
            </View>
          )}
        />
        {todos.map(item => (
          <View>
            <Text>{item.text}</Text>
            <Button
              title="삭제"
              onPress={() => {
                if (item._id) {
                  deleteTodo(item._id);
                }
              }}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default App;
