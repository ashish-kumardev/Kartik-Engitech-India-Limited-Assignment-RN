import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks from AsyncStorage:', error);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to AsyncStorage
  const saveTasks = async newTasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Failed to save tasks to AsyncStorage:', error);
    }
  };

  // Add a new task
  const addTask = () => {
    if (task.trim() !== '') {
      const newTask = {id: Date.now().toString(), task: task, completed: false};
      const updatedTasks = [...tasks, newTask];
      saveTasks(updatedTasks);
      setTask('');
    }
  };

  // Delete a task
  const deleteTask = id => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    saveTasks(updatedTasks);
  };

  // Toggle task completion
  const toggleTaskCompletion = id => {
    const updatedTasks = tasks.map(t =>
      t.id === id ? {...t, completed: !t.completed} : t,
    );
    saveTasks(updatedTasks);
  };

  // Navigate to the Detail screen
  const navigateToDetail = task => {
    navigation.navigate('Detail', {task});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Enter task"
      />
      <Button title="Add Task" onPress={addTask} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {tasks.map(item => (
          <View key={item.id} style={styles.taskItem}>
            <TouchableOpacity
              style={styles.taskTextContainer}
              onPress={() => toggleTaskCompletion(item.id)}>
              <Text
                style={[styles.taskText, item.completed && styles.completed]}>
                {item.task}
              </Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
            <Button title="Details" onPress={() => navigateToDetail(item)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  scrollView: {
    paddingBottom: 20,
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  statusContainer: {
    marginLeft: 10,
  },
  status: {
    fontSize: 12,
    color: 'blue',
  },
});

export default HomeScreen;
