import { StyleSheet } from "react-native";
import { SIZES } from "../constants";

export const styles = StyleSheet.create({
  container: {
    padding: 4,
    justifyContent: "center",
    height: SIZES.height,
  },
  welcomeText: {
    fontSize: SIZES.large,
  },
});
