import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


async function saveDataToStorage(data): Promise<void> {
  try {
    await AsyncStorage.setItem('notes', JSON.stringify(data));
    console.log('Notes saved successfully!');
  } catch (error) {
    console.log('Error saving notes: ', error);
  }
}

function NoteList({ navigation }) : React.JSX.Element {
  // TODO: Run useEffect hook to load data and 
  // block the rendering of the component until that is done. 
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    
    async function loadData() : string[] {
    // TODO : Load the data from local storage
    const savedData = await AsyncStorage.getItem('notes');
    if (savedData) {
      console.log("Returning saved Data.")
      setNotes(JSON.parse(savedData));
    } else {
      console.log("No saved data found.")
      return setNotes([]);
    }}
    loadData();
  }, []);

  function addNote(note) {
    //TODO: Remove this from here. 
    console.log("Adding: " + note + " to list: " + notes);
    const newNotes = [...notes, note];
    setNotes(newNotes);
    saveDataToStorage(newNotes);
  }

  function deleteNotes(index) {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    saveDataToStorage(newNotes);
  }

  return (
    <View style={style.container}>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={style.noteContainer}>
            <View style={style.textContainer}>
              <Text>{item}</Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteNotes(index)}
              style={style.deleteButtonContainer}>
              <Text style={style.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    <TouchableOpacity 
      onPress={() => navigation.navigate('NoteFormScreen', { addNote })}
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

