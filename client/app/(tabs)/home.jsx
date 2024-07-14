import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState, InfoBox } from "../../components";
import { getAllTask } from "../../services/taskService";
import dayjs from "dayjs";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setIncompletedTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const { user } = useGlobalContext();

  useEffect(() => {
    getAllTask()
      .then((result) => {
        setTasks(result.filter((task) => !task.completed));
        setIncompletedTasks(result.filter((task) => task.completed));
      })
      .catch((err) => Alert("Error", err));
  }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/edit-task?id=${item.id}`)}
      className={`flex-row items-center p-5 rounded-2xl my-2 ${
        item.completed ? "bg-gray-100" : "bg-white"
      }`}
    >
      {item.completed && (
        <View className="mr-4">
          <Ionicons
            name="checkmark-circle"
            color={"green"}
            size={24}
          ></Ionicons>
        </View>
      )}
      <InfoBox
        title={`${dayjs(item.createdAt).format("YYYY-MM-DD")} | ${item.name}`}
        subtitle={item.description}
        titleStyles={"text-secondary text-left"}
        subtitleStyles={"text-black-200"}
      ></InfoBox>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <View className="flex mt-6">
        <View className="flex-row items-center">
          <View className="flex">
            <Text className="font-pmedium text-secondary text-sm">
              {dayjs().format("YYYY-MM-DD")}
            </Text>
            <Text className="text-2xl font-pextrabold text-white mt-1">
              {showCompleted ? "All " : "On-going "} Tasks
            </Text>
          </View>
          <View className="absolute right-1 flex flex-row justify-between">
            <TouchableOpacity
              className="bg-secondary rounded-full w-14 h-14 p-4"
              onPress={() => router.push("/profile")}
            >
              <Ionicons name="person-sharp" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex items-center flex-row my-4">
          <Switch
            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            trackColor={{ false: "#fff", true: "#FF8E01" }}
            ios_backgroundColor="#fff"
            onValueChange={(v) => setShowCompleted(v)}
            value={showCompleted}
          ></Switch>
          <Text className="text-right font-pmedium text-sm text-white">
            Show completed tasks
          </Text>
        </View>
      </View>
      <FlatList
        data={showCompleted ? [...tasks, ...completedTasks] : tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <EmptyState title="No on-going task" />}
      />
      {user?.role == "admin" && (
        <View className="absolute bottom-5 left-1/2 flex flex-row align-center">
          <TouchableOpacity
            className="bg-secondary rounded-full w-14 h-14 p-3 float-right"
            onPress={() => router.replace("/create-task")}
          >
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
