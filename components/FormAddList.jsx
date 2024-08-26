import { View, StyleSheet, Text } from "react-native"
import { TextInput, Icon, Button } from "react-native-paper"

import { darkTheme } from "../utils/theme"

import { useState } from "react"
import listStorage from "../storage/listStorage"

const getId = () => 
  Math.floor(Math.random() * 1000) + 1

const AddIcon = () => (
  <Icon
    source="filter-variant-plus"
    size={20}
  />
)

const FormAddList = ({ hideModal, selectList }) => {
  const [listName, setListName] = useState(null)

  const handleAdding = async () => {
    const objList = { 
      name: listName,
      todos: [], 
      id: getId().toString() 
    }

    await listStorage.addList(objList)
    setListName("")
    selectList(objList)
    hideModal()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new list:</Text>
      <TextInput
        label="New List"
        mode="outlined"
        value={listName}
        style={styles.inputField}
        onChangeText={text => setListName(text)}
        onSubmitEditing={handleAdding}
      />
      <Button 
        mode="contained-tonal"
        style={styles.btn}
        onPress={handleAdding}
      >
        <AddIcon />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  inputField: {
    height: 50,
    width: "75%",
    backgroundColor: darkTheme.colors.inverseOnSurface,
    padding: 0,
    margin: "auto",
  },
  btn: {
    width: "75%",
    margin: "auto"
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
    padding: 10,
    color: darkTheme.colors.onSurface
  }
})

export default FormAddList