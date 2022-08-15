import { StyleSheet } from "react-native";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"red",
  },
  headerContainer: {
    // height: hp(12),
    // borderWidth: 1,
    alignItems: "center",
    // backgroundColor: "red",
    flex: 0.12,
  },
  headingwrap: {
    flex: 0.04,
    justifyContent: "flex-end",
  },
  headingstyle: {
    width: wp(87),
    alignSelf: "center",
    fontSize: hp(2),
    fontWeight: "600",
    color: colors.white,
    marginBottom: hp(1),
  },
  packagewrap: {
    flex: 0.8,
    alignItems: "center",
  },
});
export default styles;
