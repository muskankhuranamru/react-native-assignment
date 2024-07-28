// src/screens/TodoScreen.js
import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { addTodoItem, getTodoItems } from '../../helper';

const TodoScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [todoItems, setTodoItems] = useState([]);
  const [newTodoItem, setNewTodoItem] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const items = await getTodoItems(0, 10);
        setTodoItems(items);
      } catch (error) {
        console.error('Error fetching todo items:', error);
        setError('Failed to load todo items');
      }
    };

    fetchTodoItems();
  }, []);

  const handleAddTodoItem = async () => {
    try {
      await addTodoItem(newTodoItem);
      const items = await getTodoItems(0, 10);
      setTodoItems(items);
    } catch (error) {
      console.error('Error adding todo item:', error);
      setError('Failed to add todo item');
    }
  };

  return (
        <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>TODO</Text>
        </View>
        <View style={styles.sectionContainer}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {todoItems.map((item) => (
            <View key={item.id} style={styles.todoItem}>
              <Text style={styles.sectionDescription}>{item.title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          <TextInput
            style={styles.sectionDescription}
            placeholder="Add your todo item"
            onChange={(e) => setNewTodoItem(e.nativeEvent.text)}
          />
          <Button title="Add" onPress={handleAddTodoItem} />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  todoItem: {
    fontSize: 18,
    fontWeight: '400',
    borderBottomWidth: 1,
    padding: 8,
    borderBottomColor: 'gray',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default TodoScreen;
