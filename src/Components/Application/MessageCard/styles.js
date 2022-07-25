import { StyleSheet, Platform } from "react-native";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";

const styles = StyleSheet.create({
  container: {
    height: hp(8.5),
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "#A9C6E8",
  },

  MessageContainer: {
    // borderWidth: 2,
    height: hp(8),
    width: wp(95),
    // borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ImageContain: {
    flex: 0.2,
    // borderWidth: 1,
    height: hp(8),
    // width: wp(2),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
