import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./audioList.styles";
import { Audio } from "expo-av";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

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
  const [playing, setPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  return items.map((recordValue, index) => {
    const [minutes, seconds] = recordValue.duration.split(":").map(Number);
    const totaltime = minutes * 60 + seconds;
    return (
      <View key={index}>
        <View>
          {playing ? (
            <TouchableOpacity>
              <FontAwesome name="pause" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <FontAwesome name="play" size={20} />
            </TouchableOpacity>
          )}
          <View style={{ width: "90%" }}>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={totaltime}
              value={sliderValue}
              step={1}
              onValueChange={(value) => setSliderValue(value)}
              onSlidingComplete={() => console.log("Completed")}
            />
            <Text style={{ position: "absolute", right: 15, bottom: 4 }}>
              {recordValue.duration}
            </Text>
          </View>
        </View>
      </View>
    );
  });
};

export default AudioList;
