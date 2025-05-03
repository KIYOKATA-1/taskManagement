import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTrash,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Task } from '@/app/home';

type Props = {
  task: Task;
  onPress: () => void;
  onDelete: () => void;
};

const GAP = 16;

export default function TaskCard({ task, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.row}>
        <View style={styles.textCol}>
          <Text style={styles.title} numberOfLines={1}>
            {task.name}
          </Text>
          <Text style={styles.info}>
            {task.datetime.toLocaleString()}
          </Text>
        </View>

        {task.status === 'Выполнено' && (
          <FontAwesomeIcon
            icon={faCheck}
            size={20}
            color="#1DE9B6"
            style={styles.statusIcon}
          />
        )}
        {task.status === 'Отменено' && (
          <FontAwesomeIcon
            icon={faTimes}
            size={20}
            color="#FF3366"
            style={styles.statusIcon}
          />
        )}

        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <FontAwesomeIcon icon={faTrash} size={20} color="#FF3366" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: GAP,
    marginBottom: GAP,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCol: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3A59',
    marginBottom: 4,
  },
  info: {
    fontSize: 13,
    color: '#777',
  },
  statusIcon: {
    marginHorizontal: 8,
  },
  deleteBtn: {
    marginLeft: 12,
  },
});
