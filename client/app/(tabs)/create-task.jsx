import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "../../components";
import { createTask } from "../../services/taskService";
import { Ionicons } from "@expo/vector-icons";

const Create = () => {
  const [form, setForm] = useState({
    name: "",
    location: "Tallinn, Estonia",
    description: "",
    completed: false,
  });

  const submit = async () => {
    if ((form.name === "") | (form.description === "")) {
      return Alert.alert("Please provide all fields");
    }

    try {
      await createTask({
        ...form,
      });

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        name: "",
        location: "Tallinn, Estonia",
        description: "",
        completed: false,
      });
    }
  };
  return (
    <SafeAreaView className="bg-primary p-6 h-full">
      <View className="flex justify-between items-start flex-row mb-3">
        <View>
          <Text className="text-2xl text-white font-pextrabold">
            Create Task
          </Text>
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
      />
      <FormField
        title="Description"
        value={form.description}
        placeholder="Give some description"
        handleChangeText={(e) => setForm({ ...form, description: e })}
        otherStyles="mt-5"
      />
      <Text className="text-white text-center mt-8 mb-8">
        Weather: 24C ☀️ , Tallinn, Estonia
      </Text>
      <View className="flex-row justify-between">
        <CustomButton
          title="Create"
          handlePress={submit}
          containerStyles="w-full"
        />
      </View>
    </SafeAreaView>
  );
};

export default Create;
