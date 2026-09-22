import { formatPrice } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Property } from '../types';

export default function PropertyCard({ item, onUnsave, showSave = false }: { item: Property, onUnsave?: () => void, showSave?: boolean }) {
    const router = useRouter();

    const isSaved = false; // Replace with your logic to determine if the property is saved

    return (

        <TouchableOpacity
            className="flex-row mb-4 overflow-hidden rounded-2xl bg-white"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 3,
            }}
            onPress={() =>
                router.push({
                    pathname: "/(root)/property",
                    params: { id: item.id },
                })
            }
        >
            {/* Property Image */}
            <Image
                source={{ uri: item.images?.[0] }}
                className="w-36 h-36"
                resizeMode="cover"
            />

            {/* Property Details */}
            <View className="flex-1 justify-between p-3">
                {/* Title */}
                <Text
                    className="text-base font-semibold text-gray-800"
                    numberOfLines={1}
                >
                    {item.title}
                </Text>

                {/* Location */}
                <View className="flex-row items-center mt-1.5">
                    <Ionicons
                        name="location-outline"
                        size={15}
                        color="#9CA3AF"
                    />

                    <Text
                        className="flex-1 ml-1 text-xs text-gray-500"
                        numberOfLines={1}
                    >
                        {item?.address}, {item?.city}
                    </Text>
                </View>

                {/* Beds & Baths */}
                <View className="flex-row items-center mt-2">
                    <View className="flex-row items-center mr-4">
                        <Ionicons
                            name="bed-outline"
                            size={15}
                            color="#9CA3AF"
                        />

                        <Text className="ml-1 text-xs text-gray-500">
                            {item?.bedrooms} Beds
                        </Text>
                    </View>

                    <View className="flex-row items-center mr-4">
                        <Ionicons
                            name="water-outline"
                            size={15}
                            color="#9CA3AF"
                        />

                        <Text className="ml-1 text-xs text-gray-500">
                            {item?.bathrooms} Baths
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <Ionicons
                            name="home-outline"
                            size={15}
                            color="#9CA3AF"
                        />

                        <Text className="ml-1 text-xs text-gray-500">
                            {item?.area_sqft} Baths
                        </Text>
                    </View>
                </View>

                {/* Price & Status */}
                <View className="flex-row items-center justify-between mt-2">
                    <Text
                        className="text-base font-bold text-blue-600"
                        numberOfLines={1}
                    >
                        {formatPrice(item?.price)}
                    </Text>

                    {item?.is_sold && (
                        <View className="px-3 py-1 ml-2 bg-red-100 rounded-full">
                            <Text className="text-xs font-semibold text-red-600">
                                Sold
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            <TouchableOpacity className='p-4' onPress={onUnsave}>
                <View>
                    {
                        isSaved ? (
                            <Ionicons name="heart" size={16}  color={'red'}/>
                        ) : (
                            <Ionicons name="heart-outline" size={16}  color={'#9CA3AF'}/>
                        )
                    }
                </View>
            </TouchableOpacity>
        </TouchableOpacity>


    )
}