import { StyleSheet, Platform } from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  InputContainer: {
    flex: 0.6,
    zIndex: 1,
    justifyContent: "center",

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
  // ===========  Phone Number field  ===========
  phoneStyle: {
    marginTop: hp(1),
    height: hp(6),
    width: "100%",
    // alignSelf: "center",
    backgroundColor: colors.input_text_backColor,
    borderRadius: hp(1.2),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.white,
  },

  textStyle: {
    // justifyContent: "center",
    alignContent: "center",
    // borderWidth: 1,
    // borderColor: "white",
    fontSize: 18,
    backgroundColor: "transparent",
  },
  textStyle1: {
    // borderWidth: 1,
    // height: hp(10),
    // borderColor: "white",

    fontSize: 14,
    fontWeight: "bold",
    // color: colors.white,
    backgroundColor: colors.input_text_backColor,
  },
  codeTextStyle: {
    // color: "white",
  },
  containerModal: {
    flex: 1,
    backgroundColor: colors.blueColor,
  },

  centeredView: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp(20),
  },
  modalView: {
    borderRadius: hp(4),
    height: hp(25),
    width: wp(80),
    borderWidth: hp(0.05),
    // borderWidth: 1,
    // borderColor: "white",
    backgroundColor: "#2D333C",

    // "#575D65"
  },
  modalView1: {
    borderRadius: hp(3),
    height: hp(15),
    width: wp(82),
    // borderWidth: hp(0.05),
    // borderWidth: 1,
    // borderColor: "white",
    backgroundColor: colors.lightColor,

    // "#575D65"
  },

  chooseContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    borderRadius: hp(2),
    // borderWidth: 1,
    borderColor: colors.white,
  },
  // buttonContainer:{
  //     flex:0.3,
  //     backgroundColor:'green'
  // },
  cameraStyle: {
    height: hp(6),
    width: hp(20),
    resizeMode: "contain",
  },
  galleryStyle: {
    height: hp(6),
    width: hp(20),
    resizeMode: "contain",
  },
  cameraContainer: {
    flex: 0.4,
    // borderWidth: 1,
    // borderColor: "white",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  galleryContainer: {
    flex: 0.4,
    // borderWidth: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    // borderColor: "white",
    // borderWidth:1,
  },
  option: {
    marginLeft: hp(3),
    alignItems: "center",
    justifyContent: "center",
    // zIndex: 1,
    // borderWidth: 2,
    borderBottomWidth: hp(0.1),
    borderBottomColor: colors.white,
    width: wp(67),
    height: hp(4),
    marginBottom: hp(0.5),
  },
  ListText: {
    marginTop: hp(1),
    borderWidth: 2,
    fontSize: hp(2),
    color: colors.ButtonText,
    fontWeight: "400",
  },
  phoneStyle: {
    marginTop: hp(1),
    height: hp(6.5),
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: hp(2),
    flexDirection: "row",
    borderWidth: 1.2,
    borderColor: colors.white,
    color: "white",
  },

  textStyle: {
    alignContent: "center",
    // color: colors.white,
    fontSize: hp(1.7),
    backgroundColor: colors.ButtonText,
    borderRadius: hp(3),
    textAlign: "center",
    paddingTop: hp(1.5),
  },
  textStyle1: {
    top: Platform.OS === "ios" ? hp(0.2) : hp(0.25),
    fontSize: hp(1.7),
    // borderWidth: 1,6768768
    // fontWeight: "bold",
    borderColor: "white",
    color: "white",
    height: hp(6.2),
  },
});

export default styles;
