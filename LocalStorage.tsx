import AsyncStorage from '@react-native-async-storage/async-storage';

async function getStoredNotes() {
  const storedNotes = await AsyncStorage.getItem('notes');
  return storedNotes;
}

async function saveDataToStorage(data): Promise<void> {
  try {
    await AsyncStorage.setItem('notes', JSON.stringify(data));
    console.log('Notes saved successfully!');
  } catch (error) {
    console.log('Error saving notes: ', error);
  }
}

async function cleanUpData(key): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Notes cleaned up successfully!');
  } catch (error) {
    console.log('Error cleaning up notes: ', error);
  }
}

export { getStoredNotes, saveDataToStorage, cleanUpData };
