import FilterModel from '@/components/filterModel';
import PropertyCard from '@/components/Property';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';
import { useFilterStore } from '@/store/filterStore';
import { Property } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

  //dulicate the data for the display for the userinterface screen
  const data = [
    type ?
      {
        key: "type",
        label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
      } : null,
    betrooms ?
      {
        label: `${betrooms} ${betrooms > 1 ? 'Beds' : 'Bed'}`,
        key: "bedrooms"
      } : null,
    minPrice || maxPrice ?
      {
        key: "price",
        label: (minPrice && maxPrice ? formatPrice(minPrice) + ' - ' + formatPrice(maxPrice) : minPrice ? formatPrice(minPrice) : maxPrice ? formatPrice(maxPrice) : null),
      } : null

  ]
    .filter((item) => item !== null && item !== undefined)

  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Property[]>([]);

  const activeFilterCount = [
    type ? 1 : 0,
    betrooms ? 1 : 0,
    minPrice ? 1 : 0,
    maxPrice ? 1 : 0
  ].filter(Boolean).length;


  useEffect(() => {
    console.log(activeFilterCount, type);
    console.log(activeFilterCount);
  }, [activeFilterCount]);


  const ClearFilter = (item: any) => {

    switch (item) {
      case "type":
        setType(null);
        break;
      case "bedrooms":
        setBetrooms(null);
        break;
      case "price":
        setMinPrice(null);
        setMaxPrice(null);
        break;
      default:
        break;
    }
  }

  useEffect(() => {

    const featchResult = async () => {
      try {
        setLoading(true);
        console.log(search, type, betrooms, minPrice, maxPrice);
        //get the results
        let query = supabase.from("properties").select("*");

        if (search) {
          console.log(search);
          query = query.or(`title.ilike.%${search}%, city.ilike.%${search}%`);
        }

        if (type) {
          query = query.eq("type", type);
        }

        if (betrooms) {
          query = query.eq("bedrooms", betrooms);
        }

        if (minPrice) {
          query = query.gte("price", minPrice);
        }

        if (maxPrice) {
          query = query.lte("price", maxPrice);
        }

        const { data, error } = await query.order("created_at", { ascending: false });

        if (error) {
          console.error(error);
        } else {
          setResults(data ?? []);

        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    featchResult();
  }, [search, type, betrooms, minPrice, maxPrice]);



  // const onRefresh = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     await featchResult();

  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     featchResult();
  //   }, [])
  // );

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
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

      <View>
        {
          activeFilterCount > 0 && (
            <View className="flex-row items-center gap-3 px-4 mb-4">
              {
                data.map((item, index) => (
                  <View key={index} className="flex-row items-center gap-2 px-3 py-1 rounded-full bg-blue-200 ">
                    <Text className="text-sm font-semibold text-blue-600">{item.label}</Text>
                    <Ionicons name="close-circle" size={18} color="blue" onPress={() => ClearFilter(item.key)} />
                  </View>
                )
                )}

            </View>
          )}
      </View>

      <View className='flex-1'>
        {
          loading ? <Text className='flex-1 item-center justify-center'>Loading...</Text> :
            <FlatList
              data={results}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <PropertyCard item={item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                paddingTop: 20,
                paddingHorizontal: 20,
              }}
            // refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
            />}
      </View>

    </SafeAreaView>
  )
}