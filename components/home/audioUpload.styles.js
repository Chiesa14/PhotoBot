import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
  },
  uploadButton: {
    marginTop: SIZES.xSmall - 2,
    backgroundColor: COLORS.green,
    height: SIZES.xxLarge,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.xSmall - 2,
  },
  uploadButtonText: {
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
  },
  audioData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
