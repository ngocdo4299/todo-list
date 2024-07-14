import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField, WeatherBox } from "../../components";
import { getTask, updateTask, deleteTask } from "../../services/taskService";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Ionicons } from "@expo/vector-icons";
import { handleWeatherResponce } from "../../services/weatherService";

const Edit = () => {
  const { id } = useLocalSearchParams();
  const { user } = useGlobalContext();
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "Tallinn, Estonia",
    description: "",
    completed: false,
  });

  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    getTask(id)
      .then((res) => {
        if (user.role === "admin" && !res.completed) {
          setEditable(true);
        } else {
          setEditable(false);
        }
        setWeatherData(handleWeatherResponce(res.weather));
        setForm({
          name: res.name,
          location: res.location,
          description: res.description,
          completed: res.completed,
        });
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
        router.back();
      });
  }, []);

  const submit = async () => {
    if ((form.name === "") | (form.description === "")) {
      return Alert.alert("Please provide all fields");
    }

    try {
      await updateTask(id, {
        ...form,
      });
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const remove = async () => {
    Alert.alert("Are you sure you want to delete this?", "", [
      {
        text: "Yes, delete it",
        onPress: async () => {
          try {
            await deleteTask(id);
            router.replace("/home");
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        },
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  const markAsDone = async () => {
    try {
      await updateTask(id, {
        ...form,
        completed: true,
      });
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <SafeAreaView className="bg-primary p-6 h-full">
      <View className="flex justify-between items-start flex-row mb-3">
        <View>
          {editable ? (
            <Text className="text-2xl text-secondary font-pextrabold">
              View | Edit Task
            </Text>
          ) : (
            <Text className="text-2xl text-secondary font-pextrabold">
              View Task
            </Text>
          )}
        </View>
        <View className="mt-1.5">
          <TouchableOpacity
            className="mb-4 p-1 bg-secondary rounded-full"
            onPress={() => router.replace("/home")}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FormField
        title="Name"
        value={form.name}
        placeholder="Name of your task"
        handleChangeText={(e) => setForm({ ...form, name: e })}
        otherStyles="mt-5"
        editable={editable}
      />
      <FormField
        title="Description"
        value={form.description}
        placeholder="Give some description"
        handleChangeText={(e) => setForm({ ...form, description: e })}
        otherStyles="mt-5"
        editable={editable}
      />
      <WeatherBox
        containerStyles={
          "rounded-2xl bg-white border-2 border-secondary my-5 p-3 flex items-center justify-center"
        }
        data={weatherData}
        location={form.location}
      />
      {!form.completed && (
        <CustomButton
          title="Mark as Done"
          handlePress={markAsDone}
          containerStyles="bg-white w-full mb-5"
        />
      )}
      {editable && (
        <View className="flex-row justify-between">
          <CustomButton
            title="Delete"
            handlePress={remove}
            containerStyles="w-[35%]"
          />
          <CustomButton
            title="Save Changes"
            handlePress={submit}
            containerStyles="w-[60%]"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Edit;
