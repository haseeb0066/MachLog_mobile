import { StyleSheet, Platform } from "react-native";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: hp(20),
    // marginLeft: hp(4),
    // borderWidth: 2,
    height: hp(13),
    width: wp(45),
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },

  mainContainer: {
    height: hp(11),
    width: wp(42),
    // borderWidth: 2,
    // borderColor: colors.Minus,
    borderRadius: hp(2),
    backgroundColor: colors.white,
  },
  cardView1: {
    flex: 0.6,
    // borderWidth: 2,
    borderColor: colors.Minus,
    flexDirection: "row",
    borderRadius: hp(2),
  },
  cardView2: {
    flex: 0.4,
    // borderWidth: 2,
    borderColor: colors.lightColor,
    borderRadius: hp(2),
    justifyContent: "center",
    // alignItems: "center",
  },

  DetailContainer: {
    height: hp(50),
    // borderWidth: 2,
    borderColor: colors.white,
  },
  iconContainer: {
    flex: 0.5,
    // borderWidth: 2,
    borderColor: colors.lightColor,
  },
});

export default styles;
