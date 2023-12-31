import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./audioUpload.styles";

const AudioUpload = () => {
  return (
    <View>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Voice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioUpload;
