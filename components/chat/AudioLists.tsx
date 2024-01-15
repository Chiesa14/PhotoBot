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
  console.log(items[0]?.name);

  return (
    <ScrollView style={styles.container}>
      <Text>Audio lists</Text>
    </ScrollView>
  );
};

export default AudioList;
