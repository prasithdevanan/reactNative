import { Property } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { formatPrice } from '../lib/utils';

export default function Features({ item }: { item: Property }) {
    const router = useRouter();

    return (
        <TouchableOpacity className='relative w-72 mr-2 overflow-hidden rounded-xl bg-white'
            onPress={() => router.push({
                pathname: '/(root)/property',
                params: { id: item.id }
            })}
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 12,
                elevation: 2,
                opacity: item.is_sold ? 0.5 : 1,
            }}
        >
            <Image source={{ uri: item.images[0] }}
                className='w-full h-44 rounded-xl'
                style={{ width: 250, height: 150 }}
                resizeMode='cover' />

            {/* Badge */}
            <View className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full">
                <Text className="text-xs font-semibold text-blue-600 capitalize">
                    {item?.type}
                </Text>
            </View>

            {item?.is_sold && (
                <View className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full">
                    <Text className="text-xs font-semibold text-white">Sold</Text>
                </View>
            )}

            <View className='p-3'>
                <Text className='text-base font-bold text-gray-600'>{item?.title}</Text>
                <View className='flex-row items-center mt-1'>
                    <Ionicons name="location-outline" size={16} color="gray" />
                    <Text className='text-gray-500 ml-1 text-sm'>{item?.address}, {item?.city}</Text>
                </View>

                <View className='flex-row items-center justify-between'>
                    <Text className='text-lg font-bold pl-2 items-end flex-1 text-blue-600'>{formatPrice(item?.price)}</Text>

                    <View className='flex-row items-center gap-3'>
                        <View className='flex-row items-center gap-1'>
                            <Ionicons name="bed-outline" size={12} color="gray" />
                            <Text className='text-gray-500 ml-1 text-sm'>{item?.bedrooms}</Text>
                        </View>

                        <View className='flex-row items-center gap-1'>
                            <Ionicons name="water-outline" size={12} color="gray" />
                            <Text className='text-gray-500 ml-1 text-sm'>{item?.bathrooms}</Text>
                        </View>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}