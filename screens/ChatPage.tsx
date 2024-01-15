import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  View,
  Image,
  Animated,
  Easing,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { SIZES } from "../constants";
import styles from "./chatPage.styles";
import { AudioList } from "../components";

interface RecordingData {
  sound: Audio.Sound | null;
  duration: string;
  file: string | null;
  name: string;
}

const ChatPage = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [recordings, setRecordings] = useState<RecordingData[]>([]);

  const backPressedOnceRef = useRef(false);
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchData();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, [sound]);

  useEffect(() => {
    if (recording === undefined) {
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeInAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [recording, fadeInAnim]);

  const fetchData = async () => {
    try {
      const storedImageData = await AsyncStorage.getItem("imageData");
      const storedAudioData = await AsyncStorage.getItem("audioData");

      setImageUri(storedImageData);
      setAudioUri(storedAudioData);

      if (storedAudioData !== null) {
        const audioData = JSON.parse(storedAudioData);
        setAudioUri(audioData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onBackPress = () => {
    if (backPressedOnceRef.current) {
      BackHandler.exitApp();
      return true;
    } else {
      ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
      backPressedOnceRef.current = true;

      setTimeout(() => {
        backPressedOnceRef.current = false;
      }, 1000);
    }

    return true;
  };
  const startRecording = async () => {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDurationFormatted = (milliseconds: number) => {
    const totalSeconds = Math.round(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const stopRecording = async () => {
    setRecording(undefined);

    await recording!.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording!.createNewLoadedSoundAsync();
    if (status.isLoaded) {
      const { durationMillis } = status;
      allRecordings.push({
        sound,
        duration: getDurationFormatted(durationMillis as number),
        file: recording?.getURI() || null,
        name: "user",
      });
    }
    setRecordings(allRecordings);
  };
  return (
    <SafeAreaView style={styles.container}>
      {imageUri && (
        <Image
          style={{ height: SIZES.height / 2, borderRadius: SIZES.xSmall }}
          source={{ uri: imageUri }}
        />
      )}
      <AudioList items={recordings} />
      {recording === undefined ? (
        <Animated.View
          style={{
            opacity: fadeInAnim,
          }}
        >
          <TouchableOpacity
            style={styles.audioIcon}
            activeOpacity={0.6}
            onPress={startRecording}
          >
            <FontAwesome name="microphone" size={20} />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={styles.recordView}>
          <TouchableOpacity style={styles.audioIcon} activeOpacity={0.6}>
            <FontAwesome name="microphone" size={20} />
          </TouchableOpacity>
          <Image
            style={{ height: 40 }}
            source={require("/home/c_i__a/Desktop/studies/React-Native/PhotoBot/assets/record.gif")}
          />
          <TouchableOpacity>
            <FontAwesome
              style={{ marginRight: 10 }}
              name="paper-plane"
              size={20}
              onPress={stopRecording}
            />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
export default ChatPage;
