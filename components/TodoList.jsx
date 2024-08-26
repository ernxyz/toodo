import { List, Checkbox, Divider } from 'react-native-paper';
import { View, ToastAndroid, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { darkTheme } from '../utils/theme';

import todoStorage from '../storage/todoStorage';

const TodoList = ({ selectedList, setSelected }) => {

  const handleCheck = async (id) => {
    const updated = await todoStorage.checkTodo(selectedList.id, id)
    setSelected(updated)
  }

  const handleDelete = async (id) => {
    const erase = async () => {
      const updated = await todoStorage.deleteTodo(selectedList.id, id)
      setSelected(updated)
    }

    Alert.alert(
      'confirm delete?',
      'Are you sure you want to do this?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => erase() },
      ],
      { cancelable: true }
    )
    // ToastAndroid.showWithGravity(`${id} pressed`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
  }

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader style={{ fontSize: 20}}>{selectedList ? selectedList.name : "No list selected"}</List.Subheader>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
        >
          {!selectedList 
          ? <View><Text style={styles.message}>No todos to show</Text></View>
          :
          selectedList.todos.map(todo => (
            <View key={todo.id}>
              <List.Item
                title={todo.content}
                onPress={(e) => handleDelete(todo.id)}
                left={props => (
                  <Checkbox
                    status={todo.completed ? "checked" : "unchecked"}
                    onPress={() => handleCheck(todo.id)} 
                  />
                )}
              />
              <Divider />
            </View>
          ))}
        </ScrollView>
      </List.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    margin: "auto",
    padding: 20,
    paddingTop: 10,
    backgroundColor: darkTheme.colors.backdrop,
    borderRadius: 10,
  },
  scroll: {
    height: "95%",
    paddingBottom: 40,
    marginBottom: 40,
    overflow: "hidden"
  },
  message: {
    fontSize: 30,
    color: darkTheme.colors.onSurface,
    alignSelf: "center",
    paddingTop: 50
  }
})

export default TodoList;