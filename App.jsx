import { StatusBar } from 'expo-status-bar';
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AppBar from './components/AppBar';
import TodoList from './components/TodoList';
import PickAList from './components/PickAList';
import FormTodo from './components/FormTodo';

import { useColorScheme } from 'react-native';
import { darkTheme } from './utils/theme';
import { PaperProvider } from 'react-native-paper';

import { useEffect, useState } from 'react';
import listStorage from './storage/listStorage';

export default function App() {
  const colorScheme = useColorScheme()

  const [lists, setLists] = useState([])
  const [selectedList, setSelectedList] = useState(null)

  useEffect(() => {
    listStorage.getLists().then(res => {
      if (res.length !== 0) {
        setLists(res)
        setSelectedList(res[0])
      } else {
        listStorage.setLists()
      }
    })
  }, [])

  useEffect(() => {
    listStorage.getLists().then(res => setLists(res))
  }, [lists])

  useEffect(() => {
    setSelectedList(selectedList)
  }, [selectedList])

  const paperTheme = 
    colorScheme === "light" 
    ? { ...darkTheme, colors: darkTheme.colors }
    : { ...darkTheme, colors: darkTheme.colors }

  return (
    <PaperProvider theme={ paperTheme }>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.safe}>
            <AppBar
              toSelectList={setSelectedList}
            />
            <ScrollView>
              <KeyboardAvoidingView style={styles.container}>
                <View style={{ flex: 1, ...styles.section}}>
                  <PickAList
                    items={lists}
                    selectList={setSelectedList}
                    selected={selectedList}
                  />
                </View>
                <View style={{ flex: 2, ...styles.section}}>
                  <FormTodo
                    selectedList={selectedList}
                    setSelected={setSelectedList}
                  />
                </View>
                <View style={{ flex: 3, ...styles.section}}>
                  <TodoList
                    selectedList={selectedList}
                    setSelected={setSelectedList}
                  />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
            <StatusBar style="light" />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: darkTheme.colors.background,
  },
  section: {
    margin: 5,
  }
})