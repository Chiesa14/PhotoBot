import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

export const styles = StyleSheet.create({
  uploadButton: {
    marginTop: SIZES.xSmall,
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

  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.xSmall - 2,
  },
  uploadedImageDiv: {
    borderColor: COLORS.gray2,
    borderWidth: 2,
    height: SIZES.height / 2,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.xSmall - 2,
  },
  removeImageIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 9,
  },
});
