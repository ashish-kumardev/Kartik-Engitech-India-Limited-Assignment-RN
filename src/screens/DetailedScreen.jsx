import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

const DetailScreen = () => {
  const route = useRoute();
  const {task} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.taskName}>{task.task}</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Status: {task?.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskName: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black',
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default DetailScreen;
