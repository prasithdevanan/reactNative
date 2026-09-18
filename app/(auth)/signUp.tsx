import { useAuth, useSignUp } from '@clerk/expo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function signUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loading = fetchStatus === 'fetching';

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }


  //handle signUp
  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      firstName,
      lastName,
      emailAddress: email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (!error) {
      await signUp.verifications.sendEmailCode();
    }
  }

  //handle verification
  const onVerifyPress = async () => {
    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === "complete") {
      signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl('/');
          router.replace(url as any);
        }
      });
    }
  }

  if (signUp.status === "missing_requirements" && signUp.unverifiedFields.includes("email_address") && signUp.missingFields.length === 0) {

    return (
      <>
        <View className="flex-1 px-6 py-12 justify-center">
          <View className="flex-col">
            <Image
              source={require("../../assets/images/Constraction_logo.png")}
              className="w-20 h-20 mt-10"
              resizeMode="contain"
            />

            <Text className="text-2xl font-bold text-gray-800 mt-4">
              Verify your Account
            </Text>

            <Text className="text-lg text-gray-500">
              We sent a code to {email}
            </Text>
          </View>

          <View className="flex-row mt-4 gap-3">
            <TextInput
              className="border flex-1 border-gray-300 rounded-lg px-4 py-3"
              placeholder="Enter Verification Code"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            />

            {
              errors.fields.code && (
                <Text className="text-red-500 mt-2">{errors.fields.code.message}</Text>
              )
            }
          </View>
          <TouchableOpacity
            disabled={loading || !code}
            className="bg-blue-500 px-4 py-3 rounded-md flex justify-center items-center w-full max-w-80 mx-auto mt-4"
            onPress={onVerifyPress}
          >
            {loading ? <ActivityIndicator color="white" /> :
              <Text className="text-lg text-white font-bold">Verify</Text>}
          </TouchableOpacity>

          <Text className="text-md text-center text-blue-500 mt-4" onPress={() => signUp.verifications.sendEmailCode()}>
            Resend Code
          </Text>
        </View>
      </>
    );

  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View className="flex-1 px-6 py-12 justify-center">

        <View className="flex-col">
          <Image
            source={require('../../assets/images/Constraction_logo.png')}
            className="w-20 h-20 mt-10"
            resizeMode="contain"
          />

          <Text className="text-2xl font-bold text-gray-800 mt-4">
            Create an account
          </Text>

          <Text className="text-lg text-gray-500">
            Construct your projects
          </Text>
        </View>

        <View className="flex-row mt-4 gap-3">

          <TextInput
            className="border flex-1 border-gray-300 rounded-lg px-4 py-3"
            placeholder="Fist Name"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            className="border flex-1 border-gray-300 rounded-lg px-4 py-3"
            placeholder="Last Name"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={lastName}
            onChangeText={setLastName}
          />

        </View>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          className="border border-gray-300 rounded-lg px-4 py-3 mt-4"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {
          errors.fields.emailAddress && (
            <Text className="text-red-500 mt-2">{errors.fields.emailAddress.message}</Text>
          )
        }

        <View className="flex-row items-center border border-gray-300 rounded-lg mt-4 px-4">
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            autoCapitalize="none"
            className="flex-1 py-3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="ml-2"
          >
            <Text className="text-blue-500 font-medium">
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        {
          errors.fields.password && (
            <Text className="text-red-500 mt-2">{errors.fields.password.message}</Text>
          )
        }

        <TouchableOpacity
          onPress={onSignUpPress}
          disabled={loading || isSignedIn}
          className={`bg-blue-500 px-4 py-3 rounded-md flex justify-center items-center w-full max-w-80 mx-auto mt-4 shadow-md ${loading || !email || !password ? 'opacity-50' : ''}`}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-bold">
              Sign Up
            </Text>
          )}
        </TouchableOpacity>

        <View>
          <Text className="text-center mt-4 text-gray-500">
            Already have an account?{' '}
            <Text
              onPress={() => router.push('/(auth)/signIn')}
              className="text-blue-500 font-bold"
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>

  )
}