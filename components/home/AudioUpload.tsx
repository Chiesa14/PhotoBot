import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { styles } from "./audioUpload.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";

interface RecordingData {
  sound: Audio.Sound | null;
  duration: string;
  file: string | null;
}

const AudioUpload: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [recordings, setRecordings] = useState<RecordingData[]>([]);
  const [playing, setPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (playing) {
      intervalId = setInterval(() => {
        setSliderValue((prevSliderValue) => prevSliderValue + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [playing]);

  const startRecording = async () => {
    try {
      setPlaying(false);
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

  const stopRecording = async () => {
    if (recording) {
      setRecording(undefined);

      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      if (status.isLoaded) {
        const { durationMillis } = status;
        const newRecording: RecordingData = {
          sound,
          duration: getDurationFormatted(durationMillis as number),
          file: recording?.getURI() || null,
        };
        setRecordings([newRecording]);
        saveAudioData(newRecording);
      }
    }
  };

  const saveAudioData = async (recordingData: RecordingData) => {
    try {
      await AsyncStorage.setItem("audioData", JSON.stringify(recordingData));
      await AsyncStorage.setItem("timestamp", new Date().getTime().toString());
    } catch (e) {
      console.error("Error saving audio data:", e);
    }
  };

  const getRecordingLines = () => {
    return recordings.map((recordline, index) => {
      const [minutes, seconds] = recordline.duration.split(":").map(Number);
      const totaltime = minutes * 60 + seconds;
      const playAudio = () => {
        recordline.sound?.playAsync();
        setPlaying(true);
      };
      const pauseAudio = () => {
        recordline.sound?.pauseAsync();
        setPlaying(false);
      };
      if (sliderValue == totaltime) {
        recordline.sound?.stopAsync();
        setPlaying(false);
        setSliderValue(0);
      }

      return (
        <View key={index}>
          <Text>Audio Recorder</Text>
          <Text>{recordline.duration}</Text>
          <Text>{sliderValue}</Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={totaltime}
            value={sliderValue}
            step={1}
            onValueChange={(value) => setSliderValue(value)}
            onSlidingComplete={() => console.log("Completed")}
          />
          {playing ? (
            <TouchableOpacity onPress={pauseAudio}>
              <FontAwesome name="pause" size={32} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={playAudio}>
              <FontAwesome name="play" size={32} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={clearRecord} activeOpacity={0.6}>
            <Ionicons name="close" size={32} />
          </TouchableOpacity>
        </View>
      );
    });
  };

  const getDurationFormatted = (milliseconds: number) => {
    const totalSeconds = Math.round(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const clearRecord = async () => {
    recordings[0].sound?.stopAsync();
    await AsyncStorage.removeItem("audioData");
    setPlaying(false);
    setSliderValue(0);
    setRecordings([]);
  };

  return (
    <View style={styles.container}>
      {getRecordingLines()}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={recording ? stopRecording : startRecording}
        style={styles.uploadButton}
      >
        <Text style={styles.uploadButtonText}>
          {recording ? "Stop Recording" : "Start Recording"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioUpload;
