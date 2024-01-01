import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./audioUpload.styles";
// import { Modal, Portal, Provider } from "react-native-paper";
// import { Ionicons, FontAwesome } from "@expo/vector-icons";
// import { COLORS, SIZES } from "../../constants";

const AudioUpload = () => {
  const [recording, setRecording] = useState(false);
  const [sound, setSound] = useState();
  const [audioUri, setAudioUri] = useState("");

  
  return (
    <View>
      <TouchableOpacity style={styles.uploadButton} activeOpacity={0.6}>
        <Text style={styles.uploadButtonText}>Upload Voice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioUpload;
