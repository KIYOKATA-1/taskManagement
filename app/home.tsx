import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import NewTaskModal from '../components/NewTaskModal';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Array<any>>([]);

  const handleAdd = (task: any) => {
    setTasks(prev => [...prev, task]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Home!</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.fabContainer}
        onPress={() => setModalVisible(true)}
      >
        <LinearGradient
          colors={['#1DE9B6', '#2979FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fab}
        >
          <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      <NewTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
    </SafeAreaView>
  );
}

const GAP = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: GAP,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: GAP,
    color: '#333',
  },
  fabContainer: {
    position: 'absolute',
    bottom: GAP,
    right: GAP,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
