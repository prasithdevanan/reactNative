import { useUserStore } from '@/store/useStore';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

function AndroidTabs() {
    const isAdmin = useUserStore((state) => state.isAdmin);
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "search" : "search-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "settings" : "settings-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            {
                isAdmin && <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons
                                name={focused ? "add-circle" : "add-circle-outline"}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            }

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />


        </Tabs>
    );
}
function IOSTabs() {
    const isAdmin = useUserStore((state) => state.isAdmin);
    return (
        <SafeAreaView className="flex-1" edges={["top"]}>
            <NativeTabs tintColor={"blue"} backgroundColor={"#CBDBFF"} >
                <NativeTabs.Trigger name="index" >
                    <Label>Home</Label>
                    <Icon sf="house.fill" drawable="custom_android_drawable" selectedColor="#4CAF50" />
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="settings">
                    <Icon sf="gear" drawable="custom_settings_drawable" />
                    <Label>Settings</Label>
                </NativeTabs.Trigger>
                {isAdmin && <NativeTabs.Trigger name="create">
                    <Icon sf="plus.circle.fill" drawable="custom_plus_drawable" />
                    <Label>Create</Label>
                </NativeTabs.Trigger>}

                <NativeTabs.Trigger name="profile">
                    <Icon sf="gear" drawable="custom_settings_drawable" />
                    <Label>Profile</Label>
                </NativeTabs.Trigger>
            </NativeTabs>
        </SafeAreaView>
    );
}


export default function TabsLayout() {
    return (
        Platform.OS === "ios" ? <IOSTabs /> : <AndroidTabs />
    )
}
