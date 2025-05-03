import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

export default function NewTaskModal({
  visible,
  onClose,
  onAdd,
}: NewTaskModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [datetime, setDatetime] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDatetime((prev) => {
        const next = new Date(prev);
        if (pickerMode === 'date') {
          next.setFullYear(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
          );
        } else {
          next.setHours(
            selectedDate.getHours(),
            selectedDate.getMinutes()
          );
        }
        return next;
      });
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd({
      name: name.trim(),
      description: description.trim(),
      datetime,
      address: address.trim(),
    });
    setName('');
    setDescription('');
    setAddress('');
    setDatetime(new Date());
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
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
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => {
                setPickerMode('date');
                setShowPicker(true);
              }}
            >
              <Text style={styles.pickerText}>
                {datetime.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => {
                setPickerMode('time');
                setShowPicker(true);
              }}
            >
              <Text style={styles.pickerText}>
                {datetime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {showPicker && (
            <Modal
              transparent
              animationType="fade"
              onRequestClose={() => setShowPicker(false)}
            >
              <View style={styles.overlay}>
                <View style={styles.inlinePickerContainer}>
                  <DateTimePicker
                    value={datetime}
                    mode={pickerMode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                    style={styles.inlinePicker}
                  />
                  <View style={styles.inlineButtonRow}>
                    <Button
                      title="Отменить"
                      onPress={() => setShowPicker(false)}
                      color="#aaa"
                    />
                    <Button
                      title="ОК"
                      onPress={() => setShowPicker(false)}
                      color="#2979FF"
                    />
                  </View>
                </View>
              </View>
            </Modal>
          )}

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
    alignItems: 'center',
    padding: GAP,
  },
  container: {
    width: '100%',
    maxWidth: 400,
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
  inlinePickerContainer: {
    backgroundColor: '#fff',
    borderRadius: RADIUS,
    padding: GAP,
    alignItems: 'center',
  },
  inlinePicker: {
    width: 260,
  },
  inlineButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: GAP,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: GAP,
  },
});
