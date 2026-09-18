import { useAuth } from '@clerk/expo';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function profile() {

  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/signIn");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View>
      <Text>profile</Text>
      <TouchableOpacity onPress={handleSignOut} className="bg-blue-500 px-4 py-2 rounded-md flex justify-center items-center w-full max-w-80 mx-auto">
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}