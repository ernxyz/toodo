import { StyleSheet, View, ToastAndroid } from "react-native"
import { TextInput, Button, Icon } from "react-native-paper"
import { darkTheme } from "../utils/theme"

import todoStorage from "../storage/todoStorage"
import { useState } from "react"

const SendIcon = () => (
  <Icon
    source="send"
    size={20}
  />
)

const FormTodo = ({ selectedList, setSelected }) => {
  const [inputText, setInputText] = useState("")

  const handleSubmit = async () => {
    
    if (inputText !== "") {
      const updated = await todoStorage.addTodo(selectedList.id, inputText)
      setSelected(updated)
      setInputText("")
    } else {
      ToastAndroid.showWithGravity("Unable to do this action", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }

  }

  return (
    <View style={styles.container}>
      <TextInput
        label="New Todo"
        mode="outlined"
        value={inputText}
        style={styles.inputField}
        onChangeText={text => setInputText(text)}
        onSubmitEditing={handleSubmit}
        disabled={selectedList ? false : true}
      />
      <Button 
        mode="contained-tonal"
        style={styles.btn}
        onPress={handleSubmit}
      >
        <SendIcon />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "95%",
    margin: "auto",
    padding: 20,
    paddingTop: 10,
    backgroundColor: darkTheme.colors.backdrop,
    borderRadius: 10,
  },
  inputField: {
    height: 20,
    width: "75%",
    backgroundColor: darkTheme.colors.inverseOnSurface,
    padding: 0,
  },
  btn: {
    padding: 10,
    height: 60,
    alignSelf: "center",
    marginLeft: 10
  }
})

export default FormTodo