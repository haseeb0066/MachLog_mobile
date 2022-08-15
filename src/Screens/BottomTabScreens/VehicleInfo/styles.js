import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
  },
  herdercomtainer: {
    height: hp(15),
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "white",
  },
  inputContainer: {
    height: hp(30),
    width: wp(90),
    alignSelf: "center",
    // borderWidth: 1,
    borderColor: "white",
    // marginBottom: hp(20),
  },
  buttonContainer: {
    height: hp(10),
    alignSelf: "center",
    width: wp(100),
    // borderWidth: 1,
    alignItems: "center",
  },
  // upload cont
  uploadIconContainer: {
    // marginTop: hp(10),
    // height: hp(10),
    borderRadius: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    // minHeight: hp(20),
    flexDirection: "row",
    // backgroundColor:"green"
    // borderWidth: 1,
    // borderColor: "white",
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
    color: colors.ButtonText,
    fontSize: hp(1.5),
  },
  container1: {
    height: hp(10),
    position: "relative",
    justifyContent: "center",
    // borderWidth: 1,
    width: wp(90),
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: colors.ButtonText,
    top: Platform.OS == "android" ? hp(-0.5) : hp(0.5),
    left: wp(5),
    padding: 5,
    zIndex: 50,
    // borderWidth: 1,
    // justifyContent:"center"
  },
  textInput: {
    // flex: 1,
    borderWidth: 1,
    borderColor: colors.white,
    justifyContent: "flex-end",
    height: 44,
    borderRadius: hp(1.5),
    paddingHorizontal: 25,
    width: wp(90),
    height: hp(6),
    // alignItems:"center"
  },
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
    width: "45%",
    height: hp(18),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "column",
    // borderWidth: 1,
    backgroundColor: "#A9C6E8",
    // opacity: 0.1,
  },
});
export default styles;
