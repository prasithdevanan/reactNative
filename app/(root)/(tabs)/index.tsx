import { supabase } from '@/lib/supabase';
import { Property } from '@/types';
import { useUser } from '@clerk/expo';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const { user } = useUser();
  const router = useRouter();

  const [features, setFeatures] = useState<Property[]>([]);
  const [recommended, setRecommended] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // console.log(user, "features", features, "recommended", recommended);

  const featchData = async () => {
    try {
      setLoading(true);
      // get recommended properties
      const { data: recommendedData } = await supabase.from("properties").select("*").eq("is_featured", false).order("created_at", { ascending: false });
      setRecommended(recommendedData!);
      // get featured properties
      const { data: featuredData } = await supabase.from("properties").select("*").eq("is_featured", true).order("created_at", { ascending: false });
      setFeatures(featuredData!);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useFocusEffect(
    useCallback(() => {
      featchData();
    }, []),
  )



  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={recommended}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={
          <View>
            {/* //Logo */}
            <View className='flex-row items-center justify-between mb-3'>
              <View>
                <Image source={require("../../../assets/images/Constraction_logo.png")} className='w-14 h-14' />
                <Text className='text-xl font-bold'>Constraction</Text>
              </View>
              <Text className='flex-1 text-right '>Good Morning 👋{''}
                <Text className='font-bold'>{user?.firstName}</Text>
              </Text>
            </View>
            {/* //Search */}
            <TextInput 
            placeholder='Search' 
            placeholderTextColor='#666' 
            className='bg-gray-200 p-3 rounded-md'
            onPressIn={() => router.push("/(root)/(tabs)/search")}
            /> 
            <Text className='text-2xl font-bold'>Recommended</Text>
            <Text className='text-gray-400'>Recommended for you</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className='px-4'>
            <Image source={{ uri: item.images[0] }} className='w-full h-52' />
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>

        )}

        ListEmptyComponent={
          !loading ? (
            <View className='flex-1 items-center justify-center'>
              <Text className='text-gray-400'>No properties found</Text>
            </View>
          ) : (
            <View className='flex-1 items-center justify-center'>
              <Text className='text-gray-400'>Loading...</Text>
            </View>
          )

        }
      />
    </SafeAreaView>
  )
}