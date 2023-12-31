import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./home.styles";
import { ImageUpload } from "../components";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageUpload />
    </SafeAreaView>
  );
};

export default Home;
