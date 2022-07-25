import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";
import fonts from "../../../Assets/Fonts/font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logoContainer: {
    flex: 0.85,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.3)",
  },

  headerContainer: {
    height: hp(10),
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
  },

  cardContainer: {
    flex: 0.8,
    // height: hp(100),
    zIndex: 1,
    // borderWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    zIndex: 1,
    // borderWidth: 2,
    paddingBottom: hp(1.5),
    fontSize: hp(1.5),
    fontFamily: fonts.MontserBold,
    color: colors.ButtonText,
  },
  priceText: {
    zIndex: 1,
    // borderWidth: 2,
    paddingBottom: hp(1.5),
    fontSize: hp(2),
    fontFamily: fonts.MontserBold,
    color: colors.white,
  },
});

export default styles;
