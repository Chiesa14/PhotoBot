import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./home.styles";
import { AudioUpload, ImageUpload } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkForStoredData();
  }, []);

  const checkForStoredData = async () => {
    try {
      const storedImageData = await AsyncStorage.getItem("imageData");
      const storedAudioData = await AsyncStorage.getItem("audioData");
      const timestamp = await AsyncStorage.getItem("timestamp");

      if (storedImageData && storedAudioData && timestamp) {
        const lastUploadTime = parseInt(timestamp, 10);
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - lastUploadTime;
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );

        if (daysDifference >= 5) {
          await AsyncStorage.removeItem("imageData");
          await AsyncStorage.removeItem("audioData");
          await AsyncStorage.removeItem("timestamp");
          console.log("Data deleted due to inactivity.");
        } else {
          navigation.navigate("ChatPage" as never);
        }
      }
    } catch (e) {
      console.error("Error checking/retrieving data:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View></View>
      <ImageUpload />
      <AudioUpload />
    </SafeAreaView>
  );
};

export default Home;
