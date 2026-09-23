import FilterModel from '@/components/filterModel';
import { useFilterStore } from '@/store/filterStore';
import { Property } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function search() {
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

  const [showFilter, setShowFilter] = useState(true);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Property[]>([]);

  const activeFilterCount = [
    type ? 1 : 0,
    betrooms ? 1 : 0,
    minPrice ? 1 : 0,
    maxPrice ? 1 : 0
  ].filter(Boolean).length;

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4 pt-4 pb-3">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Find Properties</Text>
        {/* // Search Filter */}
        <View className="flex-row items-center gap-3">
          {/* // Search */}
          <View
            className="flex-1 flex-row items-center gap-3 rounded-xl bg-gray-100 px-4 py-1"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Ionicons name="search" size={18} color="gray" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="gray"
              className="flex-1 text-gray-800"
              onChangeText={setSearch}
              value={search}
            />

            {
              search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Ionicons name="close-circle" size={18} color="gray" />
                </TouchableOpacity>
              )
            }
          </View>
          
          <TouchableOpacity
            className={`w-12 h-12 rounded-2xl justify-center items-center ${activeFilterCount ? "bg-blue-500" : "bg-white"}`}
            onPress={() => setShowFilter(true)}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Ionicons name="options" size={18} color={activeFilterCount ? "#fff" : "374151"} />

            {
              activeFilterCount > 0 && (
                <View className='absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full justify-center items-center'>
                  <Text className="text-white text-sm font-bold">{activeFilterCount}</Text>
                </View>
              )
            }

          </TouchableOpacity>
        </View>
        {/* // Filter Model */}
        <FilterModel visable={showFilter} onClose={() => setShowFilter(false)} />

      </View>

    </SafeAreaView>
  )
}