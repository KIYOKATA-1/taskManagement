import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Task } from '@/app/home';

type Props = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onChangeStatus: (id: string, status: Task['status']) => void;
};

const STATUSES: Task['status'][] = [
  'В процессе',
  'Выполнено',
  'Отменено',
];
const GAP = 16;

export default function TaskInfoModal({
  visible,
  task,
  onClose,
  onChangeStatus,
}: Props) {
  if (!task) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.text}>{task.description}</Text>
          <Text style={styles.text}>
            {task.datetime.toLocaleString()}
          </Text>
          <Text style={styles.text}>{task.address}</Text>

          {/* Кнопки смены статуса */}
          <View style={styles.statusRow}>
            {STATUSES.map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.statusBtn,
                  task.status === s && styles.statusBtnActive,
                ]}
                onPress={() => onChangeStatus(task.id, s)}
              >
                <Text
                  style={[
                    styles.statusText,
                    task.status === s && styles.statusTextActive,
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
          >
            <Text style={styles.closeText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    gap: 8,
    padding: GAP,
    justifyContent: 'center',
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: GAP / 2,
    color: '#2E3A59',
  },
  text: {
    fontSize: 15,
    marginBottom: 8,
    color: '#444',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: GAP,
  },
  statusBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  statusBtnActive: {
    backgroundColor: '#1DE9B6',
    borderColor: '#1DE9B6',
  },
  statusText: {
    fontSize: 14,
    color: '#333',
  },
  statusTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  closeBtn: {
    marginTop: GAP,    
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 16,
    color: '#2979FF',
  },
});
