import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./home.styles";
import { AudioUpload, ImageUpload } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

const Home = () => {
  const [dataAvailable, setDataAvailable] = useState(false);
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
        return true;
      }
    } catch (e) {
      console.error("Error checking/retrieving data:", e);
    }
  };

  const chechData = async () => {
    try {
      const storedImageData = await AsyncStorage.getItem("imageData");
      const storedAudioData = await AsyncStorage.getItem("audioData");
      if (storedAudioData && storedImageData) setDataAvailable(true);
      else setDataAvailable(false);
    } catch (error) {
      console.log(error);
    }
  };
  setInterval(() => {
    chechData();
  }, 100);

  return (
    <SafeAreaView style={styles.container}>
      <ImageUpload />
      <AudioUpload />
      {dataAvailable && (
        <TouchableOpacity
          style={styles.nextBtn}
          activeOpacity={0.6}
          onPress={() => navigation.navigate("ChatPage" as never)}
        >
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Home;
