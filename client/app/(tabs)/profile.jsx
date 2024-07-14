import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, FormField } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';
import { signOut } from '../../services/authService';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    router.replace("../");
    await signOut();
    setUser(null);
    setIsLogged(false);
  };
  
  return (
    user && 
    <SafeAreaView className="bg-primary p-6 h-full">
      <View className="flex justify-between items-start flex-row mb-3">
        <View>
          <Text className="text-2xl text-secondary font-psemibold">Profile</Text>
        </View>
        <View className="mt-1.5">
          <TouchableOpacity className="mb-4 p-1 bg-secondary rounded-full" onPress={() => router.replace('/home')}>            
             <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FormField
          title="Username"
          value={user.username}
          otherStyles="mt-5"
          editable={false}
        />
      <FormField
          title="Role"
          value={user.role}
          otherStyles="mt-5"
          editable={false}
        />

      <CustomButton
        title="Log out"
        handlePress={logout}
        containerStyles="mt-10 w-full"
      />
    </SafeAreaView>
  );
};

export default Profile;
