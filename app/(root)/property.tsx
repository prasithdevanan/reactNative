import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default function property() {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log(id);
    return (
        <SafeAreaView>
            <View>
                <Text>{id}</Text>
            </View>
        </SafeAreaView>
    )
}