import { StyleSheet, Platform } from "react-native";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  clockView: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "red",d
  },
  TextAreaView: {
    flex: 0.17,
    // borderWidth: 2,
    // borderColor: "red",
  },

  buttonContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    flexDirection: "row",
  },
  buttonView1: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
  },
  backImage: {
    height: "100%",
    width: "100%",
    zIndex: 1,
    position: "absolute",
  },
  Text1: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
  },
  Text11: {
    fontSize: hp(2.3),
    color: colors.white,
    fontWeight: "700",
  },
  Text2: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.35,
    // borderWidth: 1,
  },
  Text22: {
    fontSize: hp(1.7),
    color: colors.white,
    fontWeight: "300",
    color: colors.white,
    textAlign: "left",
    // marginLeft: hp(10),
  },
});

export default styles;
