import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  listOfLists: []
}

const setLists = async (state = initialState) => {
  try {
    await AsyncStorage.setItem("lists", JSON.stringify(state))
  } catch (e) {
    console.log(e)
  }
}

const addList = async (objList) => {
  try {
    let aux = await AsyncStorage.getItem("lists")
    const currentState = JSON.parse(aux)

    if (currentState.listOfLists.length !== 0) {
         
      const newState = {
        listOfLists: [
          ...currentState.listOfLists,
          objList
        ]
      }

      await AsyncStorage.clear()
      await AsyncStorage.setItem("lists", JSON.stringify(newState))
      
    } else {
      
      const newState = {
        listOfLists: [objList]
      }

      await AsyncStorage.setItem("lists", JSON.stringify(newState))
    }

  } catch (e) {
    console.log(e)
    
  }
} 

const getLists = async () => {
  try {
    const state = await AsyncStorage.getItem("lists")
    
    if (state) {
      const { listOfLists } = JSON.parse(state)
      return listOfLists
    } else {
      return []
    }
  } catch (e) {
    console.log(e)
  }
}

const clearLists = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.log(e)
  }
}

const deleteList = async (listId) => {
  try {
    let aux = await AsyncStorage.getItem("lists")
    const currentState = JSON.parse(aux)

    if (currentState.listOfLists.length !== 0) {

      const newLists = currentState.listOfLists.filter(list => list.id !== listId)
         
      const newState = {
        listOfLists: newLists
      }

      await AsyncStorage.clear()
      await AsyncStorage.setItem("lists", JSON.stringify(newState))
      
    }
  } catch (e) {
    console.log(e)
  }
} 

export default {
  setLists,
  addList,
  getLists,
  clearLists,
  deleteList,
}