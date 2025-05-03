import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type NewTaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (task: {
    name: string;
    description: string;
    datetime: Date;
    address: string;
  }) => void;
};

export default function NewTaskModal({ visible, onClose, onAdd }: NewTaskModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [datetime, setDatetime] = useState(new Date());
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

  const showPicker = (mode: 'date' | 'time') => {
    setPickerMode(mode);
    setPickerVisible(true);
  };

  const handleConfirm = (selected: Date) => {
    setPickerVisible(false);
    setDatetime(prev => {
      const next = new Date(prev);
      if (pickerMode === 'date') {
        next.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
      } else {
        next.setHours(selected.getHours(), selected.getMinutes());
      }
      return next;
    });
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Название задачи не должно быть пустым');
      return;
    }
    onAdd({ name: name.trim(), description: description.trim(), datetime, address: address.trim() });
    // сброс полей
    setName(''); setDescription(''); setAddress(''); setDatetime(new Date());
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Новая полевая задача</Text>

          <TextInput
            style={styles.input}
            placeholder="Название задачи*"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Описание задачи"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.row}>
            <TouchableOpacity style={styles.pickerButton} onPress={() => showPicker('date')}>
              <Text style={styles.pickerText}>{datetime.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickerButton} onPress={() => showPicker('time')}>
              <Text style={styles.pickerText}>
                {datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={pickerVisible}
            mode={pickerMode}
            date={datetime}
            onConfirm={handleConfirm}
            onCancel={() => setPickerVisible(false)}
          />

          <TextInput
            style={styles.input}
            placeholder="Локация (адрес)"
            value={address}
            onChangeText={setAddress}
          />

          <View style={styles.buttonRow}>
            <Button title="Отмена" color="#aaa" onPress={onClose} />
            <Button title="Добавить" onPress={handleSubmit} color="#2979FF" />
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
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: GAP,
    color: '#1DE9B6',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: RADIUS,
    paddingHorizontal: GAP / 2,
    paddingVertical: GAP / 3,
    marginBottom: GAP,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: GAP,
  },
  pickerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: RADIUS,
    padding: GAP / 2,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
