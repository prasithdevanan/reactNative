import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
    return (
        <SafeAreaView className="flex-1">
            <NativeTabs>
                <NativeTabs.Trigger name="index">
                    <Label>Home</Label>
                    <Icon sf="house.fill" drawable="custom_android_drawable" />
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="settings">
                    <Icon sf="gear" drawable="custom_settings_drawable" />
                    <Label>Settings</Label>
                </NativeTabs.Trigger>

                <NativeTabs.Trigger name="profile">
                    <Icon sf="gear" drawable="custom_settings_drawable" />
                    <Label>Profile</Label>
                </NativeTabs.Trigger>
            </NativeTabs>
        </SafeAreaView>
    );
}
