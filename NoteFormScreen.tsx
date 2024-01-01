import react, { useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNote } from './NoteContext';

function NoteFormScreen({ navigation }) : React.JSX.Element {
  const [localNote, setLocalNote] = useState('');
  const { state, addNote, removeNote } = useNote();

  function handleAddNote() {
    addNote(localNote);
    navigation.goBack();
  }

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="What you thinking?"
        value={localNote}
        onChangeText={(text) => setLocalNote(text)}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        autoFocus={true}
      />
      <TouchableOpacity 
        onPress={handleAddNote}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10, 
  },
  button: {
    backgroundColor: 'grey',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  }
});

export default NoteFormScreen;

