import { StyleSheet } from "react-native";
import { Appbar, Modal, Portal } from "react-native-paper";
import { darkTheme } from "../utils/theme";
import { useState } from "react";

import FormAddList from "./FormAddList";

const ModalAddList = ({ visible, hideModal, containerStyle, children}) => (
  <Portal>
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
      {children}
    </Modal>
  </Portal>
)

const AppBar = ({ toSelectList }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Appbar.Header style={{
        backgroundColor: darkTheme.colors.inverseOnSurface,
      }}
      statusBarHeight={2}
      >
        <Appbar.Content title="TooDo App" titleStyle={styles.title} />
        <Appbar.Content title="" />
        <Appbar.Content title="Add list:" titleStyle={styles.actionTitle} />
        <Appbar.Action icon="plus-box" onPress={showModal} />
      </Appbar.Header>
      <ModalAddList
        visible={visible}
        hideModal={hideModal}
        containerStyle={styles.containerStyle}
      >
        <FormAddList 
          hideModal={hideModal}
          selectList={toSelectList}
        />
      </ModalAddList>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
  },
  actionTitle: {
    color: "#ccc",
  },
  containerStyle: {
    backgroundColor: darkTheme.colors.surface,
    width: "90%",
    margin: "auto",
    borderRadius: 12,
  }
})

export default AppBar