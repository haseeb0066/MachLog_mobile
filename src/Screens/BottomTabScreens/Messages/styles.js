import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    flex: 0.1,
    // borderWidth: 2,
    borderColor: colors.white,
  },
  MessageContainer: {
    flex: 0.95,
    // borderWidth: 2,
    marginTop: hp(1),
    borderColor: colors.white,
  },
});

export default styles;
