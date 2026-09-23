import { PropertyType, useFilterStore } from '@/store/filterStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function filterModel({ visable, onClose }: {
    visable: boolean,
    onClose: () => void;
}) {

    const TYPES: { label: string; value: PropertyType }[] = [
        { label: "All", value: null },
        { label: "Apartment", value: "apartment" },
        { label: "House", value: "house" },
        { label: "Villa", value: "villa" },
        { label: "Studio", value: "studio" },
    ];

    const BEDS = [
        { label: "Any", value: null },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4+", value: 4 },
    ];

    const PRICE_PRESETS = [
        { label: "Under ₹50L", min: null, max: 5000000 },
        { label: "₹50L – ₹1Cr", min: 5000000, max: 10000000 },
        { label: "₹1Cr – ₹2Cr", min: 10000000, max: 20000000 },
        { label: "Above ₹2Cr", min: 20000000, max: null },
    ];

    const {
        search,
        setSearch,
        type,
        setType,
        betrooms,
        setBetrooms,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        resetFilter
    } = useFilterStore();

    const [localMin, setLocalMin] = useState(minPrice ? String(minPrice) : '');
    const [localMax, setLocalMax] = useState(maxPrice ? String(maxPrice) : '');
    const activeFilterCount = [type, betrooms, minPrice, maxPrice].filter((v) => v !== null).length;
    const chip = (active: boolean) => {
        return `px-4 py-2 rounded-full mr-2 mb-2 ${active ? 'bg-blue-500 text-white' : 'bg-white border border-gray-100 text-gray-600 rounded-full'}`;
    }
    const chipTeaxt = (active: boolean) => {

        return `text-sm font-semibold ${active ? 'text-white' : 'text-gray-600'}`
    }

    const handleReset = () => {
        setLocalMax('');
        setLocalMin('');
        resetFilter();
        onClose();
    }

    const handleApply = () => {
        setMinPrice(localMin ? Number(localMin) : null);
        setMaxPrice(localMax ? Number(localMax) : null);
        onClose();
    }


    const shadow = {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 4,
    }
    return (
        <Modal
            visible={visable}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end">
                <Pressable className="absolute inset-0 bg-black opacity-50" onPress={onClose} />
                <View className="bg-white rounded-t-3xl p-5 h-[80%] flex-col justify-between">
                    <View className="flex-row py-2 border-b-2 border-gray-100 justify-between w-full h-16">
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>


                        <Text className="text-2xl font-bold">Filter</Text>
                        <TouchableOpacity onPress={handleReset}>
                            <Text className="text-blue-600 font-medium text-sm">Reset</Text>
                        </TouchableOpacity>
                    </View>


                    <ScrollView
                        className="flex-1"
                        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text className="text-base font-bold text-gray-800 ">Property Type</Text>
                        <View className="flex-row mt-2 flex-wrap">
                            {
                                TYPES.map((item) => (
                                    <TouchableOpacity key={item.value}
                                        onPress={() => setType(item.value)}
                                        className={`${chip(type === item.value)}`}
                                        style={shadow}
                                    >
                                        <Text className={chipTeaxt(type === item.value)}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <Text className="text-base font-bold text-gray-800 mt-4">Beds</Text>
                        <View className="flex-row flex-wrap mt-2">
                            {
                                BEDS.map((item) => (
                                    <TouchableOpacity key={item.value}
                                        onPress={() => setBetrooms(item.value)}
                                        className={`${chip(betrooms === item.value)} flex-1 items-center justify-center`}
                                        style={shadow}
                                    >
                                        <Text className={chipTeaxt(betrooms === item.value)}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <Text className="text-base font-bold text-gray-800 mt-4">Price Range</Text>
                        <View className="flex-row gap-3 mb-3">
                            {[
                                {
                                    label: "Min Price",
                                    value: localMin,
                                    onChange: setLocalMin,
                                    placeholder: "0",
                                },
                                {
                                    label: "Max Price",
                                    value: localMax,
                                    onChange: setLocalMax,
                                    placeholder: "Any",
                                },
                            ].map(({ label, value, onChange, placeholder }) => {
                                return (
                                    <View key={label} className="flex-1">
                                        <Text className="text-sm font-semibold text-gray-600 mb-1">{label}</Text>
                                        <View className="flex-row items-center bg-white rounded-2xl px-3 border border-gray-200">
                                            <Text className="text-gray-400 text-sm mr-1">₹</Text>
                                            <TextInput
                                                placeholder={placeholder}
                                                placeholderTextColor={"#999"}
                                                onChangeText={onChange}
                                                keyboardType="numeric"
                                                value={value}
                                                className="flex-1 text-gray-600 text-sm"
                                            />
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                        <View className="flex-row mt-2 flex-wrap">
                            {
                                PRICE_PRESETS.map((item) => {
                                    const active = minPrice === item.min && maxPrice === item.max;
                                    return (
                                        <TouchableOpacity key={item.label}
                                            onPress={() => {
                                                setLocalMin(item.min ? String(item.min) : '');
                                                setLocalMax(item.max ? String(item.max) : '');
                                                setMinPrice(item.min);
                                                setMaxPrice(item.max);
                                            }}
                                            className={`${chip(active)} items-center justify-center`}
                                            style={shadow}
                                        >
                                            <Text
                                                numberOfLines={1}
                                                className={`${chipTeaxt(active)} text-sm`}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <TouchableOpacity
                            onPress={handleApply}
                            className="bg-blue-600 py-3 rounded-lg items-center justify-center mt-6"
                        >
                            <Text className="text-white text-base font-semibold">Apply</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>


        </Modal>
    )
}