import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  InputContainer: {
    // flex: 0.6,
    marginTop: hp(2.5),
    height: hp(50),
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
  },
  logoContainer: {
    height: hp(15),
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    borderColor: colors.white,
  },

  ButtonContainer: {
    height: hp(10),
    justifyContent: "center",
    // borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    marginTop: hp(4),
  },
  headerContainer: {
    height: hp(6),
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
  },
});

export default styles;
