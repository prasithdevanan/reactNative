import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function setting() {
  const item = [
    {
      id: 1,
      title: "Account",
      path: "/(root)/(tabs)/account"
    },
    {
      id: 2,
      title: "Settings",
      path: "/(root)/(tabs)/settings"
    },
    {
      id: 3,
      title: "Settings",
      path: "/(root)/(tabs)/settings"
    },
  ]
  return (
    <>
      <SafeAreaView className='flex-1 px-4' edges={["top"]}>
        <View className='flex-row items-center'>
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text className='text-2xl font-semibold text-center'>Settings</Text>
        </View>
        <TouchableOpacity onPress={() => {

        }}>
          {
            item.map((item) => (
              <View key={item.id}>
                <Text>{item.title}</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </View>
            ))
          }
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}