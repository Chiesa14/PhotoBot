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
    borderRadius: SIZES.xxLarge,
    justifyContent: "center",
    alignItems: "center",
  },
  recordView: {
    backgroundColor: COLORS.gray,
    width: "100%",
    height: SIZES.xxLarge + 3,
    borderRadius: SIZES.large,
    position: "absolute",
    margin: 4,
    bottom: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
