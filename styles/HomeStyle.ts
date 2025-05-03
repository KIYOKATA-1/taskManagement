import { StyleSheet } from 'react-native';

const GAP = 16;

export const HomeStyle = StyleSheet.create({
  // Корневая обёртка
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    paddingVertical: 30,
  },

  // Основной контент внутри SafeAreaView
  main: {
    flex: 1,
    padding: GAP,
  },

  // Заголовок “Мои задачи”
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: GAP,
    color: '#2E3A59',
  },

  // Сегментированный контрол фильтра
  segmentRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginBottom: GAP,
    elevation: 2,
  },
  segmentBtn: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentBtnActive: {
    backgroundColor: '#2979FF',
  },
  segmentText: {
    fontSize: 14,
    color: '#555',
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  // Контент FlatList
  listContent: {
    paddingBottom: GAP * 6,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: GAP * 2,
    fontSize: 16,
  },

  // Плавающая кнопка “+”
  fabContainer: {
    position: 'absolute',
    bottom: GAP,
    right: GAP,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
});
