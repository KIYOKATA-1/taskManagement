// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import NewTaskModal from '../components/NewTaskModal';

type Task = {
  id: string;
  name: string;
  description: string;
  datetime: Date;
  address: string;
  status: 'В процессе' | 'Выполнено' | 'Отменено';
};

const STORAGE_KEY = 'MY_TASKS';
const FILTERS: ('Все' | Task['status'])[] = [
  'Все',
  'В процессе',
  'Выполнено',
  'Отменено',
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<typeof FILTERS[number]>('Все');

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const raw = JSON.parse(json) as any[];
        const loaded = raw.map(r => ({
          ...r,
          datetime: new Date(r.datetime),
        }));
        setTasks(loaded);
      }
    })();
  }, []);

  const save = async (newTasks: Task[]) => {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        newTasks.map(t => ({ ...t, datetime: t.datetime.toISOString() }))
      )
    );
  };

  const handleAdd = (t: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...t,
      status: 'В процессе',
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    save(updated);
  };

  const changeStatus = (id: string, status: Task['status']) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, status } : t
    );
    setTasks(updated);
    save(updated);
  };

  // Применяем фильтр
  const filteredTasks = tasks.filter(t =>
    filter === 'Все' ? true : t.status === filter
  );

  const renderItem = ({ item }: { item: Task }) => (
    <View style={cardStyles.card}>
      <Text style={cardStyles.title}>{item.name}</Text>
      <Text style={cardStyles.desc}>{item.description}</Text>
      <Text style={cardStyles.info}>
        {item.datetime.toLocaleString()}
      </Text>
      <Text style={cardStyles.info}>{item.address}</Text>

      {item.status === 'В процессе' ? (
        <View style={cardStyles.statusRow}>
          {(['В процессе', 'Выполнено', 'Отменено'] as Task['status'][]).map(s => (
            <TouchableOpacity
              key={s}
              style={[
                cardStyles.statusBtn,
                item.status === s && cardStyles.statusBtnActive,
              ]}
              onPress={() => changeStatus(item.id, s)}
            >
              <Text
                style={[
                  cardStyles.statusText,
                  item.status === s && cardStyles.statusTextActive,
                ]}
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={cardStyles.resultIcon}>
          <FontAwesomeIcon
            icon={item.status === 'Выполнено' ? faCheck : faTimes}
            size={24}
            color={item.status === 'Выполнено' ? '#1DE9B6' : '#FF3366'}
          />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Мои задачи</Text>

      {/* Кастомный сегмент-контрол */}
      <View style={styles.segmentRow}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[
              styles.segmentBtn,
              filter === f && styles.segmentBtnActive,
            ]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.segmentText,
                filter === f && styles.segmentTextActive,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {tasks.length === 0
              ? 'Нет задач. Нажмите “+” чтобы добавить.'
              : 'Нет задач для выбранного фильтра.'}
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.fabContainer}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
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

const GAP = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: GAP,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: GAP,
    color: '#333',
  },
  segmentRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: GAP,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  segmentBtnActive: {
    backgroundColor: '#1DE9B6',
  },
  segmentText: {
    fontSize: 14,
    color: '#555',
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
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

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: GAP,
    marginBottom: GAP,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  desc: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  info: {
    fontSize: 12,
    marginBottom: 4,
    color: '#777',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: GAP / 2,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  statusBtnActive: {
    backgroundColor: '#1DE9B6',
    borderColor: '#1DE9B6',
  },
  statusText: {
    fontSize: 12,
    color: '#333',
  },
  statusTextActive: {
    color: '#fff',
  },
  resultIcon: {
    marginTop: GAP / 2,
    alignItems: 'center',
  },
});
