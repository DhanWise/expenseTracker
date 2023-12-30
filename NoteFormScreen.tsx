import react, { useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

function NoteFormScreen({ navigation, route }) : React.JSX.Element {
  const [note, setNote] = useState('');

  function handleAddNote() {
    const { addNote } = route.params;
    addNote(note);
    navigation.goBack();
  }

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="What you thinking?"
        value={note}
        onChangeText={(text) => setNote(text)}
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

