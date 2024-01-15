import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

export const styles = StyleSheet.create({
  container: {
    padding: 4,
    justifyContent: "center",
    height: "100%",
  },
  welcomeText: {
    fontSize: SIZES.large,
  },
  nextBtn: {
    position: "absolute",
    bottom: 4,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.small / 1.5,
  },
  nextBtnText: {
    color: COLORS.black,
    fontSize: SIZES.large,
  },
});
