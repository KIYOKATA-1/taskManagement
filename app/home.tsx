import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";

import TaskCard from "../components/TaskCard";
import NewTaskModal from "../components/NewTaskModal";
import TaskInfoModal from "@/components/TaskInfoModal";
import { HomeStyle } from "@/styles/HomeStyle";

export type Task = {
  id: string;
  name: string;
  description: string;
  datetime: Date;
  address: string;
  status: "В процессе" | "Выполнено" | "Отменено";
};

const STORAGE_KEY = "MY_TASKS";
const FILTERS: ("Все" | Task["status"])[] = [
  "Все",
  "В процессе",
  "Выполнено",
  "Отменено",
];

// Для валидации при загрузке
const VALID_STATUSES = ["В процессе", "Выполнено", "Отменено"] as const;

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<typeof FILTERS[number]>("Все");
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [detailTask, setDetailTask] = useState<Task | null>(null);

  // Загрузка задач
  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (!json) return;

      const raw = JSON.parse(json) as Array<{
        id: string;
        name: string;
        description: string;
        datetime: string;
        address: string;
        status: string;
      }>;

      const loaded: Task[] = raw.map((r) => {
        const status = VALID_STATUSES.includes(r.status as any)
          ? (r.status as Task["status"])
          : "В процессе";
        return {
          id: r.id,
          name: r.name,
          description: r.description,
          datetime: new Date(r.datetime),
          address: r.address,
          status,
        };
      });

      setTasks(loaded);
    })();
  }, []);

  // Сохранение
  const save = async (list: Task[]) => {
    const toStore = list.map((t) => ({
      ...t,
      datetime: t.datetime.toISOString(),
    }));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  };

  // CRUD
  const addTask = (t: Omit<Task, "id" | "status">) => {
    const next: Task = {
      id: Date.now().toString(),
      ...t,
      status: "В процессе",
    };
    const upd = [...tasks, next];
    setTasks(upd);
    save(upd);
  };
  const deleteTask = (id: string) => {
    const upd = tasks.filter((t) => t.id !== id);
    setTasks(upd);
    save(upd);
  };
  const changeStatus = (id: string, status: Task["status"]) => {
    const upd = tasks.map((t) => (t.id === id ? { ...t, status } : t));
    setTasks(upd);
    save(upd);
    if (detailTask?.id === id) {
      setDetailTask({ ...(detailTask as Task), status });
    }
  };

  // Фильтрация
  const filtered = tasks.filter((t) =>
    filter === "Все" ? true : t.status === filter
  );

  return (
    <SafeAreaView style={HomeStyle.container}>
      <View style={HomeStyle.main}>
        <Text style={HomeStyle.header}>Мои задачи</Text>

        <View style={HomeStyle.segmentRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                HomeStyle.segmentBtn,
                filter === f && HomeStyle.segmentBtnActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  HomeStyle.segmentText,
                  filter === f && HomeStyle.segmentTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(t) => t.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onPress={() => setDetailTask(item)}
              onDelete={() => deleteTask(item.id)}
            />
          )}
          contentContainerStyle={HomeStyle.listContent}
          ListEmptyComponent={
            <Text style={HomeStyle.empty}>
              {tasks.length === 0
                ? "Нет задач. Нажмите “+” чтобы добавить."
                : "Нет задач для выбранного фильтра."}
            </Text>
          }
        />

        <TouchableOpacity
          style={HomeStyle.fabContainer}
          onPress={() => setIsNewModalOpen(true)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#1DE9B6", "#2979FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={HomeStyle.fab}
          >
            <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <NewTaskModal
          visible={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          onAdd={addTask}
        />

        <TaskInfoModal
          visible={!!detailTask}
          task={detailTask}
          onClose={() => setDetailTask(null)}
          onChangeStatus={changeStatus}
        />
      </View>
    </SafeAreaView>
  );
}
