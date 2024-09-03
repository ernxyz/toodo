import { View, StyleSheet, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';

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
      <Picker 
        selectedValue={selected ? selected.id : null}
        onValueChange={(valueId) => handleChange(valueId)}
        style={styles.picker}
        mode="dropdown"
        dropdownIconRippleColor={darkTheme.colors.primary}
        dropdownIconColor={darkTheme.colors.onSurface}
      >
        <Picker.Item label="Select a list:" value={null} style={styles.toDropdown} />
        {toItems.map(item => (
            <Picker.Item key={item.label} label={item.label} value={item.value} style={styles.toDropdown} />
        ))}
      </Picker>
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
    marginTop: 5,
    // padding: 20, 
    paddingTop: 5,
    backgroundColor: darkTheme.colors.backdrop,
    borderRadius: 10,
  },
  label: {
    fontSize: 16, 
    color: darkTheme.colors.onSurface,
  },
  picker: {
    width: '90%',
    margin: 10,
    backgroundColor: darkTheme.colors.background,
    color: darkTheme.colors.primary
  },
  btn: {
    padding: 10,
    height: 60,
    alignSelf: "center",
    marginLeft: 10
  },
  btnDel: {
    marginLeft: 10,
  },
  toDropdown: {
    backgroundColor: darkTheme.colors.background,
    color: darkTheme.colors.onSurface,
  }
});

export default PickAList