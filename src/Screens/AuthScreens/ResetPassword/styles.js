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
  logoContainer: {
    flex: 0.2,
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

  // ============================= MOdal =====================
  container1: {
    flex: 1,
    backgroundColor: colors.blueColor,
  },
  centeredView: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    paddingTop: hp(20),
  },
  modalView: {
    borderRadius: hp(3),
    height: hp(22),
    width: hp(40),
    // borderWidth: 1,
    backgroundColor: colors.white,
  },
  button: {
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    height: hp(4),
    width: hp(30),
    elevation: 2,
    backgroundColor: "#2196F3",
    justifyContent: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: hp(1.5),
    fontWeight: "500",
  },
  LottieView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    borderColor: "green",
  },
  modelTextView: {
    flex: 0.2,
    justifyContent: "center",
    // borderWidth: 1,
  },
  buttonContainer: {
    flex: 0.3,
    // backgroundColor: "#dbdbdb",
    borderBottomLeftRadius: hp(3),
    borderBottomRightRadius: hp(3),
    // borderWidth: 1,
  },
  touchbale: {
    height: "100%",
    // width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    alignSelf: "center",
    textAlign: "center",
    color: colors.white,
    fontWeight: "bold",
    // borderWidth: 1,
    // fontSize: fonts.H3,
  },
});

export default styles;
