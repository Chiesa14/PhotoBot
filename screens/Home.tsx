import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./home.styles";
import { AudioUpload, ImageUpload } from "../components";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageUpload />
      <AudioUpload />
    </SafeAreaView>
  );
};

export default Home;
