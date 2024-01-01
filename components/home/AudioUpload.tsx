import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./audioUpload.styles";

interface RecordingData {
  sound: Audio.Sound | null;
  duration: string;
  file: string | null;
}

const AudioUpload: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [recordings, setRecordings] = useState<RecordingData[]>([]);

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
      console.error(error);
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
          duration: getDurationFormatted(durationMillis),
          file: recording?.getURI() || null,
        };
        setRecordings([newRecording]);
      }
    }
  };
  const getRecordingLines = () => {
    return recordings.map((recordline, index) => {
      return (
        <View key={index}>
          <Text>
            AUdio Recorder| {recordline.duration}
          </Text>
          <TouchableOpacity onPress={clearRecord} activeOpacity={0.6}>
            <Ionicons name="close" />
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

  const clearRecord = () => {
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
