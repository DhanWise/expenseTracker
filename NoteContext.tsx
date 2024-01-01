import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredNotes, saveDataToStorage, cleanUpData } from './LocalStorage';
const NoteContext = createContext();

const initialState = {
  notes: [],
};

function noteReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTE': {
      const updatedNotes = [...state.notes, action.payload];
      saveDataToStorage(updatedNotes);
      return { notes: updatedNotes };
    }
    case 'REMOVE_NOTE': {
      state.notes.splice(action.payload, 1);
      saveDataToStorage(state.notes);
      return { notes: state.notes }; 
    }
    case '_BULK_LOAD':
      return { notes: action.payload };
    default:
      return state;
  }
}

function NoteProvider({ children }) {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  function addNote(note) {
    dispatch({ type: 'ADD_NOTE', payload: note });
  }
  
  function removeNote(noteId) {
    dispatch({ type: 'REMOVE_NOTE', payload: noteId });
  }

  useEffect(() => {
    async function loadStoredNotes() : string[] {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        dispatch({ type: '_BULK_LOAD', payload: JSON.parse(storedNotes) });
      } else {
        console.log("No saved data found.")
      }}
      loadStoredNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ state, addNote, removeNote }}>
      {children}
    </NoteContext.Provider>
  );
}

function useNote() {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNote must be used within a NoteProvider');
  }
  return context;
}

export { NoteProvider, useNote };

