import React, { useState, useEffect } from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./imageUpload.styles";
import { Ionicons } from "@expo/vector-icons";

const ImageUpload = () => {
  const [uploadedImage, setUploadedImage] = useState("");

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access media library was denied");
      }
    })();
  }, []);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets?.[0].uri);
    }
  };

  return (
    <View>
      {uploadedImage && (
        <View style={styles.uploadedImageDiv}>
          <TouchableOpacity
            style={styles.removeImageIcon}
            activeOpacity={0.6}
            onPress={() => {
              setUploadedImage("");
            }}
          >
            <Ionicons name="close" size={22} />
          </TouchableOpacity>
          <Image style={styles.uploadedImage} source={{ uri: uploadedImage }} />
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.uploadButton}
        onPress={selectImage}
      >
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUpload;
