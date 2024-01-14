import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    padding: 4,
    height: "100%",
  },
  audioIcon: {
    backgroundColor: COLORS.green,
    width: SIZES.xxLarge,
    height: SIZES.xxLarge,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.xxLarge,
    position: "absolute",
    bottom: 4,
    left: 4,
  },
});

export default styles;
