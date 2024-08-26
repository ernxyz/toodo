import AsyncStorage from '@react-native-async-storage/async-storage'

const getId = () => 
  Math.floor(Math.random() * 1000) + 1

const addTodo = async (selectedListId, content) => {
  try {
    let state = await AsyncStorage.getItem("lists")
    state = JSON.parse(state)
    const list = state.listOfLists.find(l => l.id === selectedListId)

    const todoObj = {
      id: getId().toString(),
      content,
      completed: false,
    }

    const newList = {
      ...list,
      todos: [...list.todos, todoObj]
    }

    state.listOfLists = state.listOfLists.map(list => list.id === newList.id ? newList : list)

    state = JSON.stringify(state)

    await AsyncStorage.setItem("lists", state)

    return newList
  
  } catch (e) {
    console.log(e)
  }
}

const checkTodo = async (selectedListId, idToCheck) => {
  try {

    //
    let state = await AsyncStorage.getItem("lists")
    state = JSON.parse(state)

    const list = state.listOfLists.find(l => l.id === selectedListId)

    const todoToUpdate = list.todos.find(t => t.id === idToCheck)

    const todoObj = {
      ...todoToUpdate,
      completed: !todoToUpdate.completed,
    }

    const newList = {
      ...list,
      todos: list.todos.map(todo => todo.id === idToCheck ? todoObj : todo)
    }

    state.listOfLists = state.listOfLists.map(list => list.id === newList.id ? newList : list)

    state = JSON.stringify(state)

    await AsyncStorage.setItem("lists", state)

    return newList
    //
    
  } catch (e) {
    console.log(e)
  }
}

const deleteTodo = async (selectedListId, idToDelete) => {
  try {

    //
    let state = await AsyncStorage.getItem("lists")
    state = JSON.parse(state)

    const list = state.listOfLists.find(l => l.id === selectedListId)

    const newTodos = list.todos.filter(todo => todo.id !== idToDelete)

    const newList = {
      ...list,
      todos: newTodos
    }

    state.listOfLists = state.listOfLists.map(list => list.id === newList.id ? newList : list)

    state = JSON.stringify(state)

    await AsyncStorage.setItem("lists", state)

    return newList
    //
    
  } catch (e) {
    console.log(e)
  }
}

export default {
  addTodo,
  checkTodo,
  deleteTodo
}