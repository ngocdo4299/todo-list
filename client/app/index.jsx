import { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton, FormField } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { signIn } from "../services/authService";

const Welcome = () => {
  const { loading, isLogged, setUser, setIsLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.password === "") {
      return Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      const user = await signIn(form.username, form.password);
      setUser(user);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error?.message || error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Sign in to your account
            </Text>
          </View>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
