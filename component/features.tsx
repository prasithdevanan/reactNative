import { Property } from '@/types';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

export default function Features({ item }: { item: Property }) {
    const router = useRouter();
    console.log(item.images[0]);
    return (
        <TouchableOpacity className='w-72 mr-2 overflow-hidden rounded-3xl bg-white'>
            <Image source={{ uri: item.images[0] }}
                className='w-full h-44 rounded-xl'
                style={{ width: 250, height: 150 }}
                resizeMode='cover' />

        </TouchableOpacity>
    )
}