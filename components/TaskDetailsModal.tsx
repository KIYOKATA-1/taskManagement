import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';

type TaskDetailsProps = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  task: {
    name: string;
    description: string;
    datetime: Date;
    address: string;
    status: string;
  } | null;
};

export default function TaskDetailsModal({
  visible,
  onClose,
  onDelete,
  task,
}: TaskDetailsProps) {
  if (!task) return null;
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.label}>Описание:</Text>
          <Text style={styles.text}>{task.description || '—'}</Text>
          <Text style={styles.label}>Дата и время:</Text>
          <Text style={styles.text}>{task.datetime.toLocaleString()}</Text>
          <Text style={styles.label}>Адрес:</Text>
          <Text style={styles.text}>{task.address || '—'}</Text>
          <Text style={styles.label}>Статус:</Text>
          <Text style={styles.text}>{task.status}</Text>

          <View style={styles.buttons}>
            <Button title="Удалить" color="#FF3B30" onPress={onDelete} />
            <Button title="Закрыть" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const RADIUS = 12;
const GAP = 16;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: GAP,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: RADIUS,
    padding: GAP,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: GAP / 2,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: GAP / 2,
    color: '#555',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: GAP,
  },
});
