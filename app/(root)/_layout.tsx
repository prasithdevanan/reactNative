import { useAuth } from '@clerk/expo';
import { Redirect, Stack } from 'expo-router';

export default function RootLayout() {
    const { isLoaded, isSignedIn } = useAuth();

    // sync function to check if user is signed in data Based here for the complted function on the data base comption

    if (!isLoaded) return null;
    if (!isSignedIn) return <Redirect href="/(auth)/signUp" />;
    return <Stack screenOptions={{ headerShown: false }} />;
}