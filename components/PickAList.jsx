import { View, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select"

import { darkTheme } from "../utils/theme";
import { Button } from "react-native-paper";

import listStorage from "../storage/listStorage";

const getLabels = arr => (
  arr 
  ?
  arr.map(item => ({
    label: item.name,
    value: item.id,
    color: darkTheme.colors.primary,
  }))
  :
  []
)

const PickAList = ({ items, selectList, selected }) => {

  const toItems = getLabels(items)

  const handleChange = (valueId) => {
    const selected = items.find(i => i.id === valueId)
    selectList(selected)
  } 

  const handleDelete = async () => {
    await listStorage.deleteList(selected.id)
    selectList(null)
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={styles.label}>Choose your list or: </Text>
        <Button
          mode="contained-tonal"
          style={styles.btnDel}
          onPress={handleDelete}
          disabled={selected ? false : true}
        >Delete</Button>
      </View>
      <RNPickerSelect 
        value={selected ? selected.id : null}
        onValueChange={(valueId) => handleChange(valueId)}
        items={toItems}
        style={styles.picker}
        placeholder={{ label: "Select a list:", value: null }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: "95%",
    margin: "auto",
    marginTop: 10,
    padding: 20, 
    paddingTop: 10,
    backgroundColor: darkTheme.colors.backdrop,
    borderRadius: 10,
  },
  label: {
    fontSize: 18, 
    color: darkTheme.colors.onSurface,
  },
  picker: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
  },
  btn: {
    padding: 10,
    height: 60,
    alignSelf: "center",
    marginLeft: 10
  },
  btnDel: {
    marginLeft: 10,
  }
});

export default PickAList