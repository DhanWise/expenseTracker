import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNote } from './NoteContext';

// ASSUM: For now let's start with no local storage
// Once we set up the context API properly, then we can think about working with local storage.



function NoteList({ navigation }) : React.JSX.Element {
  // const [notes, setNotes] = useState([]);
  const { state, addNote, removeNote } = useNote();

  useEffect(() => {
    
    async function loadData() : string[] {
    const savedData = await AsyncStorage.getItem('notes');
    if (savedData) {
      console.log("Returning saved Data.")
      //TODO: Need to find a way to update the state from here. 
        // for now we can simply iterate over the list and insert it in it. 
      // state = JSON.parse(savedData);
    } else {
      console.log("No saved data found.")
      // return setNotes([]);
    }}
    loadData();
  }, []);

  return (
    //TODO: Iterate over the state properly,
    // Right now it's assumed that 'state' is an array of strings.
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

