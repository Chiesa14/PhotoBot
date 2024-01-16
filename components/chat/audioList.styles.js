import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xSmall / 2,
  },
  UserAudio: {
    backgroundColor: "blue",
    width: "90%",
    borderRadius: SIZES.xSmall,
    padding: SIZES.small,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  botAudio: {
    backgroundColor: COLORS.green,
    width: "90%",
    borderRadius: SIZES.xSmall,
    padding: SIZES.small,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});

export default styles;
