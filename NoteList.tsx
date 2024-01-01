import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNote } from './NoteContext';


function NoteList({ navigation }) : React.JSX.Element {
  const { state, addNote, removeNote } = useNote();

  return (
    <View style={style.container}>
      <FlatList
        data={state.notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={style.noteContainer}>
            <View style={style.textContainer}>
              <Text>{item}</Text>
            </View>
            <TouchableOpacity
              onPress={() => removeNote(index)}
              style={style.deleteButtonContainer}>
              <Text style={style.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    <TouchableOpacity 
      onPress={() => navigation.navigate('NoteFormScreen', {})}
      style={style.addButtonContainer}
    >
      <Text style={style.buttonText}>+</Text>
    </TouchableOpacity>
  </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddinghorizontal: 10,
    padding : 10,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'right',
    alignItems: 'center',
    flexShrink: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flexBasis: '95%',
  },
  deleteButtonContainer: {
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 30,
    width: 30,
    borderRadius: 10,
    marginRight: 30,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
})

export default NoteList;

