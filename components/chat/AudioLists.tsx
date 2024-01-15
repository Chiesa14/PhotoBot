import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./audioList.styles";
import { Audio } from "expo-av";

interface RecordingData {
  sound: Audio.Sound | null;
  duration: string;
  file: string | null;
  name: string;
}

interface AudioListProps {
  items: RecordingData[];
}

const AudioList = ({ items }: AudioListProps) => {
  return items.map((recordValue, index) => {
    return (
      <View key={index}>
        <Text>Audio {index + 1}</Text>
      </View>
    );
  });
};

export default AudioList;
