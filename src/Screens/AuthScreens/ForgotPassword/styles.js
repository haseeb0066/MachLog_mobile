import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  InputContainer: {
    flex: 0.8,
    zIndex: 1,
    // justifyContent: "center",
    // alignItems: "flex-end",
    // backgroundColor: "rgba(0,0,0,.3)",
    // borderWidth: 2,
    borderColor: colors.white,
  },
  headerContainer: {
    flex: 0.1,
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
  },

  logoContainer: {
    flex: 0.1,
    zIndex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // borderWidth: 2,
    borderColor: colors.white,
  },

  ButtonContainer: {
    // flex: 0.2,
    // height: hp(15),
    justifyContent: "center",
    // borderWidth: 2,
    borderColor: colors.white,
  },
});

export default styles;
