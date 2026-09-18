import { useAuth, useSignIn } from '@clerk/expo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function signIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { signIn, errors, fetchStatus } = useSignIn();
  const loading = fetchStatus === 'fetching';
  const [code, setCode] = useState('');
  const { isSignedIn } = useAuth();

  if (signIn.status === "complete" || isSignedIn) return null;

  const onSignInPress = async () => {
    try {
      const { error } = await signIn.create({
        identifier: email,
        password
      });

      if (error) {
        alert(error.message);
        return;
      }


      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session.currentTask);
              return;
            } else {
              const url = decorateUrl('/');
              router.replace(url as any);
            }
          }
        });
      } else if (signIn.status === "needs_client_trust") {
        const emailCodeFactor = signIn.supportedSecondFactors.find((factor) => factor.strategy === "email_code");

        if (emailCodeFactor) {
          await signIn.mfa.sendEmailCode();
        }
      } else if (signIn.status === "needs_second_factor") {
        await signIn.mfa.sendEmailCode();
      } else {
        console.error('Unknown sign in status:', signIn.status);
      }

    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };


  //handle verification
  const onVerifyPress = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          } else {
            const url = decorateUrl('/');
            router.replace(url as any);
          }
        }
      });
    }
  }


  if (signIn.status === "needs_second_factor") {


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

          <Text className="text-md text-center text-blue-500 mt-4" onPress={() => signIn.mfa.sendEmailCode()}>
            Resend Code
          </Text>
        </View>
      </>
    );

  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View className="flex-1 justify-center px-6 py-8">
        <View className="flex justify-center">
          <Image source={require('../../assets/images/Constraction_logo.png')} className="w-20 h-20" />
          <Text className='text-2xl font-bold mt-5'>Welcome Back</Text>
          <Text className='text-md text-gray-500'>Sign in to your account</Text>
        </View>

        <View className='flex justify-center mt-4'>
          <TextInput
            placeholder='Email'
            placeholderTextColor='#999'
            className="border border-gray-300 rounded-lg px-4 py-3 mt-4"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />


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
            errors.fields.identifier && (
              <Text className="text-red-500">{errors.fields.identifier.message}</Text>
            )
          }
        </View>
        <TouchableOpacity
          disabled={loading || !email || !password}
          className={`bg-blue-500 px-4 py-3 rounded-md flex justify-center items-center w-full max-w-80 mx-auto mt-4 shadow-md ${loading || !email || !password ? 'opacity-50' : ''}`}
          onPress={onSignInPress}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text className="text-white">Sign In</Text>}
        </TouchableOpacity>

        <Text
          className="text-center mt-4"
        >Don't have an account?{' '}
          <Text
            className="text-blue-500 font-bold"
            onPress={() => router.replace('/(auth)/signUp')}
          >Sign Up</Text>
        </Text>

      </View>
    </ScrollView>
  )
}