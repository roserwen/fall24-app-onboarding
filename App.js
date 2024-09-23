import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, Modal, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import {Ionicons} from '@expo/vector-icons';
import {styles} from "./App.style"

const DATA = [
  {
    id: '1',
    title: 'Meditation',
    completed: false,
    color: '#CEEAF7',
  },
  {
    id: '2',
    title: 'Coding',
    completed: false,
    color: '#CCD7E4',
  },
  {
    id: '3',
    title: 'Journaling',
    completed: false,
    color: '#D5C9DF',
  }
]

export default function App() {
  const [items, setItems] = useState(DATA);
  const [text, setText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addNewTodo = () => {
    let newTodo = {
      id: items.length + 1,
      title: text,
      completed: false,
      color: '#DCB8CB'
    }

    setItems([...items, newTodo]);
    setText("");
    setIsModalVisible(false);
  }

  const markItemCompleted  = (item) => {
    const itemIndex = items.findIndex(currItem => currItem.id === item.id)

    if (itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = {...items[itemIndex], completed: true};
      setItems(updatedItems);
    }
  }

  const TodoItem = (props) => (
    <TouchableOpacity style = {[styles.item, {backgroundColor: props.item.color}]} onPress = {() => markItemCompleted(props.item)}>
      <Text style = {props.item.completed ? styles.itemTextCompleted: styles.itemText}>{props.item.title}</Text>
    </TouchableOpacity>
  )

  const renderAddButton = () => {
    return (
      <TouchableOpacity onPress = {() => setIsModalVisible(true)}>
        <View style = {styles.icon}>
        <Ionicons name = "add" size = {24} color = "black" />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible = {isModalVisible} transparent = {true} onRequestClose = {() => setIsModalVisible(!isModalVisible)}>
        <View style = {styles.centeredView}>
          <View style = {styles.modalView}>
            <TextInput style = {styles.input} onChangeText = {setText} value = {text}/>
            <Button title = 'Add to do' onPress={addNewTodo}/>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
      <FlatList
        data = {items}
        renderItem = {({item}) => <TodoItem item = {item} />}
        keyExtractor = {item => item.id}
        style = {styles.list}
        ListFooterComponent = {renderAddButton}
      />
    </SafeAreaView>
  );
}