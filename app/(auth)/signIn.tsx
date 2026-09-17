import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

export default function signIn() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center items-center ">
        <Text className="text-2xl font-bold">signIn</Text>
        <Text className="text-lg">signIn</Text>
        <Text className="text-lg">signIn</Text>
        <Text className="text-lg">signIn</Text>
        <TextInput placeholder="Type something here" placeholderTextColor="#999"/>
      </View>

    </ScrollView>
  )
}