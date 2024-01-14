import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

export const styles = StyleSheet.create({
  container: {
    padding: 4,
    justifyContent: "center",
    height: SIZES.height,
  },
  welcomeText: {
    fontSize: SIZES.large,
  },
  nextBtn: {
    backgroundColor: COLORS.green,
    width: SIZES.xxLarge * 2.5,
    height: SIZES.xLarge * 2,
    position: "absolute",
    bottom: -SIZES.xxLarge,
    right: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.small / 1.5,
  },
  nextBtnText: {
    color: COLORS.offwhite,
    fontSize: SIZES.xLarge,
  },
});
