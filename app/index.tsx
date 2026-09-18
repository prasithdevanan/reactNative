import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) return <Redirect href="/(root)/(tabs)" />;
  // return (
  //   // <SafeAreaView className="flex-1 px-4">
  //   //   <View>
  //   //     <Text className="text-2xl font-bold">Hello, world!</Text>
  //   //     <TextInput placeholder="Type something here" placeholderTextColor="#999"
  //   //       style={
  //   //         {
  //   //           backgroundColor: "#fff",
  //   //           padding: 10, borderRadius: 5,
  //   //           marginBottom: 10,
  //   //           borderColor: "#ccc",
  //   //           borderWidth: 1,
  //   //           marginTop: 10
  //   //         }
  //   //       } />

  //   //     <TouchableOpacity
  //   //       onPress={() => alert("Welcome To the application")}
  //   //       className="bg-blue-500 px-4 py-2 rounded-md flex justify-center items-center w-full max-w-80 mx-auto"
  //   //     >
  //   //       <Text style={{ color: "#fff", fontWeight: "bold" }}>Submit</Text>
  //   //     </TouchableOpacity>

  //   //   </View>
  //   // </SafeAreaView>
  // );
  return (
    <Redirect href="/signUp" />
  )
}
