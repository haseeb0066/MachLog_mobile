import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  herdercomtainer: {
    height: hp(15),
    justifyContent: "center",
  },
  inputContainer: {
    height: hp(40),
    width: wp(90),
    alignSelf: "center",
  },
  buttonContainer: {
    height: hp(10),
    alignSelf: "center",
  },
  // upload cont
  uploadIconContainer: {
    // marginTop:hp(2),
    borderRadius: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: hp(20),
    flexDirection: "row",
    // backgroundColor:"green"
  },
  uploadSection: {
    width: "48%",
    height: hp(18),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "column",
    borderColor: colors.white,
    borderWidth: 1,
    // backgroundColor: "#90b7de",
  },

  profileContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      android: {
        paddingTop: hp(5),
      },
      ios: {
        paddingTop: hp(6),
      },
    }),
  },
  profileImage: {
    width: "100%",
    height: hp(17.8),
    borderRadius: 20,
  },
  uploadTextDoc: {
    color: colors.white,
    fontSize: hp(1.5),
  },
});
export default styles;
